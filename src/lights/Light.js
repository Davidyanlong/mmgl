import { Object3D } from '../core/Object3D';
import { Color } from '../maths/Color';

class Light extends Object3D {
    constructor(color, intensity) {
        super();
        this.type = 'Light';

        this.color = new Color(color);
        this.intensity = intensity !== undefined ? intensity : 1;

    }
    get isLight() {
        return true;
    }

}

export { Light };