import { WebGLProgram } from './WebGLProgram';
import { BackSide, DoubleSide } from '../../constants.js';

class WebGLPrograms {
    constructor(gl, extensions, capabilities) {
        this.programs = [];
        this._gl = gl;
        this._extensions = extensions;
        this._capabilities = capabilities;

        this._shaderIDs = {

            MeshBasicMaterial: 'basic',
            LineBasicMaterial: 'basic',
            LineDashedMaterial: 'dashed',
            PointsMaterial: 'points',
            MeshLambertMaterial: 'lambert',
            MeshPhongMaterial: 'phong',
            LineMeshMaterial: 'linemesh',
            SpriteMaterial: 'sprite'
        };

    }

    getParameters(material, lights) {

        let shaderID = this._shaderIDs[material.type];
        let precision = this._capabilities.precision;

        if (material.precision !== null) {

            precision = this._capabilities.getMaxPrecision(material.precision);

            if (precision !== material.precision) {

                console.warn('WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');

            }

        }
        //shader Define值从这里取
        let parameters = {
            shaderID,
            precision,
            map: !!material.map,
            vertexColors: material.vertexColors,
            alphaTest: material.alphaTest,
            doubleSided: material.side === DoubleSide,
            flipSided: material.side === BackSide,
            dashed: !!material.dashed,
            sizeAttenuation:!!material.sizeAttenuation,
            premultipliedAlpha:!!material.premultipliedAlpha,

            numDirLights: lights.directional.length,
            numPointLights: lights.point.length,
            numSpotLights: lights.spot.length,

        }

        return parameters;

    }

    getProgramCode(material, parameters) {
        let array = [];
        //todo  关键字暂时都保留,后面优化去掉
        let parameterNames = [
            "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding",
            "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap",
            "roughnessMap", "metalnessMap", "gradientMap",
            "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp",
            "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning",
            "maxBones", "useVertexTexture", "morphTargets", "morphNormals",
            "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha",
            "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights",
            "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights',
            "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "dashed"
        ];
        if (parameters.shaderID) {

            array.push(parameters.shaderID);

        } else {

            array.push(material.fragmentShader);
            array.push(material.vertexShader);

        }

        if (material.defines !== undefined) {

            for (let name in material.defines) {

                array.push(name);
                array.push(material.defines[name]);

            }

        }

        for (let i = 0; i < parameterNames.length; i++) {

            array.push(parameters[parameterNames[i]]);

        }

        //array.push(material.onBeforeCompile.toString());


        return array.join();
    }

    acquireProgram(material, shader, parameters, code) {
        let program;

        // Check if code has been already compiled
        for (let p = 0, pl = this.programs.length; p < pl; p++) {

            let programInfo = this.programs[p];

            if (programInfo.code === code) {

                program = programInfo;
                ++program.usedTimes;

                break;

            }

        }

        if (program === undefined) {

            program = new WebGLProgram(this._gl, this._extensions, material, code, shader, parameters);
            this.programs.push(program);

        }

        return program;
    }

    releaseProgram(program) {
        if (--program.usedTimes === 0) {

            // Remove from unordered set
            let i = this.programs.indexOf(program);

            this.programs[i] = this.programs[this.programs.length - 1];
            this.programs.pop();

            // Free WebGL resources
            program.destroy();

        }
    }
}

export { WebGLPrograms };