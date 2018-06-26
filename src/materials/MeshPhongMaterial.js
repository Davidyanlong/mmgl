import { Color } from '../maths/Color'
import { Material } from "./Material";

class MeshPhongMaterial extends Material {
    constructor(parameters) {

        super();

        this.type = 'MeshPhongMaterial';

        this.color = new Color(0xffffff); // diffuse
        //高亮的颜色 todo:目前测试没有效果
        this.specular = new Color(0x111111);

        //设置亮度
        this.shininess = 30;

        this.map = null;

        //设置放射光颜色
        this.emissive = new Color(0x000000);
        //设置放射光贴图强度
        this.emissiveIntensity = 1.0;


        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.setValues(parameters);

        this.isMeshPhongMaterial = true;


    }

    copy(source) {
        super.copy(source);

        this.color.copy(source.color);
        this.specular.copy(source.specular);
        this.shininess = source.shininess;

        this.map = source.map;

        this.emissive.copy(source.emissive);
        this.emissiveIntensity = source.emissiveIntensity;

        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;

        return this;
    }
}

export { MeshPhongMaterial };