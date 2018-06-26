import { Material } from "./Material";
import { Color } from "..";

class SpriteMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = 'SpriteMaterial';

        this.color = new Color(0xffffff);
        this.map = null;

        //纹理旋转角度
        this.rotation = 0;
        //不接受灯光
        this.lights = false;

        this.setValues(parameters);
        this.isSpriteMaterial = true;

    }

    copy(source) {
        super.copy(source);

        this.color.copy(source.color);
        this.map = source.map;

        this.rotation = source.rotation;

        return this;
    }

}
export { SpriteMaterial };