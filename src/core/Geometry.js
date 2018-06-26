import { Events } from './Events';
import { Box3 } from '../maths/Box3';
import { Sphere } from '../maths/Sphere';
import { Face3 } from './Face3';
import { Vector3 } from '../maths/Vector3';
import { Vector2 } from '../maths/Vector2';


/**
 * @class BufferGeometry 三维几何体的基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */


let geometryId = 0
class Geometry extends Events {
    constructor() {
        super();
        Object.defineProperty(this, 'id', { value: geometryId += 2 });
        this.type = 'Geometry';

        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];

        this.isGeometry = true;

        this.boundingSphere = null;
        this.boundingBox = null;

        // update flags

        this.elementsNeedUpdate = false;
        this.verticesNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.lineDistancesNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }

    fromBufferGeometry(geometry) {

        var scope = this;

        var indices = geometry.index !== null ? geometry.index.array : undefined;
        var attributes = geometry.attributes;

        var positions = attributes.position.array;
        var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
        var colors = attributes.color !== undefined ? attributes.color.array : undefined;
        var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
        var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

        if (uvs2 !== undefined) this.faceVertexUvs[1] = [];

        var tempNormals = [];
        var tempUVs = [];
        var tempUVs2 = [];

        for (var i = 0, j = 0; i < positions.length; i += 3, j += 2) {

            scope.vertices.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));

            if (normals !== undefined) {

                tempNormals.push(new Vector3(normals[i], normals[i + 1], normals[i + 2]));

            }

            if (colors !== undefined) {

                scope.colors.push(new Color(colors[i], colors[i + 1], colors[i + 2]));

            }

            if (uvs !== undefined) {

                tempUVs.push(new Vector2(uvs[j], uvs[j + 1]));

            }

            if (uvs2 !== undefined) {

                tempUVs2.push(new Vector2(uvs2[j], uvs2[j + 1]));

            }

        }

        function addFace(a, b, c, materialIndex) {

            var vertexNormals = normals !== undefined ? [tempNormals[a].clone(), tempNormals[b].clone(), tempNormals[c].clone()] : [];
            var vertexColors = colors !== undefined ? [scope.colors[a].clone(), scope.colors[b].clone(), scope.colors[c].clone()] : [];

            var face = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);

            scope.faces.push(face);

            if (uvs !== undefined) {

                scope.faceVertexUvs[0].push([tempUVs[a].clone(), tempUVs[b].clone(), tempUVs[c].clone()]);

            }

            if (uvs2 !== undefined) {

                scope.faceVertexUvs[1].push([tempUVs2[a].clone(), tempUVs2[b].clone(), tempUVs2[c].clone()]);

            }

        }

        var groups = geometry.groups;

        if (groups.length > 0) {

            for (var i = 0; i < groups.length; i++) {

                var group = groups[i];

                var start = group.start;
                var count = group.count;

                for (var j = start, jl = start + count; j < jl; j += 3) {

                    if (indices !== undefined) {

                        addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);

                    } else {

                        addFace(j, j + 1, j + 2, group.materialIndex);

                    }

                }

            }

        } else {

            if (indices !== undefined) {

                for (var i = 0; i < indices.length; i += 3) {

                    addFace(indices[i], indices[i + 1], indices[i + 2]);

                }

            } else {

                for (var i = 0; i < positions.length / 3; i += 3) {

                    addFace(i, i + 1, i + 2);

                }

            }

        }

        this.computeFaceNormals();

        if (geometry.boundingBox !== null) {

            this.boundingBox = geometry.boundingBox.clone();

        }

        if (geometry.boundingSphere !== null) {

            this.boundingSphere = geometry.boundingSphere.clone();

        }

        return this;

    }

    computeBoundingBox() {

        if (this.boundingBox === null) {

            this.boundingBox = new Box3();

        }

        this.boundingBox.setFromPoints(this.vertices);

    }

    computeBoundingSphere() {

        if (this.boundingSphere === null) {

            this.boundingSphere = new Sphere();

        }

        this.boundingSphere.setFromPoints(this.vertices);

    }

    computeFaceNormals() {

        var cb = new Vector3(), ab = new Vector3();

        for (var f = 0, fl = this.faces.length; f < fl; f++) {

            var face = this.faces[f];

            var vA = this.vertices[face.a];
            var vB = this.vertices[face.b];
            var vC = this.vertices[face.c];

            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab);

            cb.normalize();

            face.normal.copy(cb);

        }

    }

    /*
 * Checks for duplicate vertices with hashmap.
 * Duplicated vertices are removed
 * and faces' vertices are updated.
 */

    mergeVertices() {

        var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
        var unique = [], changes = [];

        var v, key;
        var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
        var precision = Math.pow(10, precisionPoints);
        var i, il, face;
        var indices, j, jl;

        for (i = 0, il = this.vertices.length; i < il; i++) {

            v = this.vertices[i];
            key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);

            if (verticesMap[key] === undefined) {

                verticesMap[key] = i;
                unique.push(this.vertices[i]);
                changes[i] = unique.length - 1;

            } else {

                //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                changes[i] = changes[verticesMap[key]];

            }

        }


        // if faces are completely degenerate after merging vertices, we
        // have to remove them from the geometry.
        var faceIndicesToRemove = [];

        for (i = 0, il = this.faces.length; i < il; i++) {

            face = this.faces[i];

            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];

            indices = [face.a, face.b, face.c];

            // if any duplicate vertices are found in a Face3
            // we have to remove the face as nothing can be saved
            for (var n = 0; n < 3; n++) {

                if (indices[n] === indices[(n + 1) % 3]) {

                    faceIndicesToRemove.push(i);
                    break;

                }

            }

        }

        for (i = faceIndicesToRemove.length - 1; i >= 0; i--) {

            var idx = faceIndicesToRemove[i];

            this.faces.splice(idx, 1);

            for (j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {

                this.faceVertexUvs[j].splice(idx, 1);

            }

        }

        // Use unique set of vertices

        var diff = this.vertices.length - unique.length;
        this.vertices = unique;
        return diff;

    }

    clone() {
        return new Geometry().copy(this);

    }

    copy(source) {

        var i, il, j, jl, k, kl;

        // reset

        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;

        // name

        this.name = source.name;

        // vertices

        var vertices = source.vertices;

        for (i = 0, il = vertices.length; i < il; i++) {

            this.vertices.push(vertices[i].clone());

        }

        // colors

        var colors = source.colors;

        for (i = 0, il = colors.length; i < il; i++) {

            this.colors.push(colors[i].clone());

        }

        // faces

        var faces = source.faces;

        for (i = 0, il = faces.length; i < il; i++) {

            this.faces.push(faces[i].clone());

        }

        // face vertex uvs

        for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {

            var faceVertexUvs = source.faceVertexUvs[i];

            if (this.faceVertexUvs[i] === undefined) {

                this.faceVertexUvs[i] = [];

            }

            for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {

                var uvs = faceVertexUvs[j], uvsCopy = [];

                for (k = 0, kl = uvs.length; k < kl; k++) {

                    var uv = uvs[k];

                    uvsCopy.push(uv.clone());

                }

                this.faceVertexUvs[i].push(uvsCopy);

            }

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

        // update flags

        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;

        return this;

    }

    clone() {

        return new Geometry().copy(this);

    }

    copy(source) {

        let i, il, j, jl, k, kl;

        // reset

        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.boundingBox = null;
        this.boundingSphere = null;

        // name

        this.name = source.name;

        // vertices

        let vertices = source.vertices;

        for (i = 0, il = vertices.length; i < il; i++) {

            this.vertices.push(vertices[i].clone());

        }

        // colors

        let colors = source.colors;

        for (i = 0, il = colors.length; i < il; i++) {

            this.colors.push(colors[i].clone());

        }

        // faces

        let faces = source.faces;

        for (i = 0, il = faces.length; i < il; i++) {

            this.faces.push(faces[i].clone());

        }

        // face vertex uvs

        for (i = 0, il = source.faceVertexUvs.length; i < il; i++) {

            var faceVertexUvs = source.faceVertexUvs[i];

            if (this.faceVertexUvs[i] === undefined) {

                this.faceVertexUvs[i] = [];

            }

            for (j = 0, jl = faceVertexUvs.length; j < jl; j++) {

                var uvs = faceVertexUvs[j], uvsCopy = [];

                for (k = 0, kl = uvs.length; k < kl; k++) {

                    var uv = uvs[k];

                    uvsCopy.push(uv.clone());

                }

                this.faceVertexUvs[i].push(uvsCopy);

            }

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

        // update flags

        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;

        return this;

    }

    dispose() {

        this.fire({ type: 'dispose' });

    }

}


export { Geometry };


