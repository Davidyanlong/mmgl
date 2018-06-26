import { InterleavedBuffer } from './InterleavedBuffer.js';


class InstancedInterleavedBuffer extends InterleavedBuffer {
    constructor(array, stride, meshPerAttribute) {

        super(array, stride);

        this.meshPerAttribute = meshPerAttribute || 1;
        this.isInstancedInterleavedBuffer = true;

    }

    copy(source) {

        super.copy(source);

        this.meshPerAttribute = source.meshPerAttribute;

        return this;

    }
}



export { InstancedInterleavedBuffer };