
import { Events } from './Events';

import { Vector3 } from '../maths/Vector3';
import { Matrix4 } from '../maths/Matrix4';
import { Euler } from '../maths/Euler';
import { Matrix3 } from '../maths/Matrix3';
import { _Math } from '../maths/Math';
import { Quaternion } from '../maths/Quaternion';

/**
 * @class Object3D 三维对象的基类
 * @description 实现三维对象的的一些基本操作
 * @author bujue
 */
let object3DId = 0;
class Object3D extends Events {

    constructor() {
        super();
        Object.defineProperty(this, 'id', { value: object3DId++ });

        this.parent = null;
        this.children = [];


        this.up = Object3D.DefaultUp.clone();

        let position = new Vector3();
        let rotation = new Euler();
        let quaternion = new Quaternion();
        let scale = new Vector3(1, 1, 1);

        function onRotationChange() {

            quaternion.setFromEuler(rotation, false);

        }

        function onQuaternionChange() {

            rotation.setFromQuaternion(quaternion, undefined, false);

        }

        rotation.onChange(onRotationChange);
        quaternion.onChange(onQuaternionChange);

        Object.defineProperties(this, {
            position: {
                enumerable: true,
                value: position
            },
            rotation: {
                enumerable: true,
                value: rotation
            },
            quaternion: {
                enumerable: true,
                value: quaternion
            },
            scale: {
                enumerable: true,
                value: scale
            },
            modelViewMatrix: {
                value: new Matrix4()
            },
            normalMatrix: {
                value: new Matrix3()
            }
        });


        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();

        this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
        this.matrixWorldNeedsUpdate = false;

        this.visible = true;

        this.castShadow = false;
        this.receiveShadow = false;

        this.frustumCulled = true;
        this.renderOrder = 0;

        this.userData = {};

    }

    get isObject3D() {
        return true;
    }

    onBeforeRender(renderer, scene, camera, geometry, material, group) {
        //继承实现 渲染前调用
    }
    onAfterRender(renderer, scene, camera, geometry, material, group) {
        //继承实现 渲染后调用
    }

    applyMatrix(matrix) {

        this.matrix.multiplyMatrices(matrix, this.matrix);

        this.matrix.decompose(this.position, this.quaternion, this.scale);

    }

    lookAt(x, y, z) {

        lookAt.call(this, x, y, z);
    }


    add(object) {
        if (arguments.length > 1) {

            for (let i = 0; i < arguments.length; i++) {

                this.add(arguments[i]);

            }

            return this;

        }

        if (object === this) {

            console.error("Object3D.add: object can't be added as a child of itself.", object);
            return this;

        }

        if ((object && object.isObject3D)) {

            if (object.parent !== null) {

                object.parent.remove(object);

            }

            object.parent = this;

            object.fire({ type: 'added' });

            this.children.push(object);

        } else {

            console.error("Object3D.add: object not an instance of Object3D.", object);

        }

        return this;
    }

    remove(object) {

        if (arguments.length > 1) {

            for (let i = 0; i < arguments.length; i++) {

                this.remove(arguments[i]);

            }

            return this;

        }

        let index = this.children.indexOf(object);

        if (index !== - 1) {

            object.parent = null;

            object.fire({ type: 'removed' });

            this.children.splice(index, 1);

        }

        return this;
    }

    traverse(callback) {

        callback(this);

        let children = this.children;

        for (let i = 0, l = children.length; i < l; i++) {

            children[i].traverse(callback);

        }

    }


    updateMatrixWorld(force) {

        if (this.matrixAutoUpdate) this.updateMatrix();

        if (this.matrixWorldNeedsUpdate || force) {

            if (this.parent === null) {

                this.matrixWorld.copy(this.matrix);

            } else {

                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

            }

            this.matrixWorldNeedsUpdate = false;

            force = true;

        }

        // update children

        let children = this.children;

        for (let i = 0, l = children.length; i < l; i++) {

            children[i].updateMatrixWorld(force);

        }

    }

    applyQuaternion(q) {

        this.quaternion.premultiply(q);

        return this;

    }

    setRotationFromAxisAngle(axis, angle) {

        // assumes axis is normalized

        this.quaternion.setFromAxisAngle(axis, angle);

    }

    setRotationFromEuler(euler) {

        this.quaternion.setFromEuler(euler, true);

    }

    setRotationFromMatrix(m) {

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        this.quaternion.setFromRotationMatrix(m);

    }

    setRotationFromQuaternion(q) {

        // assumes q is normalized

        this.quaternion.copy(q);

    }

    updateMatrix() {

        this.matrix.compose(this.position, this.quaternion, this.scale);

        this.matrixWorldNeedsUpdate = true;

    }

    rotateX(angle) {

        let v1 = new Vector3(1, 0, 0);

        this.rotateOnAxis(v1, angle);

        v1 = null;

        return this;


    }

    rotateY(angle) {

        let v1 = new Vector3(0, 1, 0);

        this.rotateOnAxis(v1, angle);

        v1 = null;

        return this;



    }

    rotateZ(angle) {

        let v1 = new Vector3(0, 0, 1);

        this.rotateOnAxis(v1, angle);

        v1 = null;

        return this;

    }

    rotateOnAxis(axis, angle) {

        // rotate object on axis in object space
        // axis is assumed to be normalized

        let q1 = new Quaternion();

        q1.setFromAxisAngle(axis, angle);

        this.quaternion.multiply(q1);

        q1 = null;

        return this;
    }

    rotateOnWorldAxis(axis, angle) {

        // rotate object on axis in world space
        // axis is assumed to be normalized
        // method assumes no rotated parent

        let q1 = new Quaternion();

        q1.setFromAxisAngle(axis, angle);

        this.quaternion.premultiply(q1);

        return this;


    }

    translateOnAxis(axis, distance) {

        // translate object by distance along axis in object space
        // axis is assumed to be normalized

        let v1 = new Vector3();

        v1.copy(axis).applyQuaternion(this.quaternion);

        this.position.add(v1.multiplyScalar(distance));

        v1 = null;

        return this;

    }

    translateX(distance) {

        let v1 = new Vector3(1, 0, 0);

        this.translateOnAxis(v1, distance);

        v1 = null

        return this;


    }

    translateY(distance) {

        let v1 = new Vector3(0, 1, 0);

        this.translateOnAxis(v1, distance);

        v1 = null

        return this;

    }

    translateZ(distance) {

        let v1 = new Vector3(0, 0, 1);
        this.translateOnAxis(v1, distance);

        v1 = null

        return this;


    }

    localToWorld(vector) {
        return vector.applyMatrix4(this.matrixWorld);
    }

    worldToLocal(vector) {

        let m1 = new Matrix4();
        return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
    }
    getWorldPosition(target) {

        if (target === undefined) {

            console.warn('Object3D: .getWorldPosition() target is now required');
            target = new Vector3();

        }

        this.updateMatrixWorld(true);

        return target.setFromMatrixPosition(this.matrixWorld);

    }

    getWorldQuaternion(target) {

        return getWorldQuaternion.call(this, target)

    }

    getWorldScale(target) {

        return getWorldScale.call(this, target)

    }
    getWorldDirection(target) {
        return getWorldDirection.call(this, target);

    }

    raycast() { }

}

Object3D.DefaultUp = new Vector3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;


let lookAt = (function () {

    // This method does not support objects with rotated and/or translated parent(s)

    let m1 = new Matrix4();
    let vector = new Vector3();

    return function lookAt(x, y, z) {

        if (x.isVector3) {

            vector.copy(x);

        } else {

            vector.set(x, y, z);

        }

        if (this.isCamera) {

            m1.lookAt(this.position, vector, this.up);

        } else {

            m1.lookAt(vector, this.position, this.up);

        }

        this.quaternion.setFromRotationMatrix(m1);

    };

})()


let getWorldQuaternion = (function () {

    var position = new Vector3();
    var scale = new Vector3();

    return function getWorldQuaternion(target) {

        if (target === undefined) {

            console.warn('Object3D: .getWorldQuaternion() target is now required');
            target = new Quaternion();

        }

        this.updateMatrixWorld(true);

        this.matrixWorld.decompose(position, target, scale);

        return target;

    };

})();


let getWorldScale = (function () {

    var position = new Vector3();
    var quaternion = new Quaternion();

    return function getWorldScale(target) {

        if (target === undefined) {

            console.warn('Object3D: .getWorldScale() target is now required');
            target = new Vector3();

        }

        this.updateMatrixWorld(true);

        this.matrixWorld.decompose(position, quaternion, target);

        return target;

    };

})();

let getWorldDirection = (function () {

    var quaternion = new Quaternion();

    return function getWorldDirection(target) {

        if (target === undefined) {

            console.warn('Object3D: .getWorldDirection() target is now required');
            target = new Vector3();

        }

        this.getWorldQuaternion(quaternion);

        return target.set(0, 0, 1).applyQuaternion(quaternion);

    };

})();

export { Object3D };