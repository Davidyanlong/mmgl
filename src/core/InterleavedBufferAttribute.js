class InterleavedBufferAttribute {
    constructor(interleavedBuffer, itemSize, offset, normalized) {

        this.data = interleavedBuffer;
        this.itemSize = itemSize;
        this.offset = offset;

        this.normalized = normalized === true;

        this.isInterleavedBufferAttribute = true;

    }
    get count() {
        return this.data.count;
    }

    get array() {
        return this.data.array;
    }

    setX(index, x) {

        this.data.array[index * this.data.stride + this.offset] = x;

        return this;

    }

    setY(index, y) {

        this.data.array[index * this.data.stride + this.offset + 1] = y;

        return this;

    }

    setZ(index, z) {

        this.data.array[index * this.data.stride + this.offset + 2] = z;

        return this;

    }

    setW(index, w) {

        this.data.array[index * this.data.stride + this.offset + 3] = w;

        return this;

    }

    getX(index) {

        return this.data.array[index * this.data.stride + this.offset];

    }

    getY(index) {

        return this.data.array[index * this.data.stride + this.offset + 1];

    }

    getZ(index) {

        return this.data.array[index * this.data.stride + this.offset + 2];

    }

    getW(index) {

        return this.data.array[index * this.data.stride + this.offset + 3];

    }

    setXY(index, x, y) {

        this.setX(index, x);
        this.setY(index, y);

        return this;

    }

    setXYZ(index, x, y, z) {

        this.setX(index, x);
        this.setY(index, y);
        this.setZ(index, z);

        return this;

    }

    setXYZW(index, x, y, z, w) {

        this.setX(index, x);
        this.setY(index, y);
        this.setZ(index, z);
        this.setW(index, w);

        return this;

    }

}


export { InterleavedBufferAttribute };