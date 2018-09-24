import { Vector4 } from "../../maths/Vector4";
import { NotEqualDepth, GreaterDepth, GreaterEqualDepth, EqualDepth, LessEqualDepth, LessDepth, AlwaysDepth, NeverDepth, CullFaceFront, CullFaceBack, CullFaceNone, CustomBlending, MultiplyBlending, SubtractiveBlending, AdditiveBlending, NoBlending, NormalBlending, DoubleSide, BackSide } from '../../constants.js';
import { WebGLUtils } from "./WebGLUtils";

class ColorBuffer {
    constructor(gl) {
        this.gl = gl;
        this._currentColorMask = null;
        this._currentColorClear = new Vector4(0, 0, 0, 0);
    }
    //关闭颜色通道 red green blue alpha
    setMask(colorMask) {
        if (this._currentColorMask !== colorMask) {

            this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            this._currentColorMask = colorMask;

        }

    }
    //设置清除色 r g b a 为[0-1]
    setClear(r, g, b, a, premultipliedAlpha) {

        if (premultipliedAlpha === true) {

            r *= a; g *= a; b *= a;

        }


        let color = new Vector4(r, g, b, a);

        if (this._currentColorClear.equals(color) === false) {

            this.gl.clearColor(r, g, b, a);
            this._currentColorClear.copy(color);

        }
        color = null;

    }

    reset() {
        this._currentColorMask = null;
        this._currentColorClear.set(- 1, 0, 0, 0); // set to invalid state
    }



}

class DepthBuffer {
    constructor(gl) {
        this.gl = gl;
        this._currentDepthFunc = null;
        this._currentDepthClear = null;
        this._currentDepthMask = null;
        this._switch = new Switch(gl);
    }

    setTest(depthTest) {
        let gl = this.gl;
        if (depthTest) {

            this._switch.enable(gl.DEPTH_TEST);

        } else {

            this._switch.disable(gl.DEPTH_TEST);

        }

    }
    //不透明与透明物体共存是,绘制透明物体需要锁定深度缓冲即:setMask(true)
    setMask(depthMask) {
        let gl = this.gl;
        if (this._currentDepthMask !== depthMask) {

            gl.depthMask(depthMask);
            this._currentDepthMask = depthMask;

        }

    }

    setClear(depth) {
        let gl = this.gl;
        if (this._currentDepthClear !== depth) {

            gl.clearDepth(depth);
            this._currentDepthClear = depth;

        }

    }
    setFunc(depthFunc) {
        let gl = this.gl;

        if (this._currentDepthFunc !== depthFunc) {

            if (depthFunc) {

                switch (depthFunc) {

                    case NeverDepth:

                        gl.depthFunc(gl.NEVER);
                        break;

                    case AlwaysDepth:

                        gl.depthFunc(gl.ALWAYS);
                        break;

                    case LessDepth:

                        gl.depthFunc(gl.LESS);
                        break;

                    case LessEqualDepth:

                        gl.depthFunc(gl.LEQUAL);
                        break;

                    case EqualDepth:

                        gl.depthFunc(gl.EQUAL);
                        break;

                    case GreaterEqualDepth:

                        gl.depthFunc(gl.GEQUAL);
                        break;

                    case GreaterDepth:

                        gl.depthFunc(gl.GREATER);
                        break;

                    case NotEqualDepth:

                        gl.depthFunc(gl.NOTEQUAL);
                        break;

                    default:

                        gl.depthFunc(gl.LEQUAL);

                }

            } else {

                gl.depthFunc(gl.LEQUAL);

            }

            this._currentDepthFunc = depthFunc;

        }

    }
    reset() {

        this._currentDepthMask = null;
        this._currentDepthFunc = null;
        this._currentDepthClear = null;

    }
}

class StencilBuffer {
    constructor(gl) {
        this.gl = gl;
        this.switch = new Switch(gl);
        this._currentStencilClear = null;
    }
    setTest(stencilTest) {
        let gl = this.gl;
        if (stencilTest) {

            this.switch.enable(gl.STENCIL_TEST);

        } else {

            this.switch.disable(gl.STENCIL_TEST);

        }

    }

    setClear(stencil) {

        if (this._currentStencilClear !== stencil) {

            this.gl.clearStencil(stencil);
            this._currentStencilClear = stencil;

        }

    }
    reset() {

        this._currentStencilClear = null;
    }
}
let capabilitiesSwitch = {};
class Switch {
    constructor(gl) {
        this.gl = gl;
    }
    enable(id) {
        if (capabilitiesSwitch[id] !== true) {

            this.gl.enable(id);
            capabilitiesSwitch[id] = true;

        }
    }
    disable(id) {
        if (capabilitiesSwitch[id] !== false) {

            this.gl.disable(id);
            capabilitiesSwitch[id] = false;

        }
    }
    reset() {
        capabilitiesSwitch = {};
    }

}

class AttributeSwitch {
    constructor(gl, extensions,capabilities) {
        this.gl = gl;
        this._extensions = extensions;
        let maxVertexAttributes = capabilities.maxAttributes;

        this._newAttributes = new Uint8Array(maxVertexAttributes);
        this._enabledAttributes = new Uint8Array(maxVertexAttributes);
        this._attributeDivisors = new Uint8Array(maxVertexAttributes);

    }

    initAttributes() {

        for (let i = 0, l = this._newAttributes.length; i < l; i++) {

            this._newAttributes[i] = 0;

        }

    }

    enableAttributeAndDivisor(attribute, meshPerAttribute) {

        this._newAttributes[attribute] = 1;

        if (this._enabledAttributes[attribute] === 0) {

            this.gl.enableVertexAttribArray(attribute);
            this._enabledAttributes[attribute] = 1;

        }

        if (this._attributeDivisors[attribute] !== meshPerAttribute) {

            let extension = this._extensions.get('ANGLE_instanced_arrays');

            extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
            this._attributeDivisors[attribute] = meshPerAttribute;

        }

    }

    disableUnusedAttributes() {
        for (let i = 0, l = this._enabledAttributes.length; i !== l; ++i) {

            if (this._enabledAttributes[i] !== this._newAttributes[i]) {

                this.gl.disableVertexAttribArray(i);
                this._enabledAttributes[i] = 0;

            }

        }
    }
    reset() {

        for (var i = 0; i < this._enabledAttributes.length; i++) {

            if (this._enabledAttributes[i] === 1) {

                this.gl.disableVertexAttribArray(i);
                this._enabledAttributes[i] = 0;

            }

        }
    }




}

class BlendingState {

    constructor(gl) {
        this.gl = gl;

        this._currentBlendEquation = null;
        this._currentBlendSrc = null;
        this._currentBlendDst = null;
        this._currentBlendEquationAlpha = null;
        this._currentBlendSrcAlpha = null;
        this._currentBlendDstAlpha = null;

        this._switch = new Switch(gl);
    }

    setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
        let gl = this.gl;

        let utils = new WebGLUtils(gl)

        if (blending !== NoBlending) {

            this._switch.enable(gl.BLEND);

        } else {

            this._switch.disable(gl.BLEND);

        }

        if (blending !== CustomBlending) {

            if (blending !== this._currentBlending || premultipliedAlpha !== this._currentPremultipledAlpha) {

                switch (blending) {

                    case AdditiveBlending:

                        if (premultipliedAlpha) {

                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);

                        } else {

                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

                        }
                        break;

                    case SubtractiveBlending:

                        if (premultipliedAlpha) {

                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);

                        } else {

                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);

                        }
                        break;

                    case MultiplyBlending:

                        if (premultipliedAlpha) {

                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);

                        } else {

                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.ZERO, gl.SRC_COLOR);

                        }
                        break;

                    default:

                        if (premultipliedAlpha) {

                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                        } else {

                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                        }

                }

            }

            this._currentBlendEquation = null;
            this._currentBlendSrc = null;
            this._currentBlendDst = null;
            this._currentBlendEquationAlpha = null;
            this._currentBlendSrcAlpha = null;
            this._currentBlendDstAlpha = null;


        } else {

            blendEquationAlpha = blendEquationAlpha || blendEquation;
            blendSrcAlpha = blendSrcAlpha || blendSrc;
            blendDstAlpha = blendDstAlpha || blendDst;

            if (blendEquation !== this._currentBlendEquation || blendEquationAlpha !== this._currentBlendEquationAlpha) {

                gl.blendEquationSeparate(utils.convert(blendEquation), utils.convert(blendEquationAlpha));

                this._currentBlendEquation = blendEquation;
                this._currentBlendEquationAlpha = blendEquationAlpha;

            }

            if (blendSrc !== this._currentBlendSrc || blendDst !== this._currentBlendDst || blendSrcAlpha !== this._currentBlendSrcAlpha || blendDstAlpha !== this._currentBlendDstAlpha) {

                gl.blendFuncSeparate(utils.convert(blendSrc), utils.convert(blendDst), utils.convert(blendSrcAlpha), utils.convert(blendDstAlpha));

                this._currentBlendSrc = blendSrc;
                this._currentBlendDst = blendDst;
                this._currentBlendSrcAlpha = blendSrcAlpha;
                this._currentBlendDstAlpha = blendDstAlpha;

            }

        }

        this._currentBlending = blending;
        this._currentPremultipledAlpha = premultipliedAlpha;
        utils = null;
    }
    reset() {
        this._currentBlendEquation = null;
        this._currentBlendSrc = null;
        this._currentBlendDst = null;
        this._currentBlendEquationAlpha = null;
        this._currentBlendSrcAlpha = null;
        this._currentBlendDstAlpha = null;
    }
}

class TextureState {
    constructor(gl,capabilities) {
        this.gl = gl;
        this._capabilities = capabilities;
        this._currentTextureSlot = null;
        this._currentBoundTextures = {};
        this._currentTextureSlot = null;

        this._emptyTextures = {};

        this._emptyTextures[gl.TEXTURE_2D] = this.createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
        this._emptyTextures[gl.TEXTURE_CUBE_MAP] = this.createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);

    }

    createTexture(type, target, count) {
        let gl = this.gl;
        let data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
        let texture = gl.createTexture();

        gl.bindTexture(type, texture);
        gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        for (var i = 0; i < count; i++) {

            gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

        }

        return texture;

    }

    activeTexture(webglSlot) {
        let gl = this.gl;
        let _capabilities = this._capabilities;
        let _maxTextures = _capabilities.maxCombinedTextures;

        if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + _maxTextures - 1;

        if (this._currentTextureSlot !== webglSlot) {

            gl.activeTexture(webglSlot);
            this._currentTextureSlot = webglSlot;

        }

    }

    bindTexture(webglType, webglTexture) {
        let gl = this.gl;
        if (this._currentTextureSlot === null) {

            this.activeTexture();

        }

        let boundTexture = this._currentBoundTextures[this._currentTextureSlot];

        if (boundTexture === undefined) {

            boundTexture = { type: undefined, texture: undefined };
            this._currentBoundTextures[this._currentTextureSlot] = boundTexture;

        }

        if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {

            gl.bindTexture(webglType, webglTexture || this._emptyTextures[webglType]);

            boundTexture.type = webglType;
            boundTexture.texture = webglTexture;

        }

    }
    texImage2D() {
        let gl = this.gl;
        try {
            gl.texImage2D.apply(gl, arguments);

        } catch (error) {
            console.error('WebGLState:', error);

        }

    }
    reset() {
        this._currentTextureSlot = null;
        this._currentBoundTextures = {};
        this._currentTextureSlot = null;
    }
}

function getLineWidthAvailable(gl) {
    let lineWidthAvailable = false;
    let version = 0;
    let glVersion = gl.getParameter(gl.VERSION);

    if (glVersion.indexOf('WebGL') !== - 1) {

        version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
        lineWidthAvailable = (version >= 1.0);

    } else if (glVersion.indexOf('OpenGL ES') !== - 1) {

        version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
        lineWidthAvailable = (version >= 2.0);

    }
    return lineWidthAvailable;
}




class WebGLState {
    constructor(gl, extensions,capabilities) {
        this.gl = gl;

        this.buffers = {
            color: new ColorBuffer(gl),
            depth: new DepthBuffer(gl),
            stencil: new StencilBuffer(gl)
        }

        this._attributeSwitch = new AttributeSwitch(gl, extensions,capabilities);
        this._switch = new Switch(gl);

        this._currentProgram = null;
        this._blendingState = new BlendingState(gl);
        this._currentFlipSided = null;

        this._currentPolygonOffsetFactor = null;
        this._currentPolygonOffsetUnits = null;

        this._currentLineWidth = null;

        this._textureState = new TextureState(gl,capabilities)
        this._currentViewport = new Vector4();

        this._initState(gl)

    }
    _initState(gl) {

        this.buffers.color.setClear(1, 1, 1, 1);
        this.buffers.depth.setClear(1);
        this.buffers.stencil.setClear(0);

        this._switch.enable(gl.DEPTH_TEST);
        this.buffers.depth.setFunc(LessEqualDepth);

        this.setFlipSided(false);
        this.setCullFace(CullFaceBack);
        this._switch.enable(gl.CULL_FACE);

        this._switch.enable(gl.BLEND);
        this.setBlending(NormalBlending);
    }

    initAttributes() {
        this._attributeSwitch.initAttributes();
    }
    enableAttribute(attribute) {
        this._attributeSwitch.enableAttributeAndDivisor(attribute,0);
    }
    disableUnusedAttributes() {
        this._attributeSwitch.disableUnusedAttributes();
    }

    enableAttributeAndDivisor(attribute, meshPerAttribute) {
        this._attributeSwitch.enableAttributeAndDivisor(attribute, meshPerAttribute);
    }

    enable(id) {
        this._switch.enable(id)
    }
    disable(id) {
        this._switch.disable(id)
    }

    useProgram(program) {

        if (this._currentProgram !== program) {

            this.gl.useProgram(program);

            this._currentProgram = program;

            return true;

        }

        return false;

    }

    setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
        this._blendingState.setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha)
    }

    setMaterial(material, frontFaceCW) {
        let gl = this.gl;
        let depthBuffer = this.buffers.depth;
        let colorBuffer = this.buffers.color;
        //如果启用双面绘制,关闭背面剔除
        material.side === DoubleSide
            ? this._switch.disable(gl.CULL_FACE)
            : this._switch.enable(gl.CULL_FACE);

        let flipSided = (material.side === BackSide);
        if (frontFaceCW) flipSided = !flipSided;

        this.setFlipSided(flipSided);

        material.transparent === true
            ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha)
            : this.setBlending(NoBlending);

        depthBuffer.setFunc(material.depthFunc);
        depthBuffer.setTest(material.depthTest);
        depthBuffer.setMask(material.depthWrite);
        colorBuffer.setMask(material.colorWrite);

        this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);

    }

    setFlipSided(flipSided) {
        let gl = this.gl;

        if (this._currentFlipSided !== flipSided) {

            if (flipSided) {

                gl.frontFace(gl.CW);

            } else {

                gl.frontFace(gl.CCW);

            }

            this._currentFlipSided = flipSided;

        }
    }

    setPolygonOffset(polygonOffset, factor, units) {

        let gl = this.gl;

        if (polygonOffset) {

            this._switch.enable(gl.POLYGON_OFFSET_FILL);

            if (this._currentPolygonOffsetFactor !== factor || this._currentPolygonOffsetUnits !== units) {

                gl.polygonOffset(factor, units);

                this._currentPolygonOffsetFactor = factor;
                this._currentPolygonOffsetUnits = units;

            }

        } else {

            this._switch.disable(gl.POLYGON_OFFSET_FILL);

        }

    }
    setCullFace(cullFace) {

        let gl = this.gl;

        if (cullFace !== CullFaceNone) {

            this._switch.enable(gl.CULL_FACE);

            if (cullFace !== this._currentCullFace) {

                if (cullFace === CullFaceBack) {

                    gl.cullFace(gl.BACK);

                } else if (cullFace === CullFaceFront) {

                    gl.cullFace(gl.FRONT);

                } else {

                    gl.cullFace(gl.FRONT_AND_BACK);

                }

            }

        } else {

            this._switch.disable(gl.CULL_FACE);

        }

        this._currentCullFace = cullFace;

    }
    //设置线条宽度只有部分浏览器支持,目前Chrome不支持,safari支持
    //https://www.cnblogs.com/twaver/p/7228687.html?utm_source=itdadao&utm_medium=referral
    //三角面画线方案 https://github.com/mattdesl/webgl-lines
    setLineWidth(width) {

        if (width !== this._currentLineWidth) {

            if (getLineWidthAvailable(this.gl)) this.gl.lineWidth(width);

            this._currentLineWidth = width;

        }

    }

    activeTexture(webglSlot) {
        this._textureState.activeTexture(webglSlot);
    }

    bindTexture(webglType, webglTexture) {
        this._textureState.bindTexture(webglType, webglTexture);
    }
    texImage2D() {
        this._textureState.texImage2D.apply(this, arguments);
    }

    viewport(viewport) {
        let gl = this.gl;
        if (this._currentViewport.equals(viewport) === false) {

            gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
            this._currentViewport.copy(viewport);
        }

    }
    reset() {

        this._attributeSwitch.reset();

        this._switch.reset();

        this._textureState.reset();


        this._currentProgram = null;

        this._blendingState.reset();


        this._currentFlipSided = null;
        this._currentCullFace = null;

        this.buffers.color.reset();
        this.buffers.depth.reset();
        this.buffers.stencil.reset();

    }

}

export { WebGLState };


