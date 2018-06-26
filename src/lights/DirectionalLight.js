import { Light } from "./Light";
import { Object3D } from '../core/Object3D';


class DirectionalLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
        
        this.type = 'DirectionalLight';

        this.position.copy(Object3D.DefaultUp);
        this.updateMatrix();

        this.target = new Object3D();

        this.isDirectionalLight = true;

    }
}

export { DirectionalLight };