import { Geometry } from '../core/Geometry';
import { BufferGeometry } from '../core/BufferGeometry';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { Vector3 } from '../maths/Vector3';
import { Vector2 } from '../maths/Vector2';

// DoughnutGemetry

class DoughnutGeometry extends Geometry {
    /**
     * 
     * @param {number} outterRadius 外径 
     * @param {number} height 高度 
     * @param {number} innerRadius 内径
     * @param {number} radialSegments 顶面拆分个数
     * @param {number} thetaStart 开始弧度
     * @param {number} thetaLength 结束弧度
     */
    constructor(outterRadius, height, innerRadius = 0, radialSegments, thetaStart, thetaLength) {

        super();

        this.type = 'DoughnutGeometry';

        this.parameters = {
            outterRadius,
            height,
            innerRadius,
            radialSegments,
            thetaStart,
            thetaLength
        };

        this.fromBufferGeometry(new DoughnutBufferGeometry(outterRadius, height, innerRadius, radialSegments, thetaStart, thetaLength));
        this.mergeVertices();

    }
}

// DoughnutBufferGeometry

class DoughnutBufferGeometry extends BufferGeometry {
    constructor(outterRadius, height, innerRadius = 0, radialSegments = 32, thetaStart = 0, thetaLength = 2.0 * Math.PI) {

        super();
        this.type = 'DoughnutBufferGeometry';

        this.parameters = {
            outterRadius,
            height,
            innerRadius,
            radialSegments,
            thetaStart,
            thetaLength
        };

        var scope = this;

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // helper variables

        var index = 0;
        var indexArray = [];
        var halfHeight = height / 2;
        var groupStart = 0;

        thetaLength = Math.min(thetaLength, Math.PI * 2);

        // generate geometry

        generateTopBottom(outterRadius, innerRadius, height);
        generateOutterInnerFace(outterRadius, innerRadius, height);
        if (thetaLength !== Math.PI * 2) {
            generateLeftRightFace();
        }

        // build geometry

        this.setIndex(indices);
        this.addAttribute('position', new Float32BufferAttribute(vertices, 3));
      //  this.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));



        function generateTopBottom(outterRadius, innerRadius, height) {

            var groupCount = 0;
            var x, y;
            var normal = new Vector3();
            var vertex = new Vector3();
            var heightSegments = 1;


            for (y = 0; y <= heightSegments; y++) {
                var indexRow = [];
                var v = y / heightSegments;

                for (x = 0; x <= radialSegments; x++) {

                    var u = x / radialSegments;

                    var theta = u * thetaLength + thetaStart;

                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);



                    if (innerRadius > 0) {

                        vertex.x = innerRadius * sinTheta;
                        vertex.y = - v * height + halfHeight;
                        vertex.z = innerRadius * cosTheta;
                        vertices.push(vertex.x, vertex.y, vertex.z);

                        indexRow.push(index++);

                        uvs.push(u, v);

                        normal.set(0, -1, 0);
                        normals.push(normal.x, normal.y, normal.z);

                    } else {
                        if (indexRow.length === 0) {
                            indexRow.push(index++);
                            let length = vertices.length;
                            vertices[length] = 0;
                            vertices[length + 1] = - v * height + halfHeight;
                            vertices[length + 2] = 0;


                            // uv
                            let uvLen = uvs.length;
                            uvs[uvLen] = 0.5;
                            uvs[uvLen + 1] = 0;



                            // // normal
                            // if (y == heightSegments) {
                            //     normal.set(0, 1, 0);
                            // } else {
                            normal.set(0, -1, 0);
                            // }

                            normals.push(normal.x, normal.y, normal.z);
                        }


                    }


                    // vertex

                    vertex.x = outterRadius * sinTheta;
                    vertex.y = - v * height + halfHeight;
                    vertex.z = outterRadius * cosTheta;
                    vertices.push(vertex.x, vertex.y, vertex.z);

                    // uv

                    uvs.push(u, 1 - v);


                    // normal
                    // if (y == heightSegments) {
                    //     normal.set(0, 1, 0);
                    // } else {
                    normal.set(0, -1, 0);
                    //}

                    normals.push(normal.x, normal.y, normal.z);

                    indexRow.push(index++);

                }

                // now save vertices of the row in our index array

                indexArray.push(indexRow);

            }
            // top bottom indices
            for (y = 0; y <= heightSegments; y++) {

                groupCount = 0;

                for (x = 0; x < radialSegments; x++) {


                    if (innerRadius > 0) {
                        var a = indexArray[y][2 * x + 1];
                        var b = indexArray[y][2 * x];
                        var c = indexArray[y][2 * x + 2];
                        var d = indexArray[y][2 * x + 3];

                        // faces
                        indices.push(a, b, d);
                        indices.push(b, c, d);

                        // update group counter

                        groupCount += 6;

                    } else {
                        var a = indexArray[y][x + 1];
                        var b = indexArray[y][0];
                        var c = indexArray[y][x + 2];

                        // faces
                        indices.push(a, b, c);
                        groupCount += 3;
                    }
                }

                // add a group to the geometry. this will ensure multi material support

                scope.addGroup(groupStart, groupCount, 0);


                // calculate new start value for groups

                groupStart += groupCount;
            }


        }


        function generateOutterInnerFace(outterRadius, innerRadius, height) {

            var groupCount = 0;
            var x, y;
            var normal = new Vector3();
            var vertex = new Vector3();
            var heightSegments = 1;
            for (y = 0; y <= heightSegments; y++) {
                var indexRow = [];
                var v = y / heightSegments;

                for (x = 0; x <= radialSegments; x++) {

                    var u = x / radialSegments;

                    var theta = u * thetaLength + thetaStart;

                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);



                    if (innerRadius > 0) {

                        vertex.x = innerRadius * sinTheta;
                        vertex.y = - v * height + halfHeight;
                        vertex.z = innerRadius * cosTheta;
                        vertices.push(vertex.x, vertex.y, vertex.z);

                        indexRow.push(index++);

                        uvs.push(u, v);

                        normal.set(sinTheta, 0, cosTheta).normalize();
                        normals.push(normal.x, normal.y, normal.z);

                    }


                    // vertex

                    vertex.x = outterRadius * sinTheta;
                    vertex.y = - v * height + halfHeight;
                    vertex.z = outterRadius * cosTheta;
                    vertices.push(vertex.x, vertex.y, vertex.z);

                    // uv

                    uvs.push(u, 1 - v);


                    // normal
                    // if (y == heightSegments) {
                    //     normal.set(0, 1, 0);
                    // } else {
                    normal.set(sinTheta, 0, cosTheta).normalize();
                    //}

                    normals.push(normal.x, normal.y, normal.z);

                    indexRow.push(index++);

                }

                // now save vertices of the row in our index array

                indexArray.push(indexRow);

            }

            // outter inner indices
            //如果内径为0,内侧面就不需要绘制了
            let faceNum = innerRadius === 0 ? 0 : 1;
            let indexLen = indexArray.length - 2;
            let a, b, c, d;
            for (let t = 0; t <= faceNum; t++) {

                groupCount = 0;

                for (x = 0; x < radialSegments; x++) {

                    if (t == 0) {
                        if (faceNum === t) {
                            a = indexArray[y][x];
                            b = indexArray[y + 1][x];
                            c = indexArray[y + 1][x + 1];
                            d = indexArray[y][x + 1];
                        } else {
                            a = indexArray[indexLen][2 * x + 1];
                            b = indexArray[indexLen + 1][2 * x + 1];

                            c = indexArray[indexLen + 1][2 * x + 3];
                            d = indexArray[indexLen][2 * x + 3];
                        }



                    } else {
                        a = indexArray[indexLen][2 * x];
                        b = indexArray[indexLen + 1][2 * x];

                        c = indexArray[indexLen + 1][2 * x + 2];
                        d = indexArray[indexLen][2 * x + 2];
                    }
                    // faces
                    indices.push(a, b, d);
                    indices.push(b, c, d);

                    // update group counter

                    groupCount += 6;
                }

                // add a group to the geometry. this will ensure multi material support

                scope.addGroup(groupStart, groupCount, 0);


                // calculate new start value for groups

                groupStart += groupCount;
            }

        }

        function generateLeftRightFace() {
            //left
            let a, b, c, d;

            a = indexArray[0][1];
            b = indexArray[1][1];
            c = indexArray[1][0];
            d = indexArray[0][0];

            function generateFace(a, b, c, d) {
                let groupCount = 0;
                let indexRow = [];
                let normal = new Vector3();

                [a, b, c, d].forEach((no, ind) => {

                    vertices.push(vertices[3 * no], vertices[3 * no + 1], vertices[3 * no + 2]);
                    // uv
                    uvs.push(ind < 2 ? 0 : 1, ind == 0 || ind == 3 ? 1 : 0);

                    let vec1 = new Vector3(vertices[3 * d], vertices[3 * d + 1], vertices[3 * d + 2]);
                    vec1.sub(new Vector3(vertices[3 * a], vertices[3 * a + 1], vertices[3 * a + 2]));
                    let vec2 = new Vector3(0, -1, 0)
                    normal = vec1.cross(vec2);
                    normal.normalize();
                    normals.push(normal.x, normal.y, normal.z);

                    indexRow.push(index++);
                });

                indexArray.push(indexRow);

                a = indexRow[0];
                b = indexRow[1];
                c = indexRow[2];
                d = indexRow[3];

                // faces
                indices.push(a, b, d);
                indices.push(b, c, d);

                // update group counter

                groupCount += 6;

                scope.addGroup(groupStart, groupCount, 0);

                groupStart += groupCount;
            }
            generateFace(a, b, c, d);

            //right
            let len = indexArray[0].length - 1;
            if (innerRadius > 0) {
                a = indexArray[0][len - 1];
                b = indexArray[1][len - 1];
                c = indexArray[1][len];
                d = indexArray[0][len];
            } else {
                a = indexArray[0][len];
                b = indexArray[1][len];
                c = indexArray[1][0];
                d = indexArray[0][0];
            }

            generateFace(a, b, c, d);

        }

    }
}



export { DoughnutGeometry, DoughnutBufferGeometry };
