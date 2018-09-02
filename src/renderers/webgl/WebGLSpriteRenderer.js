import { Texture } from "../../textures/Texture";
import { Vector3 } from "../../maths/Vector3";
import { Quaternion } from "../../maths/Quaternion";


class WebGLSpriteRenderer1 {
    constructor(renderer, gl, state, textures, capabilities) {
        this._gl = gl;
        this._state = state;
        this._textures = textures;
        this._renderer = renderer;
        this._capabilities = capabilities;

        this._vertexBuffer = null;
        this._elementBuffer = null;
        this._program = null;
        this._attributes = null;

        this.spritePosition = new Vector3();
        this.spriteRotation = new Quaternion();
        this.spriteScale = new Vector3();

    }
    _init() {

        let gl = this._gl;

        let vertices = new Float32Array([
            //  x     y     u  v 
            - 0.5, - 0.5, 0, 0,
            0.5, - 0.5, 1, 0,
            0.5, 0.5, 1, 1,
            - 0.5, 0.5, 0, 1
        ]);

        let faces = new Uint16Array([
            0, 1, 2,
            0, 2, 3
        ]);

        this._vertexBuffer = gl.createBuffer();
        this._elementBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);

        let program = this._program = createProgram.call(this);

        this._attributes = {
            position: gl.getAttribLocation(program, 'position'),
            uv: gl.getAttribLocation(program, 'uv')
        };

        this._uniforms = {
            uvOffset: gl.getUniformLocation(program, 'uvOffset'),
            uvScale: gl.getUniformLocation(program, 'uvScale'),

            rotation: gl.getUniformLocation(program, 'rotation'),
            center: gl.getUniformLocation(program, 'center'),
            scale: gl.getUniformLocation(program, 'scale'),

            color: gl.getUniformLocation(program, 'color'),
            map: gl.getUniformLocation(program, 'map'),
            opacity: gl.getUniformLocation(program, 'opacity'),

            modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix'),
            projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
        };

        let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        canvas.width = 8;
        canvas.height = 8;

        var context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, 8, 8);

        this._emptyTexture = new Texture(canvas);
        this._emptyTexture.needsUpdate = true;
    }

    render(sprites, scene, camera) {

        let state = this._state;
        let gl = this._gl;
        let uniforms;

        if (sprites.length === 0) return;

        // setup gl

        if (this._program === null) {

            this._init();

        }

        uniforms = this._uniforms;

        state.useProgram(this._program);

        state.initAttributes();
        state.enableAttribute(this._attributes.position);
        state.enableAttribute(this._attributes.uv);
        state.disableUnusedAttributes();
        //关闭背面裁截
        state.disable(gl.CULL_FACE);
        state.enable(gl.BLEND);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.vertexAttribPointer(this._attributes.position, 2, gl.FLOAT, false, 2 * 8, 0);
        gl.vertexAttribPointer(this._attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);

        gl.uniformMatrix4fv(uniforms.projectionMatrix, false, camera.projectionMatrix.elements);

        state.activeTexture(gl.TEXTURE0);
        gl.uniform1i(uniforms.map, 0);

        // update positions and sort

        for (let i = 0, l = sprites.length; i < l; i++) {

            let sprite = sprites[i];

            sprite.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, sprite.matrixWorld);
            //12:x  13:y  14:z
            sprite.z = - sprite.modelViewMatrix.elements[14];

        }

        sprites.sort(painterSortStable);

        // render all sprites

        let scale = [];
        let center = [];

        for (let i = 0, l = sprites.length; i < l; i++) {

            let sprite = sprites[i];
            let material = sprite.material;

            if (material.visible === false) continue;

            sprite.onBeforeRender(this._renderer, scene, camera, undefined, material, undefined);

            //gl.uniform1f(uniforms.alphaTest, material.alphaTest);
            gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, sprite.modelViewMatrix.elements);

            sprite.matrixWorld.decompose(this.spritePosition, this.spriteRotation, this.spriteScale);

            scale[0] = this.spriteScale.x;
            scale[1] = this.spriteScale.y;

            center[0] = sprite.center.x - 0.5;
            center[1] = sprite.center.y - 0.5;



            if (material.map !== null) {

                gl.uniform2f(uniforms.uvOffset, material.map.offset.x, material.map.offset.y);
                gl.uniform2f(uniforms.uvScale, material.map.repeat.x, material.map.repeat.y);

            } else {

                gl.uniform2f(uniforms.uvOffset, 0, 0);
                gl.uniform2f(uniforms.uvScale, 1, 1);

            }

            gl.uniform1f(uniforms.opacity, material.opacity);
            gl.uniform3f(uniforms.color, material.color.r, material.color.g, material.color.b);

            gl.uniform1f(uniforms.rotation, material.rotation);
            gl.uniform2fv(uniforms.center, center);
            gl.uniform2fv(uniforms.scale, scale);

            state.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);

            state.buffers.depth.setTest(material.depthTest);
            state.buffers.depth.setMask(material.depthWrite);
            state.buffers.color.setMask(material.colorWrite);

            this._textures.setTexture2D(material.map || this._emptyTexture, 0);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

            sprite.onAfterRender(this._renderer, scene, camera, undefined, material, undefined);

        }

        // restore gl

        state.enable(gl.CULL_FACE);

        state.reset();

    }

}


function createProgram() {

    let gl = this._gl;
    let program = gl.createProgram();

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    //todo 考虑雾,删除相关代码
    gl.shaderSource(vertexShader, [

        'precision ' + this._capabilities.precision + ' float;',

        '#define SHADER_NAME ' + 'SpriteMaterial',

        'uniform mat4 modelViewMatrix;',
        'uniform mat4 projectionMatrix;',
        'uniform float rotation;',
        'uniform vec2 center;',
        'uniform vec2 scale;',
        'uniform vec2 uvOffset;',
        'uniform vec2 uvScale;',

        'attribute vec2 position;',
        'attribute vec2 uv;',

        'varying vec2 vUV;',

        'void main() {',

        '	vUV = uvOffset + uv * uvScale;',

        '	vec2 alignedPosition = ( position - center ) * scale;',
        //绕精灵的中心旋转,精灵的中心默认(0,0) 
        '	vec2 rotatedPosition;',
        '	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;',
        '	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;',

        '	vec4 mvPosition;',
        //物体的模型矩阵和视图矩阵都不改变顶点的x,y坐标,顶点是vec4(0.0, 0.0, 0.0 ,1.0) 
        '	mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );',
        '	mvPosition.xy += rotatedPosition;',

        '	gl_Position = projectionMatrix * mvPosition;',


        '}'

    ].join('\n'));

    gl.shaderSource(fragmentShader, [

        'precision ' + this._capabilities.precision + ' float;',

        '#define SHADER_NAME ' + 'SpriteMaterial',

        'uniform vec3 color;',
        'uniform sampler2D map;',
        'uniform float opacity;',

        'varying vec2 vUV;',

        'void main() {',

        '	vec4 texture = texture2D( map, vUV );',


        '	gl_FragColor = vec4( color * texture.rgb, texture.a * opacity );',


        '}'

    ].join('\n'));

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    return program;

}


function painterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;

    } else if (a.z !== b.z) {

        return b.z - a.z;

    } else {

        return b.id - a.id;

    }

}

export { WebGLSpriteRenderer };