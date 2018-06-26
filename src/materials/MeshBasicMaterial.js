import { Material } from "./Material";
import { Color } from "..";

class MeshBasicMaterial extends Material {
    constructor(parameters) {
        super();
        this.color = new Color(0xffffff); // emissive
        this.map = null;

        this.type = 'MeshBasicMaterial';
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.isMeshBasicMaterial = true;

        //不接受灯光
        this.lights = false;

        this.setValues(parameters);
    }

    copy(source) {
        super.copy(source);

        this.color.copy(source.color);
        this.map = source.map;
        this.wireframe = source.wireframe;

        return this;
    }
}

export { MeshBasicMaterial };