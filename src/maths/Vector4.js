/**
 * @class Vector4
 * @description 用x,y,z,w 表示的四维向量 
 * @author bujue
 */
class Vector4 {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = (w !== undefined) ? w : 1;
        this.isVector4 = true;
    }

    set(x, y, z, w) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;

    }

    //向量乘以一个常量
    multiplyScalar(scalar) {

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;

    }

    //判断两个四维向量是否相等
    equals(v) {

        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));

    }
    //复制四维向量
    copy(v) {

        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = (v.w !== undefined) ? v.w : 1;

        return this;

    }

    applyMatrix4(m) {

        var x = this.x, y = this.y, z = this.z, w = this.w;
        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

        return this;

    }
    normalize() {

        return this.divideScalar(this.length() || 1);

    }

    divideScalar(scalar) {

        return this.multiplyScalar(1 / scalar);

    }

    length () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	}

}

export { Vector4 };