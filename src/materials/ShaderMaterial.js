import { Material } from "./Material";


class ShaderMaterial extends Material {
    constructor(parameters) {
        super();

        this.type = 'ShaderMaterial';

        this.defines = {};
        this.uniforms = {};

        this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
        this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

        this.linewidth = 1;

        this.wireframe = false;
        this.wireframeLinewidth = 1;

        this.lights = false;

        // When rendered geometry doesn't include these attributes but the material does,
        // use these default values in WebGL. This avoids errors when buffer data is missing.
        this.defaultAttributeValues = {
            'color': [1, 1, 1],
            'uv': [0, 0],
            'uv2': [0, 0]
        };

        this.index0AttributeName = undefined;
        this.uniformsNeedUpdate = false;

        if (parameters !== undefined) {

            if (parameters.attributes !== undefined) {

                console.error('ShaderMaterial: attributes should now be defined in BufferGeometry instead.');

            }

            this.setValues(parameters);

        }

    }

    get isShaderMaterial(){
        return true;
    }

    copy(source) {

        super.copy(source);
        this.fragmentShader = source.fragmentShader;
        this.vertexShader = source.vertexShader;

        this.uniforms = UniformsUtils.clone(source.uniforms);

        this.defines = Object.assign({}, source.defines);

        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;

        this.lights = source.lights;

        return this;


    }

}

export { ShaderMaterial }