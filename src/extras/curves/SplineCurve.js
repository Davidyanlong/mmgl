import { Curve } from '../core/Curve.js';
import { CatmullRom } from '../core/Interpolations.js';
import { Vector2 } from '../../maths/Vector2.js';


class SplineCurve extends Curve {

    constructor(points /* array of Vector2 */) {

        super();

        this.type = 'SplineCurve';

        this.points = points || [];

    }

    get isSplineCurve() {
        return true;
    }

    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector2();

        var points = this.points;
        var p = (points.length - 1) * t;

        var intPoint = Math.floor(p);
        var weight = p - intPoint;

        var p0 = points[intPoint === 0 ? intPoint : intPoint - 1];
        var p1 = points[intPoint];
        var p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1];
        var p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];

        point.set(
            CatmullRom(weight, p0.x, p1.x, p2.x, p3.x),
            CatmullRom(weight, p0.y, p1.y, p2.y, p3.y)
        );

        return point;

    }

    copy(source) {

        super.copy(source);

        this.points = [];

        for (var i = 0, l = source.points.length; i < l; i++) {

            var point = source.points[i];

            this.points.push(point.clone());

        }

        return this;

    }


}


export { SplineCurve };
