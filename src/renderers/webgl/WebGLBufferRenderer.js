
class WebGLBufferRenderer {
    constructor(gl, extensions,info) {
        this._mode = gl.TRIANGLES;
        this._gl = gl;
        this._info = info;
        this._extensions = extensions;
    }
    setMode(value) {

        this._mode = value;

    }

    render(start, count) {

        this._gl.drawArrays(this._mode, start, count);
        this._info.update(count, this._mode);
    }

    renderInstances( geometry, start, count ) {

		let extension = this._extensions.get( 'ANGLE_instanced_arrays' );

		if ( extension === null ) {

			console.error( 'WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
			return;

		}

		this._extension.drawArraysInstancedANGLE( mode, start, count, geometry.maxInstancedCount );

		this._info.update( count, this._mode, geometry.maxInstancedCount );

	}

}
export { WebGLBufferRenderer };