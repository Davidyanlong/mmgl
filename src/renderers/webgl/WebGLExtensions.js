class WebGLExtensions {
    constructor(gl) {
        this._gl = gl;
        this.extensions = {};
    }
    get(name) {
        let _extension = this.extensions[name];
        if (_extension !== undefined) {
            return _extension;
        }

        _extension = this._gl.getExtension(name);

        if (_extension === null) {
            console.warn('WebGLRenderer: ' + name + ' extension not supported.');
        }

        this.extensions[name] = _extension;

        return _extension;


    }
}

export { WebGLExtensions };