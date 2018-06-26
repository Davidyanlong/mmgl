import { Camera } from "./Camera";
import { _Math } from '../maths/Math';

/**
 * @class 透视相机
 * @author bujue
 */

class PerspectiveCamera extends Camera {
    constructor(fov, aspect, near, far) {
        super();

        this.type = 'PerspectiveCamera';

        this.fov = fov !== undefined ? fov : 50;
        this.zoom = 1;

        this.near = near !== undefined ? near : 0.1;
        this.far = far !== undefined ? far : 2000;
        this.focus = 10;

        this.aspect = aspect !== undefined ? aspect : 1;
        this.view = null;


        this.updateProjectionMatrix();

        this.isPerspectiveCamera = true;
    }

    updateProjectionMatrix() {

        var near = this.near,
            top = near * Math.tan(
                _Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
            height = 2 * top,
            width = this.aspect * height,
            left = - 0.5 * width,
            view = this.view;

        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);

    }
}


export { PerspectiveCamera };