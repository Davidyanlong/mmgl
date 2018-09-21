
import { SrcAlphaSaturateFactor, OneMinusDstColorFactor, DstColorFactor, OneMinusDstAlphaFactor, DstAlphaFactor, OneMinusSrcAlphaFactor, SrcAlphaFactor, OneMinusSrcColorFactor, SrcColorFactor, OneFactor, ZeroFactor, ReverseSubtractEquation, SubtractEquation, AddEquation, DepthStencilFormat, DepthFormat, LuminanceAlphaFormat, LuminanceFormat, RGBAFormat, RGBFormat, AlphaFormat, FloatType, UnsignedIntType, IntType, UnsignedShortType, ShortType, ByteType, UnsignedShort565Type, UnsignedShort5551Type, UnsignedShort4444Type, UnsignedByteType, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestFilter, MirroredRepeatWrapping, ClampToEdgeWrapping, RepeatWrapping } from '../../constants.js';
/**
 * @description 获取运行环境的Webgl的支持能力
 * @author bujue
 */

class WebGLUtils {
    constructor(gl) {
        this.gl = gl;
        this._map = {

            [RepeatWrapping]: gl.REPEAT,
            [ClampToEdgeWrapping]: gl.CLAMP_TO_EDGE,
            [MirroredRepeatWrapping]: gl.MIRRORED_REPEAT,

            [NearestFilter]: gl.NEAREST,
            [NearestMipMapNearestFilter]: gl.NEAREST_MIPMAP_NEAREST,
            [NearestMipMapLinearFilter]: gl.NEAREST_MIPMAP_LINEAR,
            
            [LinearFilter]: gl.LINEAR,
            [LinearMipMapNearestFilter]: gl.LINEAR_MIPMAP_NEAREST,
            [LinearMipMapLinearFilter]: gl.LINEAR_MIPMAP_LINEAR,

            [UnsignedByteType]: gl.UNSIGNED_BYTE,
            [UnsignedShort4444Type]: gl.UNSIGNED_SHORT_4_4_4_4,
            [UnsignedShort5551Type]: gl.UNSIGNED_SHORT_5_5_5_1,
            [UnsignedShort565Type]: gl.UNSIGNED_SHORT_5_6_5,

            [ByteType]: gl.BYTE,
            [ShortType]: gl.SHORT,
            [UnsignedShortType]: gl.UNSIGNED_SHORT,
            [IntType]: gl.INT,
            [UnsignedIntType]: gl.UNSIGNED_INT,
            [FloatType]: gl.FLOAT,

            [AlphaFormat]: gl.ALPHA,
            [RGBFormat]: gl.RGB,
            [RGBAFormat]: gl.RGBA,
            [LuminanceFormat]: gl.LUMINANCE,
            [LuminanceAlphaFormat]: gl.LUMINANCE_ALPHA,
            [DepthFormat]: gl.DEPTH_COMPONENT,
            [DepthStencilFormat]: gl.DEPTH_STENCIL,

            [AddEquation]: gl.FUNC_ADD,
            [SubtractEquation]: gl.FUNC_SUBTRACT,
            [ReverseSubtractEquation]: gl.FUNC_REVERSE_SUBTRACT,

            [ZeroFactor]: gl.ZERO,
            [OneFactor]: gl.ONE,
            [SrcColorFactor]: gl.SRC_COLOR,
            [OneMinusSrcColorFactor]: gl.ONE_MINUS_SRC_COLOR,
            [SrcAlphaFactor]: gl.SRC_ALPHA,
            [OneMinusSrcAlphaFactor]: gl.ONE_MINUS_SRC_ALPHA,
            [DstAlphaFactor]: gl.DST_ALPHA,
            [OneMinusDstAlphaFactor]: gl.ONE_MINUS_DST_ALPHA,

            [DstColorFactor]: gl.DST_COLOR,
            [OneMinusDstColorFactor]: gl.ONE_MINUS_DST_COLOR,
            [SrcAlphaSaturateFactor]: gl.SRC_ALPHA_SATURATE,

        }
    }

    convert(p) {

        if (this._map[p] !== undefined) return this._map[p];
        return 0;
    }

}

export { WebGLUtils };