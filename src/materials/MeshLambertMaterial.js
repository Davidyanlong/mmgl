import { Material } from "./Material";
import { Color } from '../maths/Color'

class MeshLambertMaterial extends Material {
    constructor(parameters) {
        super();

        this.type = 'MeshLambertMaterial';

        this.color = new Color(0xffffff); // diffuse

        this.map = null;

        //设置放射光颜色
        this.emissive = new Color(0x000000);
        //设置放射光贴图强度
        this.emissiveIntensity = 1.0;

        this.wireframe = false;
        this.wireframeLinewidth = 1;


        this.setValues(parameters);

        this.isMeshLambertMaterial = true;

    }

    copy(source) {
        super.copy(source);

        this.color.copy(source.color);

        this.map = source.map;

        this.emissive.copy(source.emissive);
        this.emissiveIntensity = source.emissiveIntensity;

        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;

        return this;
    }
}

export { MeshLambertMaterial };