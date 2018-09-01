import { Mesh } from "./Mesh";
import { Vector3 } from '../maths/Vector3';
import { InterleavedBufferAttribute } from '../core/InterleavedBufferAttribute';
import { InstancedInterleavedBuffer } from '../core/InstancedInterleavedBuffer';


class Line2 extends Mesh {
    constructor(geometry, material) {

        super(geometry, material);

        this.geometry = geometry !== undefined ? geometry : new THREE.LineGeometry();
        this.material = material !== undefined ? material : new THREE.LineMaterial({ color: Math.random() * 0xffffff });
    }
    
    get isLine2() {
        return true;
    }

    computeLineDistances() {
        computeLineDistances.call(this);
    }

}

let computeLineDistances = (function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

    var start = new Vector3();
    var end = new Vector3();

    return function computeLineDistances() {

        var geometry = this.geometry;

        var instanceStart = geometry.attributes.instanceStart;
        var instanceEnd = geometry.attributes.instanceEnd;
        var lineDistances = new Float32Array(2 * instanceStart.data.count);

        for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++ , j += 2) {

            start.fromBufferAttribute(instanceStart, i);
            end.fromBufferAttribute(instanceEnd, i);

            lineDistances[j] = (j === 0) ? 0 : lineDistances[j - 1];
            lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);

        }

        var instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

        geometry.addAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0
        geometry.addAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

        return this;

    };

}());

export { Line2 };