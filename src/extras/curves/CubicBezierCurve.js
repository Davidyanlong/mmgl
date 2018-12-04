import { Curve } from '../core/Curve.js';
import { CubicBezier } from '../core/Interpolations.js';
import { Vector2 } from '../../maths/Vector2.js';


class CubicBezierCurve extends Curve {

    constructor(v0, v1, v2, v3) {
        super();

        this.type = 'CubicBezierCurve';

        this.v0 = v0 || new Vector2();
        this.v1 = v1 || new Vector2();
        this.v2 = v2 || new Vector2();
        this.v3 = v3 || new Vector2();

    }
    get isCubicBezierCurve() {
        return true;
    }
    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector2();

        var v0 = this.v0, v1 = this.v1, v2 = this.v2, v3 = this.v3;

        point.set(
            CubicBezier(t, v0.x, v1.x, v2.x, v3.x),
            CubicBezier(t, v0.y, v1.y, v2.y, v3.y)
        );

        return point;

    }
    copy(source) {

        Curve.prototype.copy.call(this, source);

        this.v0.copy(source.v0);
        this.v1.copy(source.v1);
        this.v2.copy(source.v2);
        this.v3.copy(source.v3);

        return this;

    }
}

export { CubicBezierCurve };
