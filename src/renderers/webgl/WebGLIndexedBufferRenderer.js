
class WebGLIndexedBufferRenderer {
    constructor(gl, extensions, info) {
        this._mode = gl.TRIANGLES;
        this._gl = gl;
        this._info = info;
        this._extensions = extensions;
        this._type = undefined;
        this._bytesPerElement = undefined;
    }

    setMode(value) {

        this._mode = value;

    }

    setIndex(value) {

        this._type = value.type;
        this._bytesPerElement = value.bytesPerElement;

    }

    render(start, count) {

        this._gl.drawElements(this._mode, count, this._type, start * this._bytesPerElement);

        this._info.update(count, this._mode);

    }

    renderInstances(geometry, start, count) {

        let extension = this._extensions.get('ANGLE_instanced_arrays');

        if (extension === null) {

            console.error('WebGLIndexedBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
            return;

        }

        extension.drawElementsInstancedANGLE(this._mode, count, this._type, start * this._bytesPerElement, geometry.maxInstancedCount);

        this._info.update(count, this._mode, geometry.maxInstancedCount);

    }


}
export { WebGLIndexedBufferRenderer };