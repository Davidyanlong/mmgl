import { Light } from "./Light";


class AmbientLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
        this.type = 'AmbientLight';
    }
    get isAmbientLight() {
        return true;
    }
}

export { AmbientLight };