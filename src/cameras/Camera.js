import { Object3D } from '../core/Object3D';
import { Matrix4 } from '../maths/Matrix4';
import { Quaternion } from '../maths/Quaternion'
import { Vector3 } from '../maths/Vector3';


class Camera extends Object3D {
    constructor() {
        super();

        //viewMatrix
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();

        this.isCamera = true;
    }

    updateMatrixWorld(force) {

        super.updateMatrixWorld(force);

        this.matrixWorldInverse.getInverse(this.matrixWorld);

    }

    getWorldDirection(target) {
        return getWorldDirection.call(this, target);
    }


}

let getWorldDirection = (function () {

    let quaternion = new Quaternion();

    return function getWorldDirection(target) {

        if (target === undefined) {

            console.warn('Camera: .getWorldDirection() target is now required');
            target = new Vector3();

        }

        this.getWorldQuaternion(quaternion);

        return target.set(0, 0, - 1).applyQuaternion(quaternion);

    };

})()

export { Camera };


