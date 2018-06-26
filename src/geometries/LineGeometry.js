import { LineSegmentsGeometry } from './LineSegmentsGeometry';

class LineGeometry extends LineSegmentsGeometry {
    constructor() {
        super();
        this.type = 'LineGeometry';
        this.isLineGeometry = true;
    }

    setPositions(array) {

        let points = createVertexs(array);

        super.setPositions(points);

        return this;

    }

    setColors(array) {

        let colors = createVertexs(array);

        super.setColors(colors);

        return this;

    }

    fromLine(line) {

        var geometry = line.geometry;

        if (geometry.isGeometry) {

            this.setPositions(geometry.vertices);

        } else if (geometry.isBufferGeometry) {

            this.setPositions(geometry.position.array); // assumes non-indexed

        }

        // set colors, maybe

        return this;

    }

}

function createVertexs(array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
    let length = array.length - 3;
    let Vertexs = new Float32Array(2 * length);

    for (let i = 0; i < length; i += 3) {

        Vertexs[2 * i] = array[i];
        Vertexs[2 * i + 1] = array[i + 1];
        Vertexs[2 * i + 2] = array[i + 2];

        Vertexs[2 * i + 3] = array[i + 3];
        Vertexs[2 * i + 4] = array[i + 4];
        Vertexs[2 * i + 5] = array[i + 5];

    }

    return Vertexs;

}


export { LineGeometry };
