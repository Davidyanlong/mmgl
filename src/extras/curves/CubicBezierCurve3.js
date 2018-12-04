import { Curve } from '../core/Curve.js';
import { CubicBezier } from '../core/Interpolations.js';
import { Vector3 } from '../../maths/Vector3.js';


class CubicBezierCurve3 extends Curve {
    constructor(v0, v1, v2, v3) {

        super();

        this.type = 'CubicBezierCurve3';

        this.v0 = v0 || new Vector3();
        this.v1 = v1 || new Vector3();
        this.v2 = v2 || new Vector3();
        this.v3 = v3 || new Vector3();

    }
    get isCubicBezierCurve3() {
        return true;
    }
    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector3();

        var v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;

        point.set(
            CubicBezier(t, v0.x, v1.x, v2.x, v3.x),
            CubicBezier(t, v0.y, v1.y, v2.y, v3.y),
            CubicBezier(t, v0.z, v1.z, v2.z, v3.z)
        );

        return point;

    }
    copy(source) {

        super.copy(source);

        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);

        return this;

    }



}


export { CubicBezierCurve3 };
