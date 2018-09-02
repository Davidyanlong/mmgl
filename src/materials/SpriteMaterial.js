import { Material } from "./Material";
import { Color } from "..";

class SpriteMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = 'SpriteMaterial';

        this.color = new Color(0xffffff);
        this.map = null;

        this.rotation = 0;

        this.sizeAttenuation = true;

        this.lights = false;
        this.transparent = true;

        this.setValues(parameters);

    }

    get isSpriteMaterial() {
        return true
    }

    copy(source) {
        super.copy(source);

        this.color.copy(source.color);
        this.map = source.map;

        this.rotation = source.rotation;

        this.sizeAttenuation = source.sizeAttenuation;

        return this;
    }

}
export { SpriteMaterial };