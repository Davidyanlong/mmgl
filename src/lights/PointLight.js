import { Light } from "./Light";


class PointLight extends Light {
    constructor(color, intensity, distance, decay) {
        super(color, intensity);
        this.type = 'PointLight';

        this.distance = (distance !== undefined) ? distance : 0;
        this.decay = (decay !== undefined) ? decay : 1;	// for physically correct lights, should be 2.

        this.isPointLight = true;
    }
    // intensity = power per solid angle.
    // ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
    get power() {
        return this.intensity * 4 * Math.PI;
    }
    set power(power) {

        this.intensity = power / (4 * Math.PI);

    }

}

export { PointLight };