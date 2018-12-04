import { Path } from './Path.js';
import { _Math } from '../../maths/Math.js';

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/

// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.

class Shape extends Path {
    constructor(points) {

        super(points);

        //this.uuid = _Math.generateUUID();

        this.type = 'Shape';

        this.holes = [];

    }
    getPointsHoles(divisions) {

        var holesPts = [];

        for (var i = 0, l = this.holes.length; i < l; i++) {

            holesPts[i] = this.holes[i].getPoints(divisions);

        }

        return holesPts;

    }

    // get points of shape and holes (keypoints based on segments parameter)

    extractPoints(divisions) {

        return {

            shape: this.getPoints(divisions),
            holes: this.getPointsHoles(divisions)

        };

    }
    copy(source) {

        super.copy(source);

        this.holes = [];

        for (var i = 0, l = source.holes.length; i < l; i++) {

            var hole = source.holes[i];

            this.holes.push(hole.clone());

        }

        return this;

    }
}




export { Shape };
