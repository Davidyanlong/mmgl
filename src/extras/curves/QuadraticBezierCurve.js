import { Curve } from '../core/Curve.js';
import { QuadraticBezier } from '../core/Interpolations.js';
import { Vector2 } from '../../maths/Vector2.js';


class QuadraticBezierCurve extends Curve {

    constructor(v0, v1, v2) {

        super();

        this.type = 'QuadraticBezierCurve';

        this.v0 = v0 || new Vector2();
        this.v1 = v1 || new Vector2();
        this.v2 = v2 || new Vector2();

    }

    get isQuadraticBezierCurve() {
        return true;
    }


    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector2();

        var v0 = this.v0, v1 = this.v1, v2 = this.v2;

        point.set(
            QuadraticBezier(t, v0.x, v1.x, v2.x),
            QuadraticBezier(t, v0.y, v1.y, v2.y)
        );

        return point;

    }

    copy(source) {

        super.copy(source);

        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);

        return this;

    }

}


export { QuadraticBezierCurve };
