import { Vector2 } from '../maths/Vector2.js';
import { Vector3 } from '../maths/Vector3.js';
import { Object3D } from '../core/Object3D.js';
import { SpriteMaterial } from '../materials/SpriteMaterial.js';

class Sprite extends Object3D {

    constructor(material) {
        super();
        this.type = 'Sprite';

        this.material = (material !== undefined) ? material : new SpriteMaterial();

        this.center = new Vector2(0.5, 0.5);
        this.isSprite = true;
    }

    raycast(raycaster, intersects) {
        raycast.call(this, raycaster, intersects);
    }

}

let raycast = (function () {

    var intersectPoint = new Vector3();
    var worldPosition = new Vector3();
    var worldScale = new Vector3();

    return function raycast(raycaster, intersects) {

        worldPosition.setFromMatrixPosition(this.matrixWorld);
        raycaster.ray.closestPointToPoint(worldPosition, intersectPoint);

        worldScale.setFromMatrixScale(this.matrixWorld);
        var guessSizeSq = worldScale.x * worldScale.y / 4;

        if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq) return;

        var distance = raycaster.ray.origin.distanceTo(intersectPoint);

        if (distance < raycaster.near || distance > raycaster.far) return;

        intersects.push({

            distance: distance,
            point: intersectPoint.clone(),
            face: null,
            object: this

        });

    };

}())

export { Sprite };