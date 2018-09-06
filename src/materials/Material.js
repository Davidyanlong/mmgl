import { Events } from '../core/Events';
import { NoColors, LessEqualDepth, FrontSide, NormalBlending, SrcAlphaFactor, OneMinusSrcAlphaFactor, AddEquation } from '../constants';
/**
 * @class  材质基类
 * @author bujue
 */
let materialId = 0;

class Material extends Events {
    constructor() {
        super();

        this.type = 'Material';
        Object.defineProperty(this, 'id', { value: materialId++ });

        this.opacity = 1;
        this.transparent = false;

        this.lights = true;
        this.depthFunc = LessEqualDepth;
        this.depthTest = true;
        this.depthWrite = true;

        this.blending = NormalBlending;
        this.side = FrontSide;
        this.vertexColors = NoColors;

        this.visible = true;
        this.needsUpdate = true;

        this.colorWrite = true;
        this.precision = null;

        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;

        this.blendSrc = SrcAlphaFactor;
        this.blendDst = OneMinusSrcAlphaFactor;
        this.blendEquation = AddEquation;
        this.blendSrcAlpha = null;
        this.blendDstAlpha = null;
        this.blendEquationAlpha = null;

        this.premultipliedAlpha = false;

        this.userData = {};

        this.onBeforeCompile = function () { };
    }



    setValues(values) {

        if (values === undefined) return;

        for (var key in values) {

            var newValue = values[key];

            if (newValue === undefined) {

                console.warn("Material: '" + key + "' parameter is undefined.");
                continue;

            }

            // for backward compatability if shading is set in the constructor
            // if (key === 'shading') {

            //     console.warn(this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
            //     this.flatShading = (newValue === FlatShading) ? true : false;
            //     continue;

            // }

            var currentValue = this[key];

            if (currentValue === undefined) {

                console.warn(this.type + ": '" + key + "' is not a property of this material.");
                continue;

            }

            if (currentValue && currentValue.isColor) {

                currentValue.set(newValue);

            } else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {

                currentValue.copy(newValue);

            } else if (key === 'overdraw') {

                // ensure overdraw is backwards-compatible with legacy boolean type
                this[key] = Number(newValue);

            } else {

                this[key] = newValue;

            }

        }

    }

    clone() {

        return new this.constructor().copy(this);

    }

    copy(source) {

        this.name = source.name;

        this.lights = source.lights;

        this.blending = source.blending;
        this.side = source.side;
        this.flatShading = source.flatShading;
        this.vertexColors = source.vertexColors;

        this.opacity = source.opacity;
        this.transparent = source.transparent;

        this.blendSrc = source.blendSrc;
        this.blendDst = source.blendDst;
        this.blendEquation = source.blendEquation;
        this.blendSrcAlpha = source.blendSrcAlpha;
        this.blendDstAlpha = source.blendDstAlpha;
        this.blendEquationAlpha = source.blendEquationAlpha;

        this.depthFunc = source.depthFunc;
        this.depthTest = source.depthTest;
        this.depthWrite = source.depthWrite;

        this.colorWrite = source.colorWrite;

        this.precision = source.precision;

        this.polygonOffset = source.polygonOffset;
        this.polygonOffsetFactor = source.polygonOffsetFactor;
        this.polygonOffsetUnits = source.polygonOffsetUnits;


        this.alphaTest = source.alphaTest;
        this.premultipliedAlpha = source.premultipliedAlpha;

        this.visible = source.visible;

        return this;

    }
    get isMaterial() {
        return true;
    }

    dispose() {

        this.fire({ type: 'dispose' });

    }
}

export { Material };

