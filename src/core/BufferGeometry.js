import { Events } from './Events';
import { BufferAttribute, Float32BufferAttribute, Uint16BufferAttribute, Uint32BufferAttribute } from './BufferAttribute.js';
import { DirectGeometry } from './DirectGeometry';
import { Box3 } from '../maths/Box3'
import { Vector3 } from '../maths/Vector3'
import { Sphere } from '../maths/Sphere';
import { _Math } from '../maths/Math';

/**
 * @class BufferGeometry 三维几何体的缓存基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */

let bufferGeometryId = 1;
class BufferGeometry extends Events {
    constructor() {
        super();
        Object.defineProperty(this, 'id', { value: bufferGeometryId += 2 });
        this.type = 'BufferGeometry';

        // 顶点索引
        this.index = null;

        //包含 position  normal uv
        this.attributes = {};

        this.isBufferGeometry = true;

        this.drawRange = { start: 0, count: Infinity };

        this.groups = [];

        this.boundingBox = null;
        this.boundingSphere = null;

        this.isBufferGeometry = true;


    }

    setIndex(index) {

        if (Array.isArray(index)) {

            this.index = new (_Math.arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);

        } else {

            this.index = index;

        }

    }

    getIndex() {

        return this.index;

    }

    addAttribute(name, attribute) {

        if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {

            console.warn('BufferGeometry: .addAttribute() now expects ( name, attribute ).');

            this.addAttribute(name, new BufferAttribute(arguments[1], arguments[2]));

            return;

        }

        if (name === 'index') {

            console.warn('BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
            this.setIndex(attribute);

            return;

        }

        this.attributes[name] = attribute;

        return this;

    }

    getAttribute(name) {

        return this.attributes[name];

    }

    removeAttribute(name) {

        delete this.attributes[name];

        return this;

    }
    setFromObject(object) {


        let geometry = object.geometry;

        if (object.isPoints || object.isLine) {

            let positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3);
            let colors = new Float32BufferAttribute(geometry.colors.length * 3, 3);

            this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
            this.addAttribute('color', colors.copyColorsArray(geometry.colors));

            if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {

                let lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1);

                this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));

            }

            if (geometry.boundingSphere !== null) {

                this.boundingSphere = geometry.boundingSphere.clone();

            }

            if (geometry.boundingBox !== null) {

                this.boundingBox = geometry.boundingBox.clone();

            }

        } else if (object.isMesh) {

            if (geometry && geometry.isGeometry) {

                this.fromGeometry(geometry);

            }

        }

        return this;

    }

    fromGeometry(geometry) {

        geometry.__directGeometry = new DirectGeometry().fromGeometry(geometry);

        return this.fromDirectGeometry(geometry.__directGeometry);

    }

    fromDirectGeometry(geometry) {

        let positions = new Float32Array(geometry.vertices.length * 3);
        this.addAttribute('position', new BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));

        if (geometry.normals.length > 0) {

            let normals = new Float32Array(geometry.normals.length * 3);
            this.addAttribute('normal', new BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));

        }

        if (geometry.colors.length > 0) {

            let colors = new Float32Array(geometry.colors.length * 3);
            this.addAttribute('color', new BufferAttribute(colors, 3).copyColorsArray(geometry.colors));

        }

        if (geometry.uvs.length > 0) {

            let uvs = new Float32Array(geometry.uvs.length * 2);
            this.addAttribute('uv', new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));

        }

        if (geometry.uvs2.length > 0) {

            let uvs2 = new Float32Array(geometry.uvs2.length * 2);
            this.addAttribute('uv2', new BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));

        }

        // groups

        this.groups = geometry.groups;

        //todo  morphs 暂不开发



        //todo  skinning 暂不开发



        if (geometry.boundingSphere !== null) {

            this.boundingSphere = geometry.boundingSphere.clone();

        }

        if (geometry.boundingBox !== null) {

            this.boundingBox = geometry.boundingBox.clone();

        }

        return this;

    }
    updateFromObject(object) {

        var geometry = object.geometry;

        if (object.isMesh) {

            var direct = geometry.__directGeometry;

            if (geometry.elementsNeedUpdate === true) {

                direct = undefined;
                geometry.elementsNeedUpdate = false;

            }

            if (direct === undefined) {

                return this.fromGeometry(geometry);

            }

            direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
            direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
            direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
            direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
            direct.groupsNeedUpdate = geometry.groupsNeedUpdate;

            geometry.verticesNeedUpdate = false;
            geometry.normalsNeedUpdate = false;
            geometry.colorsNeedUpdate = false;
            geometry.uvsNeedUpdate = false;
            geometry.groupsNeedUpdate = false;

            geometry = direct;

        }


    }

    computeBoundingBox() {

        if (this.boundingBox === null) {

            this.boundingBox = new Box3();

        }

        var position = this.attributes.position;

        if (position !== undefined) {

            this.boundingBox.setFromBufferAttribute(position);

        } else {

            this.boundingBox.makeEmpty();

        }

        if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {

            console.error('BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);

        }

    }

    computeBoundingSphere() {

        computeBoundingSphere.call(this);
    }
    computeVertexNormals() {

        var index = this.index;
        var attributes = this.attributes;
        var groups = this.groups;

        if (attributes.position) {

            var positions = attributes.position.array;

            if (attributes.normal === undefined) {

                this.addAttribute('normal', new BufferAttribute(new Float32Array(positions.length), 3));

            } else {

                // reset existing normals to zero

                var array = attributes.normal.array;

                for (var i = 0, il = array.length; i < il; i++) {

                    array[i] = 0;

                }

            }

            var normals = attributes.normal.array;

            var vA, vB, vC;
            var pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
            var cb = new Vector3(), ab = new Vector3();

            // indexed elements

            if (index) {

                var indices = index.array;

                if (groups.length === 0) {

                    this.addGroup(0, indices.length);

                }

                for (var j = 0, jl = groups.length; j < jl; ++j) {

                    var group = groups[j];

                    var start = group.start;
                    var count = group.count;

                    for (var i = start, il = start + count; i < il; i += 3) {

                        vA = indices[i + 0] * 3;
                        vB = indices[i + 1] * 3;
                        vC = indices[i + 2] * 3;

                        pA.fromArray(positions, vA);
                        pB.fromArray(positions, vB);
                        pC.fromArray(positions, vC);

                        cb.subVectors(pC, pB);
                        ab.subVectors(pA, pB);
                        cb.cross(ab);

                        normals[vA] += cb.x;
                        normals[vA + 1] += cb.y;
                        normals[vA + 2] += cb.z;

                        normals[vB] += cb.x;
                        normals[vB + 1] += cb.y;
                        normals[vB + 2] += cb.z;

                        normals[vC] += cb.x;
                        normals[vC + 1] += cb.y;
                        normals[vC + 2] += cb.z;

                    }

                }

            } else {

                // non-indexed elements (unconnected triangle soup)

                for (var i = 0, il = positions.length; i < il; i += 9) {

                    pA.fromArray(positions, i);
                    pB.fromArray(positions, i + 3);
                    pC.fromArray(positions, i + 6);

                    cb.subVectors(pC, pB);
                    ab.subVectors(pA, pB);
                    cb.cross(ab);

                    normals[i] = cb.x;
                    normals[i + 1] = cb.y;
                    normals[i + 2] = cb.z;

                    normals[i + 3] = cb.x;
                    normals[i + 4] = cb.y;
                    normals[i + 5] = cb.z;

                    normals[i + 6] = cb.x;
                    normals[i + 7] = cb.y;
                    normals[i + 8] = cb.z;

                }

            }

            this.normalizeNormals();

            attributes.normal.needsUpdate = true;

        }

    }

    normalizeNormals() {
        var vector = new Vector3();
        var normals = this.attributes.normal;

        for (var i = 0, il = normals.count; i < il; i++) {

            vector.x = normals.getX(i);
            vector.y = normals.getY(i);
            vector.z = normals.getZ(i);

            vector.normalize();

            normals.setXYZ(i, vector.x, vector.y, vector.z);

        }
        vector = null;

    }

    addGroup(start, count, materialIndex) {

        this.groups.push({

            start: start,
            count: count,
            materialIndex: materialIndex !== undefined ? materialIndex : 0

        });

    }

    clearGroups() {

        this.groups = [];

    }

    clone() {

        return new BufferGeometry().copy(this);

    }

    copy(source) {

        var name, i, l;

        // reset

        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;

        // name

        this.name = source.name;

        // index

        var index = source.index;

        if (index !== null) {

            this.setIndex(index.clone());

        }

        // attributes

        var attributes = source.attributes;

        for (name in attributes) {

            var attribute = attributes[name];
            this.addAttribute(name, attribute.clone());

        }



        // groups

        var groups = source.groups;

        for (i = 0, l = groups.length; i < l; i++) {

            var group = groups[i];
            this.addGroup(group.start, group.count, group.materialIndex);

        }

        // bounding box

        var boundingBox = source.boundingBox;

        if (boundingBox !== null) {

            this.boundingBox = boundingBox.clone();

        }

        // bounding sphere

        var boundingSphere = source.boundingSphere;

        if (boundingSphere !== null) {

            this.boundingSphere = boundingSphere.clone();

        }

        // draw range

        this.drawRange.start = source.drawRange.start;
        this.drawRange.count = source.drawRange.count;

        return this;

    }

    dispose() {

        this.fire({ type: 'dispose' });

    }
}


let computeBoundingSphere = (function () {

    var box = new Box3();
    var vector = new Vector3();

    return function computeBoundingSphere() {

        if (this.boundingSphere === null) {

            this.boundingSphere = new Sphere();

        }

        var position = this.attributes.position;

        if (position) {

            var center = this.boundingSphere.center;

            box.setFromBufferAttribute(position);
            box.getCenter(center);

            // hoping to find a boundingSphere with a radius smaller than the
            // boundingSphere of the boundingBox: sqrt(3) smaller in the best case

            var maxRadiusSq = 0;

            for (var i = 0, il = position.count; i < il; i++) {

                vector.x = position.getX(i);
                vector.y = position.getY(i);
                vector.z = position.getZ(i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

            }

            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

            if (isNaN(this.boundingSphere.radius)) {

                console.error('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);

            }

        }

    };

})()

export { BufferGeometry };