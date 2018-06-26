import { BufferAttribute } from './BufferAttribute';

class InstancedBufferAttribute extends BufferAttribute {
    constructor(array, itemSize, meshPerAttribute) {
        super()

        BufferAttribute.call(this, array, itemSize);

        this.meshPerAttribute = meshPerAttribute || 1;

        this.isInstancedBufferAttribute = true;

    }
    copy(source) {

        super.copy(source);

        this.meshPerAttribute = source.meshPerAttribute;

        return this;

    }
}





export { InstancedBufferAttribute };