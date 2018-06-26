
// import { CubeTexture } from '../../textures/CubeTexture.js';
import { Texture } from '../../textures/Texture.js';

/**
 * @class WebGLUniforms
 * @description Uniform 变量的赋值,不同类型,底层提供不同的赋值方法
 * @author bujue
 * gl.uniform1f (floatUniformLoc, v); // for float
 * gl.uniform1fv(floatUniformLoc, [v]);   // for float or float array
 * gl.uniform2f (vec2UniformLoc,  v0, v1);// for vec2
 * gl.uniform2fv(vec2UniformLoc,  [v0, v1]);  // for vec2 or vec2 array
 * gl.uniform3f (vec3UniformLoc,  v0, v1, v2);// for vec3
 * gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);  // for vec3 or vec3 array
 * gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);// for vec4
 * gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // for vec4 or vec4 array

 * gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // for mat2 or mat2 array
 * gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // for mat3 or mat3 array
 * gl.uniformMatrix4fv(mat4UniformLoc, false, [ 17x element array ])  // for mat4 or mat4 array

 * gl.uniform1i (intUniformLoc,   v); // for int
 * gl.uniform1iv(intUniformLoc, [v]); // for int or int array
 * gl.uniform2i (ivec2UniformLoc, v0, v1);// for ivec2
 * gl.uniform2iv(ivec2UniformLoc, [v0, v1]);  // for ivec2 or ivec2 array
 * gl.uniform3i (ivec3UniformLoc, v0, v1, v2);// for ivec3
 * gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);  // for ivec3 or ivec3 array
 * gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);// for ivec4
 * gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // for ivec4 or ivec4 array

 * gl.uniform1i (sampler2DUniformLoc,   v);   // for sampler2D (textures)
 * gl.uniform1iv(sampler2DUniformLoc, [v]);   // for sampler2D or sampler2D array

 * gl.uniform1i (samplerCubeUniformLoc,   v); // for samplerCube (textures)
 * gl.uniform1iv(samplerCubeUniformLoc, [v]); // for samplerCube or samplerCube array
 */


class WebGLUniforms {

    constructor(gl, program, renderer) {
        this._gl = gl;
        this._program = program;
        this._renderer = renderer;
        this.seq = [];
        this.map = {};

        let n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < n; ++i) {

            let info = gl.getActiveUniform(program, i),
                addr = gl.getUniformLocation(program, info.name);

            parseUniform(info, addr, this);

        }

    }

    setValue(name, value) {

        var u = this.map[name];

        if (u !== undefined) u.setValue(value, this._renderer);

    }

    setOptional(object, name) { //保留,暂时用不到

        var v = object[name];

        if (v !== undefined) this.setValue(name, v);

    }
    static upload(gl, seq, values, renderer) {

        for (var i = 0, n = seq.length; i !== n; ++i) {

            var u = seq[i],
                v = values[u.id];

            if (v.needsUpdate !== false) {

                // note: always updating when .needsUpdate is undefined
                u.setValue(v.value, renderer);

            }

        }

    }
    static seqWithValue(seq, values) {

        var r = [];

        for (var i = 0, n = seq.length; i !== n; ++i) {

            var u = seq[i];
            if (u.id in values) r.push(u);

        }

        return r;

    }

}

class StructuredUniform {
    constructor(gl, id) {

        this._gl = gl;
        this.id = id;
        this.seq = [];
        this.map = {};
    }

    setValue(value) {

        // Note: Don't need an extra 'renderer' parameter, since samplers
        // are not allowed in structured uniforms.

        var seq = this.seq;

        for (var i = 0, n = seq.length; i !== n; ++i) {

            var u = seq[i];
            u.setValue(value[u.id]);

        }

    }
}


// --- Uniform Classes ---

class SingleUniform {
    constructor(gl, id, activeInfo, addr) {
        this._gl = gl;
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.setValue = getSingularSetter(activeInfo.type);

        // this.path = activeInfo.name; // DEBUG

    }

}



class PureArrayUniform {
    constructor(gl, id, activeInfo, addr) {
        this._gl = gl
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter(activeInfo.type);

        // this.path = activeInfo.name; // DEBUG

    }


}

function getSingularSetter(type) {
    switch (type) {

        case 0x1406: return setValue1f; // FLOAT
        case 0x8b50: return setValue2fv; // _VEC2
        case 0x8b51: return setValue3fv; // _VEC3
        case 0x8b52: return setValue4fv; // _VEC4

        case 0x8b5a: return setValue2fm; // _MAT2
        case 0x8b5b: return setValue3fm; // _MAT3
        case 0x8b5c: return setValue4fm; // _MAT4

        case 0x8b5e: case 0x8d66: return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
        // case 0x8b60: return setValueT6; // SAMPLER_CUBE

        case 0x1404: case 0x8b56: return setValue1i; // INT, BOOL
        case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
        case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
        case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

    }
}

function getPureArraySetter(type) {

    switch (type) {

        case 0x1406: return setValue1fv; // FLOAT
        case 0x8b50: return setValueV2a; // _VEC2
        case 0x8b51: return setValueV3a; // _VEC3
        case 0x8b52: return setValueV4a; // _VEC4

        case 0x8b5a: return setValueM2a; // _MAT2
        case 0x8b5b: return setValueM3a; // _MAT3
        case 0x8b5c: return setValueM4a; // _MAT4

        case 0x8b5e: return setValueT1a; // SAMPLER_2D
        //  case 0x8b60: return setValueT6a; // SAMPLER_CUBE

        case 0x1404: case 0x8b56: return setValue1iv; // INT, BOOL
        case 0x8b53: case 0x8b57: return setValue2iv; // _VEC2
        case 0x8b54: case 0x8b58: return setValue3iv; // _VEC3
        case 0x8b55: case 0x8b59: return setValue4iv; // _VEC4

    }

}


function parseUniform(activeInfo, addr, container) {

    let RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
    let path = activeInfo.name,
        pathLength = path.length;

    // reset RegExp object, because of the early exit of a previous run
    RePathPart.lastIndex = 0;

    while (true) {

        let match = RePathPart.exec(path),
            matchEnd = RePathPart.lastIndex,

            id = match[1],
            idIsIndex = match[2] === ']',
            subscript = match[3];

        if (idIsIndex) id = id | 0; // convert to integer

        if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {

            // bare name or "pure" bottom-level array "[0]" suffix

            addUniform(container, subscript === undefined ?
                new SingleUniform(container._gl, id, activeInfo, addr) :
                new PureArrayUniform(container._gl, id, activeInfo, addr));

            break;

        } else {

            // step into inner node / create it in case it doesn't exist

            let map = container.map, next = map[id];

            if (next === undefined) {

                next = new StructuredUniform(container._gl,id);
                addUniform(container, next);

            }

            container = next;

        }

    }

}

function addUniform(container, uniformObject) {

    container.seq.push(uniformObject);
    container.map[uniformObject.id] = uniformObject;

}
// Array Caches (provide typed arrays for temporary by size)

let arrayCacheF32 = [];
let arrayCacheI32 = [];

let arrayUtils = {
    mat2array: new Float32Array(4),
    mat3array: new Float32Array(9),
    mat4array: new Float32Array(16),
    emptyTexture: new Texture(),
    // emptyCubeTexture: new CubeTexture(),
    arraysEqual(a, b) {

        if (a.length !== b.length) return false;

        for (let i = 0, l = a.length; i < l; i++) {

            if (a[i] !== b[i]) return false;

        }

        return true;

    },
    copyArray(a, b) {

        for (let i = 0, l = b.length; i < l; i++) {

            a[i] = b[i];

        }

    },
    flatten(array, nBlocks, blockSize) {

        var firstElem = array[0];

        if (firstElem <= 0 || firstElem > 0) return array;
        // unoptimized: ! isNaN( firstElem )
        // see http://jacksondunstan.com/articles/983

        var n = nBlocks * blockSize,
            r = arrayCacheF32[n];

        if (r === undefined) {

            r = new Float32Array(n);
            arrayCacheF32[n] = r;

        }

        if (nBlocks !== 0) {

            firstElem.toArray(r, 0);

            for (var i = 1, offset = 0; i !== nBlocks; ++i) {

                offset += blockSize;
                array[i].toArray(r, offset);

            }

        }

        return r;

    },
    allocTexUnits(renderer, n) {

        var r = arrayCacheI32[n];

        if (r === undefined) {

            r = new Int32Array(n);
            arrayCacheI32[n] = r;

        }

        for (var i = 0; i !== n; ++i)
            r[i] = renderer.allocTextureUnit();

        return r;

    }
}

// --- Setters ---


function setValue1f(v) {

    let cache = this.cache;

    if (cache[0] === v) return;

    this._gl.uniform1f(this.addr, v);

    cache[0] = v;

}

function setValue1i(v) {

    let cache = this.cache;

    if (cache[0] === v) return;

    this._gl.uniform1i(this.addr, v);

    cache[0] = v;

}

// Single float vector (from flat array or MMGL.VectorN)

function setValue2fv(v) {

    let cache = this.cache;

    if (v.x !== undefined) { //XY

        if (cache[0] !== v.x || cache[1] !== v.y) {

            this._gl.uniform2f(this.addr, v.x, v.y);

            cache[0] = v.x;
            cache[1] = v.y;

        }

    } else { //arr[2]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform2fv(this.addr, v);

        arrayUtils.copyArray(cache, v);

    }

}

function setValue3fv(v) {

    let cache = this.cache;

    if (v.x !== undefined) { //XYZ

        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {

            this._gl.uniform3f(this.addr, v.x, v.y, v.z);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;

        }

    } else if (v.r !== undefined) { //RGB

        if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {

            this._gl.uniform3f(this.addr, v.r, v.g, v.b);

            cache[0] = v.r;
            cache[1] = v.g;
            cache[2] = v.b;

        }

    } else { //arr[3]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform3fv(this.addr, v);

        arrayUtils.copyArray(cache, v);

    }

}

function setValue4fv(v) {

    let cache = this.cache;

    if (v.x !== undefined) { //XYZW

        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {

            this._gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;

        }

    } else { //arr[4]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform4fv(this.addr, v);

        arrayUtils.copyArray(cache, v);

    }

}

// Single matrix (from flat array or MatrixN)

function setValue2fm(v) {

    let cache = this.cache;
    let elements = v.elements;

    if (elements === undefined) {  //v is Float32Array 4

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix2fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);

    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat2array.set(elements);

        this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.mat2array);

        arrayUtils.copyArray(cache, elements);

    }

}

function setValue3fm(v) {

    let cache = this.cache;
    let elements = v.elements;

    if (elements === undefined) {

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix3fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);

    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat3array.set(elements);

        this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.mat3array);

        arrayUtils.copyArray(cache, elements);

    }

}

function setValue4fm(v) {

    let cache = this.cache;
    let elements = v.elements;

    if (elements === undefined) {

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix4fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);

    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat4array.set(elements);

        this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.mat4array);

        arrayUtils.copyArray(cache, elements);

    }

}

// Single texture (2D / Cube)

function setValueT1(v, renderer) {

    let cache = this.cache;
    let unit = renderer.allocTextureUnit();

    if (cache[0] !== unit) {

        this._gl.uniform1i(this.addr, unit);
        cache[0] = unit;

    }

    renderer.setTexture2D(v || arrayUtils.emptyTexture, unit);

}

// function setValueT6(v, renderer) {

//     let cache = this.cache;
//     let unit = renderer.allocTextureUnit();

//     if (cache[0] !== unit) {

//         this._gl.uniform1i(this.addr, unit);
//         cache[0] = unit;

//     }

//     renderer.setTextureCube(v || arrayUtils.emptyCubeTexture, unit);

// }

// Integer / Boolean vectors or arrays thereof (always flat arrays)

function setValue2iv(v) {

    let cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform2iv(this.addr, v);

    arrayUtils.copyArray(cache, v);

}

function setValue3iv(v) {

    let cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform3iv(this.addr, v);

    arrayUtils.copyArray(cache, v);

}

function setValue4iv(v) {

    let cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform4iv(this.addr, v);

    arrayUtils.copyArray(cache, v);

}


// Array of scalars

function setValue1fv(v) {

    let cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform1fv(this.addr, v);

    arrayUtils.copyArray(cache, v);

}
function setValue1iv(v) {

    let cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform1iv(this.addr, v);

    arrayUtils.copyArray(cache, v);

}


function setValueV2a(v) {

    this._gl.uniform2fv(this.addr, arrayUtils.flatten(v, this.size, 2));

}

function setValueV3a(v) {

    this._gl.uniform3fv(this.addr, arrayUtils.flatten(v, this.size, 3));

}

function setValueV4a(v) {

    this._gl.uniform4fv(this.addr, arrayUtils.flatten(v, this.size, 4));

}


function setValueM2a(v) {

    this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.flatten(v, this.size, 4));

}

function setValueM3a(v) {

    this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.flatten(v, this.size, 9));

}

function setValueM4a(v) {

    this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.flatten(v, this.size, 16));

}

// Array of textures (2D / Cube)

function setValueT1a(v, renderer) {

    let cache = this.cache;
    let n = v.length;

    let units = arrayUtils.allocTexUnits(renderer, n);

    if (arrayUtils.arraysEqual(cache, units) === false) {

        this._gl.uniform1iv(this.addr, units);
        arrayUtils.copyArray(cache, units);

    }

    for (let i = 0; i !== n; ++i) {

        renderer.setTexture2D(v[i] || arrayUtils.emptyTexture, units[i]);

    }

}

// function setValueT6a(v, renderer) {

//     let cache = this.cache;
//     let n = v.length;

//     let units = arrayUtils.allocTexUnits(renderer, n);

//     if (arrayUtils.arraysEqual(cache, units) === false) {

//         this._gl.uniform1iv(this.addr, units);
//         arrayUtils.copyArray(cache, units);

//     }

//     for (let i = 0; i !== n; ++i) {

//         renderer.setTextureCube(v[i] || arrayUtils.emptyCubeTexture, units[i]);

//     }

// }



export { WebGLUniforms };