
/**
 * @class Vector2
 * @description 二维向量
 * @author bujue
 */

class Vector2 {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
		this.isVector2 = true
	}

	get width() {

		return this.x;

	}

	set width(value) {

		this.x = value;

	}




	get height() {

		return this.y;

	}

	set height(value) {

		this.y = value;

	}

	set(x, y) {

		this.x = x;
		this.y = y;

		return this;

	}
	clone() {

		return new this.constructor(this.x, this.y);

	}

	copy(v) {

		this.x = v.x;
		this.y = v.y;

		return this;
	}

	add(v, w) {

		if (w !== undefined) {

			console.warn('Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
			return this.addVectors(v, w);

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	addScalar(s) {

		this.x += s;
		this.y += s;

		return this;

	}

	addVectors(a, b) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	}

	addScaledVector(v, s) {

		this.x += v.x * s;
		this.y += v.y * s;

		return this;

	}

	sub(v, w) {

		if (w !== undefined) {

			console.warn('Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
			return this.subVectors(v, w);

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	subScalar(s) {

		this.x -= s;
		this.y -= s;

		return this;

	}

	subVectors(a, b) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	}

	multiply(v) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	multiplyScalar(scalar) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	divide(v) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	divideScalar(scalar) {

		return this.multiplyScalar(1 / scalar);

	}

	fromBufferAttribute(attribute, index, offset) {

		if (offset !== undefined) {

			console.warn('Vector2: offset has been removed from .fromBufferAttribute().');

		}

		this.x = attribute.getX(index);
		this.y = attribute.getY(index);

		return this;

	}
	equals(v) {

        return ((v.x === this.x) && (v.y === this.y));

    }


}

export { Vector2 };