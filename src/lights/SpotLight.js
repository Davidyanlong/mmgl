import { Light } from "./Light";
import { Object3D } from '../core/Object3D';

class SpotLight extends Light {
    constructor(color, intensity, distance, angle, penumbra, decay) {
        super(color, intensity);

        this.type = 'SpotLight';

        this.position.copy(Object3D.DefaultUp);
        this.updateMatrix();

        this.target = new Object3D();

        this.distance = (distance !== undefined) ? distance : 0;
        this.angle = (angle !== undefined) ? angle : Math.PI / 3;
        this.penumbra = (penumbra !== undefined) ? penumbra : 0;
        this.decay = (decay !== undefined) ? decay : 1;	// for physically correct lights, should be 2.

        this.isSpotLight = true;

    }

    // intensity = power per solid angle.
    // ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
    get power() {
        return this.intensity * Math.PI;
    }
    set power(power) {

        this.intensity = power / Math.PI;

    }
}

export { SpotLight };