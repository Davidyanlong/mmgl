import { Object3D } from '../core/Object3D'

/**
 * @class 场景对象
 * @author bujue
 */


class Scene extends Object3D {
    constructor() {
        super();
        this.background=null;
        this.isScene = true;
        this.autoUpdate = true; // checked by the renderer
    }

}

export { Scene };