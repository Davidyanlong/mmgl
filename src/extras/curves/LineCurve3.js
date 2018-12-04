import { Vector3 } from '../../maths/Vector3.js';
import { Curve } from '../core/Curve.js';


class LineCurve3 extends Curve {

    constructor(v1, v2) {
        super();

        this.type = 'LineCurve3';

        this.v1 = v1 || new Vector3();
        this.v2 = v2 || new Vector3();

    }

    get isLineCurve3() {
        return true;
    }

    getPoint(t, optionalTarget) {

        var point = optionalTarget || new Vector3();

        if (t === 1) {

            point.copy(this.v2);

        } else {

            point.copy(this.v2).sub(this.v1);
            point.multiplyScalar(t).add(this.v1);

        }

        return point;

    }

    // Line curve is linear, so we can overwrite default getPointAt

    getPointAt(u, optionalTarget) {

        return this.getPoint(u, optionalTarget);

    }

    copy(source) {

        super.copy(source);

        this.v1.copy(source.v1);
        this.v2.copy(source.v2);

        return this;

    }

}




export { LineCurve3 };
