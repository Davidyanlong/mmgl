import { Sphere } from '../maths/Sphere.js';
import { Ray } from '../maths/Ray.js';
import { Matrix4 } from '../maths/Matrix4.js';
import { Object3D } from '../core/Object3D.js';
import { Vector3 } from '../maths/Vector3.js';
import { LineBasicMaterial } from '../materials/LineBasicMaterial.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { LinesMode } from '../constants';


/**
 * @class  线条
 * @description 线条对象
 * @author bujue
 */

class Line extends Object3D {
    constructor(geometry, material) {
        super();
        this.type = 'Line';

        this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
        this.material = material !== undefined ? material : new LineBasicMaterial({ color: Math.random() * 0xffffff });
        this.isLine = true;
        this.drawMode = LinesMode;

        if (this.material.isLineDashedMaterial) {
            this.computeLineDistances();
        }

    }

    setDrawMode(value) {
        this.drawMode = value;
    }

    computeLineDistances() {
        computeLineDistances.call(this);
    }

    raycast(raycaster, intersects) {
        raycast.call(this, raycaster, intersects)
    }

}

let computeLineDistances = (function () {

    var start = new Vector3();
    var end = new Vector3();

    return function computeLineDistances() {

        var geometry = this.geometry;

        if (geometry.isBufferGeometry) {

            // we assume non-indexed geometry

            if (geometry.index === null) {

                var positionAttribute = geometry.attributes.position;
                var lineDistances = [];

                for (var i = 0, l = positionAttribute.count; i < l; i += 2) {

                    start.fromBufferAttribute(positionAttribute, i);
                    end.fromBufferAttribute(positionAttribute, i + 1);

                    lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
                    lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);

                }

                geometry.addAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));

            } 

        } else if (geometry.isGeometry) {

            var vertices = geometry.vertices;
            var lineDistances = geometry.lineDistances;

            for (var i = 0, l = vertices.length; i < l; i += 2) {

                start.copy(vertices[i]);
                end.copy(vertices[i + 1]);

                lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
                lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);

            }


        }

        return this;

    };

})()


let raycast = (function () {

    var inverseMatrix = new Matrix4();
    var ray = new Ray();
    var sphere = new Sphere();

    return function raycast(raycaster, intersects) {

        var precision = raycaster.linePrecision;
        var precisionSq = precision * precision;

        var geometry = this.geometry;
        var matrixWorld = this.matrixWorld;

        // Checking boundingSphere distance to ray

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        sphere.copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);

        if (raycaster.ray.intersectsSphere(sphere) === false) return;

        //

        inverseMatrix.getInverse(matrixWorld);
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

        var vStart = new Vector3();
        var vEnd = new Vector3();
        var interSegment = new Vector3();
        var interRay = new Vector3();
        var step =  1;

        if (geometry.isBufferGeometry) {

            var index = geometry.index;
            var attributes = geometry.attributes;
            var positions = attributes.position.array;

            if (index !== null) {

                var indices = index.array;

                for (var i = 0, l = indices.length - 1; i < l; i += step) {

                    var a = indices[i];
                    var b = indices[i + 1];

                    vStart.fromArray(positions, a * 3);
                    vEnd.fromArray(positions, b * 3);

                    var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                    if (distSq > precisionSq) continue;

                    interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                    var distance = raycaster.ray.origin.distanceTo(interRay);

                    if (distance < raycaster.near || distance > raycaster.far) continue;

                    intersects.push({

                        distance: distance,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this

                    });

                }

            } else {

                for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {

                    vStart.fromArray(positions, 3 * i);
                    vEnd.fromArray(positions, 3 * i + 3);

                    var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                    if (distSq > precisionSq) continue;

                    interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                    var distance = raycaster.ray.origin.distanceTo(interRay);

                    if (distance < raycaster.near || distance > raycaster.far) continue;

                    intersects.push({

                        distance: distance,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this

                    });

                }

            }

        } else if (geometry.isGeometry) {

            var vertices = geometry.vertices;
            var nbVertices = vertices.length;

            for (var i = 0; i < nbVertices - 1; i += step) {

                var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);

                if (distSq > precisionSq) continue;

                interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                var distance = raycaster.ray.origin.distanceTo(interRay);

                if (distance < raycaster.near || distance > raycaster.far) continue;

                intersects.push({

                    distance: distance,
                    // What do we want? intersection point on the ray or on the segment??
                    // point: raycaster.ray.at( distance ),
                    point: interSegment.clone().applyMatrix4(this.matrixWorld),
                    index: i,
                    face: null,
                    faceIndex: null,
                    object: this

                });

            }

        }

    };

}())

export { Line };