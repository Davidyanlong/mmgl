import { LineBasicMaterial } from "./LineBasicMaterial";


class LineDashedMaterial extends LineBasicMaterial {
    constructor(parameters) {
        super();

        this.type = 'LineDashedMaterial';

        //以下三个参数的配置与顶点数据的大小有关 

        this.scale = 1;        //虚线整体的缩放 
        this.dashSize = 3;     //虚线点的长度  
        this.gapSize = 1;      //虚线间距的大小

        this.setValues(parameters);

    }

    get isLineDashedMaterial() {
        return true;
    }

    copy(source) {

        super.copy(source);
        this.scale = source.scale;
        this.dashSize = source.dashSize;
        this.gapSize = source.gapSize;

        return this;
    }
}


export { LineDashedMaterial };