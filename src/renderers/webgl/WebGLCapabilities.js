/**
 * @description 获取运行环境的Webgl的支持能力
 * @author bujue
 * 
 * @returns
 * getMaxPrecision      获得Shader计算的最大精度 highp mediump lowp  
 * maxTextures          单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量
 * maxCombinedTextures  所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80 
 * maxTextureSize       可以接受的最大纹理如 2048 4096 8192
 * maxCubemapSize       可以接受的最大cube纹理如 2048 4096 8192
 * maxAttributes        最大可支持的顶点属性的个数 高性能的可以支持16个,低性能的小于这个数
 * maxVertexUniforms    顶点着色器中Uniform的最大个数 
 * maxFragmentUniforms  片元着色器中Uniform的最大个数
 * maxVaryings          着色器中最多的 VARYING 变量个数 
 */

class WebGLCapabilities {
    constructor(gl, parameters) {
        parameters = parameters || {};
        this._gl = gl;

        //单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量;
        this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        //所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80
        this.maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

        //顶点着色器中最大的纹理单元  http://blog.sina.com.cn/s/blog_15ff4f4c80102whpt.html 
        //todo 暂时用不到
        //this.maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
        //可以接受的最大纹理如 2048 4096 8192
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        //可以接受的最大cube纹理如 2048 4096 8192
        this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        //最大可支持的顶点属性的个数
        this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
        //顶点着色器中Uniform的最大个数
        this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        //片元着色器中Uniform的最大个数 
        this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
        //着色器中最多的 VARYING 变量个数  
        this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);

        //todo 单次绘制顶点的最大个数目前还不清楚如何获取
        this.precision = parameters.precision !== undefined ? parameters.precision : 'highp';
        this.precision = this.getMaxPrecision(this.precision);
    }

    //获得Shader计算的最大精度 highp mediump lowp  
    getMaxPrecision(precision) {
        let gl = this._gl;
        precision = precision || 'highp';
        if (precision === 'highp') {

            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {

                return 'highp';

            }

            precision = 'mediump';

        }

        if (precision === 'mediump') {

            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {

                return 'mediump';

            }

        }

        return 'lowp';

    }
}

export { WebGLCapabilities };