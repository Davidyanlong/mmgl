import { InstancedBufferGeometry } from '../core/InstancedBufferGeometry';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { InstancedInterleavedBuffer } from '../core/InstancedInterleavedBuffer';
import { InterleavedBufferAttribute } from '../core/InterleavedBufferAttribute';
import { Box3 } from '../maths/Box3';
import { Vector3 } from '../maths/Vector3';
import { Sphere } from '../maths/Sphere';

class LineSegmentsGeometry extends InstancedBufferGeometry {
    constructor() {
        super();
        this.type = 'LineSegmentsGeometry';

        let positions = [- 1, 2, 0, 1, 2, 0, - 1, 1, 0, 1, 1, 0, - 1, 0, 0, 1, 0, 0, - 1, - 1, 0, 1, - 1, 0];
        let uvs = [- 1, 2, 1, 2, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 2, 1, - 2];
        let index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];

        this.setIndex(index);
        this.addAttribute('position', new Float32BufferAttribute(positions, 3));
        this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        this.isLineSegmentsGeometry = true;
    }

    applyMatrix(matrix) {

        let start = this.attributes.instanceStart;
        let end = this.attributes.instanceEnd;

        if (start !== undefined) {

            matrix.applyToBufferAttribute(start);

            matrix.applyToBufferAttribute(end);

            start.data.needsUpdate = true;

        }

        if (this.boundingBox !== null) {

            this.computeBoundingBox();

        }

        if (this.boundingSphere !== null) {

            this.computeBoundingSphere();

        }

        return this;

    }

    setPositions(array) {

        let instanceBuffer = getTypeArray(array); // xyz, xyz

        this.addAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz
        this.addAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz

        //默认顶点颜色为白色
        if (this.getAttribute('instanceColorStart') === undefined &&
            this.getAttribute('instanceColorEnd') === undefined) {

            let colors = array.map(() => {
                return 1.0;
            });
            setColors.call(this, colors);
        }

        this.computeBoundingBox();
        this.computeBoundingSphere();

        return this;

    }

    setColors(array) {
        return setColors.call(this, array);
    }

    computeBoundingBox() {

        computeBoundingBox.call(this);

    }

    computeBoundingSphere() {
        computeBoundingSphere.call(this);
    }

}

let setColors = function (array) {

    let instanceColorBuffer = getTypeArray(array);

    this.addAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb
    this.addAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

    return this;
}

let computeBoundingBox = (function () {

    let box = new Box3();

    return function computeBoundingBox() {

        if (this.boundingBox === null) {

            this.boundingBox = new Box3();

        }

        let start = this.attributes.instanceStart;
        let end = this.attributes.instanceEnd;

        if (start !== undefined && end !== undefined) {

            this.boundingBox.setFromBufferAttribute(start);

            box.setFromBufferAttribute(end);

            this.boundingBox.union(box);

        }

    };

})();

let computeBoundingSphere = (function () {

    let vector = new Vector3();

    return function computeBoundingSphere() {

        if (this.boundingSphere === null) {

            this.boundingSphere = new Sphere();

        }

        if (this.boundingBox === null) {

            this.computeBoundingBox();

        }

        var start = this.attributes.instanceStart;
        var end = this.attributes.instanceEnd;

        if (start !== undefined && end !== undefined) {

            var center = this.boundingSphere.center;

            this.boundingBox.getCenter(center);

            var maxRadiusSq = 0;

            for (var i = 0, il = start.count; i < il; i++) {

                vector.fromBufferAttribute(start, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

                vector.fromBufferAttribute(end, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

            }

            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

            if (isNaN(this.boundingSphere.radius)) {

                console.error('LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);

            }

        }

    };

})()


function getTypeArray(array) {

    let typeArray;

    if (array instanceof Float32Array) {

        typeArray = array;

    } else if (Array.isArray(array)) {

        typeArray = new Float32Array(array);

    }

    return new InstancedInterleavedBuffer(typeArray, 6, 1);

}

export { LineSegmentsGeometry };


