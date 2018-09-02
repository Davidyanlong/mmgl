import { Material } from "./Material";
import { Color } from "../maths/Color";


class PointsMaterial extends Material {
    constructor(parameters) {
        super();

        this.type = 'PointsMaterial';
        this.color = new Color(0xffffff);

        this.map = null;
        //点的大小
        this.size = 1;
        //启用/禁用随距离而发生尺寸衰减
        this.sizeAttenuation = true;
        //不接受灯光
        this.lights = false;

        this.setValues(parameters);

        this.isPointsMaterial = true;

    }

    get isPointsMaterial() {
        return true;
    }

    copy(source) {
        super.copy(source);
        this.color.copy(source.color);

        this.map = source.map;

        this.size = source.size;
        this.sizeAttenuation = source.sizeAttenuation;

        return this;
    }
}

export { PointsMaterial };
