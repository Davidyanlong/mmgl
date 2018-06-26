import { Events } from "../core/Events";
import {
    ClampToEdgeWrapping,
    LinearFilter,
    LinearMipMapLinearFilter,
    RGBAFormat,
    UnsignedByteType,
    UVMapping
} from '../constants';

import { Vector2 } from '../maths/Vector2.js';
import { Matrix3 } from '../maths/Matrix3.js';

let textureId = 0;
class Texture extends Events {
    constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        super();
        Object.defineProperty(this, 'id', { value: textureId++ });
        this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;

        this.mipmaps = [];
        this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

        this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
        this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

        this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
        this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

        this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

        this.format = format !== undefined ? format : RGBAFormat;
        this.type = type !== undefined ? type : UnsignedByteType;

        this.offset = new Vector2(0, 0);
        this.repeat = new Vector2(1, 1);
        this.center = new Vector2(0, 0);
        this.rotation = 0;

        this.matrixAutoUpdate = true;
        this.matrix = new Matrix3();

        this.generateMipmaps = true;
        this.premultiplyAlpha = false;
        this.flipY = true;
        this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

        //
        // Also changing the encoding after already used by a Material will not automatically make the Material
        // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
       // this.encoding = encoding !== undefined ? encoding :  LinearEncoding;

        this.version = 0;
        this.onUpdate = null;

        this.isTexture = true;

    }

    set needsUpdate(value) {
        if (value === true) this.version++;
    }

    updateMatrix () {

		this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

	}

    dispose () {

		this.fire( { type: 'dispose' } );

	}

}

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

export { Texture };