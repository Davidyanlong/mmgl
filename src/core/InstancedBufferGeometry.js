import { BufferGeometry } from './BufferGeometry';

class InstancedBufferGeometry extends BufferGeometry {
    constructor() {

        super()

        this.type = 'InstancedBufferGeometry';
        this.maxInstancedCount = undefined;
        this.isInstancedBufferGeometry = true;

    }

    copy(source) {

        super.copy(source);

        this.maxInstancedCount = source.maxInstancedCount;

        return this;

    }

    clone() {

        return new this.coFnstructor().copy(this);

    }
}



export { InstancedBufferGeometry };