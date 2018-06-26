import { Ray } from "../maths/Ray";
import { Matrix4 } from "..";


class Raycaster {
    constructor(origin, direction, near, far) {

        //direction is assumed to be normalized (for accurate distance calculations)
        this.ray = new Ray(origin, direction);

        this.near = near || 0;
        this.far = far || Infinity;

        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: { threshold: 1 },
            Sprite: {}
        }

        this.linePrecision = 1;
    }

    set(origin, direction) {

        // direction is assumed to be normalized (for accurate distance calculations)
        this.ray.set(origin, direction);
    }

    setFromCamera(coords, camera) {

        //upproject
        let matrix1 = new Matrix4();
        matrix1.multiplyMatrices(camera.matrixWorld, matrix1.getInverse(camera.projectionMatrix));

        if ((camera && camera.isPerspectiveCamera)) {

            this.ray.origin.setFromMatrixPosition(camera.matrixWorld);

            this.ray.direction.set(coords.x, coords.y, 0.5).applyMatrix4(matrix1).sub(this.ray.origin).normalize();

        } else if ((camera && camera.isOrthographicCamera)) {

            this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).applyMatrix4(matrix1); // set origin in plane of camera
            this.ray.direction.set(0, 0, - 1).transformDirection(camera.matrixWorld);

        } else {

            console.error('Raycaster: Unsupported camera type.');

        }

    }

    intersectObject(object, recursive, optionalTarget) {

        var intersects = optionalTarget || [];

        intersectObject(object, this, intersects, recursive);

        intersects.sort(ascSort);

        return intersects;

    }

    //返回值结构 [ { distance, point, face, faceIndex, indices, object }, ... ]
    //*注意*，对于网格，面（faces）必须朝向射线原点，这样才能被检测到；通过背面的射线的交叉点将不被检测到。 为了光线投射一个对象的正反两面，你得设置 material 的 side 属性为 THREE.DoubleSide
    intersectObjects(objects, recursive, optionalTarget) {

        var intersects = optionalTarget || [];

        if (Array.isArray(objects) === false) {

            console.warn('Raycaster.intersectObjects: objects is not an Array.');
            return intersects;

        }

        for (var i = 0, l = objects.length; i < l; i++) {

            intersectObject(objects[i], this, intersects, recursive);

        }

        intersects.sort(ascSort);

        return intersects;

    }

}

function ascSort(a, b) {

    return a.distance - b.distance;

}

function intersectObject(object, raycaster, intersects, recursive) {

    if (object.visible === false) return;

    object.raycast(raycaster, intersects);

    if (recursive === true) {

        var children = object.children;

        for (var i = 0, l = children.length; i < l; i++) {

            intersectObject(children[i], raycaster, intersects, true);

        }

    }

}

export { Raycaster };