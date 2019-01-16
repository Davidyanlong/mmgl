import { Vector3 } from './Vector3';
import { Line3 } from './Line3';
import { Plane } from './Plane';

var v = new Vector3();

var v0 = new Vector3();
var v1 = new Vector3();
var v2 = new Vector3();

var v4 = new Vector3();

var v5 = new Vector3();
var v6 = new Vector3();

var plane = new Plane();
var edgeList = [new Line3(), new Line3(), new Line3()];
var projectedPoint = new Vector3();
var closestPoint = new Vector3();


class Triangle {
    constructor(a, b, c) {
        this.a = (a !== undefined) ? a : new Vector3();
        this.b = (b !== undefined) ? b : new Vector3();
        this.c = (c !== undefined) ? c : new Vector3();
    }



    set(a, b, c) {

        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);

        return this;

    }

    setFromPointsAndIndices(points, i0, i1, i2) {

        this.a.copy(points[i0]);
        this.b.copy(points[i1]);
        this.c.copy(points[i2]);

        return this;

    }

    clone() {

        return new this.constructor().copy(this);

    }

    copy(triangle) {

        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);

        return this;

    }

    // based on: http://www.blackpawn.com/texts/pointinpoly/default.html


    area() {

        v5.subVectors(this.c, this.b);
        v6.subVectors(this.a, this.b);

        return v5.cross(v6).length() * 0.5;

    }

    midpoint(optionalTarget) {

        var result = optionalTarget || new Vector3();
        return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);

    }

    normal(optionalTarget) {

        return Triangle.normal(this.a, this.b, this.c, optionalTarget);

    }

    plane(optionalTarget) {

        var result = optionalTarget || new Plane();

        return result.setFromCoplanarPoints(this.a, this.b, this.c);

    }

    barycoordFromPoint(point, optionalTarget) {

        return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);

    }

    containsPoint(point) {

        return Triangle.containsPoint(point, this.a, this.b, this.c);

    }

    closestPointToPoint(point, optionalTarget) {

        var result = optionalTarget || new Vector3();
        var minDistance = Infinity;

        // project the point onto the plane of the triangle

        plane.setFromCoplanarPoints(this.a, this.b, this.c);
        plane.projectPoint(point, projectedPoint);

        // check if the projection lies within the triangle

        if (this.containsPoint(projectedPoint) === true) {

            // if so, this is the closest point

            result.copy(projectedPoint);

        } else {

            // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices

            edgeList[0].set(this.a, this.b);
            edgeList[1].set(this.b, this.c);
            edgeList[2].set(this.c, this.a);

            for (var i = 0; i < edgeList.length; i++) {

                edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);

                var distance = projectedPoint.distanceToSquared(closestPoint);

                if (distance < minDistance) {

                    minDistance = distance;

                    result.copy(closestPoint);

                }

            }

        }

        return result;

    }

    equals(triangle) {

        return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);

    }


}

let getUV = (function () {

    var barycoord = new Vector3();

    return function getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {

        this.getBarycoord(point, p1, p2, p3, barycoord);

        target.set(0, 0);
        target.addScaledVector(uv1, barycoord.x);
        target.addScaledVector(uv2, barycoord.y);
        target.addScaledVector(uv3, barycoord.z);

        return target;

    };

})();
let getBarycoord = (function () {

    var v0 = new Vector3();
    var v1 = new Vector3();
    var v2 = new Vector3();

    return function getBarycoord(point, a, b, c, target) {

        v0.subVectors(c, a);
        v1.subVectors(b, a);
        v2.subVectors(point, a);

        var dot00 = v0.dot(v0);
        var dot01 = v0.dot(v1);
        var dot02 = v0.dot(v2);
        var dot11 = v1.dot(v1);
        var dot12 = v1.dot(v2);

        var denom = (dot00 * dot11 - dot01 * dot01);

        if (target === undefined) {

            console.warn('Triangle: .getBarycoord() target is now required');
            target = new Vector3();

        }

        // collinear or singular triangle
        if (denom === 0) {

            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return target.set(- 2, - 1, - 1);

        }

        var invDenom = 1 / denom;
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // barycentric coordinates must always sum to 1
        return target.set(1 - u - v, v, u);

    };

}());

Triangle.getUV = (point, p1, p2, p3, uv1, uv2, uv3, target) => {
    return getUV.call(Triangle, point, p1, p2, p3, uv1, uv2, uv3, target)
}

Triangle.getBarycoord = (point, a, b, c, target) => {
    return getBarycoord.call(Triangle, point, a, b, c, target)
}
Triangle.normal = (a, b, c, optionalTarget) => {

    var result = optionalTarget || new Vector3();

    result.subVectors(c, b);
    v.subVectors(a, b);
    result.cross(v);

    var resultLengthSq = result.lengthSq();
    if (resultLengthSq > 0) {

        return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));

    }

    return result.set(0, 0, 0);

}

Triangle.getNormal = (a, b, c, target) => {
    return getNormal.call(Triangle, a, b, c, target);
}


// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
Triangle.barycoordFromPoint = (point, a, b, c, optionalTarget) => {

    v0.subVectors(c, a);
    v1.subVectors(b, a);
    v2.subVectors(point, a);

    var dot00 = v0.dot(v0);
    var dot01 = v0.dot(v1);
    var dot02 = v0.dot(v2);
    var dot11 = v1.dot(v1);
    var dot12 = v1.dot(v2);

    var denom = (dot00 * dot11 - dot01 * dot01);

    var result = optionalTarget || new Vector3();

    // collinear or singular triangle
    if (denom === 0) {

        // arbitrary location outside of triangle?
        // not sure if this is the best idea, maybe should be returning undefined
        return result.set(- 2, - 1, - 1);

    }

    var invDenom = 1 / denom;
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // barycentric coordinates must always sum to 1
    return result.set(1 - u - v, v, u);

}

Triangle.containsPoint = (point, a, b, c) => {

    var result = Triangle.barycoordFromPoint(point, a, b, c, v4);

    return (result.x >= 0) && (result.y >= 0) && ((result.x + result.y) <= 1);

}


let getNormal = (function () {

    var v0 = new Vector3();

    return function getNormal(a, b, c, target) {

        if (target === undefined) {

            console.warn('THREE.Triangle: .getNormal() target is now required');
            target = new Vector3();

        }

        target.subVectors(c, b);
        v0.subVectors(a, b);
        target.cross(v0);

        var targetLengthSq = target.lengthSq();
        if (targetLengthSq > 0) {

            return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));

        }

        return target.set(0, 0, 0);

    };

}())

export { Triangle }