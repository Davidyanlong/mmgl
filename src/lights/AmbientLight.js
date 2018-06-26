import { Light } from "./Light";


class AmbientLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
        this.type = 'AmbientLight';
        this.isAmbientLight = true;
    }
}

export { AmbientLight };