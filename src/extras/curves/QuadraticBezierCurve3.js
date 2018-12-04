import { Curve } from '../core/Curve.js';
import { QuadraticBezier } from '../core/Interpolations.js';
import { Vector3 } from '../../maths/Vector3.js';


class QuadraticBezierCurve3 extends Curve {

    constructor(v0, v1, v2) {

        super();

        this.type = 'QuadraticBezierCurve3';

        this.v0 = v0 || new Vector3();
        this.v1 = v1 || new Vector3();
        this.v2 = v2 || new Vector3();

    }

    get isQuadraticBezierCurve3() {
        return true;
    }


    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector3();

        var v0 = this.v0, v1 = this.v1, v2 = this.v2;

        point.set(
            QuadraticBezier(t, v0.x, v1.x, v2.x),
            QuadraticBezier(t, v0.y, v1.y, v2.y),
            QuadraticBezier(t, v0.z, v1.z, v2.z)
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


export { QuadraticBezierCurve3 };
