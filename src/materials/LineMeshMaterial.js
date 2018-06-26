import { Material } from "./Material";
import { Color } from "../maths/Color";
import { Vector2 } from "../maths/Vector2";


class LineMeshMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = 'LineMeshMaterial';
        this.color = new Color(0xffffff);
        this.linewidth = 1;

        this.dashed = false;
        this.scale = 1;        //虚线整体的缩放 
        this.dashSize = 3;     //虚线点的长度  
        this.gapSize = 1;      //虚线间距的大小

        this.resolution = new Vector2();

        //todo 暂不需要
        this.lights = false;


        this.setValues(parameters);
        this.isLineMeshMaterial = true;
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.linewidth = source.linewidth;
        this.scale = source.scale;
        this.dashSize = source.dashSize;
        this.gapSize = source.gapSize;
        this.dashed = source.dashed;

        this.resolution.copy(source.resolution);

        return this;

    }
}

export { LineMeshMaterial };