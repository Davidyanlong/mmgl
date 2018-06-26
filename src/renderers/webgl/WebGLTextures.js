
import {
    ClampToEdgeWrapping,
    NearestFilter,
    LinearFilter,
    NearestMipMapNearestFilter,
    NearestMipMapLinearFilter
} from '../../constants';
import { _Math } from '../../maths/Math';

class WebGLTextures {
    constructor(_gl, extensions, state, properties, capabilities, utils, info) {
        this.gl = _gl;
        this._properties = properties;
        this._info = info;
        this._state = state;
        this._capabilities = capabilities;
        this._utils = utils;
    }

    setTexture2D(texture, slot) {

        let _gl = this.gl;
        let textureProperties = this._properties.get(texture);

        if (texture.version > 0 && textureProperties.__version !== texture.version) {

            let image = texture.image;

            if (image === undefined) {

                console.warn('WebGLRenderer: Texture marked for update but image is undefined', texture);

            } else if (image.complete === false) {

                console.warn('WebGLRenderer: Texture marked for update but image is incomplete', texture);

            } else {

                this._uploadTexture(textureProperties, texture, slot);
                return;

            }

        }

        this._state.activeTexture(_gl.TEXTURE0 + slot);
        this._state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
    }

    _uploadTexture(textureProperties, texture, slot) {

        let _gl = this.gl;
        let state = this._state;
        let utils = this._utils;

        if (textureProperties.__webglInit === undefined) {

            textureProperties.__webglInit = true;

            texture.on('dispose', onTextureDispose);

            textureProperties.__webglTexture = _gl.createTexture();

            this._info.memory.textures++;

        }

        state.activeTexture(_gl.TEXTURE0 + slot);
        state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);

        //UNPACK_FLIP_Y_WEBGL 是否将纹理上下颠倒进行映射
        //https://yq.aliyun.com/articles/62464
        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        //对图片纹理的每个像素的R、G、B通道，乘以A的值后，并替换原先的值
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
        //纹理的像素对齐
        _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

        let image = clampToMaxSize(texture.image, this._capabilities.maxTextureSize);

        if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {

            image = makePowerOfTwo(image);

        }

        let isPowerOfTwoImage = isPowerOfTwo(image),
            glFormat = utils.convert(texture.format),
            glType = utils.convert(texture.type);

        setTextureParameters.call(this, _gl.TEXTURE_2D, texture, isPowerOfTwoImage);

        let mipmap, mipmaps = texture.mipmaps;



        // regular Texture (image, video, canvas)

        // use manually created mipmaps if available
        // if there are no manual mipmaps
        // set 0 level mipmap and then use GL to generate other mipmap levels

        if (mipmaps.length > 0 && isPowerOfTwoImage) {

            for (var i = 0, il = mipmaps.length; i < il; i++) {

                mipmap = mipmaps[i];
                state.texImage2D(_gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap);

            }

            texture.generateMipmaps = false;
            textureProperties.__maxMipLevel = mipmaps.length - 1;

        } else {

            state.texImage2D(_gl.TEXTURE_2D, 0, glFormat, glFormat, glType, image);
            textureProperties.__maxMipLevel = 0;

        }



        if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {

            generateMipmap.call(this, _gl.TEXTURE_2D, texture, image.width, image.height);

        }

        textureProperties.__version = texture.version;

        if (texture.onUpdate) texture.onUpdate(texture);
    }
}

function onTextureDispose(event) {

    var texture = event.target;

    texture.off('dispose', onTextureDispose);

    deallocateTexture.call(this, texture);

    this._info.memory.textures--;
}
function clampToMaxSize(image, maxSize) {

    if (image.width > maxSize || image.height > maxSize) {

        if ('data' in image) {

            console.warn('WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
            return;

        }

        // Warning: Scaling through the canvas will only work with images that use
        // premultiplied alpha.

        let scale = maxSize / Math.max(image.width, image.height);

        let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        canvas.width = Math.floor(image.width * scale);
        canvas.height = Math.floor(image.height * scale);

        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        console.warn('WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height, image);

        return canvas;

    }

    return image;

}

function textureNeedsPowerOfTwo(texture) {

    return (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) ||
        (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter);

}

function isPowerOfTwo(image) {

    return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);

}

let _canvas;
function makePowerOfTwo(image) {

    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

        if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

        _canvas.width = _Math.floorPowerOfTwo(image.width);
        _canvas.height = _Math.floorPowerOfTwo(image.height);

        var context = _canvas.getContext('2d');
        context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

        console.warn('WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height, image);

        return _canvas;

    }

    return image;

}

function setTextureParameters(textureType, texture, isPowerOfTwoImage) {

    let _gl = this.gl,
        utils = this._utils;

    if (isPowerOfTwoImage) {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, utils.convert(texture.wrapS));
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, utils.convert(texture.wrapT));

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, utils.convert(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, utils.convert(texture.minFilter));

    } else {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

        if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {

            console.warn('WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to ClampToEdgeWrapping.', texture);

        }

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback(texture.minFilter));

        if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {

            console.warn('WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to NearestFilter or LinearFilter.', texture);

        }

    }



}

// Fallback filters for non-power-of-2 textures

function filterFallback(f) {

    let gl = this.gl;

    if (f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter) {

        return _gl.NEAREST;

    }

    return _gl.LINEAR;

}

function deallocateTexture(texture) {

    var textureProperties = this._properties.get(texture);

    if (texture.image && textureProperties.__image__webglTextureCube) {

        // cube texture

        _gl.deleteTexture(textureProperties.__image__webglTextureCube);

    } else {

        // 2D texture

        if (textureProperties.__webglInit === undefined) return;

        _gl.deleteTexture(textureProperties.__webglTexture);

    }

    // remove all webgl properties
    this._properties.remove(texture);

}

function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {

    return texture.generateMipmaps && isPowerOfTwo &&
        texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

}

function generateMipmap(target, texture, width, height) {

    //生成多级纹理图
   this.gl.generateMipmap(target);

    var textureProperties = this._properties.get(texture);

    // Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
    textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;

}

export { WebGLTextures };