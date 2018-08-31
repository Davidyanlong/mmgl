
const _Math = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    clamp(value, min, max) {

        return Math.max(min, Math.min(max, value));

    },
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    euclideanModulo(n, m) {

        return ((n % m) + m) % m;

    },

    arrayMin(array) {

        if (array.length === 0) return Infinity;

        var min = array[0];

        for (var i = 1, l = array.length; i < l; ++i) {

            if (array[i] < min) min = array[i];

        }

        return min;

    },

    arrayMax(array) {

        if (array.length === 0) return - Infinity;

        var max = array[0];

        for (var i = 1, l = array.length; i < l; ++i) {

            if (array[i] > max) max = array[i];

        }

        return max;

    },
    //是否是2的幂次方
    isPowerOfTwo(value) {
        return (value & (value - 1)) === 0 && value !== 0;
    },
    //向下取一个数最接近的2的幂次方
    floorPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },
    //想上取一个数最接近的2的幂次方
    ceilPowerOfTwo: function (value) {
        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    },

    degToRad(degrees) {
        return degrees * _Math.DEG2RAD;
    },

    radToDeg(radians) {
        return radians * _Math.RAD2DEG;
    }

}

export { _Math };