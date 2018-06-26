import { Uint16BufferAttribute, Uint32BufferAttribute } from '../../core/BufferAttribute.js';
import { BufferGeometry } from '../../core/BufferGeometry.js';
import { _Math } from '../../maths/Math';

/**
 * @class WebGLGeometries
 * @description 将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
 * @author bujue
 */

class WebGLGeometries {
    constructor(gl, attributes, info) {
        this._gl = gl;
        this._geometries = {};
        this._attributes = attributes;
        this._info = info;
        this._wireframeAttributes = {}

    }


    get(object, geometry) {

        let buffergeometry = this._geometries[geometry.id];

        if (buffergeometry) return buffergeometry;

        geometry.on('dispose', onGeometryDispose.bind(this));

        if (geometry.isBufferGeometry) {

            buffergeometry = geometry;

        } else if (geometry.isGeometry) {

            if (geometry._bufferGeometry === undefined) {

                geometry._bufferGeometry = new BufferGeometry().setFromObject(object);

            }

            buffergeometry = geometry._bufferGeometry;

        }

        this._geometries[geometry.id] = buffergeometry;

        this._info.memory.geometries++;

        return buffergeometry;

    }

    update(geometry) {

        let gl = this._gl;
        let index = geometry.index;
        let geometryAttributes = geometry.attributes;

        if (index !== null) {

            this._attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);

        }

        for (let name in geometryAttributes) {

            this._attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);

        }

        // todo morph targets 暂时不开发


    }
    getWireframeAttribute(geometry) {

        let gl = this._gl;
        let arrayMax = _Math.arrayMax;
        let attribute = this._wireframeAttributes[geometry.id];

        if (attribute) return attribute;

        let indices = [];

        let geometryIndex = geometry.index;
        let geometryAttributes = geometry.attributes;

        // console.time( 'wireframe' );

        if (geometryIndex !== null) {

            let array = geometryIndex.array;

            for (let i = 0, l = array.length; i < l; i += 3) {

                let a = array[i + 0];
                let b = array[i + 1];
                let c = array[i + 2];

                indices.push(a, b, b, c, c, a);

            }

        } else {

            let array = geometryAttributes.position.array;

            for (let i = 0, l = (array.length / 3) - 1; i < l; i += 3) {

                let a = i + 0;
                let b = i + 1;
                let c = i + 2;

                indices.push(a, b, b, c, c, a);

            }

        }

        // console.timeEnd( 'wireframe' );

        attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);

        this._attributes.update(attribute, gl.ELEMENT_ARRAY_BUFFER);

        this._wireframeAttributes[geometry.id] = attribute;

        return attribute;

    }
}

function onGeometryDispose(event) {

    let geometry = event.target;
    let buffergeometry = this._geometries[geometry.id];
    if (!buffergeometry) return;

    if (buffergeometry.index !== null) {

        this._attributes.remove(buffergeometry.index);

    }

    for (let name in buffergeometry.attributes) {

        this._attributes.remove(buffergeometry.attributes[name]);

    }

    geometry.off('dispose', onGeometryDispose);

    delete this._geometries[geometry.id];

    // TODO Remove duplicate code

    let attribute = this._wireframeAttributes[geometry.id];

    if (attribute) {

        this._attributes.remove(attribute);
        delete this._wireframeAttributes[geometry.id];

    }

    // attribute = this._wireframeAttributes[buffergeometry.id];

    // if (attribute) {

    //     this._attributes.remove(attribute);
    //     delete this._wireframeAttributes[buffergeometry.id];

    // }

    //

    this._info.memory.geometries--;

}

export { WebGLGeometries };