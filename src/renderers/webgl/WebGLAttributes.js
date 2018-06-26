
/**
 * @class WebGLAttributes
 * @description 根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
 *              获取Buffer 更新(创建)buffer  删除buffer
 * @author bujue
 */

class WebGLAttributes {

    constructor(gl) {
        this._buffers = new WeakMap();
        this.gl = gl;
    }

    //attribute 对象为BufferAttribute 的实例对象
    //bufferType的值为 gl.ARRAY_BUFFER  或 gl.ELEMENT_ARRAY_BUFFER
    createBuffer(attribute, bufferType) {
        let gl = this.gl;
        let array = attribute.array;
        let usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

        let buffer = gl.createBuffer();

        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, array, usage);

        attribute.onUploadCallback();

        let type = typeArray2GLType(gl, array);

        return {
            buffer,
            type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version
        };

    }

    updateBuffer(buffer, attribute, bufferType) {
        let gl = this.gl;
        let array = attribute.array;
        let updateRange = attribute.updateRange;

        gl.bindBuffer(bufferType, buffer);

        if (attribute.dynamic === false) {

            gl.bufferData(bufferType, array, gl.STATIC_DRAW);

        } else if (updateRange.count === - 1) {

            // Not using update ranges

            gl.bufferSubData(bufferType, 0, array);

        } else if (updateRange.count === 0) {

            console.error('WebGLObjects.updateBuffer: dynamic BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');

        } else {

            gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
                array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

            updateRange.count = - 1; // reset range

        }

    }


    get(attribute) {

        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

        return this._buffers.get(attribute);

    }

    remove(attribute) {
        let gl = this.gl;
        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

        let data = this._buffers.get(attribute);

        if (data) {

            gl.deleteBuffer(data.buffer);

            this._buffers.delete(attribute);

        }

    }

    update(attribute, bufferType) {

        if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

        let data = this._buffers.get(attribute);

        if (data === undefined) {

            this._buffers.set(attribute, this.createBuffer(attribute, bufferType));

        } else if (data.version < attribute.version) {

            this.updateBuffer(data.buffer, attribute, bufferType);

            data.version = attribute.version;

        }

    }
}

//todo 如果其他地方也用到同样的操作可以提取到WebGLUtils类中
function typeArray2GLType(gl, array) {

    let type = gl.FLOAT;

    if (array instanceof Float32Array) {

        type = gl.FLOAT;

    } else if (array instanceof Float64Array) {

        console.warn('WebGLAttributes: Unsupported data buffer format: Float64Array.');

    } else if (array instanceof Uint16Array) {

        type = gl.UNSIGNED_SHORT;

    } else if (array instanceof Int16Array) {

        type = gl.SHORT;

    } else if (array instanceof Uint32Array) {

        type = gl.UNSIGNED_INT;

    } else if (array instanceof Int32Array) {

        type = gl.INT;

    } else if (array instanceof Int8Array) {

        type = gl.BYTE;

    } else if (array instanceof Uint8Array) {

        type = gl.UNSIGNED_BYTE;

    }
    return type;
}

export { WebGLAttributes };