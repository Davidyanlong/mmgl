import { Vector3 } from '../maths/Vector3'
import { Vector2 } from '../maths/Vector2'
import { Color } from '../maths/Color'

/**
 * @class  BufferAttribute缓存属性
 * @description 这个类保存了和 缓存几何模型(BufferGeometry) 关联的属性数据。该类用来保存内置属性比如顶点位置、法相量和颜色等，也可以被用于保存自定义属性。
 * @author bujue
 */



class BufferAttribute {

    constructor(array, itemSize, normalized) {

        if (Array.isArray(array)) {

            throw new TypeError('BufferAttribute: array should be a Typed Array.');

        }

        this.name = '';

        this.array = array;
        this.itemSize = itemSize;
        this.count = array !== undefined ? array.length / itemSize : 0;
        this.normalized = normalized === true;

        this.dynamic = false;
        this.updateRange = { offset: 0, count: - 1 };

        this.version = 0;
        this.isBufferAttribute = true;



    }

    set needsUpdate(value) {
        if (value === true) this.version++;
    }

    onUploadCallback() {

    }

    setDynamic(value) {

        this.dynamic = value;

        return this;

    }

    copyVector3sArray(vectors) {

        let array = this.array, offset = 0;

        for (let i = 0, l = vectors.length; i < l; i++) {

            let vector = vectors[i];

            if (vector === undefined) {

                console.warn('BufferAttribute.copyVector3sArray(): vector is undefined', i);
                vector = new Vector3();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;

        }

        return this;
    }
    copyColorsArray(colors) {
        let array = this.array, offset = 0;

        for (let i = 0, l = colors.length; i < l; i++) {

            let color = colors[i];

            if (color === undefined) {

                console.warn('BufferAttribute.copyColorsArray(): color is undefined', i);
                color = new Color();

            }

            array[offset++] = color.r;
            array[offset++] = color.g;
            array[offset++] = color.b;

        }

        return this;
    }

    copyArray(array) {
        this.array.set(array);
        return this;
    }

    getX(index) {

        return this.array[index * this.itemSize];

    }

    setX(index, x) {

        this.array[index * this.itemSize] = x;

        return this;

    }

    getY(index) {

        return this.array[index * this.itemSize + 1];

    }

    setY(index, y) {

        this.array[index * this.itemSize + 1] = y;

        return this;

    }

    getZ(index) {

        return this.array[index * this.itemSize + 2];

    }

    setZ(index, z) {

        this.array[index * this.itemSize + 2] = z;

        return this;

    }
    getW(index) {

        return this.array[index * this.itemSize + 3];

    }

    setW(index, w) {

        this.array[index * this.itemSize + 3] = w;

        return this;

    }

    setXY(index, x, y) {

        this.setX(index, x);
        this.setY(index, y);

        return this;

    }

    setXYZ(index, x, y, z) {

        this.setXY(index, x, y);
        this.setZ(index, z);

        return this;

    }

    setXYZW(index, x, y, z, w) {

        this.setXYZ(index, x, y, z);
        this.setW(index, w);

        return this;

    }

    copyVector2sArray(vectors) {

        var array = this.array, offset = 0;

        for (var i = 0, l = vectors.length; i < l; i++) {

            var vector = vectors[i];

            if (vector === undefined) {

                console.warn('BufferAttribute.copyVector2sArray(): vector is undefined', i);
                vector = new Vector2();

            }

            array[offset++] = vector.x;
            array[offset++] = vector.y;

        }

        return this;

    }

    //todo 相关的方法使用到再定义

}

/**
 * @description
 * Int8Array 类型数组表示二进制补码8位有符号整数的数组。内容初始化为0。
 * 范围在[-255,255]
 * 数组中每个元素的大小值为1
 */
class Int8BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int8Array(array), itemSize, normalized)
    }
}
/**
 * @description 
 * Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */
class Uint8BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint8Array(array), itemSize, normalized)
    }
}
/**
 * @description
 * Uint8ClampedArray（8位无符号整型固定数组）如果你指定一个在 [0,255] 区间外的值，它将被替换为0或255；如果你指定一个非整数，那么它将被设置为最接近它的整数。（数组）内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */
class Uint8ClampedBufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint8ClampedArray(array), itemSize, normalized)
    }
}

/**
 * @description
 * Int16Array 类型数组表示二进制补码16位有符号整数的数组。内容初始化为0。
 * 范围在[-65535,65536]
 * 数组中每个元素的大小值为2
 */
class Int16BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int16Array(array), itemSize, normalized)
    }
}

/**
 * @description
 * Uint16Array 类型数组表示二进制补码16位无符号整数的数组。内容初始化为0。
 * 范围在[0,65536]
 * 数组中每个元素的大小值为2
 */
class Uint16BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint16Array(array), itemSize, normalized)
    }
}

/**
 * @description
 * Int32Array 类型数组表示二进制补码32位有符号整数的数组。内容初始化为0。
 * 范围在[-4294967295,4294967296]
 * 数组中每个元素的大小值为4
 */
class Int32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int32Array(array), itemSize, normalized)
    }
}

/**
 * @description
 * Uint32Array 类型数组表示二进制补码32位无符号整数的数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */
class Uint32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint32Array(array), itemSize, normalized)
    }
}

/**
 * @description
 * Float32Array 类型数组表示二进制补码32位的浮点数型数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */
class Float32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Float32Array(array), itemSize, normalized)
    }
}

/**
 * @description
 * Float64Array 类型数组表示二进制补码64位的浮点数型数组。内容初始化为0。
 * 数组中每个元素的大小值为8
 */
class Float64BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Float64Array(array), itemSize, normalized)
    }
}



export {
    Float64BufferAttribute,
    Float32BufferAttribute,
    Uint32BufferAttribute,
    Int32BufferAttribute,
    Uint16BufferAttribute,
    Int16BufferAttribute,
    Uint8ClampedBufferAttribute,
    Uint8BufferAttribute,
    Int8BufferAttribute,
    BufferAttribute
}


