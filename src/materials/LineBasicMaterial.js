import { Material } from "./Material";
import { Color } from "../maths/Color";


class LineBasicMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = 'LineBasicMaterial';
        this.color = new Color(0xffffff);
        this.linewidth = 1;

        //todo 暂不需要
        this.lights = false;


        this.setValues(parameters);
        this.isLineBasicMaterial = true;
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.linewidth = source.linewidth;

        return this;

    }
}

export { LineBasicMaterial };