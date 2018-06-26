import { WebGLUniforms } from './WebGLUniforms';

import { WebGLShader } from './WebGLShader.js';

/**
 * @class WebGLProgram
 * @description  组织shader code ,生成 program 对象
 * @author bujue
 */
let programIdCount = 0;

class WebGLProgram {
    constructor(gl, extensions, material, code, shader, parameters) {
        this._gl = gl;
        this._defines = material.defines;

        this._cachedUniforms = undefined;
        this._cachedAttributes = undefined;

        this.name = shader.name;
        this.id = programIdCount++;
        this.code = code;
        this.usedTimes = 1;
        this.program = null;
        this.vertexShader = '';
        this.fragmentShader = '';


        this._init(gl, extensions, material, shader, parameters);

    }
    _init(gl, extensions, material, shader, parameters) {

        let vertexShader = shader.vertexShader;
        let fragmentShader = shader.fragmentShader;

        let customExtensions = generateExtensions(material.extensions, parameters, extensions);

        let customDefines = generateDefines(this._defines);

        let program = this.program = gl.createProgram();

        let prefixVertex, prefixFragment;

        if (material.isRawShaderMaterial) {

            prefixVertex = [

                customDefines

            ].filter(filterEmptyLine).join('\n');

            if (prefixVertex.length > 0) {

                prefixVertex += '\n';

            }

            prefixFragment = [

                customExtensions,
                customDefines

            ].filter(filterEmptyLine).join('\n');

            if (prefixFragment.length > 0) {

                prefixFragment += '\n';

            }

        } else {
            prefixVertex = [

                'precision ' + parameters.precision + ' float;',
                'precision ' + parameters.precision + ' int;',

                '#define SHADER_NAME ' + shader.name,

                //运用纹理作色
                parameters.map ? '#define USE_MAP' : '',

                //采用顶点作色
                parameters.vertexColors ? '#define USE_COLOR' : '',

                parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                parameters.flipSided ? '#define FLIP_SIDED' : '',

                //根据Z值的不同,点的大小递减
                parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

                //linemesh 是否是虚线
                parameters.dashed ? '#define USE_DASH' : '',

                'uniform mat4 modelMatrix;',
                'uniform mat4 modelViewMatrix;',
                'uniform mat4 projectionMatrix;',
                'uniform mat4 viewMatrix;',
                'uniform mat3 normalMatrix;',
                'uniform vec3 cameraPosition;',

                'attribute vec3 position;',
                'attribute vec3 normal;',
                'attribute vec2 uv;',

                '#ifdef USE_COLOR',

                '	attribute vec3 color;',

                '#endif',

                '\n'

            ].filter(filterEmptyLine).join('\n');

            prefixFragment = [

                'precision ' + parameters.precision + ' float;',
                'precision ' + parameters.precision + ' int;',

                '#define SHADER_NAME ' + shader.name,


                parameters.map ? '#define USE_MAP' : '',
                parameters.vertexColors ? '#define USE_COLOR' : '',

                parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
                parameters.flipSided ? '#define FLIP_SIDED' : '',

                parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

                //linemesh 是否是虚线
                parameters.dashed ? '#define USE_DASH' : '',

                'uniform mat4 viewMatrix;',
                'uniform vec3 cameraPosition;',

                '\n'

            ].filter(filterEmptyLine).join('\n');
        }
        vertexShader = replaceLightNums(vertexShader, parameters);
        fragmentShader = replaceLightNums(fragmentShader, parameters);

        vertexShader = unrollLoops(vertexShader);
        fragmentShader = unrollLoops(fragmentShader);

        let vertexGlsl = prefixVertex + vertexShader;
        let fragmentGlsl = prefixFragment + fragmentShader;

        console.log('*VERTEX*', vertexGlsl);
        console.log('*FRAGMENT*', fragmentGlsl);

        let glVertexShader = this.vertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
        let glFragmentShader = this.fragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);

        gl.attachShader(program, glVertexShader);
        gl.attachShader(program, glFragmentShader);


        gl.linkProgram(program);

        let programLog = gl.getProgramInfoLog(program).trim();
        let vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
        let fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();


        // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
        // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

        if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {


            console.error('WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);

        } else if (programLog !== '') {

            console.warn('WebGLProgram: gl.getProgramInfoLog()', programLog);

        }


        // clean up

        gl.deleteShader(glVertexShader);
        gl.deleteShader(glFragmentShader);
    }
    getUniforms() {

        let gl = this._gl;
        let program = this.program;

        if (this._cachedUniforms === undefined) {
            //todo 多重纹理的时候需要传递 renderer 
            //setTexture2D(texture , unit )
            //this._cachedUniforms = new WebGLUniforms(gl, program, renderer);
            this._cachedUniforms = new WebGLUniforms(gl, program);

        }

        return this._cachedUniforms;

    }

    getAttributes() { //获取shader中 atttribute对象的handle
        let gl = this._gl;
        let program = this.program;

        if (this._cachedAttributes === undefined) {
            this._cachedAttributes = {};
            let n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

            for (var i = 0; i < n; i++) {

                var info = gl.getActiveAttrib(program, i);
                var name = info.name;

                console.log('WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i);

                this._cachedAttributes[name] = gl.getAttribLocation(program, name);

            }

        }

        return this._cachedAttributes;

    };
    destroy() {

        this._gl.deleteProgram(this.program);
        this.program = undefined;
    }
}

function replaceLightNums(string, parameters) {

    return string
        .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights)
        .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
        .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights);

}

function unrollLoops(string) {

    var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

    function replace(match, start, end, snippet) {

        var unroll = '';

        for (var i = parseInt(start); i < parseInt(end); i++) {

            unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');

        }

        return unroll;

    }

    return string.replace(pattern, replace);

}

function generateExtensions(extensions, parameters, rendererExtensions) {

    extensions = extensions || {};

    var chunks = [
        (extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading) ? '#extension GL_OES_standard_derivatives : enable' : '',
        (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '',
        (extensions.drawBuffers) && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '',
        (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''
    ];

    return chunks.filter(filterEmptyLine).join('\n');

}

function generateDefines(defines) {

    var chunks = [];

    for (var name in defines) {

        var value = defines[name];

        if (value === false) continue;

        chunks.push('#define ' + name + ' ' + value);

    }

    return chunks.join('\n');

}

function filterEmptyLine(string) {

    return string !== '';

}

export { WebGLProgram };