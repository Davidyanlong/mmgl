import { EllipseCurve } from './EllipseCurve.js';


class ArcCurve extends EllipseCurve {
    constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

        super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);

        this.type = 'ArcCurve';

    }
    get isArcCurve() {
        return true;
    }
}


export { ArcCurve };