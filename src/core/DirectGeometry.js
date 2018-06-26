import { Vector2 } from '../maths/Vector2.js';
/**
 * @class DirectGeometry 缓存属性
 * @description 主要对一个几何体的不同面,采用不同Material 渲染
 * @author bujue
 */


class DirectGeometry {
    constructor() {
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];

        this.groups = [];



        this.boundingBox = null;
        this.boundingSphere = null;

        // update flags

        this.verticesNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }

    computeGroups(geometry) {

        let group;
        let groups = [];
        let materialIndex = undefined;

        let faces = geometry.faces;
        let i = 0;

        for (i = 0; i < faces.length; i++) {

            let face = faces[i];

            // materials

            if (face.materialIndex !== materialIndex) {

                materialIndex = face.materialIndex;

                if (group !== undefined) {

                    group.count = (i * 3) - group.start;
                    groups.push(group);

                }

                group = {
                    start: i * 3,
                    materialIndex: materialIndex
                };

            }

        }

        if (group !== undefined) {

            group.count = (i * 3) - group.start;
            groups.push(group);

        }

        this.groups = groups;

    }

    fromGeometry(geometry) {

        let faces = geometry.faces;
        let vertices = geometry.vertices;
        let faceVertexUvs = geometry.faceVertexUvs;

        var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
        var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;

        //todo  morphs 暂不开放


        //

        for (let i = 0; i < faces.length; i++) {

            let face = faces[i];

            this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);

            let vertexNormals = face.vertexNormals;

            if (vertexNormals.length === 3) {

                this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);

            } else {

                let normal = face.normal;

                this.normals.push(normal, normal, normal);

            }

            let vertexColors = face.vertexColors;

            if (vertexColors.length === 3) {

                this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);

            } else {

                let color = face.color;

                this.colors.push(color, color, color);

            }
            if (hasFaceVertexUv === true) {

                var vertexUvs = faceVertexUvs[0][i];

                if (vertexUvs !== undefined) {

                    this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);

                } else {

                    console.warn('DirectGeometry.fromGeometry(): Undefined vertexUv ', i);

                    this.uvs.push(new Vector2(), new Vector2(), new Vector2());

                }

            }

            if (hasFaceVertexUv2 === true) {

                var vertexUvs = faceVertexUvs[1][i];

                if (vertexUvs !== undefined) {

                    this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);

                } else {

                    console.warn('DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i);

                    this.uvs2.push(new Vector2(), new Vector2(), new Vector2());

                }

            }

        }

        this.computeGroups(geometry);

        this.verticesNeedUpdate = geometry.verticesNeedUpdate;
        this.normalsNeedUpdate = geometry.normalsNeedUpdate;
        this.colorsNeedUpdate = geometry.colorsNeedUpdate;
        this.uvsNeedUpdate = geometry.uvsNeedUpdate;
        this.groupsNeedUpdate = geometry.groupsNeedUpdate;

        return this;

    }


}

export { DirectGeometry };
