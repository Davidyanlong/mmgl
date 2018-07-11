var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @class Events 事件对象
 * @description 事件对象
 * @author bujue
 */

var Events = function () {
    function Events() {
        classCallCheck(this, Events);
    }

    createClass(Events, [{
        key: "on",
        value: function on(type, listener) {

            if (this._listeners === undefined) {
                this._listeners = {};
            }

            var listeners = this._listeners;

            if (listeners[type] === undefined) {

                listeners[type] = [];
            }

            if (listeners[type].indexOf(listener) === -1) {

                listeners[type].push(listener);
            }
        }
    }, {
        key: "has",
        value: function has(type, listener) {

            if (this._listeners === undefined) return false;

            var listeners = this._listeners;

            return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
        }
    }, {
        key: "off",
        value: function off(type, listener) {

            if (this._listeners === undefined) return;

            var listeners = this._listeners;
            var listenerArray = listeners[type];

            if (listenerArray !== undefined) {

                var index = listenerArray.indexOf(listener);

                if (index !== -1) {

                    listenerArray.splice(index, 1);
                }
            }
        }
    }, {
        key: "fire",
        value: function fire(event) {

            if (this._listeners === undefined) return;

            var listeners = this._listeners;
            var listenerArray = listeners[event.type];

            if (listenerArray !== undefined) {

                event.target = this;

                var array = listenerArray.slice(0);

                for (var i = 0, l = array.length; i < l; i++) {

                    array[i].call(this, event);
                }
            }
        }
    }]);
    return Events;
}();

var REVISION = '0.0.1';

//draw Point
var pointsMode = 0;

//draw Line mode
var LinesMode = 1;
var LineLoopMode = 2;
var LineStripMode = 3;

//draw triangle  mode
var TrianglesDrawMode = 4;
var TriangleStripDrawMode = 5;
var TriangleFanDrawMode = 6;

//depth buffer 
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;

//cull face
var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;
var CullFaceFrontBack = 3;
var FrontFaceDirectionCW = 0;
var FrontFaceDirectionCCW = 1;

//draw side
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;

//blending 
var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var CustomBlending = 5;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var MinEquation = 103;
var MaxEquation = 104;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210;

//texture map  or format
var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipMapNearestFilter = 1004;
var NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipMapNearestFilter = 1007;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedShort565Type = 1019;
var UnsignedInt248Type = 1020;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var RGBEFormat = RGBAFormat;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var UVMapping = 300;
//material  
var NoColors = 0; //不用颜色
var FaceColors = 1; //面颜色
var VertexColors = 2; //顶点颜色 去geometry.colors取色

/**
 * @class Vector4
 * @description 用x,y,z,w 表示的四维向量 
 * @author bujue
 */
var Vector4 = function () {
    function Vector4(x, y, z, w) {
        classCallCheck(this, Vector4);

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w !== undefined ? w : 1;
        this.isVector4 = true;
    }

    createClass(Vector4, [{
        key: "set",
        value: function set$$1(x, y, z, w) {

            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;

            return this;
        }

        //向量乘以一个常量

    }, {
        key: "multiplyScalar",
        value: function multiplyScalar(scalar) {

            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            this.w *= scalar;

            return this;
        }

        //判断两个四维向量是否相等

    }, {
        key: "equals",
        value: function equals(v) {

            return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
        }
        //复制四维向量

    }, {
        key: "copy",
        value: function copy(v) {

            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = v.w !== undefined ? v.w : 1;

            return this;
        }
    }, {
        key: "applyMatrix4",
        value: function applyMatrix4(m) {

            var x = this.x,
                y = this.y,
                z = this.z,
                w = this.w;
            var e = m.elements;

            this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
            this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
            this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
            this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

            return this;
        }
    }, {
        key: "normalize",
        value: function normalize() {

            return this.divideScalar(this.length() || 1);
        }
    }, {
        key: "divideScalar",
        value: function divideScalar(scalar) {

            return this.multiplyScalar(1 / scalar);
        }
    }, {
        key: "length",
        value: function length() {

            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
    }]);
    return Vector4;
}();

var _Math = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    clamp: function clamp(value, min, max) {

        return Math.max(min, Math.min(max, value));
    },

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    euclideanModulo: function euclideanModulo(n, m) {

        return (n % m + m) % m;
    },
    arrayMin: function arrayMin(array) {

        if (array.length === 0) return Infinity;

        var min = array[0];

        for (var i = 1, l = array.length; i < l; ++i) {

            if (array[i] < min) min = array[i];
        }

        return min;
    },
    arrayMax: function arrayMax(array) {

        if (array.length === 0) return -Infinity;

        var max = array[0];

        for (var i = 1, l = array.length; i < l; ++i) {

            if (array[i] > max) max = array[i];
        }

        return max;
    },

    //是否是2的幂次方
    isPowerOfTwo: function isPowerOfTwo(value) {
        return (value & value - 1) === 0 && value !== 0;
    },

    //向下取一个数最接近的2的幂次方
    floorPowerOfTwo: function floorPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },

    //想上取一个数最接近的2的幂次方
    ceilPowerOfTwo: function ceilPowerOfTwo(value) {
        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    },

    degToRad: function degToRad(degrees) {
        return degrees * _Math.DEG2RAD;
    },
    radToDeg: function radToDeg(radians) {
        return radians * _Math.RAD2DEG;
    }
};

// import { Matrix4 } from './Matrix4';
// import { Quaternion } from './Quaternion';

// var quaternion = new Quaternion();
// var quaternion1 = new Quaternion();

// var matrix = new Matrix4();
// var matrix1 = new Matrix4();

// var min = new Vector3();
// var max = new Vector3();

// var v1 = new Vector3();
// var v2 = new Vector3();

var Vector3$1 = function () {
    function Vector3(x, y, z) {
        classCallCheck(this, Vector3);

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.isVector3 = true;
    }

    createClass(Vector3, [{
        key: 'set',
        value: function set$$1(x, y, z) {

            this.x = x;
            this.y = y;
            this.z = z;

            return this;
        }
    }, {
        key: 'setScalar',
        value: function setScalar(scalar) {

            this.x = scalar;
            this.y = scalar;
            this.z = scalar;

            return this;
        }
    }, {
        key: 'setX',
        value: function setX(x) {

            this.x = x;

            return this;
        }
    }, {
        key: 'setY',
        value: function setY(y) {

            this.y = y;

            return this;
        }
    }, {
        key: 'setZ',
        value: function setZ(z) {

            this.z = z;

            return this;
        }
    }, {
        key: 'setComponent',
        value: function setComponent(index, value) {

            switch (index) {

                case 0:
                    this.x = value;break;
                case 1:
                    this.y = value;break;
                case 2:
                    this.z = value;break;
                default:
                    throw new Error('index is out of range: ' + index);

            }

            return this;
        }
    }, {
        key: 'getComponent',
        value: function getComponent(index) {

            switch (index) {

                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error('index is out of range: ' + index);

            }
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor(this.x, this.y, this.z);
        }
    }, {
        key: 'copy',
        value: function copy(v) {

            this.x = v.x;
            this.y = v.y;
            this.z = v.z;

            return this;
        }
    }, {
        key: 'add',
        value: function add(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                return this.addVectors(v, w);
            }

            this.x += v.x;
            this.y += v.y;
            this.z += v.z;

            return this;
        }
    }, {
        key: 'addScalar',
        value: function addScalar(s) {

            this.x += s;
            this.y += s;
            this.z += s;

            return this;
        }
    }, {
        key: 'addVectors',
        value: function addVectors(a, b) {

            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;

            return this;
        }
    }, {
        key: 'addScaledVector',
        value: function addScaledVector(v, s) {

            this.x += v.x * s;
            this.y += v.y * s;
            this.z += v.z * s;

            return this;
        }
    }, {
        key: 'sub',
        value: function sub(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                return this.subVectors(v, w);
            }

            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;

            return this;
        }
    }, {
        key: 'subScalar',
        value: function subScalar(s) {

            this.x -= s;
            this.y -= s;
            this.z -= s;

            return this;
        }
    }, {
        key: 'subVectors',
        value: function subVectors(a, b) {

            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;

            return this;
        }
    }, {
        key: 'multiply',
        value: function multiply(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                return this.multiplyVectors(v, w);
            }

            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;

            return this;
        }
    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(scalar) {

            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;

            return this;
        }
    }, {
        key: 'multiplyVectors',
        value: function multiplyVectors(a, b) {

            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;

            return this;
        }

        // applyEuler(euler) {

        //     if (!(euler && euler.isEuler)) {

        //         console.error('Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');

        //     }

        //     return this.applyQuaternion(quaternion.setFromEuler(euler));

        // }


        // applyAxisAngle(axis, angle) {

        //     return this.applyQuaternion(quaternion1.setFromAxisAngle(axis, angle));

        // }


    }, {
        key: 'applyMatrix3',
        value: function applyMatrix3(m) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;

            return this;
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(m) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

            return this;
        }
    }, {
        key: 'applyQuaternion',
        value: function applyQuaternion(q) {

            var x = this.x,
                y = this.y,
                z = this.z;
            var qx = q.x,
                qy = q.y,
                qz = q.z,
                qw = q.w;

            // calculate quat * vector

            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat

            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return this;
        }
        // project(camera) {

        //     matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
        //     return this.applyMatrix4(matrix);

        // }


        // unproject(camera) {

        //     matrix1.multiplyMatrices(camera.matrixWorld, matrix1.getInverse(camera.projectionMatrix));
        //     return this.applyMatrix4(matrix1);

        // }


    }, {
        key: 'transformDirection',
        value: function transformDirection(m) {

            // input: Matrix4 affine matrix
            // vector interpreted as a direction

            var x = this.x,
                y = this.y,
                z = this.z;
            var e = m.elements;

            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;

            return this.normalize();
        }
    }, {
        key: 'divide',
        value: function divide(v) {

            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;

            return this;
        }
    }, {
        key: 'divideScalar',
        value: function divideScalar(scalar) {

            return this.multiplyScalar(1 / scalar);
        }
    }, {
        key: 'min',
        value: function min(v) {

            this.x = Math.min(this.x, v.x);
            this.y = Math.min(this.y, v.y);
            this.z = Math.min(this.z, v.z);

            return this;
        }
    }, {
        key: 'max',
        value: function max(v) {

            this.x = Math.max(this.x, v.x);
            this.y = Math.max(this.y, v.y);
            this.z = Math.max(this.z, v.z);

            return this;
        }

        // clamp(min, max) {

        //     // assumes min < max, componentwise

        //     this.x = Math.max(min.x, Math.min(max.x, this.x));
        //     this.y = Math.max(min.y, Math.min(max.y, this.y));
        //     this.z = Math.max(min.z, Math.min(max.z, this.z));

        //     return this;

        // }

        // clampScalar(minVal, maxVal) {

        //     min.set(minVal, minVal, minVal);
        //     max.set(maxVal, maxVal, maxVal);

        //     return this.clamp(min, max);

        // }

    }, {
        key: 'clampLength',
        value: function clampLength(min, max) {

            var length = this.length();

            return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
        }
    }, {
        key: 'floor',
        value: function floor() {

            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);

            return this;
        }
    }, {
        key: 'ceil',
        value: function ceil() {

            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);

            return this;
        }
    }, {
        key: 'round',
        value: function round() {

            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);

            return this;
        }
    }, {
        key: 'roundToZero',
        value: function roundToZero() {

            this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);

            return this;
        }
    }, {
        key: 'negate',
        value: function negate() {

            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;

            return this;
        }
    }, {
        key: 'dot',
        value: function dot(v) {

            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        // TODO lengthSquared?

    }, {
        key: 'lengthSq',
        value: function lengthSq() {

            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
    }, {
        key: 'length',
        value: function length() {

            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }, {
        key: 'lengthManhattan',
        value: function lengthManhattan() {

            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }
    }, {
        key: 'normalize',
        value: function normalize() {

            return this.divideScalar(this.length() || 1);
        }
    }, {
        key: 'setLength',
        value: function setLength(length) {

            return this.normalize().multiplyScalar(length);
        }
    }, {
        key: 'lerp',
        value: function lerp(v, alpha) {

            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            this.z += (v.z - this.z) * alpha;

            return this;
        }
    }, {
        key: 'lerpVectors',
        value: function lerpVectors(v1, v2, alpha) {

            return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
        }
    }, {
        key: 'cross',
        value: function cross(v, w) {

            if (w !== undefined) {

                console.warn('Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                return this.crossVectors(v, w);
            }

            var x = this.x,
                y = this.y,
                z = this.z;

            this.x = y * v.z - z * v.y;
            this.y = z * v.x - x * v.z;
            this.z = x * v.y - y * v.x;

            return this;
        }
    }, {
        key: 'crossVectors',
        value: function crossVectors(a, b) {

            var ax = a.x,
                ay = a.y,
                az = a.z;
            var bx = b.x,
                by = b.y,
                bz = b.z;

            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;

            return this;
        }
    }, {
        key: 'projectOnVector',
        value: function projectOnVector(vector) {

            var scalar = vector.dot(this) / vector.lengthSq();

            return this.copy(vector).multiplyScalar(scalar);
        }

        // projectOnPlane(planeNormal) {

        //     v1.copy(this).projectOnVector(planeNormal);

        //     return this.sub(v1);

        // }


        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length


        // reflect(normal) {

        //     return this.sub(v2.copy(normal).multiplyScalar(2 * this.dot(normal)));

        // }


    }, {
        key: 'angleTo',
        value: function angleTo(v) {

            var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());

            // clamp, to handle numerical problems

            return Math.acos(_Math.clamp(theta, -1, 1));
        }
    }, {
        key: 'distanceTo',
        value: function distanceTo(v) {

            return Math.sqrt(this.distanceToSquared(v));
        }
    }, {
        key: 'distanceToSquared',
        value: function distanceToSquared(v) {

            var dx = this.x - v.x,
                dy = this.y - v.y,
                dz = this.z - v.z;

            return dx * dx + dy * dy + dz * dz;
        }
    }, {
        key: 'distanceToManhattan',
        value: function distanceToManhattan(v) {

            return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
        }
    }, {
        key: 'setFromSpherical',
        value: function setFromSpherical(s) {

            var sinPhiRadius = Math.sin(s.phi) * s.radius;

            this.x = sinPhiRadius * Math.sin(s.theta);
            this.y = Math.cos(s.phi) * s.radius;
            this.z = sinPhiRadius * Math.cos(s.theta);

            return this;
        }
    }, {
        key: 'setFromCylindrical',
        value: function setFromCylindrical(c) {

            this.x = c.radius * Math.sin(c.theta);
            this.y = c.y;
            this.z = c.radius * Math.cos(c.theta);

            return this;
        }
    }, {
        key: 'setFromMatrixPosition',
        value: function setFromMatrixPosition(m) {

            var e = m.elements;

            this.x = e[12];
            this.y = e[13];
            this.z = e[14];

            return this;
        }
    }, {
        key: 'setFromMatrixScale',
        value: function setFromMatrixScale(m) {

            var sx = this.setFromMatrixColumn(m, 0).length();
            var sy = this.setFromMatrixColumn(m, 1).length();
            var sz = this.setFromMatrixColumn(m, 2).length();

            this.x = sx;
            this.y = sy;
            this.z = sz;

            return this;
        }
    }, {
        key: 'setFromMatrixColumn',
        value: function setFromMatrixColumn(m, index) {

            return this.fromArray(m.elements, index * 4);
        }
    }, {
        key: 'equals',
        value: function equals(v) {

            return v.x === this.x && v.y === this.y && v.z === this.z;
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];

            return this;
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;

            return array;
        }
    }, {
        key: 'fromBufferAttribute',
        value: function fromBufferAttribute(attribute, index, offset) {

            if (offset !== undefined) {

                console.warn('Vector3: offset has been removed from .fromBufferAttribute().');
            }

            this.x = attribute.getX(index);
            this.y = attribute.getY(index);
            this.z = attribute.getZ(index);

            return this;
        }
    }, {
        key: 'clamp',
        value: function clamp(min, max) {

            // assumes min < max, componentwise

            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));

            return this;
        }
    }, {
        key: 'clampScalar',
        value: function clampScalar(minVal, maxVal) {

            var min = new Vector3();
            var max = new Vector3();

            min.set(minVal, minVal, minVal);
            max.set(maxVal, maxVal, maxVal);

            return this.clamp(min, max);
        }
    }]);
    return Vector3;
}();

/**
 * @class Color
 * @description 颜色类
 * @author bujue
 */

var Color$1 = function () {
    function Color(r, g, b, a) {
        classCallCheck(this, Color);


        this.r = 1;
        this.g = 1;
        this.b = 1;
        this.a = 1;
        this.isColor = !0;
        if (g === undefined && b === undefined && a === undefined) {
            return this.set(r);
        }
        return this.setRGBA(r, g, b, a);
    }

    createClass(Color, [{
        key: 'set',
        value: function set$$1(value) {
            if (value && value.isColor) {

                this.copy(value);
            } else if (typeof value === 'number') {

                this.setHex(value);
            } else if (typeof value === 'string') {

                this.setStyle(value);
            }

            return this;
        }
        //通过0xffffff 16进制赋值

    }, {
        key: 'setHex',
        value: function setHex(hex) {

            hex = Math.floor(hex);

            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;

            return this;
        }
        //通过RGB方式设置颜色

    }, {
        key: 'setRGB',
        value: function setRGB(r, g, b) {

            this.r = r;
            this.g = g;
            this.b = b;

            return this;
        }
        //通过RGBA方式设置颜色

    }, {
        key: 'setRGBA',
        value: function setRGBA(r, g, b, a) {

            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;

            return this;
        }
        //通过"#FFFFFF"方式设置颜色

    }, {
        key: 'setStyle',
        value: function setStyle(style) {

            var m;

            if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {

                // rgb / hsl

                var color;
                var name = m[1];
                var components = m[2];

                switch (name) {

                    case 'rgb':
                    case 'rgba':
                        if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // rgb(255,0,0) rgba(255,0,0,0.5)
                            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                            this.b = Math.min(255, parseInt(color[3], 10)) / 255;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, color[5]);
                                }
                            }

                            return this;
                        }

                        if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                            this.b = Math.min(100, parseInt(color[3], 10)) / 100;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, color[5]);
                                }
                            }

                            return this;
                        }

                        break;

                    case 'hsl':
                    case 'hsla':

                        if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {

                            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                            var h = parseFloat(color[1]) / 360;
                            var s = parseInt(color[2], 10) / 100;
                            var l = parseInt(color[3], 10) / 100;

                            if (color[5]) {
                                if (color[5] > 1) {
                                    this.a = Math.min(255, parseInt(color[5], 10)) / 255;
                                } else {
                                    this.a = Math.min(1, parseInt(color[5], 10));
                                }
                            }

                            return this.setHSL(h, s, l);
                        }

                        break;

                }
            } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {

                // hex color

                var hex = m[1];
                var size = hex.length;

                if (size === 3) {

                    // #ff0
                    this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                    this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                    this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;

                    return this;
                } else if (size === 6) {

                    // #ff0000
                    this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                    this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                    this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

                    return this;
                }
            }

            if (style && style.length > 0) {

                // color keywords
                var hex = ColorKeywords[style];

                if (hex !== undefined) {

                    // red
                    this.setHex(hex);
                } else {

                    // unknown color
                    console.warn('Color: Unknown color ' + style);
                }
            }

            return this;
        }
    }, {
        key: 'copy',
        value: function copy(color) {

            this.r = color.r;
            this.g = color.g;
            this.b = color.b;

            return this;
        }
    }, {
        key: 'setHSL',
        value: function setHSL(h, s, l) {
            return _setHSL.call(this, h, s, l);
        }
    }, {
        key: 'setHSLA',
        value: function setHSLA(h, s, l, a) {
            var _color = _setHSL.call(this, h, s, l);
            _color.a = a;
            return _color;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new this.constructor(this.r, this.g, this.b);
        }
    }, {
        key: 'copy',
        value: function copy(color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;

            return this;
        }
    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(s) {

            this.r *= s;
            this.g *= s;
            this.b *= s;

            return this;
        }
    }, {
        key: 'getHex',
        value: function getHex() {

            return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
        }
    }, {
        key: 'getHexString',
        value: function getHexString() {

            return ('000000' + this.getHex().toString(16)).slice(-6);
        }
    }]);
    return Color;
}();

var _setHSL = function () {

    function hue2rgb(p, q, t) {

        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
        return p;
    }

    return function setHSL(h, s, l) {

        // h,s,l ranges are in 0.0 - 1.0
        h = _Math.euclideanModulo(h, 1);
        s = _Math.clamp(s, 0, 1);
        l = _Math.clamp(l, 0, 1);

        if (s === 0) {

            this.r = this.g = this.b = l;
        } else {

            var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            var q = 2 * l - p;

            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);
        }

        return this;
    };
}();

var ColorKeywords = {
    'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
    'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
    'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
    'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
    'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
    'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
};

// var vector = new Vector3();
// var matrix = new Matrix4();

var v1 = new Vector3$1();
var v2 = new Vector3$1();

var x = new Vector3$1();
var y = new Vector3$1();
var z = new Vector3$1();

var Matrix4 = function () {
    function Matrix4() {
        classCallCheck(this, Matrix4);

        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        if (arguments.length > 0) {

            console.error('Matrix4: the constructor no longer reads arguments. use .set() instead.');
        }
        this.isMatrix4 = true;
    }

    createClass(Matrix4, [{
        key: 'set',
        value: function set$$1(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

            var te = this.elements;

            te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;
            te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;
            te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;
            te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;

            return this;
        }
    }, {
        key: 'identity',
        value: function identity() {

            this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new Matrix4().fromArray(this.elements);
        }
    }, {
        key: 'copy',
        value: function copy(m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];te[1] = me[1];te[2] = me[2];te[3] = me[3];
            te[4] = me[4];te[5] = me[5];te[6] = me[6];te[7] = me[7];
            te[8] = me[8];te[9] = me[9];te[10] = me[10];te[11] = me[11];
            te[12] = me[12];te[13] = me[13];te[14] = me[14];te[15] = me[15];

            return this;
        }
    }, {
        key: 'copyPosition',
        value: function copyPosition(m) {

            var te = this.elements,
                me = m.elements;

            te[12] = me[12];
            te[13] = me[13];
            te[14] = me[14];

            return this;
        }
    }, {
        key: 'extractBasis',
        value: function extractBasis(xAxis, yAxis, zAxis) {

            xAxis.setFromMatrixColumn(this, 0);
            yAxis.setFromMatrixColumn(this, 1);
            zAxis.setFromMatrixColumn(this, 2);

            return this;
        }
    }, {
        key: 'makeBasis',
        value: function makeBasis(xAxis, yAxis, zAxis) {

            this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'extractRotation',
        value: function extractRotation(m) {

            var te = this.elements;
            var me = m.elements;

            var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
            var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
            var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();

            te[0] = me[0] * scaleX;
            te[1] = me[1] * scaleX;
            te[2] = me[2] * scaleX;

            te[4] = me[4] * scaleY;
            te[5] = me[5] * scaleY;
            te[6] = me[6] * scaleY;

            te[8] = me[8] * scaleZ;
            te[9] = me[9] * scaleZ;
            te[10] = me[10] * scaleZ;

            return this;
        }
    }, {
        key: 'makeRotationFromEuler',
        value: function makeRotationFromEuler(euler) {

            if (!(euler && euler.isEuler)) {

                console.error('Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
            }

            var te = this.elements;

            var x = euler.x,
                y = euler.y,
                z = euler.z;
            var a = Math.cos(x),
                b = Math.sin(x);
            var c = Math.cos(y),
                d = Math.sin(y);
            var e = Math.cos(z),
                f = Math.sin(z);

            if (euler.order === 'XYZ') {

                var ae = a * e,
                    af = a * f,
                    be = b * e,
                    bf = b * f;

                te[0] = c * e;
                te[4] = -c * f;
                te[8] = d;

                te[1] = af + be * d;
                te[5] = ae - bf * d;
                te[9] = -b * c;

                te[2] = bf - ae * d;
                te[6] = be + af * d;
                te[10] = a * c;
            } else if (euler.order === 'YXZ') {

                var ce = c * e,
                    cf = c * f,
                    de = d * e,
                    df = d * f;

                te[0] = ce + df * b;
                te[4] = de * b - cf;
                te[8] = a * d;

                te[1] = a * f;
                te[5] = a * e;
                te[9] = -b;

                te[2] = cf * b - de;
                te[6] = df + ce * b;
                te[10] = a * c;
            } else if (euler.order === 'ZXY') {

                var ce = c * e,
                    cf = c * f,
                    de = d * e,
                    df = d * f;

                te[0] = ce - df * b;
                te[4] = -a * f;
                te[8] = de + cf * b;

                te[1] = cf + de * b;
                te[5] = a * e;
                te[9] = df - ce * b;

                te[2] = -a * d;
                te[6] = b;
                te[10] = a * c;
            } else if (euler.order === 'ZYX') {

                var ae = a * e,
                    af = a * f,
                    be = b * e,
                    bf = b * f;

                te[0] = c * e;
                te[4] = be * d - af;
                te[8] = ae * d + bf;

                te[1] = c * f;
                te[5] = bf * d + ae;
                te[9] = af * d - be;

                te[2] = -d;
                te[6] = b * c;
                te[10] = a * c;
            } else if (euler.order === 'YZX') {

                var ac = a * c,
                    ad = a * d,
                    bc = b * c,
                    bd = b * d;

                te[0] = c * e;
                te[4] = bd - ac * f;
                te[8] = bc * f + ad;

                te[1] = f;
                te[5] = a * e;
                te[9] = -b * e;

                te[2] = -d * e;
                te[6] = ad * f + bc;
                te[10] = ac - bd * f;
            } else if (euler.order === 'XZY') {

                var ac = a * c,
                    ad = a * d,
                    bc = b * c,
                    bd = b * d;

                te[0] = c * e;
                te[4] = -f;
                te[8] = d * e;

                te[1] = ac * f + bd;
                te[5] = a * e;
                te[9] = ad * f - bc;

                te[2] = bc * f - ad;
                te[6] = b * e;
                te[10] = bd * f + ac;
            }

            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;

            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;

            return this;
        }
    }, {
        key: 'makeRotationFromQuaternion',
        value: function makeRotationFromQuaternion(q) {

            var te = this.elements;

            var x = q._x,
                y = q._y,
                z = q._z,
                w = q._w;
            var x2 = x + x,
                y2 = y + y,
                z2 = z + z;
            var xx = x * x2,
                xy = x * y2,
                xz = x * z2;
            var yy = y * y2,
                yz = y * z2,
                zz = z * z2;
            var wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            te[0] = 1 - (yy + zz);
            te[4] = xy - wz;
            te[8] = xz + wy;

            te[1] = xy + wz;
            te[5] = 1 - (xx + zz);
            te[9] = yz - wx;

            te[2] = xz - wy;
            te[6] = yz + wx;
            te[10] = 1 - (xx + yy);

            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;

            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;

            return this;
        }
    }, {
        key: 'lookAt',
        value: function lookAt(eye, target, up) {

            var te = this.elements;

            z.subVectors(eye, target);

            if (z.lengthSq() === 0) {

                // eye and target are in the same position

                z.z = 1;
            }

            z.normalize();
            x.crossVectors(up, z);

            if (x.lengthSq() === 0) {

                // up and z are parallel

                if (Math.abs(up.z) === 1) {

                    z.x += 0.0001;
                } else {

                    z.z += 0.0001;
                }

                z.normalize();
                x.crossVectors(up, z);
            }

            x.normalize();
            y.crossVectors(z, x);

            te[0] = x.x;te[4] = y.x;te[8] = z.x;
            te[1] = x.y;te[5] = y.y;te[9] = z.y;
            te[2] = x.z;te[6] = y.z;te[10] = z.z;

            return this;
        }
    }, {
        key: 'multiply',
        value: function multiply(m, n) {

            if (n !== undefined) {

                console.warn('Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
                return this.multiplyMatrices(m, n);
            }

            return this.multiplyMatrices(this, m);
        }
    }, {
        key: 'premultiply',
        value: function premultiply(m) {

            return this.multiplyMatrices(m, this);
        }
    }, {
        key: 'multiplyMatrices',
        value: function multiplyMatrices(a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0],
                a12 = ae[4],
                a13 = ae[8],
                a14 = ae[12];
            var a21 = ae[1],
                a22 = ae[5],
                a23 = ae[9],
                a24 = ae[13];
            var a31 = ae[2],
                a32 = ae[6],
                a33 = ae[10],
                a34 = ae[14];
            var a41 = ae[3],
                a42 = ae[7],
                a43 = ae[11],
                a44 = ae[15];

            var b11 = be[0],
                b12 = be[4],
                b13 = be[8],
                b14 = be[12];
            var b21 = be[1],
                b22 = be[5],
                b23 = be[9],
                b24 = be[13];
            var b31 = be[2],
                b32 = be[6],
                b33 = be[10],
                b34 = be[14];
            var b41 = be[3],
                b42 = be[7],
                b43 = be[11],
                b44 = be[15];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

            return this;
        }
    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(s) {

            var te = this.elements;

            te[0] *= s;te[4] *= s;te[8] *= s;te[12] *= s;
            te[1] *= s;te[5] *= s;te[9] *= s;te[13] *= s;
            te[2] *= s;te[6] *= s;te[10] *= s;te[14] *= s;
            te[3] *= s;te[7] *= s;te[11] *= s;te[15] *= s;

            return this;
        }
    }, {
        key: 'applyToBufferAttribute',
        value: function applyToBufferAttribute(attribute) {

            for (var i = 0, l = attribute.count; i < l; i++) {

                v2.x = attribute.getX(i);
                v2.y = attribute.getY(i);
                v2.z = attribute.getZ(i);

                v2.applyMatrix4(this);

                attribute.setXYZ(i, v2.x, v2.y, v2.z);
            }

            return attribute;
        }
    }, {
        key: 'determinant',
        value: function determinant() {

            var te = this.elements;

            var n11 = te[0],
                n12 = te[4],
                n13 = te[8],
                n14 = te[12];
            var n21 = te[1],
                n22 = te[5],
                n23 = te[9],
                n24 = te[13];
            var n31 = te[2],
                n32 = te[6],
                n33 = te[10],
                n34 = te[14];
            var n41 = te[3],
                n42 = te[7],
                n43 = te[11],
                n44 = te[15];

            //TODO: make this more efficient
            //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

            return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
        }
    }, {
        key: 'transpose',
        value: function transpose() {

            var te = this.elements;
            var tmp;

            tmp = te[1];te[1] = te[4];te[4] = tmp;
            tmp = te[2];te[2] = te[8];te[8] = tmp;
            tmp = te[6];te[6] = te[9];te[9] = tmp;

            tmp = te[3];te[3] = te[12];te[12] = tmp;
            tmp = te[7];te[7] = te[13];te[13] = tmp;
            tmp = te[11];te[11] = te[14];te[14] = tmp;

            return this;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(v) {

            var te = this.elements;

            te[12] = v.x;
            te[13] = v.y;
            te[14] = v.z;

            return this;
        }
    }, {
        key: 'getInverse',
        value: function getInverse(m, throwOnDegenerate) {

            // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            var te = this.elements,
                me = m.elements,
                n11 = me[0],
                n21 = me[1],
                n31 = me[2],
                n41 = me[3],
                n12 = me[4],
                n22 = me[5],
                n32 = me[6],
                n42 = me[7],
                n13 = me[8],
                n23 = me[9],
                n33 = me[10],
                n43 = me[11],
                n14 = me[12],
                n24 = me[13],
                n34 = me[14],
                n44 = me[15],
                t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

            var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

            if (det === 0) {

                var msg = "Matrix4: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);
                } else {

                    console.warn(msg);
                }

                return this.identity();
            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
            te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
            te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

            te[4] = t12 * detInv;
            te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
            te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
            te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

            te[8] = t13 * detInv;
            te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
            te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
            te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

            te[12] = t14 * detInv;
            te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
            te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
            te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

            return this;
        }
    }, {
        key: 'scale',
        value: function scale(v) {

            var te = this.elements;
            var x = v.x,
                y = v.y,
                z = v.z;

            te[0] *= x;te[4] *= y;te[8] *= z;
            te[1] *= x;te[5] *= y;te[9] *= z;
            te[2] *= x;te[6] *= y;te[10] *= z;
            te[3] *= x;te[7] *= y;te[11] *= z;

            return this;
        }
    }, {
        key: 'getMaxScaleOnAxis',
        value: function getMaxScaleOnAxis() {

            var te = this.elements;

            var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
            var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
            var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        }
    }, {
        key: 'makeTranslation',
        value: function makeTranslation(x, y, z) {

            this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeRotationX',
        value: function makeRotationX(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeRotationY',
        value: function makeRotationY(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeRotationZ',
        value: function makeRotationZ(theta) {

            var c = Math.cos(theta),
                s = Math.sin(theta);

            this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeRotationAxis',
        value: function makeRotationAxis(axis, angle) {

            // Based on http://www.gamedev.net/reference/articles/article1199.asp

            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis.x,
                y = axis.y,
                z = axis.z;
            var tx = t * x,
                ty = t * y;

            this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeScale',
        value: function makeScale(x, y, z) {

            this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'makeShear',
        value: function makeShear(x, y, z) {

            this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'compose',
        value: function compose(position, quaternion, scale) {

            this.makeRotationFromQuaternion(quaternion);
            this.scale(scale);
            this.setPosition(position);

            return this;
        }
    }, {
        key: 'decompose',
        value: function decompose(position, quaternion, scale) {
            var _decompose = _decompose2.bind(this);
            return _decompose(position, quaternion, scale);
        }
    }, {
        key: 'makePerspective',
        value: function makePerspective(left, right, top, bottom, near, far) {

            if (far === undefined) {

                console.warn('Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
            }

            var te = this.elements;
            var x = 2 * near / (right - left);
            var y = 2 * near / (top - bottom);

            var a = (right + left) / (right - left);
            var b = (top + bottom) / (top - bottom);
            var c = -(far + near) / (far - near);
            var d = -2 * far * near / (far - near);

            te[0] = x;te[4] = 0;te[8] = a;te[12] = 0;
            te[1] = 0;te[5] = y;te[9] = b;te[13] = 0;
            te[2] = 0;te[6] = 0;te[10] = c;te[14] = d;
            te[3] = 0;te[7] = 0;te[11] = -1;te[15] = 0;

            return this;
        }
    }, {
        key: 'makeOrthographic',
        value: function makeOrthographic(left, right, top, bottom, near, far) {

            var te = this.elements;
            var w = 1.0 / (right - left);
            var h = 1.0 / (top - bottom);
            var p = 1.0 / (far - near);

            var x = (right + left) * w;
            var y = (top + bottom) * h;
            var z = (far + near) * p;

            te[0] = 2 * w;te[4] = 0;te[8] = 0;te[12] = -x;
            te[1] = 0;te[5] = 2 * h;te[9] = 0;te[13] = -y;
            te[2] = 0;te[6] = 0;te[10] = -2 * p;te[14] = -z;
            te[3] = 0;te[7] = 0;te[11] = 0;te[15] = 1;

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 16; i++) {

                if (te[i] !== me[i]) return false;
            }

            return true;
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 16; i++) {

                this.elements[i] = array[i + offset];
            }

            return this;
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];
            array[offset + 3] = te[3];

            array[offset + 4] = te[4];
            array[offset + 5] = te[5];
            array[offset + 6] = te[6];
            array[offset + 7] = te[7];

            array[offset + 8] = te[8];
            array[offset + 9] = te[9];
            array[offset + 10] = te[10];
            array[offset + 11] = te[11];

            array[offset + 12] = te[12];
            array[offset + 13] = te[13];
            array[offset + 14] = te[14];
            array[offset + 15] = te[15];

            return array;
        }
    }]);
    return Matrix4;
}();

var _decompose2 = function () {

    var vector = new Vector3$1();
    var matrix = new Matrix4();

    return function decompose(position, quaternion, scale) {

        var te = this.elements;

        var sx = vector.set(te[0], te[1], te[2]).length();
        var sy = vector.set(te[4], te[5], te[6]).length();
        var sz = vector.set(te[8], te[9], te[10]).length();

        // if determine is negative, we need to invert one scale
        var det = this.determinant();
        if (det < 0) sx = -sx;

        position.x = te[12];
        position.y = te[13];
        position.z = te[14];

        // scale the rotation part
        matrix.copy(this);

        var invSX = 1 / sx;
        var invSY = 1 / sy;
        var invSZ = 1 / sz;

        matrix.elements[0] *= invSX;
        matrix.elements[1] *= invSX;
        matrix.elements[2] *= invSX;

        matrix.elements[4] *= invSY;
        matrix.elements[5] *= invSY;
        matrix.elements[6] *= invSY;

        matrix.elements[8] *= invSZ;
        matrix.elements[9] *= invSZ;
        matrix.elements[10] *= invSZ;

        quaternion.setFromRotationMatrix(matrix);

        scale.x = sx;
        scale.y = sy;
        scale.z = sz;

        return this;
    };
}();

var Box3 = function () {
    function Box3(min, max) {
        classCallCheck(this, Box3);


        this.min = min !== undefined ? min : new Vector3$1(+Infinity, +Infinity, +Infinity);
        this.max = max !== undefined ? max : new Vector3$1(-Infinity, -Infinity, -Infinity);
        this.isBox3 = true;
    }

    createClass(Box3, [{
        key: 'set',
        value: function set$$1(min, max) {

            this.min.copy(min);
            this.max.copy(max);

            return this;
        }
    }, {
        key: 'setFromArray',
        value: function setFromArray(array) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = array.length; i < l; i += 3) {

                var x = array[i];
                var y = array[i + 1];
                var z = array[i + 2];

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;
        }
    }, {
        key: 'setFromBufferAttribute',
        value: function setFromBufferAttribute(attribute) {

            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;

            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;

            for (var i = 0, l = attribute.count; i < l; i++) {

                var x = attribute.getX(i);
                var y = attribute.getY(i);
                var z = attribute.getZ(i);

                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
            }

            this.min.set(minX, minY, minZ);
            this.max.set(maxX, maxY, maxZ);

            return this;
        }
    }, {
        key: 'setFromPoints',
        value: function setFromPoints(points) {

            this.makeEmpty();

            for (var i = 0, il = points.length; i < il; i++) {

                this.expandByPoint(points[i]);
            }

            return this;
        }
    }, {
        key: 'setFromCenterAndSize',
        value: function setFromCenterAndSize(center, size) {

            return _setFromCenterAndSize(center, size);
        }
    }, {
        key: 'setFromObject',
        value: function setFromObject(object) {

            this.makeEmpty();

            return this.expandByObject(object);
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(box) {

            this.min.copy(box.min);
            this.max.copy(box.max);

            return this;
        }
    }, {
        key: 'makeEmpty',
        value: function makeEmpty() {

            this.min.x = this.min.y = this.min.z = +Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;

            return this;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {

            // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
        }
    }, {
        key: 'getCenter',
        value: function getCenter(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return this.isEmpty() ? result.set(0, 0, 0) : result.addVectors(this.min, this.max).multiplyScalar(0.5);
        }
    }, {
        key: 'getSize',
        value: function getSize(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return this.isEmpty() ? result.set(0, 0, 0) : result.subVectors(this.max, this.min);
        }
    }, {
        key: 'expandByPoint',
        value: function expandByPoint(point) {

            this.min.min(point);
            this.max.max(point);

            return this;
        }
    }, {
        key: 'expandByVector',
        value: function expandByVector(vector) {

            this.min.sub(vector);
            this.max.add(vector);

            return this;
        }
    }, {
        key: 'expandByScalar',
        value: function expandByScalar(scalar) {

            this.min.addScalar(-scalar);
            this.max.addScalar(scalar);

            return this;
        }
    }, {
        key: 'expandByObject',
        value: function expandByObject(object) {
            return _expandByObject(object);
        }
    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {

            return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
        }
    }, {
        key: 'containsBox',
        value: function containsBox(box) {

            return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
        }
    }, {
        key: 'getParameter',
        value: function getParameter(point, optionalTarget) {

            // This can potentially have a divide by zero if the box
            // has a size dimension of 0.

            var result = optionalTarget || new Vector3$1();

            return result.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
        }
    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {

            // using 6 splitting planes to rule out intersections.
            return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
        }
    }, {
        key: 'intersectsSphere',
        value: function intersectsSphere(sphere) {
            return _intersectsSphere(sphere);
        }
    }, {
        key: 'intersectsPlane',
        value: function intersectsPlane(plane) {

            // We compute the minimum and maximum dot product values. If those values
            // are on the same side (back or front) of the plane, then there is no intersection.

            var min, max;

            if (plane.normal.x > 0) {

                min = plane.normal.x * this.min.x;
                max = plane.normal.x * this.max.x;
            } else {

                min = plane.normal.x * this.max.x;
                max = plane.normal.x * this.min.x;
            }

            if (plane.normal.y > 0) {

                min += plane.normal.y * this.min.y;
                max += plane.normal.y * this.max.y;
            } else {

                min += plane.normal.y * this.max.y;
                max += plane.normal.y * this.min.y;
            }

            if (plane.normal.z > 0) {

                min += plane.normal.z * this.min.z;
                max += plane.normal.z * this.max.z;
            } else {

                min += plane.normal.z * this.max.z;
                max += plane.normal.z * this.min.z;
            }

            return min <= plane.constant && max >= plane.constant;
        }
    }, {
        key: 'clampPoint',
        value: function clampPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.copy(point).clamp(this.min, this.max);
        }
    }, {
        key: 'distanceToPoint',
        value: function distanceToPoint(point) {
            return _distanceToPoint(point);
        }
    }, {
        key: 'getBoundingSphere',
        value: function getBoundingSphere(optionalTarget) {
            return _getBoundingSphere(optionalTarget);
        }
    }, {
        key: 'intersect',
        value: function intersect(box) {

            this.min.max(box.min);
            this.max.min(box.max);

            // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
            if (this.isEmpty()) this.makeEmpty();

            return this;
        }
    }, {
        key: 'union',
        value: function union(box) {

            this.min.min(box.min);
            this.max.max(box.max);

            return this;
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix) {
            return _applyMatrix(matrix);
        }
    }, {
        key: 'translate',
        value: function translate(offset) {

            this.min.add(offset);
            this.max.add(offset);

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(box) {

            return box.min.equals(this.min) && box.max.equals(this.max);
        }
    }]);
    return Box3;
}();

var _setFromCenterAndSize = function () {

    var v1 = new Vector3$1();

    return function setFromCenterAndSize(center, size) {

        var halfSize = v1.copy(size).multiplyScalar(0.5);

        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);

        return this;
    };
}();

var _expandByObject = function () {

    // Computes the world-axis-aligned bounding box of an object (including its children),
    // accounting for both the object's, and children's, world transforms

    var v1 = new Vector3$1();

    return function expandByObject(object) {

        var scope = this;

        object.updateMatrixWorld(true);

        object.traverse(function (node) {

            var i, l;

            var geometry = node.geometry;

            if (geometry !== undefined) {

                if (geometry.isGeometry) {

                    var vertices = geometry.vertices;

                    for (i = 0, l = vertices.length; i < l; i++) {

                        v1.copy(vertices[i]);
                        v1.applyMatrix4(node.matrixWorld);

                        scope.expandByPoint(v1);
                    }
                } else if (geometry.isBufferGeometry) {

                    var attribute = geometry.attributes.position;

                    if (attribute !== undefined) {

                        for (i = 0, l = attribute.count; i < l; i++) {

                            v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);

                            scope.expandByPoint(v1);
                        }
                    }
                }
            }
        });

        return this;
    };
}();

var _intersectsSphere = function () {

    var closestPoint = new Vector3$1();

    return function intersectsSphere(sphere) {

        // Find the point on the AABB closest to the sphere center.
        this.clampPoint(sphere.center, closestPoint);

        // If that point is inside the sphere, the AABB and sphere intersect.
        return closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    };
}();

var _distanceToPoint = function () {

    var v1 = new Vector3$1();

    return function distanceToPoint(point) {

        var clampedPoint = v1.copy(point).clamp(this.min, this.max);
        return clampedPoint.sub(point).length();
    };
}();

var _getBoundingSphere = function () {

    var v1 = new Vector3$1();

    return function getBoundingSphere(optionalTarget) {

        var result = optionalTarget || new Sphere();

        this.getCenter(result.center);

        result.radius = this.getSize(v1).length() * 0.5;

        return result;
    };
}();

var _applyMatrix = function () {

    var points = [new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1(), new Vector3$1()];

    return function applyMatrix4(matrix) {

        // transform of empty box is an empty box.
        if (this.isEmpty()) return this;

        // NOTE: I am using a binary pattern to specify all 2^3 combinations below
        points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
        points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
        points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
        points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
        points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
        points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
        points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
        points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111

        this.setFromPoints(points);

        return this;
    };
}();

var box = new Box3();

var Sphere = function () {
    function Sphere(center, radius) {
        classCallCheck(this, Sphere);

        this.center = center !== undefined ? center : new Vector3$1();
        this.radius = radius !== undefined ? radius : 0;
    }

    createClass(Sphere, [{
        key: 'set',
        value: function set$$1(center, radius) {

            this.center.copy(center);
            this.radius = radius;

            return this;
        }
    }, {
        key: 'setFromPoints',
        value: function setFromPoints(points, optionalCenter) {

            var center = this.center;

            if (optionalCenter !== undefined) {

                center.copy(optionalCenter);
            } else {

                box.setFromPoints(points).getCenter(center);
            }

            var maxRadiusSq = 0;

            for (var i = 0, il = points.length; i < il; i++) {

                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
            }

            this.radius = Math.sqrt(maxRadiusSq);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(sphere) {

            this.center.copy(sphere.center);
            this.radius = sphere.radius;

            return this;
        }
    }, {
        key: 'empty',
        value: function empty() {

            return this.radius <= 0;
        }
    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {

            return point.distanceToSquared(this.center) <= this.radius * this.radius;
        }
    }, {
        key: 'distanceToPoint',
        value: function distanceToPoint(point) {

            return point.distanceTo(this.center) - this.radius;
        }
    }, {
        key: 'intersectsSphere',
        value: function intersectsSphere(sphere) {

            var radiusSum = this.radius + sphere.radius;

            return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
        }
    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {

            return box.intersectsSphere(this);
        }
    }, {
        key: 'intersectsPlane',
        value: function intersectsPlane(plane) {

            return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
        }
    }, {
        key: 'clampPoint',
        value: function clampPoint(point, optionalTarget) {

            var deltaLengthSq = this.center.distanceToSquared(point);

            var result = optionalTarget || new Vector3$1();

            result.copy(point);

            if (deltaLengthSq > this.radius * this.radius) {

                result.sub(this.center).normalize();
                result.multiplyScalar(this.radius).add(this.center);
            }

            return result;
        }
    }, {
        key: 'getBoundingBox',
        value: function getBoundingBox(optionalTarget) {

            var box = optionalTarget || new Box3();

            box.set(this.center, this.center);
            box.expandByScalar(this.radius);

            return box;
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix) {

            this.center.applyMatrix4(matrix);
            this.radius = this.radius * matrix.getMaxScaleOnAxis();

            return this;
        }
    }, {
        key: 'translate',
        value: function translate(offset) {

            this.center.add(offset);

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(sphere) {

            return sphere.center.equals(this.center) && sphere.radius === this.radius;
        }
    }]);
    return Sphere;
}();

var v1$2 = new Vector3$1();

var Matrix3 = function () {
    function Matrix3() {
        classCallCheck(this, Matrix3);

        this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

        if (arguments.length > 0) {

            console.error('Matrix3: the constructor no longer reads arguments. use .set() instead.');
        }
        this.isMatrix3 = true;
    }

    createClass(Matrix3, [{
        key: 'set',
        value: function set$$1(n11, n12, n13, n21, n22, n23, n31, n32, n33) {

            var te = this.elements;

            te[0] = n11;te[1] = n21;te[2] = n31;
            te[3] = n12;te[4] = n22;te[5] = n32;
            te[6] = n13;te[7] = n23;te[8] = n33;

            return this;
        }
    }, {
        key: 'identity',
        value: function identity() {

            this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().fromArray(this.elements);
        }
    }, {
        key: 'copy',
        value: function copy(m) {

            var te = this.elements;
            var me = m.elements;

            te[0] = me[0];te[1] = me[1];te[2] = me[2];
            te[3] = me[3];te[4] = me[4];te[5] = me[5];
            te[6] = me[6];te[7] = me[7];te[8] = me[8];

            return this;
        }
    }, {
        key: 'setFromMatrix4',
        value: function setFromMatrix4(m) {

            var me = m.elements;

            this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);

            return this;
        }
    }, {
        key: 'applyToBufferAttribute',
        value: function applyToBufferAttribute(attribute) {

            for (var i = 0, l = attribute.count; i < l; i++) {

                v1$2.x = attribute.getX(i);
                v1$2.y = attribute.getY(i);
                v1$2.z = attribute.getZ(i);

                v1$2.applyMatrix3(this);

                attribute.setXYZ(i, v1$2.x, v1$2.y, v1$2.z);
            }

            return attribute;
        }
    }, {
        key: 'setUvTransform',
        value: function setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {

            var c = Math.cos(rotation);
            var s = Math.sin(rotation);

            this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
        }
    }, {
        key: 'multiply',
        value: function multiply(m) {

            return this.multiplyMatrices(this, m);
        }
    }, {
        key: 'premultiply',
        value: function premultiply(m) {

            return this.multiplyMatrices(m, this);
        }
    }, {
        key: 'multiplyMatrices',
        value: function multiplyMatrices(a, b) {

            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;

            var a11 = ae[0],
                a12 = ae[3],
                a13 = ae[6];
            var a21 = ae[1],
                a22 = ae[4],
                a23 = ae[7];
            var a31 = ae[2],
                a32 = ae[5],
                a33 = ae[8];

            var b11 = be[0],
                b12 = be[3],
                b13 = be[6];
            var b21 = be[1],
                b22 = be[4],
                b23 = be[7];
            var b31 = be[2],
                b32 = be[5],
                b33 = be[8];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31;
            te[3] = a11 * b12 + a12 * b22 + a13 * b32;
            te[6] = a11 * b13 + a12 * b23 + a13 * b33;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31;
            te[4] = a21 * b12 + a22 * b22 + a23 * b32;
            te[7] = a21 * b13 + a22 * b23 + a23 * b33;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31;
            te[5] = a31 * b12 + a32 * b22 + a33 * b32;
            te[8] = a31 * b13 + a32 * b23 + a33 * b33;

            return this;
        }
    }, {
        key: 'multiplyScalar',
        value: function multiplyScalar(s) {

            var te = this.elements;

            te[0] *= s;te[3] *= s;te[6] *= s;
            te[1] *= s;te[4] *= s;te[7] *= s;
            te[2] *= s;te[5] *= s;te[8] *= s;

            return this;
        }
    }, {
        key: 'determinant',
        value: function determinant() {

            var te = this.elements;

            var a = te[0],
                b = te[1],
                c = te[2],
                d = te[3],
                e = te[4],
                f = te[5],
                g = te[6],
                h = te[7],
                i = te[8];

            return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
        }
    }, {
        key: 'getInverse',
        value: function getInverse(matrix, throwOnDegenerate) {

            if (matrix && matrix.isMatrix4) {

                console.error("Matrix3: .getInverse() no longer takes a Matrix4 argument.");
            }

            var me = matrix.elements,
                te = this.elements,
                n11 = me[0],
                n21 = me[1],
                n31 = me[2],
                n12 = me[3],
                n22 = me[4],
                n32 = me[5],
                n13 = me[6],
                n23 = me[7],
                n33 = me[8],
                t11 = n33 * n22 - n32 * n23,
                t12 = n32 * n13 - n33 * n12,
                t13 = n23 * n12 - n22 * n13,
                det = n11 * t11 + n21 * t12 + n31 * t13;

            if (det === 0) {

                var msg = "Matrix3: .getInverse() can't invert matrix, determinant is 0";

                if (throwOnDegenerate === true) {

                    throw new Error(msg);
                } else {

                    console.warn(msg);
                }

                return this.identity();
            }

            var detInv = 1 / det;

            te[0] = t11 * detInv;
            te[1] = (n31 * n23 - n33 * n21) * detInv;
            te[2] = (n32 * n21 - n31 * n22) * detInv;

            te[3] = t12 * detInv;
            te[4] = (n33 * n11 - n31 * n13) * detInv;
            te[5] = (n31 * n12 - n32 * n11) * detInv;

            te[6] = t13 * detInv;
            te[7] = (n21 * n13 - n23 * n11) * detInv;
            te[8] = (n22 * n11 - n21 * n12) * detInv;

            return this;
        }
    }, {
        key: 'transpose',
        value: function transpose() {

            var tmp,
                m = this.elements;

            tmp = m[1];m[1] = m[3];m[3] = tmp;
            tmp = m[2];m[2] = m[6];m[6] = tmp;
            tmp = m[5];m[5] = m[7];m[7] = tmp;

            return this;
        }
    }, {
        key: 'getNormalMatrix',
        value: function getNormalMatrix(matrix4) {

            return this.setFromMatrix4(matrix4).getInverse(this).transpose();
        }
    }, {
        key: 'transposeIntoArray',
        value: function transposeIntoArray(r) {

            var m = this.elements;

            r[0] = m[0];
            r[1] = m[3];
            r[2] = m[6];
            r[3] = m[1];
            r[4] = m[4];
            r[5] = m[7];
            r[6] = m[2];
            r[7] = m[5];
            r[8] = m[8];

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(matrix) {

            var te = this.elements;
            var me = matrix.elements;

            for (var i = 0; i < 9; i++) {

                if (te[i] !== me[i]) return false;
            }

            return true;
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            for (var i = 0; i < 9; i++) {

                this.elements[i] = array[i + offset];
            }

            return this;
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            var te = this.elements;

            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];

            array[offset + 3] = te[3];
            array[offset + 4] = te[4];
            array[offset + 5] = te[5];

            array[offset + 6] = te[6];
            array[offset + 7] = te[7];
            array[offset + 8] = te[8];

            return array;
        }
    }]);
    return Matrix3;
}();

var v1$1 = new Vector3$1();
var v2$1 = new Vector3$1();

var v3 = new Vector3$1();

var v4 = new Vector3$1();
var m1 = new Matrix3();

var Plane = function () {
    function Plane(normal, constant) {
        classCallCheck(this, Plane);

        // normal is assumed to be normalized

        this.normal = normal !== undefined ? normal : new Vector3$1(1, 0, 0);
        this.constant = constant !== undefined ? constant : 0;
    }

    createClass(Plane, [{
        key: 'set',
        value: function set$$1(normal, constant) {

            this.normal.copy(normal);
            this.constant = constant;

            return this;
        }
    }, {
        key: 'setComponents',
        value: function setComponents(x, y, z, w) {

            this.normal.set(x, y, z);
            this.constant = w;

            return this;
        }
    }, {
        key: 'setFromNormalAndCoplanarPoint',
        value: function setFromNormalAndCoplanarPoint(normal, point) {

            this.normal.copy(normal);
            this.constant = -point.dot(this.normal);

            return this;
        }
    }, {
        key: 'setFromCoplanarPoints',
        value: function setFromCoplanarPoints(a, b, c) {

            var normal = v1$1.subVectors(c, b).cross(v2$1.subVectors(a, b)).normalize();

            // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

            this.setFromNormalAndCoplanarPoint(normal, a);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(plane) {

            this.normal.copy(plane.normal);
            this.constant = plane.constant;

            return this;
        }
    }, {
        key: 'normalize',
        value: function normalize() {

            // Note: will lead to a divide by zero if the plane is invalid.

            var inverseNormalLength = 1.0 / this.normal.length();
            this.normal.multiplyScalar(inverseNormalLength);
            this.constant *= inverseNormalLength;

            return this;
        }
    }, {
        key: 'negate',
        value: function negate() {

            this.constant *= -1;
            this.normal.negate();

            return this;
        }
    }, {
        key: 'distanceToPoint',
        value: function distanceToPoint(point) {

            return this.normal.dot(point) + this.constant;
        }
    }, {
        key: 'distanceToSphere',
        value: function distanceToSphere(sphere) {

            return this.distanceToPoint(sphere.center) - sphere.radius;
        }
    }, {
        key: 'projectPoint',
        value: function projectPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
        }
    }, {
        key: 'intersectLine',
        value: function intersectLine(line, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            var direction = line.delta(v3);

            var denominator = this.normal.dot(direction);

            if (denominator === 0) {

                // line is coplanar, return origin
                if (this.distanceToPoint(line.start) === 0) {

                    return result.copy(line.start);
                }

                // Unsure if this is the correct method to handle this case.
                return undefined;
            }

            var t = -(line.start.dot(this.normal) + this.constant) / denominator;

            if (t < 0 || t > 1) {

                return undefined;
            }

            return result.copy(direction).multiplyScalar(t).add(line.start);
        }
    }, {
        key: 'intersectsLine',
        value: function intersectsLine(line) {

            // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

            var startSign = this.distanceToPoint(line.start);
            var endSign = this.distanceToPoint(line.end);

            return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
        }
    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {

            return box.intersectsPlane(this);
        }
    }, {
        key: 'intersectsSphere',
        value: function intersectsSphere(sphere) {

            return sphere.intersectsPlane(this);
        }
    }, {
        key: 'coplanarPoint',
        value: function coplanarPoint(optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.normal).multiplyScalar(-this.constant);
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix, optionalNormalMatrix) {

            var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix(matrix);

            var referencePoint = this.coplanarPoint(v4).applyMatrix4(matrix);

            var normal = this.normal.applyMatrix3(normalMatrix).normalize();

            this.constant = -referencePoint.dot(normal);

            return this;
        }
    }, {
        key: 'translate',
        value: function translate(offset) {

            this.constant -= offset.dot(this.normal);

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(plane) {

            return plane.normal.equals(this.normal) && plane.constant === this.constant;
        }
    }]);
    return Plane;
}();

var Frustum = function () {
    function Frustum(p0, p1, p2, p3, p4, p5) {
        classCallCheck(this, Frustum);

        this.planes = [p0 !== undefined ? p0 : new Plane(), p1 !== undefined ? p1 : new Plane(), p2 !== undefined ? p2 : new Plane(), p3 !== undefined ? p3 : new Plane(), p4 !== undefined ? p4 : new Plane(), p5 !== undefined ? p5 : new Plane()];
    }

    createClass(Frustum, [{
        key: 'set',
        value: function set$$1(p0, p1, p2, p3, p4, p5) {

            var planes = this.planes;

            planes[0].copy(p0);
            planes[1].copy(p1);
            planes[2].copy(p2);
            planes[3].copy(p3);
            planes[4].copy(p4);
            planes[5].copy(p5);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(frustum) {

            var planes = this.planes;

            for (var i = 0; i < 6; i++) {

                planes[i].copy(frustum.planes[i]);
            }

            return this;
        }
    }, {
        key: 'setFromMatrix',
        value: function setFromMatrix(m) {

            var planes = this.planes;
            var me = m.elements;
            var me0 = me[0],
                me1 = me[1],
                me2 = me[2],
                me3 = me[3];
            var me4 = me[4],
                me5 = me[5],
                me6 = me[6],
                me7 = me[7];
            var me8 = me[8],
                me9 = me[9],
                me10 = me[10],
                me11 = me[11];
            var me12 = me[12],
                me13 = me[13],
                me14 = me[14],
                me15 = me[15];

            planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
            planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
            planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
            planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
            planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
            planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

            return this;
        }
    }, {
        key: 'intersectsObject',
        value: function intersectsObject(object) {
            var cb = _intersectsObject.bind(this);
            return cb(object);
        }
    }, {
        key: 'intersectsSprite',
        value: function intersectsSprite(sprite) {
            var cb = _intersectsSprite.bind(this);
            return cb(sprite);
        }
    }, {
        key: 'intersectsSphere',
        value: function intersectsSphere(sphere) {

            var planes = this.planes;
            var center = sphere.center;
            var negRadius = -sphere.radius;

            for (var i = 0; i < 6; i++) {

                var distance = planes[i].distanceToPoint(center);

                if (distance < negRadius) {

                    return false;
                }
            }

            return true;
        }
    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {
            var cb = _intersectsBox.bind(this);
            return cb(box);
        }
    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {

            var planes = this.planes;

            for (var i = 0; i < 6; i++) {

                if (planes[i].distanceToPoint(point) < 0) {

                    return false;
                }
            }

            return true;
        }
    }]);
    return Frustum;
}();

var _intersectsObject = function () {

    var sphere = new Sphere();

    return function intersectsObject(object) {

        var geometry = object.geometry;

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);

        return this.intersectsSphere(sphere);
    };
}();

var _intersectsSprite = function () {

    var sphere = new Sphere();

    return function intersectsSprite(sprite) {

        sphere.center.set(0, 0, 0);
        sphere.radius = 0.7071067811865476;
        sphere.applyMatrix4(sprite.matrixWorld);

        return this.intersectsSphere(sphere);
    };
}();

var _intersectsBox = function () {

    var p1 = new Vector3$1(),
        p2 = new Vector3$1();

    return function intersectsBox(box) {

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            var plane = planes[i];

            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
            p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
            p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
            p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

            var d1 = plane.distanceToPoint(p1);
            var d2 = plane.distanceToPoint(p2);

            // if both outside plane, no intersection

            if (d1 < 0 && d2 < 0) {

                return false;
            }
        }

        return true;
    };
}();

var WebGLExtensions = function () {
    function WebGLExtensions(gl) {
        classCallCheck(this, WebGLExtensions);

        this._gl = gl;
        this.extensions = {};
    }

    createClass(WebGLExtensions, [{
        key: 'get',
        value: function get$$1(name) {
            var _extension = this.extensions[name];
            if (_extension !== undefined) {
                return _extension;
            }

            _extension = this._gl.getExtension(name);

            if (_extension === null) {
                console.warn('WebGLRenderer: ' + name + ' extension not supported.');
            }

            this.extensions[name] = _extension;

            return _extension;
        }
    }]);
    return WebGLExtensions;
}();

/**
 * @class WebGLProperties
 * @description 将Material相关的设置转换为对应的渲染参数并关联起来
 * @author bujue
 */

var WebGLProperties = function () {
    function WebGLProperties() {
        classCallCheck(this, WebGLProperties);

        //WeakMap 可以通过一个对象作用key 再关联一个新的对象,  作为key的对象是弱引用
        this._properties = new WeakMap();
    }

    createClass(WebGLProperties, [{
        key: "get",
        value: function get$$1(object) {

            var map = this._properties.get(object);

            if (map === undefined) {

                map = {};
                this._properties.set(object, map);
            }

            return map;
        }
    }, {
        key: "remove",
        value: function remove(object) {

            this._properties.delete(object);
        }
    }, {
        key: "update",
        value: function update(object, key, value) {

            this._properties.get(object)[key] = value;
        }
    }, {
        key: "dispose",
        value: function dispose() {

            this._properties = new WeakMap();
        }
    }]);
    return WebGLProperties;
}();

/**
 * @description 获取运行环境的Webgl的支持能力
 * @author bujue
 * 
 * @returns
 * getMaxPrecision      获得Shader计算的最大精度 highp mediump lowp  
 * maxTextures          单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量
 * maxCombinedTextures  所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80 
 * maxTextureSize       可以接受的最大纹理如 2048 4096 8192
 * maxCubemapSize       可以接受的最大cube纹理如 2048 4096 8192
 * maxAttributes        最大可支持的顶点属性的个数 高性能的可以支持16个,低性能的小于这个数
 * maxVertexUniforms    顶点着色器中Uniform的最大个数 
 * maxFragmentUniforms  片元着色器中Uniform的最大个数
 * maxVaryings          着色器中最多的 VARYING 变量个数 
 */

var WebGLCapabilities = function () {
    function WebGLCapabilities(gl, parameters) {
        classCallCheck(this, WebGLCapabilities);

        parameters = parameters || {};
        this._gl = gl;

        //单个片段着色器能访问的纹理单元数，最低16，一般16或32, 获取纹理单元TEXTURE0，TEXTURE1，TEXTURE2...的最大数量;
        this.maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        //所有片段着色器总共能访问的纹理单元数（一个program可以有多个fragment shader），最低48，一般48~80
        this.maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

        //顶点着色器中最大的纹理单元  http://blog.sina.com.cn/s/blog_15ff4f4c80102whpt.html 
        //todo 暂时用不到
        //this.maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
        //可以接受的最大纹理如 2048 4096 8192
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        //可以接受的最大cube纹理如 2048 4096 8192
        this.maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        //最大可支持的顶点属性的个数
        this.maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
        //顶点着色器中Uniform的最大个数
        this.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        //片元着色器中Uniform的最大个数 
        this.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
        //着色器中最多的 VARYING 变量个数  
        this.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);

        //todo 单次绘制顶点的最大个数目前还不清楚如何获取
        this.precision = parameters.precision !== undefined ? parameters.precision : 'highp';
        this.precision = this.getMaxPrecision(this.precision);
    }

    //获得Shader计算的最大精度 highp mediump lowp  


    createClass(WebGLCapabilities, [{
        key: 'getMaxPrecision',
        value: function getMaxPrecision(precision) {
            var gl = this._gl;
            precision = precision || 'highp';
            if (precision === 'highp') {

                if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {

                    return 'highp';
                }

                precision = 'mediump';
            }

            if (precision === 'mediump') {

                if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {

                    return 'mediump';
                }
            }

            return 'lowp';
        }
    }]);
    return WebGLCapabilities;
}();

/**
 * @description 获取运行环境的Webgl的支持能力
 * @author bujue
 */

var WebGLUtils = function () {
    function WebGLUtils(gl) {
        var _map;

        classCallCheck(this, WebGLUtils);

        this.gl = gl;
        this._map = (_map = {}, defineProperty(_map, RepeatWrapping, gl.REPEAT), defineProperty(_map, ClampToEdgeWrapping, gl.MIRRORED_REPEAT), defineProperty(_map, MirroredRepeatWrapping, gl.MIRRORED_REPEAT), defineProperty(_map, NearestFilter, gl.NEAREST), defineProperty(_map, NearestMipMapNearestFilter, gl.NEAREST_MIPMAP_NEAREST), defineProperty(_map, NearestMipMapLinearFilter, gl.NEAREST_MIPMAP_LINEAR), defineProperty(_map, LinearFilter, gl.LINEAR), defineProperty(_map, LinearMipMapNearestFilter, gl.LINEAR_MIPMAP_NEAREST), defineProperty(_map, LinearMipMapLinearFilter, gl.LINEAR_MIPMAP_LINEAR), defineProperty(_map, UnsignedByteType, gl.UNSIGNED_BYTE), defineProperty(_map, UnsignedShort4444Type, gl.UNSIGNED_SHORT_4_4_4_4), defineProperty(_map, UnsignedShort5551Type, gl.UNSIGNED_SHORT_5_5_5_1), defineProperty(_map, UnsignedShort565Type, gl.UNSIGNED_SHORT_5_6_5), defineProperty(_map, ByteType, gl.BYTE), defineProperty(_map, ShortType, gl.SHORT), defineProperty(_map, UnsignedShortType, gl.UNSIGNED_SHORT), defineProperty(_map, IntType, gl.INT), defineProperty(_map, UnsignedIntType, gl.UNSIGNED_INT), defineProperty(_map, FloatType, gl.FLOAT), defineProperty(_map, AlphaFormat, gl.ALPHA), defineProperty(_map, RGBFormat, gl.RGB), defineProperty(_map, RGBAFormat, gl.RGBA), defineProperty(_map, LuminanceFormat, gl.LUMINANCE), defineProperty(_map, LuminanceAlphaFormat, gl.LUMINANCE_ALPHA), defineProperty(_map, DepthFormat, gl.DEPTH_COMPONENT), defineProperty(_map, DepthStencilFormat, gl.DEPTH_STENCIL), defineProperty(_map, AddEquation, gl.FUNC_ADD), defineProperty(_map, SubtractEquation, gl.FUNC_SUBTRACT), defineProperty(_map, ReverseSubtractEquation, gl.FUNC_REVERSE_SUBTRACT), defineProperty(_map, ZeroFactor, gl.ZERO), defineProperty(_map, OneFactor, gl.ONE), defineProperty(_map, SrcColorFactor, gl.SRC_COLOR), defineProperty(_map, OneMinusSrcColorFactor, gl.ONE_MINUS_SRC_COLOR), defineProperty(_map, SrcAlphaFactor, gl.SRC_ALPHA), defineProperty(_map, OneMinusSrcAlphaFactor, gl.ONE_MINUS_SRC_ALPHA), defineProperty(_map, DstAlphaFactor, gl.DST_ALPHA), defineProperty(_map, OneMinusDstAlphaFactor, gl.ONE_MINUS_DST_ALPHA), defineProperty(_map, DstColorFactor, gl.DST_COLOR), defineProperty(_map, OneMinusDstColorFactor, gl.ONE_MINUS_DST_COLOR), defineProperty(_map, SrcAlphaSaturateFactor, gl.SRC_ALPHA_SATURATE), _map);
    }

    createClass(WebGLUtils, [{
        key: 'convert',
        value: function convert(p) {

            if (this._map[p] !== undefined) return this._map[p];
            return 0;
        }
    }]);
    return WebGLUtils;
}();

var ColorBuffer = function () {
    function ColorBuffer(gl) {
        classCallCheck(this, ColorBuffer);

        this.gl = gl;
        this._currentColorMask = null;
        this._currentColorClear = new Vector4(0, 0, 0, 0);
    }
    //关闭颜色通道 red green blue alpha


    createClass(ColorBuffer, [{
        key: "setMask",
        value: function setMask(colorMask) {
            if (this._currentColorMask !== colorMask) {

                this.gl.colorMask(colorMask, colorMask, colorMask, colorMask);
                this._currentColorMask = colorMask;
            }
        }
        //设置清除色 r g b a 为[0-1]

    }, {
        key: "setClear",
        value: function setClear(r, g, b, a, premultipliedAlpha) {

            if (premultipliedAlpha === true) {

                r *= a;g *= a;b *= a;
            }

            var color = new Vector4(r, g, b, a);

            if (this._currentColorClear.equals(color) === false) {

                this.gl.clearColor(r, g, b, a);
                this._currentColorClear.copy(color);
            }
            color = null;
        }
    }, {
        key: "reset",
        value: function reset() {
            this._currentColorMask = null;
            this._currentColorClear.set(-1, 0, 0, 0); // set to invalid state
        }
    }]);
    return ColorBuffer;
}();

var DepthBuffer = function () {
    function DepthBuffer(gl) {
        classCallCheck(this, DepthBuffer);

        this.gl = gl;
        this._currentDepthFunc = null;
        this._currentDepthClear = null;
        this._currentDepthMask = null;
        this._switch = new Switch(gl);
    }

    createClass(DepthBuffer, [{
        key: "setTest",
        value: function setTest(depthTest) {
            var gl = this.gl;
            if (depthTest) {

                this._switch.enable(gl.DEPTH_TEST);
            } else {

                this._switch.disable(gl.DEPTH_TEST);
            }
        }
        //不透明与透明物体共存是,绘制透明物体需要锁定深度缓冲即:setMask(true)

    }, {
        key: "setMask",
        value: function setMask(depthMask) {
            var gl = this.gl;
            if (this._currentDepthMask !== depthMask) {

                gl.depthMask(depthMask);
                this._currentDepthMask = depthMask;
            }
        }
    }, {
        key: "setClear",
        value: function setClear(depth) {
            var gl = this.gl;
            if (this._currentDepthClear !== depth) {

                gl.clearDepth(depth);
                this._currentDepthClear = depth;
            }
        }
    }, {
        key: "setFunc",
        value: function setFunc(depthFunc) {
            var gl = this.gl;

            if (this._currentDepthFunc !== depthFunc) {

                if (depthFunc) {

                    switch (depthFunc) {

                        case NeverDepth:

                            gl.depthFunc(gl.NEVER);
                            break;

                        case AlwaysDepth:

                            gl.depthFunc(gl.ALWAYS);
                            break;

                        case LessDepth:

                            gl.depthFunc(gl.LESS);
                            break;

                        case LessEqualDepth:

                            gl.depthFunc(gl.LEQUAL);
                            break;

                        case EqualDepth:

                            gl.depthFunc(gl.EQUAL);
                            break;

                        case GreaterEqualDepth:

                            gl.depthFunc(gl.GEQUAL);
                            break;

                        case GreaterDepth:

                            gl.depthFunc(gl.GREATER);
                            break;

                        case NotEqualDepth:

                            gl.depthFunc(gl.NOTEQUAL);
                            break;

                        default:

                            gl.depthFunc(gl.LEQUAL);

                    }
                } else {

                    gl.depthFunc(gl.LEQUAL);
                }

                this._currentDepthFunc = depthFunc;
            }
        }
    }, {
        key: "reset",
        value: function reset() {

            this._currentDepthMask = null;
            this._currentDepthFunc = null;
            this._currentDepthClear = null;
        }
    }]);
    return DepthBuffer;
}();

var StencilBuffer = function () {
    function StencilBuffer(gl) {
        classCallCheck(this, StencilBuffer);

        this.gl = gl;
        this.switch = new Switch(gl);
        this._currentStencilClear = null;
    }

    createClass(StencilBuffer, [{
        key: "setTest",
        value: function setTest(stencilTest) {
            var gl = this.gl;
            if (stencilTest) {

                this.switch.enable(gl.STENCIL_TEST);
            } else {

                this.switch.disable(gl.STENCIL_TEST);
            }
        }
    }, {
        key: "setClear",
        value: function setClear(stencil) {

            if (this._currentStencilClear !== stencil) {

                this.gl.clearStencil(stencil);
                this._currentStencilClear = stencil;
            }
        }
    }, {
        key: "reset",
        value: function reset() {

            this._currentStencilClear = null;
        }
    }]);
    return StencilBuffer;
}();

var capabilitiesSwitch = {};

var Switch = function () {
    function Switch(gl) {
        classCallCheck(this, Switch);

        this.gl = gl;
    }

    createClass(Switch, [{
        key: "enable",
        value: function enable(id) {
            if (capabilitiesSwitch[id] !== true) {

                this.gl.enable(id);
                capabilitiesSwitch[id] = true;
            }
        }
    }, {
        key: "disable",
        value: function disable(id) {
            if (capabilitiesSwitch[id] !== false) {

                this.gl.disable(id);
                capabilitiesSwitch[id] = false;
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            capabilitiesSwitch = {};
        }
    }]);
    return Switch;
}();

var AttributeSwitch = function () {
    function AttributeSwitch(gl, extensions) {
        classCallCheck(this, AttributeSwitch);

        this.gl = gl;
        this._extensions = extensions;
        var capabilities = new WebGLCapabilities(gl);
        var maxVertexAttributes = capabilities.maxAttributes;
        //回收
        capabilities = null;

        this._newAttributes = new Uint8Array(maxVertexAttributes);
        this._enabledAttributes = new Uint8Array(maxVertexAttributes);
        this._attributeDivisors = new Uint8Array(maxVertexAttributes);
    }

    createClass(AttributeSwitch, [{
        key: "initAttributes",
        value: function initAttributes() {

            for (var i = 0, l = this._newAttributes.length; i < l; i++) {

                this._newAttributes[i] = 0;
            }
        }
    }, {
        key: "enableAttributeAndDivisor",
        value: function enableAttributeAndDivisor(attribute, meshPerAttribute) {

            this._newAttributes[attribute] = 1;

            if (this._enabledAttributes[attribute] === 0) {

                this.gl.enableVertexAttribArray(attribute);
                this._enabledAttributes[attribute] = 1;
            }

            if (this._attributeDivisors[attribute] !== meshPerAttribute) {

                var extension = this._extensions.get('ANGLE_instanced_arrays');

                extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
                this._attributeDivisors[attribute] = meshPerAttribute;
            }
        }
    }, {
        key: "disableUnusedAttributes",
        value: function disableUnusedAttributes() {
            for (var i = 0, l = this._enabledAttributes.length; i !== l; ++i) {

                if (this._enabledAttributes[i] !== this._newAttributes[i]) {

                    this.gl.disableVertexAttribArray(i);
                    this._enabledAttributes[i] = 0;
                }
            }
        }
    }, {
        key: "reset",
        value: function reset() {

            for (var i = 0; i < this._enabledAttributes.length; i++) {

                if (this._enabledAttributes[i] === 1) {

                    this.gl.disableVertexAttribArray(i);
                    this._enabledAttributes[i] = 0;
                }
            }
        }
    }]);
    return AttributeSwitch;
}();

var BlendingState = function () {
    function BlendingState(gl) {
        classCallCheck(this, BlendingState);

        this.gl = gl;

        this._currentBlendEquation = null;
        this._currentBlendSrc = null;
        this._currentBlendDst = null;
        this._currentBlendEquationAlpha = null;
        this._currentBlendSrcAlpha = null;
        this._currentBlendDstAlpha = null;

        this._switch = new Switch(gl);
    }

    createClass(BlendingState, [{
        key: "setBlending",
        value: function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
            var gl = this.gl;

            var utils = new WebGLUtils(gl);

            if (blending !== NoBlending) {

                this._switch.enable(gl.BLEND);
            } else {

                this._switch.disable(gl.BLEND);
            }

            if (blending !== CustomBlending) {

                if (blending !== this._currentBlending || premultipliedAlpha !== this._currentPremultipledAlpha) {

                    switch (blending) {

                        case AdditiveBlending:

                            if (premultipliedAlpha) {

                                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                                gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);
                            } else {

                                gl.blendEquation(gl.FUNC_ADD);
                                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                            }
                            break;

                        case SubtractiveBlending:

                            if (premultipliedAlpha) {

                                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                                gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
                            } else {

                                gl.blendEquation(gl.FUNC_ADD);
                                gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
                            }
                            break;

                        case MultiplyBlending:

                            if (premultipliedAlpha) {

                                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                                gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
                            } else {

                                gl.blendEquation(gl.FUNC_ADD);
                                gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
                            }
                            break;

                        default:

                            if (premultipliedAlpha) {

                                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                                gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                            } else {

                                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                            }

                    }
                }

                this._currentBlendEquation = null;
                this._currentBlendSrc = null;
                this._currentBlendDst = null;
                this._currentBlendEquationAlpha = null;
                this._currentBlendSrcAlpha = null;
                this._currentBlendDstAlpha = null;
            } else {

                blendEquationAlpha = blendEquationAlpha || blendEquation;
                blendSrcAlpha = blendSrcAlpha || blendSrc;
                blendDstAlpha = blendDstAlpha || blendDst;

                if (blendEquation !== this._currentBlendEquation || blendEquationAlpha !== this._currentBlendEquationAlpha) {

                    gl.blendEquationSeparate(utils.convert(blendEquation), utils.convert(blendEquationAlpha));

                    this._currentBlendEquation = blendEquation;
                    this._currentBlendEquationAlpha = blendEquationAlpha;
                }

                if (blendSrc !== this._currentBlendSrc || blendDst !== this._currentBlendDst || blendSrcAlpha !== this._currentBlendSrcAlpha || blendDstAlpha !== this._currentBlendDstAlpha) {

                    gl.blendFuncSeparate(utils.convert(blendSrc), utils.convert(blendDst), utils.convert(blendSrcAlpha), utils.convert(blendDstAlpha));

                    this._currentBlendSrc = blendSrc;
                    this._currentBlendDst = blendDst;
                    this._currentBlendSrcAlpha = blendSrcAlpha;
                    this._currentBlendDstAlpha = blendDstAlpha;
                }
            }

            this._currentBlending = blending;
            this._currentPremultipledAlpha = premultipliedAlpha;
            utils = null;
        }
    }, {
        key: "reset",
        value: function reset() {
            this._currentBlendEquation = null;
            this._currentBlendSrc = null;
            this._currentBlendDst = null;
            this._currentBlendEquationAlpha = null;
            this._currentBlendSrcAlpha = null;
            this._currentBlendDstAlpha = null;
        }
    }]);
    return BlendingState;
}();

var TextureState = function () {
    function TextureState(gl) {
        classCallCheck(this, TextureState);

        this.gl = gl;

        this._currentTextureSlot = null;
        this._currentBoundTextures = {};
        this._currentTextureSlot = null;

        this._emptyTextures = {};

        this._emptyTextures[gl.TEXTURE_2D] = this.createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
        this._emptyTextures[gl.TEXTURE_CUBE_MAP] = this.createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
    }

    createClass(TextureState, [{
        key: "createTexture",
        value: function createTexture(type, target, count) {
            var gl = this.gl;
            var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.
            var texture = gl.createTexture();

            gl.bindTexture(type, texture);
            gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            for (var i = 0; i < count; i++) {

                gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }

            return texture;
        }
    }, {
        key: "activeTexture",
        value: function activeTexture(webglSlot) {
            var gl = this.gl;
            var _capabilities = new WebGLCapabilities(gl);
            var _maxTextures = _capabilities.maxCombinedTextures;

            if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + _maxTextures - 1;

            if (this._currentTextureSlot !== webglSlot) {

                gl.activeTexture(webglSlot);
                this._currentTextureSlot = webglSlot;
            }
            _capabilities = null;
        }
    }, {
        key: "bindTexture",
        value: function bindTexture(webglType, webglTexture) {
            var gl = this.gl;
            if (this._currentTextureSlot === null) {

                this.activeTexture();
            }

            var boundTexture = this._currentBoundTextures[this._currentTextureSlot];

            if (boundTexture === undefined) {

                boundTexture = { type: undefined, texture: undefined };
                this._currentBoundTextures[this._currentTextureSlot] = boundTexture;
            }

            if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {

                gl.bindTexture(webglType, webglTexture || this._emptyTextures[webglType]);

                boundTexture.type = webglType;
                boundTexture.texture = webglTexture;
            }
        }
    }, {
        key: "texImage2D",
        value: function texImage2D() {
            var gl = this.gl;
            try {
                gl.texImage2D.apply(gl, arguments);
            } catch (error) {
                console.error('WebGLState:', error);
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            this._currentTextureSlot = null;
            this._currentBoundTextures = {};
            this._currentTextureSlot = null;
        }
    }]);
    return TextureState;
}();

function getLineWidthAvailable(gl) {
    var lineWidthAvailable = false;
    var version = 0;
    var glVersion = gl.getParameter(gl.VERSION);

    if (glVersion.indexOf('WebGL') !== -1) {

        version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
        lineWidthAvailable = version >= 1.0;
    } else if (glVersion.indexOf('OpenGL ES') !== -1) {

        version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
        lineWidthAvailable = version >= 2.0;
    }
    return lineWidthAvailable;
}

var WebGLState = function () {
    function WebGLState(gl, extensions) {
        classCallCheck(this, WebGLState);

        this.gl = gl;

        this.buffers = {
            color: new ColorBuffer(gl),
            depth: new DepthBuffer(gl),
            stencil: new StencilBuffer(gl)
        };

        this._attributeSwitch = new AttributeSwitch(gl, extensions);
        this._switch = new Switch(gl);

        this._currentProgram = null;
        this._blendingState = new BlendingState(gl);
        this._currentFlipSided = null;

        this._currentPolygonOffsetFactor = null;
        this._currentPolygonOffsetUnits = null;

        this._currentLineWidth = null;

        this._textureState = new TextureState(gl);
        this._currentViewport = new Vector4();

        this._initState(gl);
    }

    createClass(WebGLState, [{
        key: "_initState",
        value: function _initState(gl) {

            this.buffers.color.setClear(1, 1, 1, 1);
            this.buffers.depth.setClear(1);
            this.buffers.stencil.setClear(0);

            this._switch.enable(gl.DEPTH_TEST);
            this.buffers.depth.setFunc(LessEqualDepth);

            this.setFlipSided(false);
            this.setCullFace(CullFaceBack);
            this._switch.enable(gl.CULL_FACE);

            this._switch.enable(gl.BLEND);
            this.setBlending(NormalBlending);
        }
    }, {
        key: "initAttributes",
        value: function initAttributes() {
            this._attributeSwitch.initAttributes();
        }
    }, {
        key: "enableAttribute",
        value: function enableAttribute(attribute) {
            this._attributeSwitch.enableAttributeAndDivisor(attribute, 0);
        }
    }, {
        key: "disableUnusedAttributes",
        value: function disableUnusedAttributes() {
            this._attributeSwitch.disableUnusedAttributes();
        }
    }, {
        key: "enableAttributeAndDivisor",
        value: function enableAttributeAndDivisor(attribute, meshPerAttribute) {
            this._attributeSwitch.enableAttributeAndDivisor(attribute, meshPerAttribute);
        }
    }, {
        key: "enable",
        value: function enable(id) {
            this._switch.enable(id);
        }
    }, {
        key: "disable",
        value: function disable(id) {
            this._switch.disable(id);
        }
    }, {
        key: "useProgram",
        value: function useProgram(program) {

            if (this._currentProgram !== program) {

                this.gl.useProgram(program);

                this._currentProgram = program;

                return true;
            }

            return false;
        }
    }, {
        key: "setBlending",
        value: function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
            this._blendingState.setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha);
        }
    }, {
        key: "setMaterial",
        value: function setMaterial(material, frontFaceCW) {
            var gl = this.gl;
            var depthBuffer = this.buffers.depth;
            var colorBuffer = this.buffers.color;
            //如果启用双面绘制,关闭背面剔除
            material.side === DoubleSide ? this._switch.disable(gl.CULL_FACE) : this._switch.enable(gl.CULL_FACE);

            var flipSided = material.side === BackSide;
            if (frontFaceCW) flipSided = !flipSided;

            this.setFlipSided(flipSided);

            material.transparent === true ? this.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha) : this.setBlending(NoBlending);

            depthBuffer.setFunc(material.depthFunc);
            depthBuffer.setTest(material.depthTest);
            depthBuffer.setMask(material.depthWrite);
            colorBuffer.setMask(material.colorWrite);

            this.setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
        }
    }, {
        key: "setFlipSided",
        value: function setFlipSided(flipSided) {
            var gl = this.gl;

            if (this._currentFlipSided !== flipSided) {

                if (flipSided) {

                    gl.frontFace(gl.CW);
                } else {

                    gl.frontFace(gl.CCW);
                }

                this._currentFlipSided = flipSided;
            }
        }
    }, {
        key: "setPolygonOffset",
        value: function setPolygonOffset(polygonOffset, factor, units) {

            var gl = this.gl;

            if (polygonOffset) {

                this._switch.enable(gl.POLYGON_OFFSET_FILL);

                if (this._currentPolygonOffsetFactor !== factor || this._currentPolygonOffsetUnits !== units) {

                    gl.polygonOffset(factor, units);

                    this._currentPolygonOffsetFactor = factor;
                    this._currentPolygonOffsetUnits = units;
                }
            } else {

                this._switch.disable(gl.POLYGON_OFFSET_FILL);
            }
        }
    }, {
        key: "setCullFace",
        value: function setCullFace(cullFace) {

            var gl = this.gl;

            if (cullFace !== CullFaceNone) {

                this._switch.enable(gl.CULL_FACE);

                if (cullFace !== this._currentCullFace) {

                    if (cullFace === CullFaceBack) {

                        gl.cullFace(gl.BACK);
                    } else if (cullFace === CullFaceFront) {

                        gl.cullFace(gl.FRONT);
                    } else {

                        gl.cullFace(gl.FRONT_AND_BACK);
                    }
                }
            } else {

                this._switch.disable(gl.CULL_FACE);
            }

            this._currentCullFace = cullFace;
        }
        //设置线条宽度只有部分浏览器支持,目前Chrome不支持,safari支持
        //https://www.cnblogs.com/twaver/p/7228687.html?utm_source=itdadao&utm_medium=referral
        //三角面画线方案 https://github.com/mattdesl/webgl-lines

    }, {
        key: "setLineWidth",
        value: function setLineWidth(width) {

            if (width !== this._currentLineWidth) {

                if (getLineWidthAvailable(this.gl)) this.gl.lineWidth(width);

                this._currentLineWidth = width;
            }
        }
    }, {
        key: "activeTexture",
        value: function activeTexture(webglSlot) {
            this._textureState.activeTexture(webglSlot);
        }
    }, {
        key: "bindTexture",
        value: function bindTexture(webglType, webglTexture) {
            this._textureState.bindTexture(webglType, webglTexture);
        }
    }, {
        key: "texImage2D",
        value: function texImage2D() {
            this._textureState.texImage2D.apply(this, arguments);
        }
    }, {
        key: "viewport",
        value: function viewport(_viewport) {
            var gl = this.gl;
            if (this._currentViewport.equals(_viewport) === false) {

                gl.viewport(_viewport.x, _viewport.y, _viewport.z, _viewport.w);
                this._currentViewport.copy(_viewport);
            }
        }
    }, {
        key: "reset",
        value: function reset() {

            this._attributeSwitch.reset();

            this._switch.reset();

            this._textureState.reset();

            this._currentProgram = null;

            this._blendingState.reset();

            this._currentFlipSided = null;
            this._currentCullFace = null;

            this.buffers.color.reset();
            this.buffers.depth.reset();
            this.buffers.stencil.reset();
        }
    }]);
    return WebGLState;
}();

/**
 * @class WebGLAttributes
 * @description 根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
 *              获取Buffer 更新(创建)buffer  删除buffer
 * @author bujue
 */

var WebGLAttributes = function () {
    function WebGLAttributes(gl) {
        classCallCheck(this, WebGLAttributes);

        this._buffers = new WeakMap();
        this.gl = gl;
    }

    //attribute 对象为BufferAttribute 的实例对象
    //bufferType的值为 gl.ARRAY_BUFFER  或 gl.ELEMENT_ARRAY_BUFFER


    createClass(WebGLAttributes, [{
        key: 'createBuffer',
        value: function createBuffer(attribute, bufferType) {
            var gl = this.gl;
            var array = attribute.array;
            var usage = attribute.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;

            var buffer = gl.createBuffer();

            gl.bindBuffer(bufferType, buffer);
            gl.bufferData(bufferType, array, usage);

            attribute.onUploadCallback();

            var type = typeArray2GLType(gl, array);

            return {
                buffer: buffer,
                type: type,
                bytesPerElement: array.BYTES_PER_ELEMENT,
                version: attribute.version
            };
        }
    }, {
        key: 'updateBuffer',
        value: function updateBuffer(buffer, attribute, bufferType) {
            var gl = this.gl;
            var array = attribute.array;
            var updateRange = attribute.updateRange;

            gl.bindBuffer(bufferType, buffer);

            if (attribute.dynamic === false) {

                gl.bufferData(bufferType, array, gl.STATIC_DRAW);
            } else if (updateRange.count === -1) {

                // Not using update ranges

                gl.bufferSubData(bufferType, 0, array);
            } else if (updateRange.count === 0) {

                console.error('WebGLObjects.updateBuffer: dynamic BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.');
            } else {

                gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

                updateRange.count = -1; // reset range
            }
        }
    }, {
        key: 'get',
        value: function get$$1(attribute) {

            if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

            return this._buffers.get(attribute);
        }
    }, {
        key: 'remove',
        value: function remove(attribute) {
            var gl = this.gl;
            if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

            var data = this._buffers.get(attribute);

            if (data) {

                gl.deleteBuffer(data.buffer);

                this._buffers.delete(attribute);
            }
        }
    }, {
        key: 'update',
        value: function update(attribute, bufferType) {

            if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;

            var data = this._buffers.get(attribute);

            if (data === undefined) {

                this._buffers.set(attribute, this.createBuffer(attribute, bufferType));
            } else if (data.version < attribute.version) {

                this.updateBuffer(data.buffer, attribute, bufferType);

                data.version = attribute.version;
            }
        }
    }]);
    return WebGLAttributes;
}();

//todo 如果其他地方也用到同样的操作可以提取到WebGLUtils类中


function typeArray2GLType(gl, array) {

    var type = gl.FLOAT;

    if (array instanceof Float32Array) {

        type = gl.FLOAT;
    } else if (array instanceof Float64Array) {

        console.warn('WebGLAttributes: Unsupported data buffer format: Float64Array.');
    } else if (array instanceof Uint16Array) {

        type = gl.UNSIGNED_SHORT;
    } else if (array instanceof Int16Array) {

        type = gl.SHORT;
    } else if (array instanceof Uint32Array) {

        type = gl.UNSIGNED_INT;
    } else if (array instanceof Int32Array) {

        type = gl.INT;
    } else if (array instanceof Int8Array) {

        type = gl.BYTE;
    } else if (array instanceof Uint8Array) {

        type = gl.UNSIGNED_BYTE;
    }
    return type;
}

/**
 * @class Vector2
 * @description 二维向量
 * @author bujue
 */

var Vector2 = function () {
	function Vector2(x, y) {
		classCallCheck(this, Vector2);

		this.x = x || 0;
		this.y = y || 0;
		this.isVector2 = true;
	}

	createClass(Vector2, [{
		key: 'set',
		value: function set$$1(x, y) {

			this.x = x;
			this.y = y;

			return this;
		}
	}, {
		key: 'clone',
		value: function clone() {

			return new this.constructor(this.x, this.y);
		}
	}, {
		key: 'copy',
		value: function copy(v) {

			this.x = v.x;
			this.y = v.y;

			return this;
		}
	}, {
		key: 'add',
		value: function add(v, w) {

			if (w !== undefined) {

				console.warn('Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
				return this.addVectors(v, w);
			}

			this.x += v.x;
			this.y += v.y;

			return this;
		}
	}, {
		key: 'addScalar',
		value: function addScalar(s) {

			this.x += s;
			this.y += s;

			return this;
		}
	}, {
		key: 'addVectors',
		value: function addVectors(a, b) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;
		}
	}, {
		key: 'addScaledVector',
		value: function addScaledVector(v, s) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;
		}
	}, {
		key: 'sub',
		value: function sub(v, w) {

			if (w !== undefined) {

				console.warn('Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
				return this.subVectors(v, w);
			}

			this.x -= v.x;
			this.y -= v.y;

			return this;
		}
	}, {
		key: 'subScalar',
		value: function subScalar(s) {

			this.x -= s;
			this.y -= s;

			return this;
		}
	}, {
		key: 'subVectors',
		value: function subVectors(a, b) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;
		}
	}, {
		key: 'multiply',
		value: function multiply(v) {

			this.x *= v.x;
			this.y *= v.y;

			return this;
		}
	}, {
		key: 'multiplyScalar',
		value: function multiplyScalar(scalar) {

			this.x *= scalar;
			this.y *= scalar;

			return this;
		}
	}, {
		key: 'divide',
		value: function divide(v) {

			this.x /= v.x;
			this.y /= v.y;

			return this;
		}
	}, {
		key: 'divideScalar',
		value: function divideScalar(scalar) {

			return this.multiplyScalar(1 / scalar);
		}
	}, {
		key: 'fromBufferAttribute',
		value: function fromBufferAttribute(attribute, index, offset) {

			if (offset !== undefined) {

				console.warn('Vector2: offset has been removed from .fromBufferAttribute().');
			}

			this.x = attribute.getX(index);
			this.y = attribute.getY(index);

			return this;
		}
	}, {
		key: 'width',
		get: function get$$1() {

			return this.x;
		},
		set: function set$$1(value) {

			this.x = value;
		}
	}, {
		key: 'height',
		get: function get$$1() {

			return this.y;
		},
		set: function set$$1(value) {

			this.y = value;
		}
	}]);
	return Vector2;
}();

/**
 * @class  BufferAttribute缓存属性
 * @description 这个类保存了和 缓存几何模型(BufferGeometry) 关联的属性数据。该类用来保存内置属性比如顶点位置、法相量和颜色等，也可以被用于保存自定义属性。
 * @author bujue
 */

var BufferAttribute = function () {
    function BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, BufferAttribute);


        if (Array.isArray(array)) {

            throw new TypeError('BufferAttribute: array should be a Typed Array.');
        }

        this.name = '';

        this.array = array;
        this.itemSize = itemSize;
        this.count = array !== undefined ? array.length / itemSize : 0;
        this.normalized = normalized === true;

        this.dynamic = false;
        this.updateRange = { offset: 0, count: -1 };

        this.version = 0;
        this.isBufferAttribute = true;
    }

    createClass(BufferAttribute, [{
        key: 'onUploadCallback',
        value: function onUploadCallback() {}
    }, {
        key: 'setDynamic',
        value: function setDynamic(value) {

            this.dynamic = value;

            return this;
        }
    }, {
        key: 'copyVector3sArray',
        value: function copyVector3sArray(vectors) {

            var array = this.array,
                offset = 0;

            for (var i = 0, l = vectors.length; i < l; i++) {

                var vector = vectors[i];

                if (vector === undefined) {

                    console.warn('BufferAttribute.copyVector3sArray(): vector is undefined', i);
                    vector = new Vector3$1();
                }

                array[offset++] = vector.x;
                array[offset++] = vector.y;
                array[offset++] = vector.z;
            }

            return this;
        }
    }, {
        key: 'copyColorsArray',
        value: function copyColorsArray(colors) {
            var array = this.array,
                offset = 0;

            for (var i = 0, l = colors.length; i < l; i++) {

                var color = colors[i];

                if (color === undefined) {

                    console.warn('BufferAttribute.copyColorsArray(): color is undefined', i);
                    color = new Color$1();
                }

                array[offset++] = color.r;
                array[offset++] = color.g;
                array[offset++] = color.b;
            }

            return this;
        }
    }, {
        key: 'copyArray',
        value: function copyArray(array) {
            this.array.set(array);
            return this;
        }
    }, {
        key: 'getX',
        value: function getX(index) {

            return this.array[index * this.itemSize];
        }
    }, {
        key: 'setX',
        value: function setX(index, x) {

            this.array[index * this.itemSize] = x;

            return this;
        }
    }, {
        key: 'getY',
        value: function getY(index) {

            return this.array[index * this.itemSize + 1];
        }
    }, {
        key: 'setY',
        value: function setY(index, y) {

            this.array[index * this.itemSize + 1] = y;

            return this;
        }
    }, {
        key: 'getZ',
        value: function getZ(index) {

            return this.array[index * this.itemSize + 2];
        }
    }, {
        key: 'setZ',
        value: function setZ(index, z) {

            this.array[index * this.itemSize + 2] = z;

            return this;
        }
    }, {
        key: 'getW',
        value: function getW(index) {

            return this.array[index * this.itemSize + 3];
        }
    }, {
        key: 'setW',
        value: function setW(index, w) {

            this.array[index * this.itemSize + 3] = w;

            return this;
        }
    }, {
        key: 'setXY',
        value: function setXY(index, x, y) {

            this.setX(index, x);
            this.setY(index, y);

            return this;
        }
    }, {
        key: 'setXYZ',
        value: function setXYZ(index, x, y, z) {

            this.setXY(index, x, y);
            this.setZ(index, z);

            return this;
        }
    }, {
        key: 'setXYZW',
        value: function setXYZW(index, x, y, z, w) {

            this.setXYZ(index, x, y, z);
            this.setW(index, w);

            return this;
        }
    }, {
        key: 'copyVector2sArray',
        value: function copyVector2sArray(vectors) {

            var array = this.array,
                offset = 0;

            for (var i = 0, l = vectors.length; i < l; i++) {

                var vector = vectors[i];

                if (vector === undefined) {

                    console.warn('BufferAttribute.copyVector2sArray(): vector is undefined', i);
                    vector = new Vector2();
                }

                array[offset++] = vector.x;
                array[offset++] = vector.y;
            }

            return this;
        }

        //todo 相关的方法使用到再定义

    }, {
        key: 'needsUpdate',
        set: function set$$1(value) {
            if (value === true) this.version++;
        }
    }]);
    return BufferAttribute;
}();

/**
 * @description
 * Int8Array 类型数组表示二进制补码8位有符号整数的数组。内容初始化为0。
 * 范围在[-255,255]
 * 数组中每个元素的大小值为1
 */


var Int8BufferAttribute = function (_BufferAttribute) {
    inherits(Int8BufferAttribute, _BufferAttribute);

    function Int8BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Int8BufferAttribute);
        return possibleConstructorReturn(this, (Int8BufferAttribute.__proto__ || Object.getPrototypeOf(Int8BufferAttribute)).call(this, new Int8Array(array), itemSize, normalized));
    }

    return Int8BufferAttribute;
}(BufferAttribute);
/**
 * @description 
 * Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */


var Uint8BufferAttribute = function (_BufferAttribute2) {
    inherits(Uint8BufferAttribute, _BufferAttribute2);

    function Uint8BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Uint8BufferAttribute);
        return possibleConstructorReturn(this, (Uint8BufferAttribute.__proto__ || Object.getPrototypeOf(Uint8BufferAttribute)).call(this, new Uint8Array(array), itemSize, normalized));
    }

    return Uint8BufferAttribute;
}(BufferAttribute);
/**
 * @description
 * Uint8ClampedArray（8位无符号整型固定数组）如果你指定一个在 [0,255] 区间外的值，它将被替换为0或255；如果你指定一个非整数，那么它将被设置为最接近它的整数。（数组）内容被初始化为0。
 * 范围在[0,255]
 * 数组中每个元素的大小值为1
 */


var Uint8ClampedBufferAttribute = function (_BufferAttribute3) {
    inherits(Uint8ClampedBufferAttribute, _BufferAttribute3);

    function Uint8ClampedBufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Uint8ClampedBufferAttribute);
        return possibleConstructorReturn(this, (Uint8ClampedBufferAttribute.__proto__ || Object.getPrototypeOf(Uint8ClampedBufferAttribute)).call(this, new Uint8ClampedArray(array), itemSize, normalized));
    }

    return Uint8ClampedBufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Int16Array 类型数组表示二进制补码16位有符号整数的数组。内容初始化为0。
 * 范围在[-65535,65536]
 * 数组中每个元素的大小值为2
 */


var Int16BufferAttribute = function (_BufferAttribute4) {
    inherits(Int16BufferAttribute, _BufferAttribute4);

    function Int16BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Int16BufferAttribute);
        return possibleConstructorReturn(this, (Int16BufferAttribute.__proto__ || Object.getPrototypeOf(Int16BufferAttribute)).call(this, new Int16Array(array), itemSize, normalized));
    }

    return Int16BufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Uint16Array 类型数组表示二进制补码16位无符号整数的数组。内容初始化为0。
 * 范围在[0,65536]
 * 数组中每个元素的大小值为2
 */


var Uint16BufferAttribute = function (_BufferAttribute5) {
    inherits(Uint16BufferAttribute, _BufferAttribute5);

    function Uint16BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Uint16BufferAttribute);
        return possibleConstructorReturn(this, (Uint16BufferAttribute.__proto__ || Object.getPrototypeOf(Uint16BufferAttribute)).call(this, new Uint16Array(array), itemSize, normalized));
    }

    return Uint16BufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Int32Array 类型数组表示二进制补码32位有符号整数的数组。内容初始化为0。
 * 范围在[-4294967295,4294967296]
 * 数组中每个元素的大小值为4
 */


var Int32BufferAttribute = function (_BufferAttribute6) {
    inherits(Int32BufferAttribute, _BufferAttribute6);

    function Int32BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Int32BufferAttribute);
        return possibleConstructorReturn(this, (Int32BufferAttribute.__proto__ || Object.getPrototypeOf(Int32BufferAttribute)).call(this, new Int32Array(array), itemSize, normalized));
    }

    return Int32BufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Uint32Array 类型数组表示二进制补码32位无符号整数的数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */


var Uint32BufferAttribute = function (_BufferAttribute7) {
    inherits(Uint32BufferAttribute, _BufferAttribute7);

    function Uint32BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Uint32BufferAttribute);
        return possibleConstructorReturn(this, (Uint32BufferAttribute.__proto__ || Object.getPrototypeOf(Uint32BufferAttribute)).call(this, new Uint32Array(array), itemSize, normalized));
    }

    return Uint32BufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Float32Array 类型数组表示二进制补码32位的浮点数型数组。内容初始化为0。
 * 范围在[0,4294967296]
 * 数组中每个元素的大小值为4
 */


var Float32BufferAttribute = function (_BufferAttribute8) {
    inherits(Float32BufferAttribute, _BufferAttribute8);

    function Float32BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Float32BufferAttribute);
        return possibleConstructorReturn(this, (Float32BufferAttribute.__proto__ || Object.getPrototypeOf(Float32BufferAttribute)).call(this, new Float32Array(array), itemSize, normalized));
    }

    return Float32BufferAttribute;
}(BufferAttribute);

/**
 * @description
 * Float64Array 类型数组表示二进制补码64位的浮点数型数组。内容初始化为0。
 * 数组中每个元素的大小值为8
 */


var Float64BufferAttribute = function (_BufferAttribute9) {
    inherits(Float64BufferAttribute, _BufferAttribute9);

    function Float64BufferAttribute(array, itemSize, normalized) {
        classCallCheck(this, Float64BufferAttribute);
        return possibleConstructorReturn(this, (Float64BufferAttribute.__proto__ || Object.getPrototypeOf(Float64BufferAttribute)).call(this, new Float64Array(array), itemSize, normalized));
    }

    return Float64BufferAttribute;
}(BufferAttribute);

/**
 * @class DirectGeometry 缓存属性
 * @description 主要对一个几何体的不同面,采用不同Material 渲染
 * @author bujue
 */

var DirectGeometry = function () {
    function DirectGeometry() {
        classCallCheck(this, DirectGeometry);

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

    createClass(DirectGeometry, [{
        key: 'computeGroups',
        value: function computeGroups(geometry) {

            var group = void 0;
            var groups = [];
            var materialIndex = undefined;

            var faces = geometry.faces;
            var i = 0;

            for (i = 0; i < faces.length; i++) {

                var face = faces[i];

                // materials

                if (face.materialIndex !== materialIndex) {

                    materialIndex = face.materialIndex;

                    if (group !== undefined) {

                        group.count = i * 3 - group.start;
                        groups.push(group);
                    }

                    group = {
                        start: i * 3,
                        materialIndex: materialIndex
                    };
                }
            }

            if (group !== undefined) {

                group.count = i * 3 - group.start;
                groups.push(group);
            }

            this.groups = groups;
        }
    }, {
        key: 'fromGeometry',
        value: function fromGeometry(geometry) {

            var faces = geometry.faces;
            var vertices = geometry.vertices;
            var faceVertexUvs = geometry.faceVertexUvs;

            var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
            var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;

            //todo  morphs 暂不开放


            //

            for (var i = 0; i < faces.length; i++) {

                var face = faces[i];

                this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);

                var vertexNormals = face.vertexNormals;

                if (vertexNormals.length === 3) {

                    this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
                } else {

                    var normal = face.normal;

                    this.normals.push(normal, normal, normal);
                }

                var vertexColors = face.vertexColors;

                if (vertexColors.length === 3) {

                    this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
                } else {

                    var color = face.color;

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
    }]);
    return DirectGeometry;
}();

/**
 * @class BufferGeometry 三维几何体的缓存基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */

var bufferGeometryId = 1;

var BufferGeometry = function (_Events) {
    inherits(BufferGeometry, _Events);

    function BufferGeometry() {
        classCallCheck(this, BufferGeometry);

        var _this = possibleConstructorReturn(this, (BufferGeometry.__proto__ || Object.getPrototypeOf(BufferGeometry)).call(this));

        Object.defineProperty(_this, 'id', { value: bufferGeometryId += 2 });
        _this.type = 'BufferGeometry';

        // 顶点索引
        _this.index = null;

        //包含 position  normal uv
        _this.attributes = {};

        _this.isBufferGeometry = true;

        _this.drawRange = { start: 0, count: Infinity };

        _this.groups = [];

        _this.boundingBox = null;
        _this.boundingSphere = null;

        _this.isBufferGeometry = true;

        return _this;
    }

    createClass(BufferGeometry, [{
        key: 'setIndex',
        value: function setIndex(index) {

            if (Array.isArray(index)) {

                this.index = new (_Math.arrayMax(index) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
            } else {

                this.index = index;
            }
        }
    }, {
        key: 'getIndex',
        value: function getIndex() {

            return this.index;
        }
    }, {
        key: 'addAttribute',
        value: function addAttribute(name, attribute) {

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
    }, {
        key: 'getAttribute',
        value: function getAttribute(name) {

            return this.attributes[name];
        }
    }, {
        key: 'removeAttribute',
        value: function removeAttribute(name) {

            delete this.attributes[name];

            return this;
        }
    }, {
        key: 'setFromObject',
        value: function setFromObject(object) {

            var geometry = object.geometry;

            if (object.isPoints || object.isLine) {

                var positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3);
                var colors = new Float32BufferAttribute(geometry.colors.length * 3, 3);

                this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
                this.addAttribute('color', colors.copyColorsArray(geometry.colors));

                if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {

                    var lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1);

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
    }, {
        key: 'fromGeometry',
        value: function fromGeometry(geometry) {

            geometry.__directGeometry = new DirectGeometry().fromGeometry(geometry);

            return this.fromDirectGeometry(geometry.__directGeometry);
        }
    }, {
        key: 'fromDirectGeometry',
        value: function fromDirectGeometry(geometry) {

            var positions = new Float32Array(geometry.vertices.length * 3);
            this.addAttribute('position', new BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));

            if (geometry.normals.length > 0) {

                var normals = new Float32Array(geometry.normals.length * 3);
                this.addAttribute('normal', new BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
            }

            if (geometry.colors.length > 0) {

                var colors = new Float32Array(geometry.colors.length * 3);
                this.addAttribute('color', new BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
            }

            if (geometry.uvs.length > 0) {

                var uvs = new Float32Array(geometry.uvs.length * 2);
                this.addAttribute('uv', new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
            }

            if (geometry.uvs2.length > 0) {

                var uvs2 = new Float32Array(geometry.uvs2.length * 2);
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
    }, {
        key: 'updateFromObject',
        value: function updateFromObject(object) {

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
    }, {
        key: 'computeBoundingBox',
        value: function computeBoundingBox() {

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
    }, {
        key: 'computeBoundingSphere',
        value: function computeBoundingSphere() {

            _computeBoundingSphere.call(this);
        }
    }, {
        key: 'addGroup',
        value: function addGroup(start, count, materialIndex) {

            this.groups.push({

                start: start,
                count: count,
                materialIndex: materialIndex !== undefined ? materialIndex : 0

            });
        }
    }, {
        key: 'clearGroups',
        value: function clearGroups() {

            this.groups = [];
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new BufferGeometry().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(source) {

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
    }, {
        key: 'dispose',
        value: function dispose() {

            this.fire({ type: 'dispose' });
        }
    }]);
    return BufferGeometry;
}(Events);

var _computeBoundingSphere = function () {

    var box = new Box3();
    var vector = new Vector3$1();

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
}();

/**
 * @class WebGLGeometries
 * @description 将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
 * @author bujue
 */

var WebGLGeometries = function () {
    function WebGLGeometries(gl, attributes, info) {
        classCallCheck(this, WebGLGeometries);

        this._gl = gl;
        this._geometries = {};
        this._attributes = attributes;
        this._info = info;
        this._wireframeAttributes = {};
    }

    createClass(WebGLGeometries, [{
        key: 'get',
        value: function get$$1(object, geometry) {

            var buffergeometry = this._geometries[geometry.id];

            if (buffergeometry) return buffergeometry;

            geometry.on('dispose', onGeometryDispose.bind(this));

            if (geometry.isBufferGeometry) {

                buffergeometry = geometry;
            } else if (geometry.isGeometry) {

                if (geometry._bufferGeometry === undefined) {

                    geometry._bufferGeometry = new BufferGeometry().setFromObject(object);
                }

                buffergeometry = geometry._bufferGeometry;
            }

            this._geometries[geometry.id] = buffergeometry;

            this._info.memory.geometries++;

            return buffergeometry;
        }
    }, {
        key: 'update',
        value: function update(geometry) {

            var gl = this._gl;
            var index = geometry.index;
            var geometryAttributes = geometry.attributes;

            if (index !== null) {

                this._attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
            }

            for (var name in geometryAttributes) {

                this._attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
            }

            // todo morph targets 暂时不开发

        }
    }, {
        key: 'getWireframeAttribute',
        value: function getWireframeAttribute(geometry) {

            var gl = this._gl;
            var arrayMax = _Math.arrayMax;
            var attribute = this._wireframeAttributes[geometry.id];

            if (attribute) return attribute;

            var indices = [];

            var geometryIndex = geometry.index;
            var geometryAttributes = geometry.attributes;

            // console.time( 'wireframe' );

            if (geometryIndex !== null) {

                var array = geometryIndex.array;

                for (var i = 0, l = array.length; i < l; i += 3) {

                    var a = array[i + 0];
                    var b = array[i + 1];
                    var c = array[i + 2];

                    indices.push(a, b, b, c, c, a);
                }
            } else {

                var _array = geometryAttributes.position.array;

                for (var _i = 0, _l = _array.length / 3 - 1; _i < _l; _i += 3) {

                    var _a = _i + 0;
                    var _b = _i + 1;
                    var _c = _i + 2;

                    indices.push(_a, _b, _b, _c, _c, _a);
                }
            }

            // console.timeEnd( 'wireframe' );

            attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);

            this._attributes.update(attribute, gl.ELEMENT_ARRAY_BUFFER);

            this._wireframeAttributes[geometry.id] = attribute;

            return attribute;
        }
    }]);
    return WebGLGeometries;
}();

function onGeometryDispose(event) {

    var geometry = event.target;
    var buffergeometry = this._geometries[geometry.id];
    if (!buffergeometry) return;

    if (buffergeometry.index !== null) {

        this._attributes.remove(buffergeometry.index);
    }

    for (var name in buffergeometry.attributes) {

        this._attributes.remove(buffergeometry.attributes[name]);
    }

    geometry.off('dispose', onGeometryDispose);

    delete this._geometries[geometry.id];

    // TODO Remove duplicate code

    var attribute = this._wireframeAttributes[geometry.id];

    if (attribute) {

        this._attributes.remove(attribute);
        delete this._wireframeAttributes[geometry.id];
    }

    // attribute = this._wireframeAttributes[buffergeometry.id];

    // if (attribute) {

    //     this._attributes.remove(attribute);
    //     delete this._wireframeAttributes[buffergeometry.id];

    // }

    //

    this._info.memory.geometries--;
}

var UniformsLib = {
	common: {

		diffuse: { value: new Color$1(0xeeeeee) },
		opacity: { value: 1.0 },

		map: { value: null },
		uvTransform: { value: new Matrix3() }

	},
	lights: {

		ambientLightColor: { value: [] },

		directionalLights: {
			value: [], properties: {
				direction: {},
				color: {}
			}
		},

		spotLights: {
			value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},

		pointLights: {
			value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		}

	},
	points: {

		diffuse: { value: new Color$1(0xeeeeee) },
		opacity: { value: 1.0 },
		size: { value: 1.0 },
		scale: { value: 1.0 },
		map: { value: null },
		uvTransform: { value: new Matrix3() }

	},
	line: {
		scale: { value: 1 },
		dashSize: { value: 1 },
		totalSize: { value: 2 }
	}
};

var UniformsUtils$1 = {

	merge: function merge(uniforms) {

		var merged = {};

		for (var u = 0; u < uniforms.length; u++) {

			var tmp = this.clone(uniforms[u]);

			for (var p in tmp) {

				merged[p] = tmp[p];
			}
		}

		return merged;
	},

	clone: function clone(uniforms_src) {

		var uniforms_dst = {};

		for (var u in uniforms_src) {

			uniforms_dst[u] = {};

			for (var p in uniforms_src[u]) {

				var parameter_src = uniforms_src[u][p];

				if (parameter_src && (parameter_src.isColor || parameter_src.isMatrix3 || parameter_src.isMatrix4 || parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 || parameter_src.isTexture)) {

					uniforms_dst[u][p] = parameter_src.clone();
				} else if (Array.isArray(parameter_src)) {

					uniforms_dst[u][p] = parameter_src.slice();
				} else {

					uniforms_dst[u][p] = parameter_src;
				}
			}
		}

		return uniforms_dst;
	}

};

var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n\tuniform sampler2D map;\n#endif\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\t\n\tgl_FragColor = diffuseColor;\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

var meshbasic_vert = "#if defined( USE_MAP ) \n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#if defined( USE_MAP ) \n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\n\t\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n}";

var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_COLOR\n\t    diffuseColor.rgb *= vColor;\n#endif\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\t\n}\n";

var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_COLOR\n\t    vColor.xyz = color.xyz;\n#endif\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n}\n";

var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\nvoid main() {\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *=  mapTexel ;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\t\n}\n";

var points_vert = "uniform float size;\nuniform float scale;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n\t#ifdef USE_COLOR\n\t    vColor.xyz = color.xyz;\n    #endif\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n}\n";

var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\n    uniform vec3 ambientLightColor;\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n\treflectedLight.indirectDiffuse =  ambientLightColor;\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\n#ifdef USE_MAP\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\nuniform vec3 ambientLightColor;\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_MAP  \n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\n\tvec3 objectNormal = vec3( normal );\n\tvec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\tvec3 diffuse = vec3( 1.0 );\n\tGeometricContext geometry;\n\tgeometry.position = mvPosition.xyz;\n\tgeometry.normal = normalize( transformedNormal );\n\tgeometry.viewDir = normalize( -mvPosition.xyz );\n\tGeometricContext backGeometry;\n\tbackGeometry.position = geometry.position;\n\tbackGeometry.normal = -geometry.normal;\n\tbackGeometry.viewDir = geometry.viewDir;\n\tvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\n\tIncidentLight directLight;\n\tfloat dotNL;\n\tvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n}\n";

var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n}\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef  USE_MAP\n\tvarying vec2 vUv;\n    uniform sampler2D map;\n#endif\nuniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n    varying vec3 vViewPosition;\n\tvarying vec3 vNormal;\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t\tirradiance *= PI;\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\tdiffuseColor *= texelColor;\n#endif\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\nfloat specularStrength = 1.0;\n\tvec3 normal = normalize( vNormal );\n#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#endif\n\tBlinnPhongMaterial material;\n    material.diffuseColor = diffuseColor.rgb;\n    material.specularColor = specular;\n    material.specularShininess = shininess;\n    material.specularStrength = specularStrength;\n    GeometricContext geometry;\n    geometry.position = - vViewPosition;\n    geometry.normal = normal;\n    geometry.viewDir = normalize( vViewPosition );\n    IncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n";

var meshphong_vert = "#define PHONG\n    varying vec3 vViewPosition;\n\tvarying vec3 vNormal;\n#ifdef USE_MAP \n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvoid main() {\n#ifdef USE_MAP\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif\nvec3 objectNormal = vec3( normal );\nvec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n\tvNormal = normalize( transformedNormal );\n\tvec3 transformed = vec3( position );\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n\tvViewPosition = - mvPosition.xyz;\n}\n";

var linemesh_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifdef USE_DASH\n    uniform float dashSize;\n    uniform float totalSize;\n    varying float vLineDistance;\n#endif\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\nvarying vec2 vUv;\nvoid main() {\n    #ifdef USE_DASH\n        if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard;\n    if ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n    #endif\n    if ( abs( vUv.y ) > 1.0 ) {\n        float a = vUv.x;\n        float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n        float len2 = a * a + b * b;\n        if ( len2 > 1.0 ) discard;\n    }\n    vec4 diffuseColor = vec4( diffuse, opacity );\n#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif\n    gl_FragColor =vec4( diffuseColor.rgb, diffuseColor.a );\n#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}";

var linemesh_vert = "uniform float linewidth;\nuniform vec2 resolution;\nattribute vec3 instanceStart;\nattribute vec3 instanceEnd;\nattribute vec3 instanceColorStart;\nattribute vec3 instanceColorEnd;\nvarying vec2 vUv;\n#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n#ifdef USE_DASH\n    uniform float scale;\n    attribute float instanceDistanceStart;\n    attribute float instanceDistanceEnd;\n    varying float vLineDistance;\n    \n#endif\nvoid trimSegment( const in vec4 start, inout vec4 end ) {\n    float a = projectionMatrix[ 2 ][ 2 ];    float b = projectionMatrix[ 3 ][ 2 ];    float nearEstimate = - 0.5 * b / a;\n    float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n    end.xyz = mix( start.xyz, end.xyz, alpha );\n}\nvoid main() {\n#ifdef USE_COLOR\n        vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n#endif\n#ifdef USE_DASH\n    vLineDistance = ( position.y < 0.5 ) ? scale * instanceDistanceStart : scale * instanceDistanceEnd;\n#endif\n    float aspect = resolution.x / resolution.y;\n    vUv = uv;\n    vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n    vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n    bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );    if ( perspective ) {\n        if ( start.z < 0.0 && end.z >= 0.0 ) {\n            trimSegment( start, end );\n        } else if ( end.z < 0.0 && start.z >= 0.0 ) {\n            trimSegment( end, start );\n        }\n    }\n    vec4 clipStart = projectionMatrix * start;\n    vec4 clipEnd = projectionMatrix * end;\n    vec2 ndcStart = clipStart.xy / clipStart.w;\n    vec2 ndcEnd = clipEnd.xy / clipEnd.w;\n    vec2 dir = ndcEnd - ndcStart;\n    dir.x *= aspect;\n    dir = normalize( dir );\n    vec2 offset = vec2( dir.y, - dir.x );\n    dir.x /= aspect;\n    offset.x /= aspect;\n    if ( position.x < 0.0 ) offset *= - 1.0;\n    if ( position.y < 0.0 ) {\n        offset += - dir;\n    } else if ( position.y > 1.0 ) {\n        offset += dir;\n    }\n    offset *= linewidth;\n    offset /= resolution.y;\n    vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n    offset *= clip.w;\n    clip.xy += offset;\n    gl_Position =clip;\n    vec4 mvPosition = ( position.y < 0.5 ) ? start : end;}";

var ShaderChunk = {

	meshbasic_frag: meshbasic_frag,
	meshbasic_vert: meshbasic_vert,

	linedashed_vert: linedashed_vert,
	linedashed_frag: linedashed_frag,

	points_vert: points_vert,
	points_frag: points_frag,

	meshlambert_vert: meshlambert_vert,
	meshlambert_frag: meshlambert_frag,

	meshphong_vert: meshphong_vert,
	meshphong_frag: meshphong_frag,

	linemesh_vert: linemesh_vert,
	linemesh_frag: linemesh_frag

};

var ShaderLib = {

	basic: {

		uniforms: UniformsUtils$1.merge([UniformsLib.common]),

		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag

	},
	lambert: {

		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
			emissive: { value: new Color$1(0x000000) }
		}]),

		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag

	},
	phong: {

		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.lights, {
			emissive: { value: new Color$1(0x000000) },
			specular: { value: new Color$1(0x111111) },
			shininess: { value: 30 }
		}]),

		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag

	},
	dashed: {
		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.line]),

		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag

	},
	linemesh: {
		uniforms: UniformsUtils$1.merge([UniformsLib.common, UniformsLib.line, {
			linewidth: { value: 1 },
			resolution: { value: new Vector2(1, 1) }
		}]),
		vertexShader: ShaderChunk.linemesh_vert,
		fragmentShader: ShaderChunk.linemesh_frag
	},
	points: {
		uniforms: UniformsUtils$1.merge([UniformsLib.points]
		//UniformsLib.fog
		),

		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag

	}

};

/**
 * @class WebGLInfo
 * @description 保存渲染的基本数据
 * @author bujue
 */

var WebGLInfo = function () {
    function WebGLInfo(gl) {
        classCallCheck(this, WebGLInfo);

        this.gl = gl;

        this.memory = {
            geometries: 0,
            textures: 0
        };

        this.render = {
            frame: 0,
            calls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };

        this.programs = null;
        this.autoReset = true;
    }

    createClass(WebGLInfo, [{
        key: 'update',
        value: function update(count, mode, instanceCount) {

            var gl = this.gl;
            instanceCount = instanceCount || 1;

            this.render.calls++;

            switch (mode) {

                case gl.TRIANGLES:
                    this.render.triangles += instanceCount * (count / 3);
                    break;

                case gl.TRIANGLE_STRIP:
                case gl.TRIANGLE_FAN:
                    this.render.triangles += instanceCount * (count - 2);
                    break;

                case gl.LINES:
                    this.render.lines += instanceCount * (count / 2);
                    break;

                case gl.LINE_STRIP:
                    this.render.lines += instanceCount * (count - 1);
                    break;

                case gl.LINE_LOOP:
                    this.render.lines += instanceCount * count;
                    break;

                case gl.POINTS:
                    this.render.points += instanceCount * count;
                    break;

                default:
                    console.error('WebGLInfo: Unknown draw mode:', mode);
                    break;

            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.render.frame++;
            this.render.calls = 0;
            this.render.triangles = 0;
            this.render.points = 0;
            this.render.lines = 0;
        }
    }]);
    return WebGLInfo;
}();

var textureId = 0;

var Texture = function (_Events) {
    inherits(Texture, _Events);

    function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        classCallCheck(this, Texture);

        var _this = possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this));

        Object.defineProperty(_this, 'id', { value: textureId++ });
        _this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;

        _this.mipmaps = [];
        _this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

        _this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
        _this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

        _this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
        _this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

        _this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

        _this.format = format !== undefined ? format : RGBAFormat;
        _this.type = type !== undefined ? type : UnsignedByteType;

        _this.offset = new Vector2(0, 0);
        _this.repeat = new Vector2(1, 1);
        _this.center = new Vector2(0, 0);
        _this.rotation = 0;

        _this.matrixAutoUpdate = true;
        _this.matrix = new Matrix3();

        _this.generateMipmaps = true;
        _this.premultiplyAlpha = false;
        _this.flipY = true;
        _this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

        //
        // Also changing the encoding after already used by a Material will not automatically make the Material
        // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
        // this.encoding = encoding !== undefined ? encoding :  LinearEncoding;

        _this.version = 0;
        _this.onUpdate = null;

        _this.isTexture = true;

        return _this;
    }

    createClass(Texture, [{
        key: 'updateMatrix',
        value: function updateMatrix() {

            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
        }
    }, {
        key: 'dispose',
        value: function dispose() {

            this.fire({ type: 'dispose' });
        }
    }, {
        key: 'needsUpdate',
        set: function set$$1(value) {
            if (value === true) this.version++;
        }
    }]);
    return Texture;
}(Events);

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

// import { CubeTexture } from '../../textures/CubeTexture.js';
/**
 * @class WebGLUniforms
 * @description Uniform 变量的赋值,不同类型,底层提供不同的赋值方法
 * @author bujue
 * gl.uniform1f (floatUniformLoc, v); // for float
 * gl.uniform1fv(floatUniformLoc, [v]);   // for float or float array
 * gl.uniform2f (vec2UniformLoc,  v0, v1);// for vec2
 * gl.uniform2fv(vec2UniformLoc,  [v0, v1]);  // for vec2 or vec2 array
 * gl.uniform3f (vec3UniformLoc,  v0, v1, v2);// for vec3
 * gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);  // for vec3 or vec3 array
 * gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);// for vec4
 * gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // for vec4 or vec4 array

 * gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // for mat2 or mat2 array
 * gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // for mat3 or mat3 array
 * gl.uniformMatrix4fv(mat4UniformLoc, false, [ 17x element array ])  // for mat4 or mat4 array

 * gl.uniform1i (intUniformLoc,   v); // for int
 * gl.uniform1iv(intUniformLoc, [v]); // for int or int array
 * gl.uniform2i (ivec2UniformLoc, v0, v1);// for ivec2
 * gl.uniform2iv(ivec2UniformLoc, [v0, v1]);  // for ivec2 or ivec2 array
 * gl.uniform3i (ivec3UniformLoc, v0, v1, v2);// for ivec3
 * gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);  // for ivec3 or ivec3 array
 * gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);// for ivec4
 * gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // for ivec4 or ivec4 array

 * gl.uniform1i (sampler2DUniformLoc,   v);   // for sampler2D (textures)
 * gl.uniform1iv(sampler2DUniformLoc, [v]);   // for sampler2D or sampler2D array

 * gl.uniform1i (samplerCubeUniformLoc,   v); // for samplerCube (textures)
 * gl.uniform1iv(samplerCubeUniformLoc, [v]); // for samplerCube or samplerCube array
 */

var WebGLUniforms = function () {
    function WebGLUniforms(gl, program, renderer) {
        classCallCheck(this, WebGLUniforms);

        this._gl = gl;
        this._program = program;
        this._renderer = renderer;
        this.seq = [];
        this.map = {};

        var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (var i = 0; i < n; ++i) {

            var info = gl.getActiveUniform(program, i),
                addr = gl.getUniformLocation(program, info.name);

            parseUniform(info, addr, this);
        }
    }

    createClass(WebGLUniforms, [{
        key: 'setValue',
        value: function setValue(name, value) {

            var u = this.map[name];

            if (u !== undefined) u.setValue(value, this._renderer);
        }
    }, {
        key: 'setOptional',
        value: function setOptional(object, name) {
            //保留,暂时用不到

            var v = object[name];

            if (v !== undefined) this.setValue(name, v);
        }
    }], [{
        key: 'upload',
        value: function upload(gl, seq, values, renderer) {

            for (var i = 0, n = seq.length; i !== n; ++i) {

                var u = seq[i],
                    v = values[u.id];

                if (v.needsUpdate !== false) {

                    // note: always updating when .needsUpdate is undefined
                    u.setValue(v.value, renderer);
                }
            }
        }
    }, {
        key: 'seqWithValue',
        value: function seqWithValue(seq, values) {

            var r = [];

            for (var i = 0, n = seq.length; i !== n; ++i) {

                var u = seq[i];
                if (u.id in values) r.push(u);
            }

            return r;
        }
    }]);
    return WebGLUniforms;
}();

var StructuredUniform = function () {
    function StructuredUniform(gl, id) {
        classCallCheck(this, StructuredUniform);


        this._gl = gl;
        this.id = id;
        this.seq = [];
        this.map = {};
    }

    createClass(StructuredUniform, [{
        key: 'setValue',
        value: function setValue(value) {

            // Note: Don't need an extra 'renderer' parameter, since samplers
            // are not allowed in structured uniforms.

            var seq = this.seq;

            for (var i = 0, n = seq.length; i !== n; ++i) {

                var u = seq[i];
                u.setValue(value[u.id]);
            }
        }
    }]);
    return StructuredUniform;
}();

// --- Uniform Classes ---

var SingleUniform = function SingleUniform(gl, id, activeInfo, addr) {
    classCallCheck(this, SingleUniform);

    this._gl = gl;
    this.id = id;
    this.addr = addr;
    this.cache = [];
    this.setValue = getSingularSetter(activeInfo.type);

    // this.path = activeInfo.name; // DEBUG
};

var PureArrayUniform = function PureArrayUniform(gl, id, activeInfo, addr) {
    classCallCheck(this, PureArrayUniform);

    this._gl = gl;
    this.id = id;
    this.addr = addr;
    this.cache = [];
    this.size = activeInfo.size;
    this.setValue = getPureArraySetter(activeInfo.type);

    // this.path = activeInfo.name; // DEBUG
};

function getSingularSetter(type) {
    switch (type) {

        case 0x1406:
            return setValue1f; // FLOAT
        case 0x8b50:
            return setValue2fv; // _VEC2
        case 0x8b51:
            return setValue3fv; // _VEC3
        case 0x8b52:
            return setValue4fv; // _VEC4

        case 0x8b5a:
            return setValue2fm; // _MAT2
        case 0x8b5b:
            return setValue3fm; // _MAT3
        case 0x8b5c:
            return setValue4fm; // _MAT4

        case 0x8b5e:case 0x8d66:
            return setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
        // case 0x8b60: return setValueT6; // SAMPLER_CUBE

        case 0x1404:case 0x8b56:
            return setValue1i; // INT, BOOL
        case 0x8b53:case 0x8b57:
            return setValue2iv; // _VEC2
        case 0x8b54:case 0x8b58:
            return setValue3iv; // _VEC3
        case 0x8b55:case 0x8b59:
            return setValue4iv; // _VEC4

    }
}

function getPureArraySetter(type) {

    switch (type) {

        case 0x1406:
            return setValue1fv; // FLOAT
        case 0x8b50:
            return setValueV2a; // _VEC2
        case 0x8b51:
            return setValueV3a; // _VEC3
        case 0x8b52:
            return setValueV4a; // _VEC4

        case 0x8b5a:
            return setValueM2a; // _MAT2
        case 0x8b5b:
            return setValueM3a; // _MAT3
        case 0x8b5c:
            return setValueM4a; // _MAT4

        case 0x8b5e:
            return setValueT1a; // SAMPLER_2D
        //  case 0x8b60: return setValueT6a; // SAMPLER_CUBE

        case 0x1404:case 0x8b56:
            return setValue1iv; // INT, BOOL
        case 0x8b53:case 0x8b57:
            return setValue2iv; // _VEC2
        case 0x8b54:case 0x8b58:
            return setValue3iv; // _VEC3
        case 0x8b55:case 0x8b59:
            return setValue4iv; // _VEC4

    }
}

function parseUniform(activeInfo, addr, container) {

    var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
    var path = activeInfo.name,
        pathLength = path.length;

    // reset RegExp object, because of the early exit of a previous run
    RePathPart.lastIndex = 0;

    while (true) {

        var match = RePathPart.exec(path),
            matchEnd = RePathPart.lastIndex,
            id = match[1],
            idIsIndex = match[2] === ']',
            subscript = match[3];

        if (idIsIndex) id = id | 0; // convert to integer

        if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {

            // bare name or "pure" bottom-level array "[0]" suffix

            addUniform(container, subscript === undefined ? new SingleUniform(container._gl, id, activeInfo, addr) : new PureArrayUniform(container._gl, id, activeInfo, addr));

            break;
        } else {

            // step into inner node / create it in case it doesn't exist

            var map = container.map,
                next = map[id];

            if (next === undefined) {

                next = new StructuredUniform(container._gl, id);
                addUniform(container, next);
            }

            container = next;
        }
    }
}

function addUniform(container, uniformObject) {

    container.seq.push(uniformObject);
    container.map[uniformObject.id] = uniformObject;
}
// Array Caches (provide typed arrays for temporary by size)

var arrayCacheF32 = [];
var arrayCacheI32 = [];

var arrayUtils = {
    mat2array: new Float32Array(4),
    mat3array: new Float32Array(9),
    mat4array: new Float32Array(16),
    emptyTexture: new Texture(),
    // emptyCubeTexture: new CubeTexture(),
    arraysEqual: function arraysEqual(a, b) {

        if (a.length !== b.length) return false;

        for (var i = 0, l = a.length; i < l; i++) {

            if (a[i] !== b[i]) return false;
        }

        return true;
    },
    copyArray: function copyArray(a, b) {

        for (var i = 0, l = b.length; i < l; i++) {

            a[i] = b[i];
        }
    },
    flatten: function flatten(array, nBlocks, blockSize) {

        var firstElem = array[0];

        if (firstElem <= 0 || firstElem > 0) return array;
        // unoptimized: ! isNaN( firstElem )
        // see http://jacksondunstan.com/articles/983

        var n = nBlocks * blockSize,
            r = arrayCacheF32[n];

        if (r === undefined) {

            r = new Float32Array(n);
            arrayCacheF32[n] = r;
        }

        if (nBlocks !== 0) {

            firstElem.toArray(r, 0);

            for (var i = 1, offset = 0; i !== nBlocks; ++i) {

                offset += blockSize;
                array[i].toArray(r, offset);
            }
        }

        return r;
    },
    allocTexUnits: function allocTexUnits(renderer, n) {

        var r = arrayCacheI32[n];

        if (r === undefined) {

            r = new Int32Array(n);
            arrayCacheI32[n] = r;
        }

        for (var i = 0; i !== n; ++i) {
            r[i] = renderer.allocTextureUnit();
        }return r;
    }
};

// --- Setters ---


function setValue1f(v) {

    var cache = this.cache;

    if (cache[0] === v) return;

    this._gl.uniform1f(this.addr, v);

    cache[0] = v;
}

function setValue1i(v) {

    var cache = this.cache;

    if (cache[0] === v) return;

    this._gl.uniform1i(this.addr, v);

    cache[0] = v;
}

// Single float vector (from flat array or MMGL.VectorN)

function setValue2fv(v) {

    var cache = this.cache;

    if (v.x !== undefined) {
        //XY

        if (cache[0] !== v.x || cache[1] !== v.y) {

            this._gl.uniform2f(this.addr, v.x, v.y);

            cache[0] = v.x;
            cache[1] = v.y;
        }
    } else {
        //arr[2]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform2fv(this.addr, v);

        arrayUtils.copyArray(cache, v);
    }
}

function setValue3fv(v) {

    var cache = this.cache;

    if (v.x !== undefined) {
        //XYZ

        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {

            this._gl.uniform3f(this.addr, v.x, v.y, v.z);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
        }
    } else if (v.r !== undefined) {
        //RGB

        if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {

            this._gl.uniform3f(this.addr, v.r, v.g, v.b);

            cache[0] = v.r;
            cache[1] = v.g;
            cache[2] = v.b;
        }
    } else {
        //arr[3]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform3fv(this.addr, v);

        arrayUtils.copyArray(cache, v);
    }
}

function setValue4fv(v) {

    var cache = this.cache;

    if (v.x !== undefined) {
        //XYZW

        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {

            this._gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;
        }
    } else {
        //arr[4]

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniform4fv(this.addr, v);

        arrayUtils.copyArray(cache, v);
    }
}

// Single matrix (from flat array or MatrixN)

function setValue2fm(v) {

    var cache = this.cache;
    var elements = v.elements;

    if (elements === undefined) {
        //v is Float32Array 4

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix2fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);
    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat2array.set(elements);

        this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.mat2array);

        arrayUtils.copyArray(cache, elements);
    }
}

function setValue3fm(v) {

    var cache = this.cache;
    var elements = v.elements;

    if (elements === undefined) {

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix3fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);
    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat3array.set(elements);

        this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.mat3array);

        arrayUtils.copyArray(cache, elements);
    }
}

function setValue4fm(v) {

    var cache = this.cache;
    var elements = v.elements;

    if (elements === undefined) {

        if (arrayUtils.arraysEqual(cache, v)) return;

        this._gl.uniformMatrix4fv(this.addr, false, v);

        arrayUtils.copyArray(cache, v);
    } else {

        if (arrayUtils.arraysEqual(cache, elements)) return;

        arrayUtils.mat4array.set(elements);

        this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.mat4array);

        arrayUtils.copyArray(cache, elements);
    }
}

// Single texture (2D / Cube)

function setValueT1(v, renderer) {

    var cache = this.cache;
    var unit = renderer.allocTextureUnit();

    if (cache[0] !== unit) {

        this._gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }

    renderer.setTexture2D(v || arrayUtils.emptyTexture, unit);
}

// function setValueT6(v, renderer) {

//     let cache = this.cache;
//     let unit = renderer.allocTextureUnit();

//     if (cache[0] !== unit) {

//         this._gl.uniform1i(this.addr, unit);
//         cache[0] = unit;

//     }

//     renderer.setTextureCube(v || arrayUtils.emptyCubeTexture, unit);

// }

// Integer / Boolean vectors or arrays thereof (always flat arrays)

function setValue2iv(v) {

    var cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform2iv(this.addr, v);

    arrayUtils.copyArray(cache, v);
}

function setValue3iv(v) {

    var cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform3iv(this.addr, v);

    arrayUtils.copyArray(cache, v);
}

function setValue4iv(v) {

    var cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform4iv(this.addr, v);

    arrayUtils.copyArray(cache, v);
}

// Array of scalars

function setValue1fv(v) {

    var cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform1fv(this.addr, v);

    arrayUtils.copyArray(cache, v);
}
function setValue1iv(v) {

    var cache = this.cache;

    if (arrayUtils.arraysEqual(cache, v)) return;

    this._gl.uniform1iv(this.addr, v);

    arrayUtils.copyArray(cache, v);
}

function setValueV2a(v) {

    this._gl.uniform2fv(this.addr, arrayUtils.flatten(v, this.size, 2));
}

function setValueV3a(v) {

    this._gl.uniform3fv(this.addr, arrayUtils.flatten(v, this.size, 3));
}

function setValueV4a(v) {

    this._gl.uniform4fv(this.addr, arrayUtils.flatten(v, this.size, 4));
}

function setValueM2a(v) {

    this._gl.uniformMatrix2fv(this.addr, false, arrayUtils.flatten(v, this.size, 4));
}

function setValueM3a(v) {

    this._gl.uniformMatrix3fv(this.addr, false, arrayUtils.flatten(v, this.size, 9));
}

function setValueM4a(v) {

    this._gl.uniformMatrix4fv(this.addr, false, arrayUtils.flatten(v, this.size, 16));
}

// Array of textures (2D / Cube)

function setValueT1a(v, renderer) {

    var cache = this.cache;
    var n = v.length;

    var units = arrayUtils.allocTexUnits(renderer, n);

    if (arrayUtils.arraysEqual(cache, units) === false) {

        this._gl.uniform1iv(this.addr, units);
        arrayUtils.copyArray(cache, units);
    }

    for (var i = 0; i !== n; ++i) {

        renderer.setTexture2D(v[i] || arrayUtils.emptyTexture, units[i]);
    }
}

function addLineNumbers(string) {

	var lines = string.split('\n');

	for (var i = 0; i < lines.length; i++) {

		lines[i] = i + 1 + ': ' + lines[i];
	}

	return lines.join('\n');
}

function WebGLShader(gl, type, string) {

	var shader = gl.createShader(type);

	gl.shaderSource(shader, string);
	gl.compileShader(shader);

	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {

		console.error('WebGLShader: Shader couldn\'t compile.');
	}

	if (gl.getShaderInfoLog(shader) !== '') {

		console.warn('WebGLShader: gl.getShaderInfoLog()', type === gl.VERTEX_SHADER ? 'vertex' : 'fragment', gl.getShaderInfoLog(shader), addLineNumbers(string));
	}

	// --enable-privileged-webgl-extension
	// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

	return shader;
}

/**
 * @class WebGLProgram
 * @description  组织shader code ,生成 program 对象
 * @author bujue
 */
var programIdCount = 0;

var WebGLProgram = function () {
    function WebGLProgram(gl, extensions, material, code, shader, parameters) {
        classCallCheck(this, WebGLProgram);

        this._gl = gl;
        this._defines = material.defines;

        this._cachedUniforms = undefined;
        this._cachedAttributes = undefined;

        this.name = shader.name;
        this.id = programIdCount++;
        this.code = code;
        this.usedTimes = 1;
        this.program = null;
        this.vertexShader = '';
        this.fragmentShader = '';

        this._init(gl, extensions, material, shader, parameters);
    }

    createClass(WebGLProgram, [{
        key: '_init',
        value: function _init(gl, extensions, material, shader, parameters) {

            var vertexShader = shader.vertexShader;
            var fragmentShader = shader.fragmentShader;

            var customExtensions = generateExtensions(material.extensions, parameters, extensions);

            var customDefines = generateDefines(this._defines);

            var program = this.program = gl.createProgram();

            var prefixVertex = void 0,
                prefixFragment = void 0;

            if (material.isRawShaderMaterial) {

                prefixVertex = [customDefines].filter(filterEmptyLine).join('\n');

                if (prefixVertex.length > 0) {

                    prefixVertex += '\n';
                }

                prefixFragment = [customExtensions, customDefines].filter(filterEmptyLine).join('\n');

                if (prefixFragment.length > 0) {

                    prefixFragment += '\n';
                }
            } else {
                prefixVertex = ['precision ' + parameters.precision + ' float;', 'precision ' + parameters.precision + ' int;', '#define SHADER_NAME ' + shader.name,

                //运用纹理作色
                parameters.map ? '#define USE_MAP' : '',

                //采用顶点作色
                parameters.vertexColors ? '#define USE_COLOR' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '',

                //根据Z值的不同,点的大小递减
                parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

                //linemesh 是否是虚线
                parameters.dashed ? '#define USE_DASH' : '', 'uniform mat4 modelMatrix;', 'uniform mat4 modelViewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat3 normalMatrix;', 'uniform vec3 cameraPosition;', 'attribute vec3 position;', 'attribute vec3 normal;', 'attribute vec2 uv;', '#ifdef USE_COLOR', '	attribute vec3 color;', '#endif', '\n'].filter(filterEmptyLine).join('\n');

                prefixFragment = ['precision ' + parameters.precision + ' float;', 'precision ' + parameters.precision + ' int;', '#define SHADER_NAME ' + shader.name, parameters.map ? '#define USE_MAP' : '', parameters.vertexColors ? '#define USE_COLOR' : '', parameters.doubleSided ? '#define DOUBLE_SIDED' : '', parameters.flipSided ? '#define FLIP_SIDED' : '', parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

                //linemesh 是否是虚线
                parameters.dashed ? '#define USE_DASH' : '', 'uniform mat4 viewMatrix;', 'uniform vec3 cameraPosition;', '\n'].filter(filterEmptyLine).join('\n');
            }
            vertexShader = replaceLightNums(vertexShader, parameters);
            fragmentShader = replaceLightNums(fragmentShader, parameters);

            vertexShader = unrollLoops(vertexShader);
            fragmentShader = unrollLoops(fragmentShader);

            var vertexGlsl = prefixVertex + vertexShader;
            var fragmentGlsl = prefixFragment + fragmentShader;

            console.log('*VERTEX*', vertexGlsl);
            console.log('*FRAGMENT*', fragmentGlsl);

            var glVertexShader = this.vertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
            var glFragmentShader = this.fragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);

            gl.attachShader(program, glVertexShader);
            gl.attachShader(program, glFragmentShader);

            gl.linkProgram(program);

            var programLog = gl.getProgramInfoLog(program).trim();
            var vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
            var fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();

            // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
            // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );

            if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {

                console.error('WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            } else if (programLog !== '') {

                console.warn('WebGLProgram: gl.getProgramInfoLog()', programLog);
            }

            // clean up

            gl.deleteShader(glVertexShader);
            gl.deleteShader(glFragmentShader);
        }
    }, {
        key: 'getUniforms',
        value: function getUniforms() {

            var gl = this._gl;
            var program = this.program;

            if (this._cachedUniforms === undefined) {
                //todo 多重纹理的时候需要传递 renderer 
                //setTexture2D(texture , unit )
                //this._cachedUniforms = new WebGLUniforms(gl, program, renderer);
                this._cachedUniforms = new WebGLUniforms(gl, program);
            }

            return this._cachedUniforms;
        }
    }, {
        key: 'getAttributes',
        value: function getAttributes() {
            //获取shader中 atttribute对象的handle
            var gl = this._gl;
            var program = this.program;

            if (this._cachedAttributes === undefined) {
                this._cachedAttributes = {};
                var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

                for (var i = 0; i < n; i++) {

                    var info = gl.getActiveAttrib(program, i);
                    var name = info.name;

                    console.log('WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i);

                    this._cachedAttributes[name] = gl.getAttribLocation(program, name);
                }
            }

            return this._cachedAttributes;
        }
    }, {
        key: 'destroy',
        value: function destroy() {

            this._gl.deleteProgram(this.program);
            this.program = undefined;
        }
    }]);
    return WebGLProgram;
}();

function replaceLightNums(string, parameters) {

    return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights);
}

function unrollLoops(string) {

    var pattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;

    function replace(match, start, end, snippet) {

        var unroll = '';

        for (var i = parseInt(start); i < parseInt(end); i++) {

            unroll += snippet.replace(/\[ i \]/g, '[ ' + i + ' ]');
        }

        return unroll;
    }

    return string.replace(pattern, replace);
}

function generateExtensions(extensions, parameters, rendererExtensions) {

    extensions = extensions || {};

    var chunks = [extensions.derivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.normalMap || parameters.flatShading ? '#extension GL_OES_standard_derivatives : enable' : '', (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get('EXT_frag_depth') ? '#extension GL_EXT_frag_depth : enable' : '', extensions.drawBuffers && rendererExtensions.get('WEBGL_draw_buffers') ? '#extension GL_EXT_draw_buffers : require' : '', (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get('EXT_shader_texture_lod') ? '#extension GL_EXT_shader_texture_lod : enable' : ''];

    return chunks.filter(filterEmptyLine).join('\n');
}

function generateDefines(defines) {

    var chunks = [];

    for (var name in defines) {

        var value = defines[name];

        if (value === false) continue;

        chunks.push('#define ' + name + ' ' + value);
    }

    return chunks.join('\n');
}

function filterEmptyLine(string) {

    return string !== '';
}

var WebGLPrograms = function () {
    function WebGLPrograms(gl, extensions, capabilities) {
        classCallCheck(this, WebGLPrograms);

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
            LineMeshMaterial: 'linemesh'
        };
    }

    createClass(WebGLPrograms, [{
        key: 'getParameters',
        value: function getParameters(material, lights) {

            var shaderID = this._shaderIDs[material.type];
            var precision = this._capabilities.precision;

            if (material.precision !== null) {

                precision = this._capabilities.getMaxPrecision(material.precision);

                if (precision !== material.precision) {

                    console.warn('WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');
                }
            }
            var parameters = {
                shaderID: shaderID,
                precision: precision,
                map: !!material.map,
                vertexColors: material.vertexColors,
                alphaTest: material.alphaTest,
                doubleSided: material.side === DoubleSide,
                flipSided: material.side === BackSide,
                dashed: !!material.dashed,

                numDirLights: lights.directional.length,
                numPointLights: lights.point.length,
                numSpotLights: lights.spot.length

            };

            return parameters;
        }
    }, {
        key: 'getProgramCode',
        value: function getProgramCode(material, parameters) {
            var array = [];
            //todo  关键字暂时都保留,后面优化去掉
            var parameterNames = ["precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", 'physicallyCorrectLights', "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "dashed"];
            if (parameters.shaderID) {

                array.push(parameters.shaderID);
            } else {

                array.push(material.fragmentShader);
                array.push(material.vertexShader);
            }

            if (material.defines !== undefined) {

                for (var name in material.defines) {

                    array.push(name);
                    array.push(material.defines[name]);
                }
            }

            for (var i = 0; i < parameterNames.length; i++) {

                array.push(parameters[parameterNames[i]]);
            }

            //array.push(material.onBeforeCompile.toString());


            return array.join();
        }
    }, {
        key: 'acquireProgram',
        value: function acquireProgram(material, shader, parameters, code) {
            var program = void 0;

            // Check if code has been already compiled
            for (var p = 0, pl = this.programs.length; p < pl; p++) {

                var programInfo = this.programs[p];

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
    }, {
        key: 'releaseProgram',
        value: function releaseProgram(program) {
            if (--program.usedTimes === 0) {

                // Remove from unordered set
                var i = this.programs.indexOf(program);

                this.programs[i] = this.programs[this.programs.length - 1];
                this.programs.pop();

                // Free WebGL resources
                program.destroy();
            }
        }
    }]);
    return WebGLPrograms;
}();

var WebGLRenderList = function () {
    function WebGLRenderList() {
        classCallCheck(this, WebGLRenderList);

        this.renderItems = [];
        this.renderItemsIndex = 0;

        this.opaque = [];
        this.transparent = [];
    }

    createClass(WebGLRenderList, [{
        key: 'init',
        value: function init() {
            this.renderItemsIndex = 0;

            this.opaque.length = 0;
            this.transparent.length = 0;
        }
    }, {
        key: 'push',
        value: function push(object, geometry, material, z, group) {

            var renderItem = this.renderItems[this.renderItemsIndex];

            if (renderItem === undefined) {

                renderItem = {
                    id: object.id,
                    object: object,
                    geometry: geometry,
                    material: material,
                    program: material.program,
                    renderOrder: object.renderOrder,
                    z: z,
                    group: group
                };

                this.renderItems[this.renderItemsIndex] = renderItem;
            } else {

                renderItem.id = object.id;
                renderItem.object = object;
                renderItem.geometry = geometry;
                renderItem.material = material;
                renderItem.program = material.program;
                renderItem.renderOrder = object.renderOrder;
                renderItem.z = z;
                renderItem.group = group;
            }

            (material.transparent === true ? this.transparent : this.opaque).push(renderItem);

            this.renderItemsIndex++;
        }
    }, {
        key: 'sort',
        value: function sort() {

            if (this.opaque.length > 1) this.opaque.sort(painterSortStable);
            if (this.transparent.length > 1) this.transparent.sort(reversePainterSortStable);
        }
    }]);
    return WebGLRenderList;
}();

function painterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;
    } else if (a.program && b.program && a.program !== b.program) {

        return a.program.id - b.program.id;
    } else if (a.material.id !== b.material.id) {

        return a.material.id - b.material.id;
    } else if (a.z !== b.z) {

        return a.z - b.z;
    } else {

        return a.id - b.id;
    }
}

function reversePainterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;
    }if (a.z !== b.z) {

        return b.z - a.z;
    } else {

        return a.id - b.id;
    }
}

var WebGLRenderLists = function () {
    function WebGLRenderLists() {
        classCallCheck(this, WebGLRenderLists);

        this._lists = {};
    }

    createClass(WebGLRenderLists, [{
        key: 'get',
        value: function get$$1(scene, camera) {

            var hash = scene.id + ',' + camera.id;
            var list = this._lists[hash];

            if (list === undefined) {

                console.log('WebGLRenderLists:', hash);

                list = new WebGLRenderList();
                this._lists[hash] = list;
            }

            return list;
        }
    }, {
        key: 'dispose',
        value: function dispose() {

            this._lists = {};
        }
    }]);
    return WebGLRenderLists;
}();

var WebGLBufferRenderer = function () {
    function WebGLBufferRenderer(gl, extensions, info) {
        classCallCheck(this, WebGLBufferRenderer);

        this._mode = gl.TRIANGLES;
        this._gl = gl;
        this._info = info;
        this._extensions = extensions;
    }

    createClass(WebGLBufferRenderer, [{
        key: 'setMode',
        value: function setMode(value) {

            this._mode = value;
        }
    }, {
        key: 'render',
        value: function render(start, count) {

            this._gl.drawArrays(this._mode, start, count);
            this._info.update(count, this._mode);
        }
    }, {
        key: 'renderInstances',
        value: function renderInstances(geometry, start, count) {

            var extension = this._extensions.get('ANGLE_instanced_arrays');

            if (extension === null) {

                console.error('WebGLBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                return;
            }

            this._extension.drawArraysInstancedANGLE(mode, start, count, geometry.maxInstancedCount);

            this._info.update(count, this._mode, geometry.maxInstancedCount);
        }
    }]);
    return WebGLBufferRenderer;
}();

/**
 * @class WebGLObjects
 * @description 通过更新帧来控制更新WebGLGemetries update
 * @author bujue
 */

var WebGLObjects = function () {
    function WebGLObjects(geometries, info) {
        classCallCheck(this, WebGLObjects);

        this._infoRender = info.render;
        this._updateList = {};
        this._geometries = geometries;
    }

    createClass(WebGLObjects, [{
        key: "update",
        value: function update(object) {

            var frame = this._infoRender.frame;
            var geometries = this._geometries;

            var geometry = object.geometry;
            var buffergeometry = geometries.get(object, geometry);

            // Update once per frame

            if (this._updateList[buffergeometry.id] !== frame) {

                if (geometry.isGeometry) {

                    buffergeometry.updateFromObject(object);
                }
                //创建buffer
                geometries.update(buffergeometry);

                this._updateList[buffergeometry.id] = frame;
            }

            return buffergeometry;
        }
    }, {
        key: "dispose",
        value: function dispose() {

            this._updateList = {};
        }
    }]);
    return WebGLObjects;
}();

var WebGLIndexedBufferRenderer = function () {
    function WebGLIndexedBufferRenderer(gl, extensions, info) {
        classCallCheck(this, WebGLIndexedBufferRenderer);

        this._mode = gl.TRIANGLES;
        this._gl = gl;
        this._info = info;
        this._extensions = extensions;
        this._type = undefined;
        this._bytesPerElement = undefined;
    }

    createClass(WebGLIndexedBufferRenderer, [{
        key: 'setMode',
        value: function setMode(value) {

            this._mode = value;
        }
    }, {
        key: 'setIndex',
        value: function setIndex(value) {

            this._type = value.type;
            this._bytesPerElement = value.bytesPerElement;
        }
    }, {
        key: 'render',
        value: function render(start, count) {

            this._gl.drawElements(this._mode, count, this._type, start * this._bytesPerElement);

            this._info.update(count, this._mode);
        }
    }, {
        key: 'renderInstances',
        value: function renderInstances(geometry, start, count) {

            var extension = this._extensions.get('ANGLE_instanced_arrays');

            if (extension === null) {

                console.error('WebGLIndexedBufferRenderer: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                return;
            }

            extension.drawElementsInstancedANGLE(this._mode, count, this._type, start * this._bytesPerElement, geometry.maxInstancedCount);

            this._info.update(count, this._mode, geometry.maxInstancedCount);
        }
    }]);
    return WebGLIndexedBufferRenderer;
}();

var WebGLTextures = function () {
    function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {
        classCallCheck(this, WebGLTextures);

        this.gl = _gl;
        this._properties = properties;
        this._info = info;
        this._state = state;
        this._capabilities = capabilities;
        this._utils = utils;
    }

    createClass(WebGLTextures, [{
        key: 'setTexture2D',
        value: function setTexture2D(texture, slot) {

            var _gl = this.gl;
            var textureProperties = this._properties.get(texture);

            if (texture.version > 0 && textureProperties.__version !== texture.version) {

                var image = texture.image;

                if (image === undefined) {

                    console.warn('WebGLRenderer: Texture marked for update but image is undefined', texture);
                } else if (image.complete === false) {

                    console.warn('WebGLRenderer: Texture marked for update but image is incomplete', texture);
                } else {

                    this._uploadTexture(textureProperties, texture, slot);
                    return;
                }
            }

            this._state.activeTexture(_gl.TEXTURE0 + slot);
            this._state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);
        }
    }, {
        key: '_uploadTexture',
        value: function _uploadTexture(textureProperties, texture, slot) {

            var _gl = this.gl;
            var state = this._state;
            var utils = this._utils;

            if (textureProperties.__webglInit === undefined) {

                textureProperties.__webglInit = true;

                texture.on('dispose', onTextureDispose);

                textureProperties.__webglTexture = _gl.createTexture();

                this._info.memory.textures++;
            }

            state.activeTexture(_gl.TEXTURE0 + slot);
            state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture);

            //UNPACK_FLIP_Y_WEBGL 是否将纹理上下颠倒进行映射
            //https://yq.aliyun.com/articles/62464
            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
            //对图片纹理的每个像素的R、G、B通道，乘以A的值后，并替换原先的值
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
            //纹理的像素对齐
            _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

            var image = clampToMaxSize(texture.image, this._capabilities.maxTextureSize);

            if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {

                image = makePowerOfTwo(image);
            }

            var isPowerOfTwoImage = isPowerOfTwo(image),
                glFormat = utils.convert(texture.format),
                glType = utils.convert(texture.type);

            setTextureParameters.call(this, _gl.TEXTURE_2D, texture, isPowerOfTwoImage);

            var mipmap = void 0,
                mipmaps = texture.mipmaps;

            // regular Texture (image, video, canvas)

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            if (mipmaps.length > 0 && isPowerOfTwoImage) {

                for (var i = 0, il = mipmaps.length; i < il; i++) {

                    mipmap = mipmaps[i];
                    state.texImage2D(_gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap);
                }

                texture.generateMipmaps = false;
                textureProperties.__maxMipLevel = mipmaps.length - 1;
            } else {

                state.texImage2D(_gl.TEXTURE_2D, 0, glFormat, glFormat, glType, image);
                textureProperties.__maxMipLevel = 0;
            }

            if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {

                generateMipmap.call(this, _gl.TEXTURE_2D, texture, image.width, image.height);
            }

            textureProperties.__version = texture.version;

            if (texture.onUpdate) texture.onUpdate(texture);
        }
    }]);
    return WebGLTextures;
}();

function onTextureDispose(event) {

    var texture = event.target;

    texture.off('dispose', onTextureDispose);

    deallocateTexture.call(this, texture);

    this._info.memory.textures--;
}
function clampToMaxSize(image, maxSize) {

    if (image.width > maxSize || image.height > maxSize) {

        if ('data' in image) {

            console.warn('WebGLRenderer: image in DataTexture is too big (' + image.width + 'x' + image.height + ').');
            return;
        }

        // Warning: Scaling through the canvas will only work with images that use
        // premultiplied alpha.

        var scale = maxSize / Math.max(image.width, image.height);

        var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        canvas.width = Math.floor(image.width * scale);
        canvas.height = Math.floor(image.height * scale);

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

        console.warn('WebGLRenderer: image is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height, image);

        return canvas;
    }

    return image;
}

function textureNeedsPowerOfTwo(texture) {

    return texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping || texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
}

function isPowerOfTwo(image) {

    return _Math.isPowerOfTwo(image.width) && _Math.isPowerOfTwo(image.height);
}

var _canvas = void 0;
function makePowerOfTwo(image) {

    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {

        if (_canvas === undefined) _canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

        _canvas.width = _Math.floorPowerOfTwo(image.width);
        _canvas.height = _Math.floorPowerOfTwo(image.height);

        var context = _canvas.getContext('2d');
        context.drawImage(image, 0, 0, _canvas.width, _canvas.height);

        console.warn('WebGLRenderer: image is not power of two (' + image.width + 'x' + image.height + '). Resized to ' + _canvas.width + 'x' + _canvas.height, image);

        return _canvas;
    }

    return image;
}

function setTextureParameters(textureType, texture, isPowerOfTwoImage) {

    var _gl = this.gl,
        utils = this._utils;

    if (isPowerOfTwoImage) {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, utils.convert(texture.wrapS));
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, utils.convert(texture.wrapT));

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, utils.convert(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, utils.convert(texture.minFilter));
    } else {

        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

        if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {

            console.warn('WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to ClampToEdgeWrapping.', texture);
        }

        _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterFallback(texture.magFilter));
        _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterFallback(texture.minFilter));

        if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {

            console.warn('WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to NearestFilter or LinearFilter.', texture);
        }
    }
}

// Fallback filters for non-power-of-2 textures

function filterFallback(f) {

    var gl = this.gl;

    if (f === NearestFilter || f === NearestMipMapNearestFilter || f === NearestMipMapLinearFilter) {

        return _gl.NEAREST;
    }

    return _gl.LINEAR;
}

function deallocateTexture(texture) {

    var textureProperties = this._properties.get(texture);

    if (texture.image && textureProperties.__image__webglTextureCube) {

        // cube texture

        _gl.deleteTexture(textureProperties.__image__webglTextureCube);
    } else {

        // 2D texture

        if (textureProperties.__webglInit === undefined) return;

        _gl.deleteTexture(textureProperties.__webglTexture);
    }

    // remove all webgl properties
    this._properties.remove(texture);
}

function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {

    return texture.generateMipmaps && isPowerOfTwo && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
}

function generateMipmap(target, texture, width, height) {

    //生成多级纹理图
    this.gl.generateMipmap(target);

    var textureProperties = this._properties.get(texture);

    // Note: Math.log( x ) * Math.LOG2E used instead of Math.log2( x ) which is not supported by IE11
    textureProperties.__maxMipLevel = Math.log(Math.max(width, height)) * Math.LOG2E;
}

var v1$3 = new Vector3$1();
var r;

var EPS = 0.000001;

var Quaternion = function () {
    function Quaternion(x, y, z, w) {
        classCallCheck(this, Quaternion);

        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
        this._w = w !== undefined ? w : 1;
    }

    createClass(Quaternion, [{
        key: 'set',
        value: function set$$1(x, y, z, w) {

            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor(this._x, this._y, this._z, this._w);
        }
    }, {
        key: 'copy',
        value: function copy(quaternion) {

            this._x = quaternion.x;
            this._y = quaternion.y;
            this._z = quaternion.z;
            this._w = quaternion.w;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'setFromEuler',
        value: function setFromEuler(euler, update) {

            if (!(euler && euler.isEuler)) {

                throw new Error('Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
            }

            var x = euler._x,
                y = euler._y,
                z = euler._z,
                order = euler.order;

            // http://www.mathworks.com/matlabcentral/fileexchange/
            // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
            //	content/SpinCalc.m

            var cos = Math.cos;
            var sin = Math.sin;

            var c1 = cos(x / 2);
            var c2 = cos(y / 2);
            var c3 = cos(z / 2);

            var s1 = sin(x / 2);
            var s2 = sin(y / 2);
            var s3 = sin(z / 2);

            if (order === 'XYZ') {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === 'YXZ') {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
            } else if (order === 'ZXY') {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === 'ZYX') {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
            } else if (order === 'YZX') {

                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
            } else if (order === 'XZY') {

                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
            }

            if (update !== false) this.onChangeCallback();

            return this;
        }
    }, {
        key: 'setFromAxisAngle',
        value: function setFromAxisAngle(axis, angle) {

            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

            // assumes axis is normalized

            var halfAngle = angle / 2,
                s = Math.sin(halfAngle);

            this._x = axis.x * s;
            this._y = axis.y * s;
            this._z = axis.z * s;
            this._w = Math.cos(halfAngle);

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'setFromRotationMatrix',
        value: function setFromRotationMatrix(m) {

            // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

            var te = m.elements,
                m11 = te[0],
                m12 = te[4],
                m13 = te[8],
                m21 = te[1],
                m22 = te[5],
                m23 = te[9],
                m31 = te[2],
                m32 = te[6],
                m33 = te[10],
                trace = m11 + m22 + m33,
                s;

            if (trace > 0) {

                s = 0.5 / Math.sqrt(trace + 1.0);

                this._w = 0.25 / s;
                this._x = (m32 - m23) * s;
                this._y = (m13 - m31) * s;
                this._z = (m21 - m12) * s;
            } else if (m11 > m22 && m11 > m33) {

                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

                this._w = (m32 - m23) / s;
                this._x = 0.25 * s;
                this._y = (m12 + m21) / s;
                this._z = (m13 + m31) / s;
            } else if (m22 > m33) {

                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

                this._w = (m13 - m31) / s;
                this._x = (m12 + m21) / s;
                this._y = 0.25 * s;
                this._z = (m23 + m32) / s;
            } else {

                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

                this._w = (m21 - m12) / s;
                this._x = (m13 + m31) / s;
                this._y = (m23 + m32) / s;
                this._z = 0.25 * s;
            }

            this.onChangeCallback();

            return this;
        }

        // assumes direction vectors vFrom and vTo are normalized


    }, {
        key: 'setFromUnitVectors',
        value: function setFromUnitVectors(vFrom, vTo) {

            if (v1$3 === undefined) v1$3 = new Vector3$1();

            r = vFrom.dot(vTo) + 1;

            if (r < EPS) {

                r = 0;

                if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

                    v1$3.set(-vFrom.y, vFrom.x, 0);
                } else {

                    v1$3.set(0, -vFrom.z, vFrom.y);
                }
            } else {

                v1$3.crossVectors(vFrom, vTo);
            }

            this._x = v1$3.x;
            this._y = v1$3.y;
            this._z = v1$3.z;
            this._w = r;

            return this.normalize();
        }
    }, {
        key: 'inverse',
        value: function inverse() {

            return this.conjugate().normalize();
        }
    }, {
        key: 'conjugate',
        value: function conjugate() {

            this._x *= -1;
            this._y *= -1;
            this._z *= -1;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'dot',
        value: function dot(v) {

            return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
        }
    }, {
        key: 'lengthSq',
        value: function lengthSq() {

            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        }
    }, {
        key: 'length',
        value: function length() {

            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
        }
    }, {
        key: 'normalize',
        value: function normalize() {

            var l = this.length();

            if (l === 0) {

                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._w = 1;
            } else {

                l = 1 / l;

                this._x = this._x * l;
                this._y = this._y * l;
                this._z = this._z * l;
                this._w = this._w * l;
            }

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'multiply',
        value: function multiply(q, p) {

            if (p !== undefined) {

                console.warn('Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
                return this.multiplyQuaternions(q, p);
            }

            return this.multiplyQuaternions(this, q);
        }
    }, {
        key: 'premultiply',
        value: function premultiply(q) {

            return this.multiplyQuaternions(q, this);
        }
    }, {
        key: 'multiplyQuaternions',
        value: function multiplyQuaternions(a, b) {

            // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

            var qax = a._x,
                qay = a._y,
                qaz = a._z,
                qaw = a._w;
            var qbx = b._x,
                qby = b._y,
                qbz = b._z,
                qbw = b._w;

            this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'slerp',
        value: function slerp(qb, t) {

            if (t === 0) return this;
            if (t === 1) return this.copy(qb);

            var x = this._x,
                y = this._y,
                z = this._z,
                w = this._w;

            // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

            var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

            if (cosHalfTheta < 0) {

                this._w = -qb._w;
                this._x = -qb._x;
                this._y = -qb._y;
                this._z = -qb._z;

                cosHalfTheta = -cosHalfTheta;
            } else {

                this.copy(qb);
            }

            if (cosHalfTheta >= 1.0) {

                this._w = w;
                this._x = x;
                this._y = y;
                this._z = z;

                return this;
            }

            var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

            if (Math.abs(sinHalfTheta) < 0.001) {

                this._w = 0.5 * (w + this._w);
                this._x = 0.5 * (x + this._x);
                this._y = 0.5 * (y + this._y);
                this._z = 0.5 * (z + this._z);

                return this;
            }

            var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
            var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
                ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

            this._w = w * ratioA + this._w * ratioB;
            this._x = x * ratioA + this._x * ratioB;
            this._y = y * ratioA + this._y * ratioB;
            this._z = z * ratioA + this._z * ratioB;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(quaternion) {

            return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array, offset) {

            if (offset === undefined) offset = 0;

            this._x = array[offset];
            this._y = array[offset + 1];
            this._z = array[offset + 2];
            this._w = array[offset + 3];

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            array[offset] = this._x;
            array[offset + 1] = this._y;
            array[offset + 2] = this._z;
            array[offset + 3] = this._w;

            return array;
        }
    }, {
        key: 'onChange',
        value: function onChange(callback) {

            this.onChangeCallback = callback;

            return this;
        }
    }, {
        key: 'onChangeCallback',
        value: function onChangeCallback() {}
    }, {
        key: 'x',
        get: function get$$1() {
            return this._x;
        },
        set: function set$$1(value) {
            this._x = value;
            this.onChangeCallback();
        }
    }, {
        key: 'y',
        get: function get$$1() {
            return this._y;
        },
        set: function set$$1(value) {
            this._y = value;
            this.onChangeCallback();
        }
    }, {
        key: 'z',
        get: function get$$1() {
            return this._z;
        },
        set: function set$$1(value) {
            this._z = value;
            this.onChangeCallback();
        }
    }, {
        key: 'w',
        get: function get$$1() {
            return this._w;
        },
        set: function set$$1(value) {
            this._w = value;
            this.onChangeCallback();
        }
    }], [{
        key: 'slerp',
        value: function slerp(qa, qb, qm, t) {

            return qm.copy(qa).slerp(qb, t);
        }
    }, {
        key: 'slerpFlat',
        value: function slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

            // fuzz-free, array-based Quaternion SLERP operation

            var x0 = src0[srcOffset0 + 0],
                y0 = src0[srcOffset0 + 1],
                z0 = src0[srcOffset0 + 2],
                w0 = src0[srcOffset0 + 3],
                x1 = src1[srcOffset1 + 0],
                y1 = src1[srcOffset1 + 1],
                z1 = src1[srcOffset1 + 2],
                w1 = src1[srcOffset1 + 3];

            if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

                var s = 1 - t,
                    cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
                    dir = cos >= 0 ? 1 : -1,
                    sqrSin = 1 - cos * cos;

                // Skip the Slerp for tiny steps to avoid numeric problems:
                if (sqrSin > Number.EPSILON) {

                    var sin = Math.sqrt(sqrSin),
                        len = Math.atan2(sin, cos * dir);

                    s = Math.sin(s * len) / sin;
                    t = Math.sin(t * len) / sin;
                }

                var tDir = t * dir;

                x0 = x0 * s + x1 * tDir;
                y0 = y0 * s + y1 * tDir;
                z0 = z0 * s + z1 * tDir;
                w0 = w0 * s + w1 * tDir;

                // Normalize in case we just did a lerp:
                if (s === 1 - t) {

                    var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

                    x0 *= f;
                    y0 *= f;
                    z0 *= f;
                    w0 *= f;
                }
            }

            dst[dstOffset] = x0;
            dst[dstOffset + 1] = y0;
            dst[dstOffset + 2] = z0;
            dst[dstOffset + 3] = w0;
        }
    }]);
    return Quaternion;
}();

var WebGLSpriteRenderer = function () {
    function WebGLSpriteRenderer(renderer, gl, state, textures, capabilities) {
        classCallCheck(this, WebGLSpriteRenderer);

        this._gl = gl;
        this._state = state;
        this._textures = textures;
        this._capabilities = capabilities;

        this._vertexBuffer = null;
        this._elementBuffer = null;
        this._program = null;
        this._attributes = null;

        this.spritePosition = new Vector3$1();
        this.spriteRotation = new Quaternion();
        this.spriteScale = new Vector3$1();
    }

    createClass(WebGLSpriteRenderer, [{
        key: "_init",
        value: function _init() {

            var gl = this._gl;

            var vertices = new Float32Array([
            //  x     y     u  v 
            -0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1, -0.5, 0.5, 0, 1]);

            var faces = new Uint16Array([0, 1, 2, 0, 2, 3]);

            this._vertexBuffer = gl.createBuffer();
            this._elementBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);

            var program = this._program = createProgram.call(this);

            this._attributes = {
                position: gl.getAttribLocation(program, 'position'),
                uv: gl.getAttribLocation(program, 'uv')
            };

            this._uniforms = {
                uvOffset: gl.getUniformLocation(program, 'uvOffset'),
                uvScale: gl.getUniformLocation(program, 'uvScale'),

                rotation: gl.getUniformLocation(program, 'rotation'),
                center: gl.getUniformLocation(program, 'center'),
                scale: gl.getUniformLocation(program, 'scale'),

                color: gl.getUniformLocation(program, 'color'),
                map: gl.getUniformLocation(program, 'map'),
                opacity: gl.getUniformLocation(program, 'opacity'),

                modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix'),
                projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix')
            };

            var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
            canvas.width = 8;
            canvas.height = 8;

            var context = canvas.getContext('2d');
            context.fillStyle = 'white';
            context.fillRect(0, 0, 8, 8);

            this._emptyTexture = new Texture(canvas);
            this._emptyTexture.needsUpdate = true;
        }
    }, {
        key: "render",
        value: function render(sprites, scene, camera) {

            var state = this._state;
            var gl = this._gl;
            var uniforms = void 0;

            if (sprites.length === 0) return;

            // setup gl

            if (this._program === null) {

                this._init();
            }

            uniforms = this._uniforms;

            state.useProgram(this._program);

            state.initAttributes();
            state.enableAttribute(this._attributes.position);
            state.enableAttribute(this._attributes.uv);
            state.disableUnusedAttributes();
            //关闭背面裁截
            state.disable(gl.CULL_FACE);
            state.enable(gl.BLEND);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.vertexAttribPointer(this._attributes.position, 2, gl.FLOAT, false, 2 * 8, 0);
            gl.vertexAttribPointer(this._attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elementBuffer);

            gl.uniformMatrix4fv(uniforms.projectionMatrix, false, camera.projectionMatrix.elements);

            state.activeTexture(gl.TEXTURE0);
            gl.uniform1i(uniforms.map, 0);

            // update positions and sort

            for (var i = 0, l = sprites.length; i < l; i++) {

                var sprite = sprites[i];

                sprite.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, sprite.matrixWorld);
                //12:x  13:y  14:z
                sprite.z = -sprite.modelViewMatrix.elements[14];
            }

            sprites.sort(painterSortStable$1);

            // render all sprites

            var scale = [];
            var center = [];

            for (var _i = 0, _l = sprites.length; _i < _l; _i++) {

                var _sprite = sprites[_i];
                var material = _sprite.material;

                if (material.visible === false) continue;

                _sprite.onBeforeRender(renderer, scene, camera, undefined, material, undefined);

                //gl.uniform1f(uniforms.alphaTest, material.alphaTest);
                gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, _sprite.modelViewMatrix.elements);

                _sprite.matrixWorld.decompose(this.spritePosition, this.spriteRotation, this.spriteScale);

                scale[0] = this.spriteScale.x;
                scale[1] = this.spriteScale.y;

                center[0] = _sprite.center.x - 0.5;
                center[1] = _sprite.center.y - 0.5;

                if (material.map !== null) {

                    gl.uniform2f(uniforms.uvOffset, material.map.offset.x, material.map.offset.y);
                    gl.uniform2f(uniforms.uvScale, material.map.repeat.x, material.map.repeat.y);
                } else {

                    gl.uniform2f(uniforms.uvOffset, 0, 0);
                    gl.uniform2f(uniforms.uvScale, 1, 1);
                }

                gl.uniform1f(uniforms.opacity, material.opacity);
                gl.uniform3f(uniforms.color, material.color.r, material.color.g, material.color.b);

                gl.uniform1f(uniforms.rotation, material.rotation);
                gl.uniform2fv(uniforms.center, center);
                gl.uniform2fv(uniforms.scale, scale);

                state.setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);

                state.buffers.depth.setTest(material.depthTest);
                state.buffers.depth.setMask(material.depthWrite);
                state.buffers.color.setMask(material.colorWrite);

                this._textures.setTexture2D(material.map || this._emptyTexture, 0);

                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

                _sprite.onAfterRender(renderer, scene, camera, undefined, material, undefined);
            }

            // restore gl

            state.enable(gl.CULL_FACE);

            state.reset();
        }
    }]);
    return WebGLSpriteRenderer;
}();

function createProgram() {

    var gl = this._gl;
    var program = gl.createProgram();

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    //todo 考虑雾,删除相关代码
    gl.shaderSource(vertexShader, ['precision ' + this._capabilities.precision + ' float;', '#define SHADER_NAME ' + 'SpriteMaterial', 'uniform mat4 modelViewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform float rotation;', 'uniform vec2 center;', 'uniform vec2 scale;', 'uniform vec2 uvOffset;', 'uniform vec2 uvScale;', 'attribute vec2 position;', 'attribute vec2 uv;', 'varying vec2 vUV;', 'void main() {', '	vUV = uvOffset + uv * uvScale;', '	vec2 alignedPosition = ( position - center ) * scale;',
    //绕精灵的中心旋转,精灵的中心默认(0,0) 
    '	vec2 rotatedPosition;', '	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;', '	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;', '	vec4 mvPosition;',
    //物体的模型矩阵和视图矩阵都不改变顶点的x,y坐标,顶点是vec4(0.0, 0.0, 0.0 ,1.0) 
    '	mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );', '	mvPosition.xy += rotatedPosition;', '	gl_Position = projectionMatrix * mvPosition;', '}'].join('\n'));

    gl.shaderSource(fragmentShader, ['precision ' + this._capabilities.precision + ' float;', '#define SHADER_NAME ' + 'SpriteMaterial', 'uniform vec3 color;', 'uniform sampler2D map;', 'uniform float opacity;', 'varying vec2 vUV;', 'void main() {', '	vec4 texture = texture2D( map, vUV );', '	gl_FragColor = vec4( color * texture.rgb, texture.a * opacity );', '}'].join('\n'));

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    return program;
}

function painterSortStable$1(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;
    } else if (a.z !== b.z) {

        return b.z - a.z;
    } else {

        return b.id - a.id;
    }
}

var webglLightsCount = 0;
var _webGLLightsVector3 = new Vector3$1();

var WebGLLights = function () {
    function WebGLLights() {
        classCallCheck(this, WebGLLights);

        this.cache = new UniformsCache();
        this.state = {
            id: webglLightsCount++,
            hash: '',
            ambient: [0, 0, 0],
            directional: [],
            spot: [],
            point: []
        };
    }

    createClass(WebGLLights, [{
        key: 'setup',
        value: function setup(lights, shadows, camera) {
            var r = 0,
                g = 0,
                b = 0;

            var directionalLength = 0;
            var pointLength = 0;
            var spotLength = 0;

            var state = this.state;
            var cache = this.cache;

            var viewMatrix = camera.matrixWorldInverse;

            for (var i = 0, l = lights.length; i < l; i++) {

                var light = lights[i];

                var color = light.color;
                var intensity = light.intensity;
                var distance = light.distance;

                if (light.isAmbientLight) {

                    r += color.r * intensity;
                    g += color.g * intensity;
                    b += color.b * intensity;
                } else if (light.isDirectionalLight) {

                    var _uniforms = cache.get(light);

                    _uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                    _uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                    _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);
                    _uniforms.direction.sub(_webGLLightsVector3);
                    _uniforms.direction.transformDirection(viewMatrix);

                    state.directional[directionalLength] = _uniforms;

                    directionalLength++;
                } else if (light.isSpotLight) {

                    var uniforms = cache.get(light);

                    uniforms.position.setFromMatrixPosition(light.matrixWorld);
                    uniforms.position.applyMatrix4(viewMatrix);

                    uniforms.color.copy(color).multiplyScalar(intensity);
                    uniforms.distance = distance;

                    uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                    _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);
                    uniforms.direction.sub(_webGLLightsVector3);
                    uniforms.direction.transformDirection(viewMatrix);

                    uniforms.coneCos = Math.cos(light.angle);
                    uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                    uniforms.decay = light.distance === 0 ? 0.0 : light.decay;

                    state.spot[spotLength] = uniforms;

                    spotLength++;
                } else if (light.isPointLight) {

                    var uniforms = cache.get(light);

                    uniforms.position.setFromMatrixPosition(light.matrixWorld);
                    uniforms.position.applyMatrix4(viewMatrix);

                    uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                    uniforms.distance = light.distance;
                    uniforms.decay = light.distance === 0 ? 0.0 : light.decay;

                    state.point[pointLength] = uniforms;

                    pointLength++;
                }
            }

            state.ambient[0] = r;
            state.ambient[1] = g;
            state.ambient[2] = b;

            state.directional.length = directionalLength;
            state.spot.length = spotLength;
            state.point.length = pointLength;

            state.hash = state.id + ',' + directionalLength + ',' + pointLength + ',' + spotLength;
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.cache.dispose();
            this.cache = null;
            this.state = null;
        }
    }]);
    return WebGLLights;
}();

var UniformsCache = function () {
    function UniformsCache() {
        classCallCheck(this, UniformsCache);

        this._lights = {};
    }

    createClass(UniformsCache, [{
        key: 'get',
        value: function get$$1(light) {

            var lights = this._lights;

            if (lights[light.id] !== undefined) {

                return lights[light.id];
            }

            var uniforms = void 0;

            switch (light.type) {

                case 'DirectionalLight':
                    uniforms = {
                        direction: new Vector3$1(),
                        color: new Color$1()
                    };
                    break;

                case 'SpotLight':
                    uniforms = {
                        position: new Vector3$1(),
                        direction: new Vector3$1(),
                        color: new Color$1(),
                        distance: 0,
                        coneCos: 0,
                        penumbraCos: 0,
                        decay: 0
                    };
                    break;

                case 'PointLight':
                    uniforms = {
                        position: new Vector3$1(),
                        color: new Color$1(),
                        distance: 0,
                        decay: 0
                    };
                    break;

                case 'HemisphereLight':
                case 'RectAreaLight':
                    console.error('没有实现 HemisphereLight 和 RectAreaLight 灯光');
            }

            lights[light.id] = uniforms;

            return uniforms;
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._lights = null;
        }
    }]);
    return UniformsCache;
}();

var WebGLRenderState = function () {
    function WebGLRenderState() {
        classCallCheck(this, WebGLRenderState);


        this.state = {
            lights: new WebGLLights(),
            lightsArray: [],
            spritesArray: []
        };
    }

    createClass(WebGLRenderState, [{
        key: "init",
        value: function init() {
            this.state.spritesArray.length = 0;
            this.state.lightsArray.length = 0;
        }
    }, {
        key: "pushLight",
        value: function pushLight(light) {

            this.state.lightsArray.push(light);
        }
    }, {
        key: "pushSprite",
        value: function pushSprite(sprite) {

            this.state.spritesArray.push(sprite);
        }
    }, {
        key: "setupLights",
        value: function setupLights(camera) {

            //todo 阴影为空
            var shadowsArray = [];

            this.state.lights.setup(this.state.lightsArray, shadowsArray, camera);
        }
    }, {
        key: "dispose",
        value: function dispose() {
            this.state.lights.dispose();
            this.state = null;
        }
    }]);
    return WebGLRenderState;
}();

var WebGLRenderStates = function () {
    function WebGLRenderStates() {
        classCallCheck(this, WebGLRenderStates);

        this._renderStates = {};
    }

    createClass(WebGLRenderStates, [{
        key: "get",
        value: function get$$1(scene, camera) {

            var hash = scene.id + ',' + camera.id;

            var renderState = this._renderStates[hash];

            if (renderState === undefined) {

                renderState = new WebGLRenderState();
                this._renderStates[hash] = renderState;
            }

            return renderState;
        }
    }, {
        key: "dispose",
        value: function dispose() {

            for (var key in this._renderStates) {
                this._renderStates[key] && this._renderStates[key].dispose();
            }

            this._renderStates = {};
        }
    }]);
    return WebGLRenderStates;
}();

/**
 * @class WebGL渲染对象
 * @author bujue
 */

var WebGLRenderer = function (_Events) {
    inherits(WebGLRenderer, _Events);

    function WebGLRenderer(params) {
        classCallCheck(this, WebGLRenderer);

        var _this = possibleConstructorReturn(this, (WebGLRenderer.__proto__ || Object.getPrototypeOf(WebGLRenderer)).call(this));

        params = params || {};
        //canvas context 渲染对象的上下文
        _this.gl = null;

        //canvasDOM 对象
        _this.domElement = null;

        //私有变量
        _this._width = 0;
        _this._height = 0;
        _this._isContextLost = false; //是否丢失上下文

        _this._pixelRatio = 1; //屏幕的pixelRatio,
        _this._currentViewport = new Vector4(); //当前的渲染视口大小
        _this._currentRenderList = null;
        _this._currentRenderState = null;

        _this._currentMaterialId = -1; //初始化materialId
        _this._currentCamera = null; //当前的相机
        _this._currClearColor = new Color$1(0x000000);

        _this._capabilities = null; //GPU渲染能力 
        _this._state = null; //GPU的状态管理 


        _this._sortObjects = true; // scene graph

        _this._projScreenMatrix = new Matrix4();
        _this._vector3 = new Vector3$1();
        _this._frustum = new Frustum();

        _this._init(params);
        _this._initGLContext(params);
        return _this;
    }

    createClass(WebGLRenderer, [{
        key: '_init',
        value: function _init(parameters) {
            //创建webGL对象上下文
            var me = this;
            parameters = parameters || {};

            console.log('WebGLRenderer', REVISION);

            /*
            * `alpha`：值为true，表示为上下文创建一个Alpha通道缓冲区；默认值为true；
            * `depth`：值为true，表示可以使用16位深缓冲区；默认值为true；
            * `stencil`：值为true，表示可以使用8位模板缓冲区；默认值为false；
            * `antialias`：值为true，表示将使用默认机制执行抗锯齿操作；默认值为true。
            * `premultipliedAlpha`：值为true，表示绘图缓冲区有预乘Alpha值；默认为true;
            * `preserveDrawingBuffer`：值为true；表示在绘图完成后保留绘图缓冲区；默认值为false。
            */
            var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
                _context = parameters.context !== undefined ? parameters.context : null,
                _alpha = parameters.alpha !== undefined ? parameters.alpha : false,
                _depth = parameters.depth !== undefined ? parameters.depth : true,
                _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
                _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
                _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
                _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false;

            me.domElement = _canvas;
            me.gl = _context;
            me._width = _canvas.width;
            me._height = _canvas.height;
            me._premultipliedAlpha = _premultipliedAlpha;

            try {

                var contextAttributes = {
                    alpha: _alpha,
                    depth: _depth,
                    stencil: _stencil,
                    antialias: _antialias,
                    premultipliedAlpha: _premultipliedAlpha,
                    preserveDrawingBuffer: _preserveDrawingBuffer
                };

                var _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);

                if (_gl === null) {

                    if (_canvas.getContext('webgl') !== null) {

                        throw 'Error creating WebGL context with your selected attributes.';
                    } else {

                        throw 'Error creating WebGL context.';
                    }
                }

                me.gl = _gl;

                _canvas.addEventListener('webglcontextlost', onContextLost.bind(me), false);
                _canvas.addEventListener('webglcontextrestored', onContextRestore.bind(me), false);
            } catch (error) {

                console.error('WebGLRenderer: ' + error);
            }

            /**
                * @private
                * @description 上下文丢失
                * @param {*} event 
                */
            function onContextLost(event) {

                event.preventDefault();
                console.log('WebGLRenderer: Context Lost.');
                this._isContextLost = true;
                this.fire({ type: 'contextlost' });
            }
            /**
            * @private
            * @description 上下文恢复
            */
            function onContextRestore() {

                console.log('WebGLRenderer: Context Restored.');
                this._isContextLost = true;
                this._initGLContext(parametersÎ);
                this.fire({ type: 'contextrestore' });
            }
        }
    }, {
        key: '_initGLContext',
        value: function _initGLContext(parameters) {
            var me = this;
            var _gl = this.gl;
            var _width = this._width;
            var _height = this._height;
            var _viewport = new Vector4(0, 0, _width, _height);

            /**  
            *  
            *  WebGLUtils              gl常量管理
            *  WebGLCapabilities       gl能力数据
            *  WebGLState              gl状态管理
            *  WebGLInfo               保存渲染的基本数据
            *  WebGLProperties         可以有效的将上层Material传过来的对象与底层渲染的对象做关联但有不改变原对象,利用WeapMap实现
            *  WebGLAttributes         根据上层的顶点属性Geometry数据,利用WeapMap绑定buffer相关数据,提供get update remove 方法
            *  WebGLGeometries         将上层的顶点属性分解后保存到WebGLAttribute对象中 update更新 WebGLAttribute的update 
            *  WebGLObjects            通过更新帧来控制更新WebGLGemetries update
            *  WebGLMorphtargets       顶点动画,图表动画可以参考使用
            *  WebGLPrograms           programs的管理 
            *  WebGLTextures           纹理的预处理与参数设置与上传
            *  WebGLRenderLists        通过hash 构建一个Map WebGLRenderList 是真正的渲染列表 opaque transparent 
            *  WebGLRenderStates       灯光阴影的管理   WebGLLights.setup 将上次的灯光参数转换为shader格式的参数
            *  WebGLBackground         背景的绘制与更新, scene.background 可以是颜色 纹理 cube纹理
            *  WebGLBufferRenderer     drawArrays的提取及利用扩展 同一几何体多次绘制的实现
            *  WebGLIndexedBufferRenderer  drawElements 的提取,同上
            *  WebGLSpriteRenderer       sprite 绘制 走单独的绘制流程  
            */

            this._extensions = new WebGLExtensions(_gl);
            this._extensions.get('ANGLE_instanced_arrays');

            this._utils = new WebGLUtils(_gl);
            this._info = new WebGLInfo(_gl);
            this._properties = new WebGLProperties();
            this._state = new WebGLState(_gl, this._extensions);
            this._renderStates = new WebGLRenderStates();
            this._capabilities = new WebGLCapabilities(_gl, parameters);
            this._textures = new WebGLTextures(_gl, null, this._state, this._properties, this._capabilities, this._utils, this._info);
            this._attributes = new WebGLAttributes(_gl);
            this._geometries = new WebGLGeometries(_gl, this._attributes, this._info);
            this._objects = new WebGLObjects(this._geometries, this._info);
            this._programCache = new WebGLPrograms(_gl, this._extensions, this._capabilities);
            this._renderLists = new WebGLRenderLists();
            this._bufferRenderer = new WebGLBufferRenderer(_gl, this._extensions, this._info);
            this._indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, this._extensions, this._info);
            this._spriteRenderer = new WebGLSpriteRenderer(this, _gl, this._state, this._textures, this._capabilities);
            this._state.viewport(this._currentViewport.copy(_viewport).multiplyScalar(this._pixelRatio));

            //console.dir(this._capabilities);
            this._info.programs = this._programCache.programs;

            me.setSize(_width, _height, true);
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.gl;
        }
    }, {
        key: 'getPixelRatio',
        value: function getPixelRatio() {
            return this._pixelRatio;
        }
    }, {
        key: 'getCurrentViewport',
        value: function getCurrentViewport() {
            return this._currentViewport;
        }
    }, {
        key: 'getClearColor',
        value: function getClearColor() {
            return this._currClearColor;
        }

        //设置设备像素比,默认是 1    

    }, {
        key: 'setPixelRatio',
        value: function setPixelRatio(value) {
            var _width = this._width;
            var _height = this._height;

            this._pixelRatio = value;
            this.setSize(_width, _height, false);
        }

        //设置可视区域大小

    }, {
        key: 'setSize',
        value: function setSize(width, height, updateStyle) {
            var me = this;
            var _pixelRatio = this._pixelRatio;
            var _canvas = me.domElement;
            var _width = width;
            var _height = height;

            _canvas.width = width * _pixelRatio;
            _canvas.height = height * _pixelRatio;

            //注意:updateStyle 只有完全等于false才不更新style
            if (updateStyle !== false) {

                _canvas.style.width = width + 'px';
                _canvas.style.height = height + 'px';
            }

            me.setViewport(0, 0, width, height);
        }

        //设置视口大小

    }, {
        key: 'setViewport',
        value: function setViewport(x, y, width, height) {
            var gl = this.gl;
            var viewport = new Vector4(x, y, width, height);

            if (this._currentViewport.equals(viewport) === false) {

                this._currentViewport.copy(viewport).multiplyScalar(this._pixelRatio);

                this._state.viewport(this._currentViewport);
            }
        }
        //设置清除色

    }, {
        key: 'setClearColor',
        value: function setClearColor() {
            var _gl = this.gl;

            var _arguments = Array.prototype.slice.call(arguments),
                r = _arguments[0],
                g = _arguments[1],
                b = _arguments[2],
                a = _arguments[3];

            var _color = this._currClearColor.set(r, g, b, a);
            this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
        }
    }, {
        key: 'getClearAlpha',
        value: function getClearAlpha() {
            return this._currClearColor.a;
        }
    }, {
        key: 'setClearAlpha',
        value: function setClearAlpha(alpha) {
            var _gl = this.gl;
            this._currClearColor.a = alpha;
            var _color = this._currClearColor;
            this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
        }
    }, {
        key: 'clear',


        //清除缓冲
        value: function clear(color, depth, stencil) {
            var _gl = this.gl;
            var bits = 0;

            if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
            if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
            if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

            _gl.clear(bits);
        }
        //清除颜色缓冲

    }, {
        key: 'clearColor',
        value: function clearColor() {
            this.clear(true, false, false);
        }
        //清除深度缓冲

    }, {
        key: 'clearDepth',
        value: function clearDepth() {
            this.clear(false, true, false);
        }
        //清除模版缓冲

    }, {
        key: 'clearStencil',
        value: function clearStencil() {
            this.clear(false, false, true);
        }
    }, {
        key: 'render',
        value: function render(scene, camera) {

            if (!(camera && camera.isCamera)) {

                console.error('WebGLRenderer.render: camera is not an instance of Camera.');
                return;
            }
            _currentGeometryProgram = '';
            this._currentMaterialId = -1;
            this._currentCamera = null;

            if (this._isContextLost) true;

            // 更新场景
            if (scene.autoUpdate === true) scene.updateMatrixWorld();

            //更新相机矩阵
            if (camera.parent === null) camera.updateMatrixWorld();

            this._projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
            this._frustum.setFromMatrix(this._projScreenMatrix);

            //初始化渲染队列

            this._currentRenderState = this._renderStates.get(scene, camera);
            this._currentRenderState.init();

            this._currentRenderList = this._renderLists.get(scene, camera);

            this._currentRenderList.init();

            //将渲染的几何对象和材质存放到渲染队列中
            projectObject.call(this, scene, camera, this._sortObjects);

            if (this._sortObjects === true) {
                this._currentRenderList.sort();
            }

            this._currentRenderState.setupLights(camera);

            if (this._info.autoReset) this._info.reset();

            scene.background === null ? this.setClearColor(this._currClearColor) : this.setClearColor(scene.background);
            this.clearColor(true);

            var opaqueObjects = this._currentRenderList.opaque;
            var transparentObjects = this._currentRenderList.transparent;

            // opaque pass (front-to-back order)

            if (opaqueObjects.length) renderObjects.call(this, opaqueObjects, scene, camera);

            // transparent pass (back-to-front order)

            if (transparentObjects.length) renderObjects.call(this, transparentObjects, scene, camera);

            // custom renderers

            var spritesArray = this._currentRenderState.state.spritesArray;

            this._spriteRenderer.render(spritesArray, scene, camera);

            this._state.buffers.depth.setTest(true);
            this._state.buffers.depth.setMask(true);
            this._state.buffers.color.setMask(true);

            this._state.setPolygonOffset(false);

            this._currentRenderList = null;
            this._currentRenderState = null;
        }
    }, {
        key: 'renderBufferDirect',
        value: function renderBufferDirect(camera, fog, geometry, material, object, group) {

            var me = this;
            var _gl = this.gl;

            var frontFaceCW = object.isMesh && object.matrixWorld.determinant() < 0;

            //通过Materail设置 CULL_FACE  Blend clearColor ClearDepth
            this._state.setMaterial(material, frontFaceCW);

            var program = setProgram.call(me, camera, fog, material, object);

            var updateBuffers = isUpdateBuffers(geometry, program, material);

            var index = geometry.index;
            var position = geometry.attributes.position;
            var rangeFactor = 1;

            if (material.wireframe === true) {

                index = this._geometries.getWireframeAttribute(geometry);
                rangeFactor = 2;
            }

            var attribute = void 0;
            var renderer = this._bufferRenderer;

            if (index !== null) {

                attribute = this._attributes.get(index);

                renderer = this._indexedBufferRenderer;
                renderer.setIndex(attribute);
            }

            if (updateBuffers) {

                setupVertexAttributes.call(this, material, program, geometry);

                if (index !== null) {

                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
                }
            }

            var dataCount = Infinity;

            if (index !== null) {

                dataCount = index.count;
            } else if (position !== undefined) {

                dataCount = position.count;
            }

            var rangeStart = geometry.drawRange.start * rangeFactor;
            var rangeCount = geometry.drawRange.count * rangeFactor;

            var groupStart = group !== null ? group.start * rangeFactor : 0;
            var groupCount = group !== null ? group.count * rangeFactor : Infinity;

            var drawStart = Math.max(rangeStart, groupStart);
            var drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;

            var drawCount = Math.max(0, drawEnd - drawStart + 1);

            if (drawCount === 0) return;

            if (object.isMesh) {

                if (material.wireframe === true) {

                    this._state.setLineWidth(material.wireframeLinewidth * this._pixelRatio);
                    renderer.setMode(_gl.LINES);
                } else {

                    switch (object.drawMode) {

                        case TrianglesDrawMode:
                            renderer.setMode(_gl.TRIANGLES);
                            break;

                        case TriangleStripDrawMode:
                            renderer.setMode(_gl.TRIANGLE_STRIP);
                            break;

                        case TriangleFanDrawMode:
                            renderer.setMode(_gl.TRIANGLE_FAN);
                            break;

                    }
                }
            } else if (object.isLine) {
                var lineWidth = material.linewidth;

                if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material

                this._state.setLineWidth(lineWidth * this._pixelRatio);

                switch (object.drawMode) {

                    case LinesMode:
                        renderer.setMode(_gl.LINES);
                        break;

                    case LineLoopMode:
                        renderer.setMode(_gl.LINE_LOOP);
                        break;

                    case LineStripMode:
                        renderer.setMode(_gl.LINE_STRIP);
                        break;

                }
            } else if (object.isPoints) {
                renderer.setMode(_gl.POINTS);
            }

            if (geometry && geometry.isInstancedBufferGeometry) {

                if (geometry.maxInstancedCount > 0) {

                    renderer.renderInstances(geometry, drawStart, drawCount);
                }
            } else {

                renderer.render(drawStart, drawCount);
            }
        }
    }, {
        key: 'allocTextureUnit',
        value: function allocTextureUnit() {
            var textureUnit = _usedTextureUnits;

            if (textureUnit >= this._capabilities.maxTextures) {

                console.warn('WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);
            }

            _usedTextureUnits += 1;

            return textureUnit;
        }
    }, {
        key: 'setTexture2D',
        value: function setTexture2D(texture, slot) {
            //todo Use in WebGLUniforms
            this._textures.setTexture2D(texture, slot);
        }
    }, {
        key: 'setTextureCube',
        value: function setTextureCube() {
            //todo Use in WebGLUniforms
        }
    }, {
        key: 'dispose',
        value: function dispose() {

            this._canvas.removeEventListener('webglcontextlost', onContextLost, false);
            this._canvas.removeEventListener('webglcontextrestored', onContextRestore, false);

            this._renderLists.dispose();
            this._renderStates.dispose();
            this._properties.dispose();
            this._objects.dispose();

            //vr.dispose();

            //stopAnimation();
        }
    }]);
    return WebGLRenderer;
}(Events);

//判断是否更新了Buffer


var _currentGeometryProgram = '';
function isUpdateBuffers(geometry, program, material) {

    var geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);

    var updateBuffers = false;

    if (geometryProgram !== _currentGeometryProgram) {

        updateBuffers = true;
        _currentGeometryProgram = geometryProgram;
    }

    return updateBuffers;
}

//将渲染的几何对象和材质存放到渲染队列中
function projectObject(object, camera, sortObjects) {

    if (object.visible === false) return;

    if (object.isLight) {

        this._currentRenderState.pushLight(object);
    } else if (object.isSprite) {

        if (!object.frustumCulled || this._frustum.intersectsSprite(object)) {

            this._currentRenderState.pushSprite(object);
        }
    } else if (object.isMesh || object.isLine || object.isPoints) {

        if (!object.frustumCulled || this._frustum.intersectsObject(object)) {

            if (sortObjects) {

                this._vector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this._projScreenMatrix);
            }
            //创建好了attribute buffer
            var geometry = this._objects.update(object);
            var material = object.material;

            //如果是数组,表示geometry根据groups的分组进行分别绘制
            if (Array.isArray(material)) {

                var groups = geometry.groups;

                for (var i = 0, l = groups.length; i < l; i++) {

                    var group = groups[i];
                    var groupMaterial = material[group.materialIndex];

                    if (groupMaterial && groupMaterial.visible) {

                        this._currentRenderList.push(object, geometry, groupMaterial, this._vector3.z, group);
                    }
                }
            } else if (material.visible) {

                this._currentRenderList.push(object, geometry, material, this._vector3.z, null);
            }
        }
    }

    var children = object.children;

    for (var _i = 0, _l = children.length; _i < _l; _i++) {

        projectObject.call(this, children[_i], camera, sortObjects);
    }
}

function renderObjects(renderList, scene, camera) {
    for (var i = 0, l = renderList.length; i < l; i++) {

        var renderItem = renderList[i];

        var object = renderItem.object;
        var geometry = renderItem.geometry;
        var material = renderItem.material;
        var group = renderItem.group;

        renderObject.call(this, object, scene, camera, geometry, material, group);
    }
}

function renderObject(object, scene, camera, geometry, material, group) {

    object.onBeforeRender(this, scene, camera, geometry, material, group);
    this._currentRenderState = this._renderStates.get(scene, camera);

    object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
    object.normalMatrix.getNormalMatrix(object.modelViewMatrix);

    this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);

    object.onAfterRender(this, scene, camera, geometry, material, group);
    // this._currentRenderState = renderStates.get( scene,  camera );
}

var _usedTextureUnits = 0; //当前纹理单元
function setProgram(camera, fog, material, object) {
    _usedTextureUnits = 0;

    var materialProperties = this._properties.get(material);
    var lights = this._currentRenderState.state.lights;

    if (material.needsUpdate === false) {

        if (materialProperties.program === undefined) {

            material.needsUpdate = true;
        } else if (material.lights && materialProperties.lightsHash !== lights.state.hash) {

            material.needsUpdate = true;
        }
    }

    if (material.needsUpdate) {

        initMaterial.call(this, material, fog, object);
        material.needsUpdate = false;
    }

    var refreshProgram = false;
    var refreshMaterial = false;
    var refreshLights = false;

    var program = materialProperties.program,
        p_uniforms = program.getUniforms(),
        m_uniforms = materialProperties.shader.uniforms;

    if (this._state.useProgram(program.program)) {

        refreshProgram = true;
        refreshMaterial = true;
        refreshLights = true;
    }

    if (material.id !== this._currentMaterialId) {

        this._currentMaterialId = material.id;

        refreshMaterial = true;
    }

    if (refreshProgram || camera !== this._currentCamera) {

        p_uniforms.setValue('projectionMatrix', camera.projectionMatrix);

        if (camera !== this._currentCamera) {

            this._currentCamera = camera;
            refreshMaterial = true;
            refreshLights = true;
        }
    }

    if (refreshMaterial) {
        var updateLineMaterial = function updateLineMaterial() {
            m_uniforms.dashSize.value = material.dashSize;
            m_uniforms.totalSize.value = material.dashSize + material.gapSize;
            m_uniforms.scale.value = material.scale;
        };

        if (material.lights) {

            // the current material requires lighting info

            // note: all lighting uniforms are always set correctly
            // they simply reference the renderer's state for their
            // values
            //
            // use the current material's .needsUpdate flags to set
            // the GL state when required

            markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
        }

        if (material.isMeshBasicMaterial || material.isLineBasicMaterial || material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isPointsMaterial || material.isLineMeshMaterial) {
            if (material.color) {
                m_uniforms.diffuse.value = material.color;
            }

            if (material.map) {
                m_uniforms.map.value = material.map;
            }

            m_uniforms.opacity.value = material.opacity;
            if (material.emissive) {

                m_uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
            }

            if (material.map) {

                if (material.map.matrixAutoUpdate === true) {
                    //更新纹理映射矩阵
                    material.map.updateMatrix();
                }

                m_uniforms.uvTransform.value.copy(material.map.matrix);
            }
        }

        if (material.isLineBasicMaterial) {

            if (material.isLineDashedMaterial) {
                updateLineMaterial();
            }
        } else if (material.isMeshPhongMaterial) {

            m_uniforms.specular.value = material.specular;
            m_uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
        } else if (material.isPointsMaterial) {

            m_uniforms.size.value = material.size * this._pixelRatio;
            m_uniforms.scale.value = this._height * 0.5;
        } else if (material.isLineMeshMaterial) {

            updateLineMaterial();
            m_uniforms.linewidth.value = material.linewidth;
            m_uniforms.resolution.value.copy(material.resolution);
        }

        WebGLUniforms.upload(this.gl, materialProperties.uniformsList, m_uniforms, this);
    }
    if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {

        WebGLUniforms.upload(this.gl, materialProperties.uniformsList, m_uniforms, this);
        material.uniformsNeedUpdate = false;
    }

    // common matrices

    p_uniforms.setValue('modelViewMatrix', object.modelViewMatrix);
    p_uniforms.setValue('normalMatrix', object.normalMatrix);
    p_uniforms.setValue('modelMatrix', object.matrixWorld);

    return program;
}

function initMaterial(material, fog, object) {

    var materialProperties = this._properties.get(material);
    var lights = this._currentRenderState.state.lights;
    var parameters = this._programCache.getParameters(material, lights.state);

    var code = this._programCache.getProgramCode(material, parameters);

    var program = materialProperties.program;
    var programChange = true;

    if (program === undefined) {

        // new material
        material.on('dispose', onMaterialDispose.bind(this));
    } else if (program.code !== code) {

        // changed glsl or parameters
        releaseMaterialProgramReference.call(this, material);
    } else if (materialProperties.lightsHash !== lights.state.hash) {

        properties.update(material, 'lightsHash', lights.state.hash);
        programChange = false;
    } else if (parameters.shaderID !== undefined) {

        // same glsl and uniform list
        return;
    } else {

        // only rebuild uniform list
        programChange = false;
    }

    if (programChange) {

        if (parameters.shaderID) {

            var shader = ShaderLib[parameters.shaderID];

            materialProperties.shader = {
                name: material.type,
                uniforms: UniformsUtils$1.clone(shader.uniforms),
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            };
        } else {
            //自定义shader
            materialProperties.shader = {
                name: material.type,
                uniforms: material.uniforms,
                vertexShader: material.vertexShader,
                fragmentShader: material.fragmentShader
            };
        }

        material.onBeforeCompile(materialProperties.shader, this);

        //WebGLProgram 对象
        program = this._programCache.acquireProgram(material, materialProperties.shader, parameters, code);

        materialProperties.program = program;
        material.program = program;
    }

    var programAttributes = program.getAttributes();

    var uniforms = materialProperties.shader.uniforms;

    // store the light setup it was created for

    materialProperties.lightsHash = lights.state.hash;

    if (material.lights) {

        // wire up the material to this renderer's lighting state

        uniforms.ambientLightColor.value = lights.state.ambient;
        uniforms.directionalLights.value = lights.state.directional;
        uniforms.spotLights.value = lights.state.spot;
        uniforms.pointLights.value = lights.state.point;
    }

    var progUniforms = materialProperties.program.getUniforms();
    var uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

    materialProperties.uniformsList = uniformsList;
}

function onMaterialDispose(event) {
    var me = this;
    var material = event.target;

    material.off('dispose', onMaterialDispose.bind(me));

    deallocateMaterial.call(this, material);
}

// Buffer deallocation

function deallocateMaterial(material) {

    releaseMaterialProgramReference.call(this, material);

    this._properties.remove(material);
}

function releaseMaterialProgramReference(material) {
    var programInfo = this._properties.get(material).program;

    material.program = undefined;

    if (programInfo !== undefined) {

        this._programCache.releaseProgram(programInfo);
    }
}

function setupVertexAttributes(material, program, geometry) {

    if (geometry && geometry.isInstancedBufferGeometry) {

        if (this._extensions.get('ANGLE_instanced_arrays') === null) {

            console.error('WebGLRenderer.setupVertexAttributes: using InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
            return;
        }
    }

    this._state.initAttributes();
    var _gl = this.gl;
    var geometryAttributes = geometry.attributes;

    var programAttributes = program.getAttributes();
    var materialDefaultAttributeValues = material.defaultAttributeValues;

    for (var name in programAttributes) {

        var programAttribute = programAttributes[name];

        if (programAttribute >= 0) {

            var geometryAttribute = geometryAttributes[name];

            if (geometryAttribute !== undefined) {

                var normalized = geometryAttribute.normalized;
                var size = geometryAttribute.itemSize;

                var attribute = this._attributes.get(geometryAttribute);

                // TODO Attribute may not be available on context restore

                if (attribute === undefined) continue;

                var buffer = attribute.buffer;
                var type = attribute.type;
                var bytesPerElement = attribute.bytesPerElement;

                if (geometryAttribute.isInterleavedBufferAttribute) {

                    var data = geometryAttribute.data;
                    var stride = data.stride;
                    var offset = geometryAttribute.offset;

                    if (data && data.isInstancedInterleavedBuffer) {

                        this._state.enableAttributeAndDivisor(programAttribute, data.meshPerAttribute);

                        if (geometry.maxInstancedCount === undefined) {

                            geometry.maxInstancedCount = data.meshPerAttribute * data.count;
                        }
                    } else {

                        this._state.enableAttribute(programAttribute);
                    }

                    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                    _gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement);
                } else {

                    if (geometryAttribute.isInstancedBufferAttribute) {

                        this._state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);

                        if (geometry.maxInstancedCount === undefined) {

                            geometry.maxInstancedCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                        }
                    } else {

                        this._state.enableAttribute(programAttribute);
                    }

                    _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                    _gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, 0);
                }
            } else if (materialDefaultAttributeValues !== undefined) {
                var value = materialDefaultAttributeValues[name];

                if (value !== undefined) {

                    switch (value.length) {

                        case 2:
                            _gl.vertexAttrib2fv(programAttribute, value);
                            break;

                        case 3:
                            _gl.vertexAttrib3fv(programAttribute, value);
                            break;

                        case 4:
                            _gl.vertexAttrib4fv(programAttribute, value);
                            break;

                        default:
                            _gl.vertexAttrib1fv(programAttribute, value);

                    }
                }
            }
        }
    }

    this._state.disableUnusedAttributes();
}

// If uniforms are marked as clean, they don't need to be loaded to the GPU.

function markUniformsLightsNeedsUpdate(uniforms, value) {

    uniforms.ambientLightColor.needsUpdate = value;

    uniforms.directionalLights.needsUpdate = value;
    uniforms.pointLights.needsUpdate = value;
    uniforms.spotLights.needsUpdate = value;
}

var matrix = new Matrix4();
var q = new Quaternion();

var Euler = function () {
    function Euler(x, y, z, order) {
        classCallCheck(this, Euler);

        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
        this._order = order || Euler.DefaultOrder;

        this.isEuler = true;
    }

    createClass(Euler, [{
        key: 'set',
        value: function set$$1(x, y, z, order) {

            this._x = x;
            this._y = y;
            this._z = z;
            this._order = order || this._order;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor(this._x, this._y, this._z, this._order);
        }
    }, {
        key: 'copy',
        value: function copy(euler) {

            this._x = euler._x;
            this._y = euler._y;
            this._z = euler._z;
            this._order = euler._order;

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'setFromRotationMatrix',
        value: function setFromRotationMatrix(m, order, update) {

            var clamp = _Math.clamp;

            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

            var te = m.elements;
            var m11 = te[0],
                m12 = te[4],
                m13 = te[8];
            var m21 = te[1],
                m22 = te[5],
                m23 = te[9];
            var m31 = te[2],
                m32 = te[6],
                m33 = te[10];

            order = order || this._order;

            if (order === 'XYZ') {

                this._y = Math.asin(clamp(m13, -1, 1));

                if (Math.abs(m13) < 0.99999) {

                    this._x = Math.atan2(-m23, m33);
                    this._z = Math.atan2(-m12, m11);
                } else {

                    this._x = Math.atan2(m32, m22);
                    this._z = 0;
                }
            } else if (order === 'YXZ') {

                this._x = Math.asin(-clamp(m23, -1, 1));

                if (Math.abs(m23) < 0.99999) {

                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);
                } else {

                    this._y = Math.atan2(-m31, m11);
                    this._z = 0;
                }
            } else if (order === 'ZXY') {

                this._x = Math.asin(clamp(m32, -1, 1));

                if (Math.abs(m32) < 0.99999) {

                    this._y = Math.atan2(-m31, m33);
                    this._z = Math.atan2(-m12, m22);
                } else {

                    this._y = 0;
                    this._z = Math.atan2(m21, m11);
                }
            } else if (order === 'ZYX') {

                this._y = Math.asin(-clamp(m31, -1, 1));

                if (Math.abs(m31) < 0.99999) {

                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);
                } else {

                    this._x = 0;
                    this._z = Math.atan2(-m12, m22);
                }
            } else if (order === 'YZX') {

                this._z = Math.asin(clamp(m21, -1, 1));

                if (Math.abs(m21) < 0.99999) {

                    this._x = Math.atan2(-m23, m22);
                    this._y = Math.atan2(-m31, m11);
                } else {

                    this._x = 0;
                    this._y = Math.atan2(m13, m33);
                }
            } else if (order === 'XZY') {

                this._z = Math.asin(-clamp(m12, -1, 1));

                if (Math.abs(m12) < 0.99999) {

                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);
                } else {

                    this._x = Math.atan2(-m23, m33);
                    this._y = 0;
                }
            } else {

                console.warn('Euler: .setFromRotationMatrix() given unsupported order: ' + order);
            }

            this._order = order;

            if (update !== false) this.onChangeCallback();

            return this;
        }
    }, {
        key: 'setFromQuaternion',
        value: function setFromQuaternion(q, order, update) {

            matrix.makeRotationFromQuaternion(q);

            return this.setFromRotationMatrix(matrix, order, update);
        }
    }, {
        key: 'setFromVector3',
        value: function setFromVector3(v, order) {

            return this.set(v.x, v.y, v.z, order || this._order);
        }

        // WARNING: this discards revolution information -bhouston


    }, {
        key: 'reorder',
        value: function reorder(newOrder) {

            q.setFromEuler(this);

            return this.setFromQuaternion(q, newOrder);
        }
    }, {
        key: 'equals',
        value: function equals(euler) {

            return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array) {

            this._x = array[0];
            this._y = array[1];
            this._z = array[2];
            if (array[3] !== undefined) this._order = array[3];

            this.onChangeCallback();

            return this;
        }
    }, {
        key: 'toArray',
        value: function toArray$$1(array, offset) {

            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;

            array[offset] = this._x;
            array[offset + 1] = this._y;
            array[offset + 2] = this._z;
            array[offset + 3] = this._order;

            return array;
        }
    }, {
        key: 'toVector3',
        value: function toVector3(optionalResult) {

            if (optionalResult) {

                return optionalResult.set(this._x, this._y, this._z);
            } else {

                return new Vector3$1(this._x, this._y, this._z);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(callback) {

            this.onChangeCallback = callback;

            return this;
        }
    }, {
        key: 'onChangeCallback',
        value: function onChangeCallback() {}
    }, {
        key: 'x',
        get: function get$$1() {

            return this._x;
        },
        set: function set$$1(value) {

            this._x = value;
            this.onChangeCallback();
        }
    }, {
        key: 'y',
        get: function get$$1() {

            return this._y;
        },
        set: function set$$1(value) {

            this._y = value;
            this.onChangeCallback();
        }
    }, {
        key: 'z',
        get: function get$$1() {

            return this._z;
        },
        set: function set$$1(value) {

            this._z = value;
            this.onChangeCallback();
        }
    }, {
        key: 'order',
        get: function get$$1() {

            return this._order;
        },
        set: function set$$1(value) {

            this._order = value;
            this.onChangeCallback();
        }
    }]);
    return Euler;
}();

Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];

Euler.DefaultOrder = 'XYZ';

/**
 * @class Object3D 三维对象的基类
 * @description 实现三维对象的的一些基本操作
 * @author bujue
 */
var object3DId = 0;

var Object3D = function (_Events) {
    inherits(Object3D, _Events);

    function Object3D() {
        classCallCheck(this, Object3D);

        var _this = possibleConstructorReturn(this, (Object3D.__proto__ || Object.getPrototypeOf(Object3D)).call(this));

        Object.defineProperty(_this, 'id', { value: object3DId++ });

        _this.parent = null;
        _this.children = [];
        _this.isObject3D = true;

        _this.up = Object3D.DefaultUp.clone();

        var position = new Vector3$1();
        var rotation = new Euler();
        var quaternion = new Quaternion();
        var scale = new Vector3$1(1, 1, 1);

        function onRotationChange() {

            quaternion.setFromEuler(rotation, false);
        }

        function onQuaternionChange() {

            rotation.setFromQuaternion(quaternion, undefined, false);
        }

        rotation.onChange(onRotationChange);
        quaternion.onChange(onQuaternionChange);

        Object.defineProperties(_this, {
            position: {
                enumerable: true,
                value: position
            },
            rotation: {
                enumerable: true,
                value: rotation
            },
            quaternion: {
                enumerable: true,
                value: quaternion
            },
            scale: {
                enumerable: true,
                value: scale
            },
            modelViewMatrix: {
                value: new Matrix4()
            },
            normalMatrix: {
                value: new Matrix3()
            }
        });

        _this.matrix = new Matrix4();
        _this.matrixWorld = new Matrix4();

        _this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
        _this.matrixWorldNeedsUpdate = false;

        _this.visible = true;

        _this.castShadow = false;
        _this.receiveShadow = false;

        _this.frustumCulled = true;
        _this.renderOrder = 0;

        //渲染前调用
        _this.onBeforeRender = function (renderer, scene, camera, geometry, material, group) {};
        //渲染后调用
        _this.onAfterRender = function (renderer, scene, camera, geometry, material, group) {};
        return _this;
    }

    createClass(Object3D, [{
        key: 'applyMatrix',
        value: function applyMatrix(matrix) {

            this.matrix.multiplyMatrices(matrix, this.matrix);

            this.matrix.decompose(this.position, this.quaternion, this.scale);
        }
    }, {
        key: 'lookAt',
        value: function lookAt(x, y, z) {

            _lookAt.call(this, x, y, z);
        }
    }, {
        key: 'add',
        value: function add(object) {
            if (arguments.length > 1) {

                for (var i = 0; i < arguments.length; i++) {

                    this.add(arguments[i]);
                }

                return this;
            }

            if (object === this) {

                console.error("Object3D.add: object can't be added as a child of itself.", object);
                return this;
            }

            if (object && object.isObject3D) {

                if (object.parent !== null) {

                    object.parent.remove(object);
                }

                object.parent = this;

                object.fire({ type: 'added' });

                this.children.push(object);
            } else {

                console.error("Object3D.add: object not an instance of Object3D.", object);
            }

            return this;
        }
    }, {
        key: 'remove',
        value: function remove(object) {

            if (arguments.length > 1) {

                for (var i = 0; i < arguments.length; i++) {

                    this.remove(arguments[i]);
                }

                return this;
            }

            var index = this.children.indexOf(object);

            if (index !== -1) {

                object.parent = null;

                object.fire({ type: 'removed' });

                this.children.splice(index, 1);
            }

            return this;
        }
    }, {
        key: 'traverse',
        value: function traverse(callback) {

            callback(this);

            var children = this.children;

            for (var i = 0, l = children.length; i < l; i++) {

                children[i].traverse(callback);
            }
        }
    }, {
        key: 'getWorldQuaternion',
        value: function getWorldQuaternion(target) {
            return _getWorldQuaternion.call(this, target);
        }
    }, {
        key: 'updateMatrixWorld',
        value: function updateMatrixWorld(force) {

            if (this.matrixAutoUpdate) this.updateMatrix();

            if (this.matrixWorldNeedsUpdate || force) {

                if (this.parent === null) {

                    this.matrixWorld.copy(this.matrix);
                } else {

                    this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                }

                this.matrixWorldNeedsUpdate = false;

                force = true;
            }

            // update children

            var children = this.children;

            for (var i = 0, l = children.length; i < l; i++) {

                children[i].updateMatrixWorld(force);
            }
        }
    }, {
        key: 'applyQuaternion',
        value: function applyQuaternion(q) {

            this.quaternion.premultiply(q);

            return this;
        }
    }, {
        key: 'setRotationFromAxisAngle',
        value: function setRotationFromAxisAngle(axis, angle) {

            // assumes axis is normalized

            this.quaternion.setFromAxisAngle(axis, angle);
        }
    }, {
        key: 'setRotationFromEuler',
        value: function setRotationFromEuler(euler) {

            this.quaternion.setFromEuler(euler, true);
        }
    }, {
        key: 'setRotationFromMatrix',
        value: function setRotationFromMatrix(m) {

            // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

            this.quaternion.setFromRotationMatrix(m);
        }
    }, {
        key: 'setRotationFromQuaternion',
        value: function setRotationFromQuaternion(q) {

            // assumes q is normalized

            this.quaternion.copy(q);
        }
    }, {
        key: 'updateMatrix',
        value: function updateMatrix() {

            this.matrix.compose(this.position, this.quaternion, this.scale);

            this.matrixWorldNeedsUpdate = true;
        }
    }, {
        key: 'rotateX',
        value: function rotateX(angle) {

            var v1 = new Vector3$1(1, 0, 0);

            this.rotateOnAxis(v1, angle);

            v1 = null;

            return this;
        }
    }, {
        key: 'rotateY',
        value: function rotateY(angle) {

            var v1 = new Vector3$1(0, 1, 0);

            this.rotateOnAxis(v1, angle);

            v1 = null;

            return this;
        }
    }, {
        key: 'rotateZ',
        value: function rotateZ(angle) {

            var v1 = new Vector3$1(0, 0, 1);

            this.rotateOnAxis(v1, angle);

            v1 = null;

            return this;
        }
    }, {
        key: 'rotateOnAxis',
        value: function rotateOnAxis(axis, angle) {

            // rotate object on axis in object space
            // axis is assumed to be normalized

            var q1 = new Quaternion();

            q1.setFromAxisAngle(axis, angle);

            this.quaternion.multiply(q1);

            q1 = null;

            return this;
        }
    }, {
        key: 'rotateOnWorldAxis',
        value: function rotateOnWorldAxis(axis, angle) {

            // rotate object on axis in world space
            // axis is assumed to be normalized
            // method assumes no rotated parent

            var q1 = new Quaternion();

            q1.setFromAxisAngle(axis, angle);

            this.quaternion.premultiply(q1);

            return this;
        }
    }, {
        key: 'translateOnAxis',
        value: function translateOnAxis(axis, distance) {

            // translate object by distance along axis in object space
            // axis is assumed to be normalized

            var v1 = new Vector3$1();

            v1.copy(axis).applyQuaternion(this.quaternion);

            this.position.add(v1.multiplyScalar(distance));

            v1 = null;

            return this;
        }
    }, {
        key: 'translateX',
        value: function translateX(distance) {

            var v1 = new Vector3$1(1, 0, 0);

            this.translateOnAxis(v1, distance);

            v1 = null;

            return this;
        }
    }, {
        key: 'translateY',
        value: function translateY(distance) {

            var v1 = new Vector3$1(0, 1, 0);

            this.translateOnAxis(v1, distance);

            v1 = null;

            return this;
        }
    }, {
        key: 'translateZ',
        value: function translateZ(distance) {

            var v1 = new Vector3$1(0, 0, 1);
            this.translateOnAxis(v1, distance);

            v1 = null;

            return this;
        }
    }, {
        key: 'localToWorld',
        value: function localToWorld(vector) {
            return vector.applyMatrix4(this.matrixWorld);
        }
    }, {
        key: 'worldToLocal',
        value: function worldToLocal(vector) {

            var m1 = new Matrix4();
            return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
        }
    }, {
        key: 'raycast',
        value: function raycast() {}
    }]);
    return Object3D;
}(Events);

Object3D.DefaultUp = new Vector3$1(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;

var _getWorldQuaternion = function () {

    var position = new Vector3$1();
    var scale = new Vector3$1();

    return function getWorldQuaternion(target) {

        if (target === undefined) {

            console.warn('Object3D: .getWorldQuaternion() target is now required');
            target = new Quaternion();
        }

        this.updateMatrixWorld(true);

        this.matrixWorld.decompose(position, target, scale);

        return target;
    };
}();

var _lookAt = function () {

    // This method does not support objects with rotated and/or translated parent(s)

    var m1 = new Matrix4();
    var vector = new Vector3$1();

    return function lookAt(x, y, z) {

        if (x.isVector3) {

            vector.copy(x);
        } else {

            vector.set(x, y, z);
        }

        if (this.isCamera) {

            m1.lookAt(this.position, vector, this.up);
        } else {

            m1.lookAt(vector, this.position, this.up);
        }

        this.quaternion.setFromRotationMatrix(m1);
    };
}();

/**
 * @class 场景对象
 * @author bujue
 */

var Scene = function (_Object3D) {
    inherits(Scene, _Object3D);

    function Scene() {
        classCallCheck(this, Scene);

        var _this = possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

        _this.background = null;
        _this.isScene = true;
        _this.autoUpdate = true; // checked by the renderer
        return _this;
    }

    return Scene;
}(Object3D);

/**
 * @class  分组
 * @description 主要是为了将部分对象做批量变换,同Sence,名称上更容易让读者理解
 * @author bujue
 */

var Group = function (_Object3D) {
    inherits(Group, _Object3D);

    function Group() {
        classCallCheck(this, Group);

        var _this = possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this));

        _this.type = 'Group';
        _this.isGroup = true;
        return _this;
    }

    return Group;
}(Object3D);

var v = new Vector3$1();
var v1$4 = new Vector3$1();
var v2$2 = new Vector3$1();
var v3$1 = new Vector3$1();

var segCenter = new Vector3$1();
var segDir = new Vector3$1();
var diff = new Vector3$1();

var diff = new Vector3$1();
var edge1 = new Vector3$1();
var edge2 = new Vector3$1();
var normal = new Vector3$1();

var Ray = function () {
    function Ray(origin, direction) {
        classCallCheck(this, Ray);

        this.origin = origin !== undefined ? origin : new Vector3$1();
        this.direction = direction !== undefined ? direction : new Vector3$1();
    }

    createClass(Ray, [{
        key: 'set',
        value: function set$$1(origin, direction) {

            this.origin.copy(origin);
            this.direction.copy(direction);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(ray) {

            this.origin.copy(ray.origin);
            this.direction.copy(ray.direction);

            return this;
        }
    }, {
        key: 'at',
        value: function at(t, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        }
    }, {
        key: 'lookAt',
        value: function lookAt(v) {

            this.direction.copy(v).sub(this.origin).normalize();

            return this;
        }
    }, {
        key: 'recast',
        value: function recast(t) {

            this.origin.copy(this.at(t, v1$4));

            return this;
        }
    }, {
        key: 'closestPointToPoint',
        value: function closestPointToPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            result.subVectors(point, this.origin);
            var directionDistance = result.dot(this.direction);

            if (directionDistance < 0) {

                return result.copy(this.origin);
            }

            return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        }
    }, {
        key: 'distanceToPoint',
        value: function distanceToPoint(point) {

            return Math.sqrt(this.distanceSqToPoint(point));
        }
    }, {
        key: 'distanceSqToPoint',
        value: function distanceSqToPoint(point) {

            var directionDistance = v2$2.subVectors(point, this.origin).dot(this.direction);

            // point behind the ray

            if (directionDistance < 0) {

                return this.origin.distanceToSquared(point);
            }

            v2$2.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

            return v2$2.distanceToSquared(point);
        }
    }, {
        key: 'distanceSqToSegment',
        value: function distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {

            // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
            // It returns the min distance between the ray and the segment
            // defined by v0 and v1
            // It can also set two optional targets :
            // - The closest point on the ray
            // - The closest point on the segment

            segCenter.copy(v0).add(v1).multiplyScalar(0.5);
            segDir.copy(v1).sub(v0).normalize();
            diff.copy(this.origin).sub(segCenter);

            var segExtent = v0.distanceTo(v1) * 0.5;
            var a01 = -this.direction.dot(segDir);
            var b0 = diff.dot(this.direction);
            var b1 = -diff.dot(segDir);
            var c = diff.lengthSq();
            var det = Math.abs(1 - a01 * a01);
            var s0, s1, sqrDist, extDet;

            if (det > 0) {

                // The ray and segment are not parallel.

                s0 = a01 * b1 - b0;
                s1 = a01 * b0 - b1;
                extDet = segExtent * det;

                if (s0 >= 0) {

                    if (s1 >= -extDet) {

                        if (s1 <= extDet) {

                            // region 0
                            // Minimum at interior points of ray and segment.

                            var invDet = 1 / det;
                            s0 *= invDet;
                            s1 *= invDet;
                            sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                        } else {

                            // region 1

                            s1 = segExtent;
                            s0 = Math.max(0, -(a01 * s1 + b0));
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        }
                    } else {

                        // region 5

                        s1 = -segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                } else {

                    if (s1 <= -extDet) {

                        // region 4

                        s0 = Math.max(0, -(-a01 * segExtent + b0));
                        s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    } else if (s1 <= extDet) {

                        // region 3

                        s0 = 0;
                        s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = s1 * (s1 + 2 * b1) + c;
                    } else {

                        // region 2

                        s0 = Math.max(0, -(a01 * segExtent + b0));
                        s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                }
            } else {

                // Ray and segment are parallel.

                s1 = a01 > 0 ? -segExtent : segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }

            if (optionalPointOnRay) {

                optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
            }

            if (optionalPointOnSegment) {

                optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
            }

            return sqrDist;
        }
    }, {
        key: 'intersectSphere',
        value: function intersectSphere(sphere, optionalTarget) {

            v3$1.subVectors(sphere.center, this.origin);
            var tca = v3$1.dot(this.direction);
            var d2 = v3$1.dot(v3$1) - tca * tca;
            var radius2 = sphere.radius * sphere.radius;

            if (d2 > radius2) return null;

            var thc = Math.sqrt(radius2 - d2);

            // t0 = first intersect point - entrance on front of sphere
            var t0 = tca - thc;

            // t1 = second intersect point - exit point on back of sphere
            var t1 = tca + thc;

            // test to see if both t0 and t1 are behind the ray - if so, return null
            if (t0 < 0 && t1 < 0) return null;

            // test to see if t0 is behind the ray:
            // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
            // in order to always return an intersect point that is in front of the ray.
            if (t0 < 0) return this.at(t1, optionalTarget);

            // else t0 is in front of the ray, so return the first collision point scaled by t0
            return this.at(t0, optionalTarget);
        }
    }, {
        key: 'intersectsSphere',
        value: function intersectsSphere(sphere) {

            return this.distanceToPoint(sphere.center) <= sphere.radius;
        }
    }, {
        key: 'distanceToPlane',
        value: function distanceToPlane(plane) {

            var denominator = plane.normal.dot(this.direction);

            if (denominator === 0) {

                // line is coplanar, return origin
                if (plane.distanceToPoint(this.origin) === 0) {

                    return 0;
                }

                // Null is preferable to undefined since undefined means.... it is undefined

                return null;
            }

            var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;

            // Return if the ray never intersects the plane

            return t >= 0 ? t : null;
        }
    }, {
        key: 'intersectPlane',
        value: function intersectPlane(plane, optionalTarget) {

            var t = this.distanceToPlane(plane);

            if (t === null) {

                return null;
            }

            return this.at(t, optionalTarget);
        }
    }, {
        key: 'intersectsPlane',
        value: function intersectsPlane(plane) {

            // check if the ray lies on the plane first

            var distToPoint = plane.distanceToPoint(this.origin);

            if (distToPoint === 0) {

                return true;
            }

            var denominator = plane.normal.dot(this.direction);

            if (denominator * distToPoint < 0) {

                return true;
            }

            // ray origin is behind the plane (and is pointing behind it)

            return false;
        }
    }, {
        key: 'intersectBox',
        value: function intersectBox(box, optionalTarget) {

            var tmin, tmax, tymin, tymax, tzmin, tzmax;

            var invdirx = 1 / this.direction.x,
                invdiry = 1 / this.direction.y,
                invdirz = 1 / this.direction.z;

            var origin = this.origin;

            if (invdirx >= 0) {

                tmin = (box.min.x - origin.x) * invdirx;
                tmax = (box.max.x - origin.x) * invdirx;
            } else {

                tmin = (box.max.x - origin.x) * invdirx;
                tmax = (box.min.x - origin.x) * invdirx;
            }

            if (invdiry >= 0) {

                tymin = (box.min.y - origin.y) * invdiry;
                tymax = (box.max.y - origin.y) * invdiry;
            } else {

                tymin = (box.max.y - origin.y) * invdiry;
                tymax = (box.min.y - origin.y) * invdiry;
            }

            if (tmin > tymax || tymin > tmax) return null;

            // These lines also handle the case where tmin or tmax is NaN
            // (result of 0 * Infinity). x !== x returns true if x is NaN

            if (tymin > tmin || tmin !== tmin) tmin = tymin;

            if (tymax < tmax || tmax !== tmax) tmax = tymax;

            if (invdirz >= 0) {

                tzmin = (box.min.z - origin.z) * invdirz;
                tzmax = (box.max.z - origin.z) * invdirz;
            } else {

                tzmin = (box.max.z - origin.z) * invdirz;
                tzmax = (box.min.z - origin.z) * invdirz;
            }

            if (tmin > tzmax || tzmin > tmax) return null;

            if (tzmin > tmin || tmin !== tmin) tmin = tzmin;

            if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

            //return point closest to the ray (positive side)

            if (tmax < 0) return null;

            return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
        }
    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {

            return this.intersectBox(box, v) !== null;
        }

        // Compute the offset origin, edges, and normal.

    }, {
        key: 'intersectTriangle',
        value: function intersectTriangle(a, b, c, backfaceCulling, optionalTarget) {

            // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

            edge1.subVectors(b, a);
            edge2.subVectors(c, a);
            normal.crossVectors(edge1, edge2);

            // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
            // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
            //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
            //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
            //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
            var DdN = this.direction.dot(normal);
            var sign;

            if (DdN > 0) {

                if (backfaceCulling) return null;
                sign = 1;
            } else if (DdN < 0) {

                sign = -1;
                DdN = -DdN;
            } else {

                return null;
            }

            diff.subVectors(this.origin, a);
            var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));

            // b1 < 0, no intersection
            if (DdQxE2 < 0) {

                return null;
            }

            var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));

            // b2 < 0, no intersection
            if (DdE1xQ < 0) {

                return null;
            }

            // b1+b2 > 1, no intersection
            if (DdQxE2 + DdE1xQ > DdN) {

                return null;
            }

            // Line intersects triangle, check if ray does.
            var QdN = -sign * diff.dot(normal);

            // t < 0, no intersection
            if (QdN < 0) {

                return null;
            }

            // Ray intersects triangle.
            return this.at(QdN / DdN, optionalTarget);
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix4) {

            this.origin.applyMatrix4(matrix4);
            this.direction.transformDirection(matrix4);

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(ray) {

            return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
        }
    }]);
    return Ray;
}();

var startP = new Vector3$1();
var startEnd = new Vector3$1();

var Line3 = function () {
    function Line3(start, end) {
        classCallCheck(this, Line3);

        this.start = start !== undefined ? start : new Vector3$1();
        this.end = end !== undefined ? end : new Vector3$1();
    }

    createClass(Line3, [{
        key: 'set',
        value: function set$$1(start, end) {

            this.start.copy(start);
            this.end.copy(end);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(line) {

            this.start.copy(line.start);
            this.end.copy(line.end);

            return this;
        }
    }, {
        key: 'getCenter',
        value: function getCenter(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.addVectors(this.start, this.end).multiplyScalar(0.5);
        }
    }, {
        key: 'delta',
        value: function delta(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.subVectors(this.end, this.start);
        }
    }, {
        key: 'distanceSq',
        value: function distanceSq() {

            return this.start.distanceToSquared(this.end);
        }
    }, {
        key: 'distance',
        value: function distance() {

            return this.start.distanceTo(this.end);
        }
    }, {
        key: 'at',
        value: function at(t, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            return this.delta(result).multiplyScalar(t).add(this.start);
        }
    }, {
        key: 'closestPointToPointParameter',
        value: function closestPointToPointParameter(point, clampToLine) {

            startP.subVectors(point, this.start);
            startEnd.subVectors(this.end, this.start);

            var startEnd2 = startEnd.dot(startEnd);
            var startEnd_startP = startEnd.dot(startP);

            var t = startEnd_startP / startEnd2;

            if (clampToLine) {

                t = _Math.clamp(t, 0, 1);
            }

            return t;
        }
    }, {
        key: 'closestPointToPoint',
        value: function closestPointToPoint(point, clampToLine, optionalTarget) {

            var t = this.closestPointToPointParameter(point, clampToLine);

            var result = optionalTarget || new Vector3$1();

            return this.delta(result).multiplyScalar(t).add(this.start);
        }
    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix) {

            this.start.applyMatrix4(matrix);
            this.end.applyMatrix4(matrix);

            return this;
        }
    }, {
        key: 'equals',
        value: function equals(line) {

            return line.start.equals(this.start) && line.end.equals(this.end);
        }
    }]);
    return Line3;
}();

var v$1 = new Vector3$1();

var v0 = new Vector3$1();
var v1$5 = new Vector3$1();
var v2$3 = new Vector3$1();

var v4$1 = new Vector3$1();

var v5 = new Vector3$1();
var v6 = new Vector3$1();

var plane = new Plane();
var edgeList = [new Line3(), new Line3(), new Line3()];
var projectedPoint = new Vector3$1();
var closestPoint = new Vector3$1();

var Triangle = function () {
    function Triangle(a, b, c) {
        classCallCheck(this, Triangle);

        this.a = a !== undefined ? a : new Vector3$1();
        this.b = b !== undefined ? b : new Vector3$1();
        this.c = c !== undefined ? c : new Vector3$1();
    }

    createClass(Triangle, [{
        key: 'set',
        value: function set$$1(a, b, c) {

            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(c);

            return this;
        }
    }, {
        key: 'setFromPointsAndIndices',
        value: function setFromPointsAndIndices(points, i0, i1, i2) {

            this.a.copy(points[i0]);
            this.b.copy(points[i1]);
            this.c.copy(points[i2]);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(triangle) {

            this.a.copy(triangle.a);
            this.b.copy(triangle.b);
            this.c.copy(triangle.c);

            return this;
        }

        // static/instance method to calculate barycentric coordinates
        // based on: http://www.blackpawn.com/texts/pointinpoly/default.html

    }, {
        key: 'area',
        value: function area() {

            v5.subVectors(this.c, this.b);
            v6.subVectors(this.a, this.b);

            return v5.cross(v6).length() * 0.5;
        }
    }, {
        key: 'midpoint',
        value: function midpoint(optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        }
    }, {
        key: 'normal',
        value: function normal(optionalTarget) {

            return Triangle.normal(this.a, this.b, this.c, optionalTarget);
        }
    }, {
        key: 'plane',
        value: function plane(optionalTarget) {

            var result = optionalTarget || new Plane();

            return result.setFromCoplanarPoints(this.a, this.b, this.c);
        }
    }, {
        key: 'barycoordFromPoint',
        value: function barycoordFromPoint(point, optionalTarget) {

            return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
        }
    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {

            return Triangle.containsPoint(point, this.a, this.b, this.c);
        }
    }, {
        key: 'closestPointToPoint',
        value: function closestPointToPoint(point, optionalTarget) {

            var result = optionalTarget || new Vector3$1();
            var minDistance = Infinity;

            // project the point onto the plane of the triangle

            plane.setFromCoplanarPoints(this.a, this.b, this.c);
            plane.projectPoint(point, projectedPoint);

            // check if the projection lies within the triangle

            if (this.containsPoint(projectedPoint) === true) {

                // if so, this is the closest point

                result.copy(projectedPoint);
            } else {

                // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices

                edgeList[0].set(this.a, this.b);
                edgeList[1].set(this.b, this.c);
                edgeList[2].set(this.c, this.a);

                for (var i = 0; i < edgeList.length; i++) {

                    edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);

                    var distance = projectedPoint.distanceToSquared(closestPoint);

                    if (distance < minDistance) {

                        minDistance = distance;

                        result.copy(closestPoint);
                    }
                }
            }

            return result;
        }
    }, {
        key: 'equals',
        value: function equals(triangle) {

            return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
        }
    }], [{
        key: 'normal',
        value: function normal(a, b, c, optionalTarget) {

            var result = optionalTarget || new Vector3$1();

            result.subVectors(c, b);
            v$1.subVectors(a, b);
            result.cross(v$1);

            var resultLengthSq = result.lengthSq();
            if (resultLengthSq > 0) {

                return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
            }

            return result.set(0, 0, 0);
        }
    }, {
        key: 'getNormal',
        value: function getNormal(a, b, c, target) {
            return _getNormal.call(this, a, b, c, target);
        }

        // static/instance method to calculate barycentric coordinates
        // based on: http://www.blackpawn.com/texts/pointinpoly/default.html

    }, {
        key: 'barycoordFromPoint',
        value: function barycoordFromPoint(point, a, b, c, optionalTarget) {

            v0.subVectors(c, a);
            v1$5.subVectors(b, a);
            v2$3.subVectors(point, a);

            var dot00 = v0.dot(v0);
            var dot01 = v0.dot(v1$5);
            var dot02 = v0.dot(v2$3);
            var dot11 = v1$5.dot(v1$5);
            var dot12 = v1$5.dot(v2$3);

            var denom = dot00 * dot11 - dot01 * dot01;

            var result = optionalTarget || new Vector3$1();

            // collinear or singular triangle
            if (denom === 0) {

                // arbitrary location outside of triangle?
                // not sure if this is the best idea, maybe should be returning undefined
                return result.set(-2, -1, -1);
            }

            var invDenom = 1 / denom;
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

            // barycentric coordinates must always sum to 1
            return result.set(1 - u - v, v, u);
        }
    }, {
        key: 'containsPoint',
        value: function containsPoint(point, a, b, c) {

            var result = Triangle.barycoordFromPoint(point, a, b, c, v4$1);

            return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
        }
    }, {
        key: 'getBarycoord',
        value: function getBarycoord(point, a, b, c, target) {
            return _getBarycoord.call(this, point, a, b, c, target);
        }
    }]);
    return Triangle;
}();

var _getBarycoord = function () {

    var v0 = new Vector3$1();
    var v1 = new Vector3$1();
    var v2 = new Vector3$1();

    return function getBarycoord(point, a, b, c, target) {

        v0.subVectors(c, a);
        v1.subVectors(b, a);
        v2.subVectors(point, a);

        var dot00 = v0.dot(v0);
        var dot01 = v0.dot(v1);
        var dot02 = v0.dot(v2);
        var dot11 = v1.dot(v1);
        var dot12 = v1.dot(v2);

        var denom = dot00 * dot11 - dot01 * dot01;

        if (target === undefined) {

            console.warn('Triangle: .getBarycoord() target is now required');
            target = new Vector3$1();
        }

        // collinear or singular triangle
        if (denom === 0) {

            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return target.set(-2, -1, -1);
        }

        var invDenom = 1 / denom;
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // barycentric coordinates must always sum to 1
        return target.set(1 - u - v, v, u);
    };
}();

var _getNormal = function () {

    var v0 = new Vector3$1();

    return function getNormal(a, b, c, target) {

        if (target === undefined) {

            console.warn('THREE.Triangle: .getNormal() target is now required');
            target = new Vector3$1();
        }

        target.subVectors(c, b);
        v0.subVectors(a, b);
        target.cross(v0);

        var targetLengthSq = target.lengthSq();
        if (targetLengthSq > 0) {

            return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
        }

        return target.set(0, 0, 0);
    };
}();

var Face3 = function () {
    function Face3(a, b, c, normal, color, materialIndex) {
        classCallCheck(this, Face3);

        this.a = a;
        this.b = b;
        this.c = c;

        this.normal = normal && normal.isVector3 ? normal : new Vector3$1();
        this.vertexNormals = Array.isArray(normal) ? normal : [];

        this.color = color && color.isColor ? color : new Color$1();
        this.vertexColors = Array.isArray(color) ? color : [];

        this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
    }

    createClass(Face3, [{
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(source) {

            this.a = source.a;
            this.b = source.b;
            this.c = source.c;

            this.normal.copy(source.normal);
            this.color.copy(source.color);

            this.materialIndex = source.materialIndex;

            for (var i = 0, il = source.vertexNormals.length; i < il; i++) {

                this.vertexNormals[i] = source.vertexNormals[i].clone();
            }

            for (var i = 0, il = source.vertexColors.length; i < il; i++) {

                this.vertexColors[i] = source.vertexColors[i].clone();
            }

            return this;
        }
    }]);
    return Face3;
}();

/**
 * @class  材质基类
 * @author bujue
 */
var materialId = 0;

var Material = function (_Events) {
    inherits(Material, _Events);

    function Material() {
        classCallCheck(this, Material);

        var _this = possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).call(this));

        _this.type = 'Material';
        Object.defineProperty(_this, 'id', { value: materialId++ });

        _this.opacity = 1;
        _this.transparent = false;

        _this.lights = true;
        _this.depthFunc = LessEqualDepth;
        _this.depthTest = true;
        _this.depthWrite = true;

        _this.blending = NormalBlending;
        _this.side = FrontSide;
        _this.vertexColors = NoColors;

        _this.visible = true;
        _this.needsUpdate = true;

        _this.colorWrite = true;
        _this.precision = null;

        _this.polygonOffset = false;
        _this.polygonOffsetFactor = 0;
        _this.polygonOffsetUnits = 0;

        _this.blendSrc = SrcAlphaFactor;
        _this.blendDst = OneMinusSrcAlphaFactor;
        _this.blendEquation = AddEquation;
        _this.blendSrcAlpha = null;
        _this.blendDstAlpha = null;
        _this.blendEquationAlpha = null;

        _this.premultipliedAlpha = false;

        _this.onBeforeCompile = function () {};
        return _this;
    }

    createClass(Material, [{
        key: 'setValues',
        value: function setValues(values) {

            if (values === undefined) return;

            for (var key in values) {

                var newValue = values[key];

                if (newValue === undefined) {

                    console.warn("Material: '" + key + "' parameter is undefined.");
                    continue;
                }

                // for backward compatability if shading is set in the constructor
                if (key === 'shading') {

                    console.warn(this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
                    this.flatShading = newValue === FlatShading ? true : false;
                    continue;
                }

                var currentValue = this[key];

                if (currentValue === undefined) {

                    console.warn(this.type + ": '" + key + "' is not a property of this material.");
                    continue;
                }

                if (currentValue && currentValue.isColor) {

                    currentValue.set(newValue);
                } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {

                    currentValue.copy(newValue);
                } else if (key === 'overdraw') {

                    // ensure overdraw is backwards-compatible with legacy boolean type
                    this[key] = Number(newValue);
                } else {

                    this[key] = newValue;
                }
            }
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(source) {

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
    }, {
        key: 'dispose',
        value: function dispose() {

            this.fire({ type: 'dispose' });
        }
    }]);
    return Material;
}(Events);

var MeshBasicMaterial$$1 = function (_Material) {
    inherits(MeshBasicMaterial$$1, _Material);

    function MeshBasicMaterial$$1(parameters) {
        classCallCheck(this, MeshBasicMaterial$$1);

        var _this = possibleConstructorReturn(this, (MeshBasicMaterial$$1.__proto__ || Object.getPrototypeOf(MeshBasicMaterial$$1)).call(this));

        _this.color = new Color$1(0xffffff); // emissive
        _this.map = null;

        _this.type = 'MeshBasicMaterial';
        _this.wireframe = false;
        _this.wireframeLinewidth = 1;
        _this.isMeshBasicMaterial = true;

        //不接受灯光
        _this.lights = false;

        _this.setValues(parameters);
        return _this;
    }

    createClass(MeshBasicMaterial$$1, [{
        key: "copy",
        value: function copy(source) {
            get(MeshBasicMaterial$$1.prototype.__proto__ || Object.getPrototypeOf(MeshBasicMaterial$$1.prototype), "copy", this).call(this, source);

            this.color.copy(source.color);
            this.map = source.map;
            this.wireframe = source.wireframe;

            return this;
        }
    }]);
    return MeshBasicMaterial$$1;
}(Material);

/**
 * @class Mesh 渲染网格对象
 * @description 渲染的网格对象,包括geometry material
 * @author bujue
 */

var Mesh = function (_Object3D) {
    inherits(Mesh, _Object3D);

    function Mesh(geometry, material) {
        classCallCheck(this, Mesh);

        var _this = possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this));

        _this.geometry = geometry;
        _this.material = material;

        _this.drawMode = TrianglesDrawMode;
        _this.isMesh = true;

        return _this;
    }

    createClass(Mesh, [{
        key: 'setDrawMode',
        value: function setDrawMode(value) {

            this.drawMode = value;
        }
    }, {
        key: 'raycast',
        value: function raycast(raycaster, intersects) {
            _raycast.call(this, raycaster, intersects);
        }
    }]);
    return Mesh;
}(Object3D);

var _raycast = function () {

    var inverseMatrix = new Matrix4();
    var ray = new Ray();
    var sphere = new Sphere();

    var vA = new Vector3$1();
    var vB = new Vector3$1();
    var vC = new Vector3$1();

    var tempA = new Vector3$1();
    var tempB = new Vector3$1();
    var tempC = new Vector3$1();

    var uvA = new Vector2();
    var uvB = new Vector2();
    var uvC = new Vector2();

    var barycoord = new Vector3$1();

    var intersectionPoint = new Vector3$1();
    var intersectionPointWorld = new Vector3$1();

    function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {

        Triangle.getBarycoord(point, p1, p2, p3, barycoord);

        uv1.multiplyScalar(barycoord.x);
        uv2.multiplyScalar(barycoord.y);
        uv3.multiplyScalar(barycoord.z);

        uv1.add(uv2).add(uv3);

        return uv1.clone();
    }

    function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {

        var intersect;

        if (material.side === BackSide) {

            intersect = ray.intersectTriangle(pC, pB, pA, true, point);
        } else {

            intersect = ray.intersectTriangle(pA, pB, pC, material.side !== DoubleSide, point);
        }

        if (intersect === null) return null;

        intersectionPointWorld.copy(point);
        intersectionPointWorld.applyMatrix4(object.matrixWorld);

        var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

        if (distance < raycaster.near || distance > raycaster.far) return null;

        return {
            distance: distance,
            point: intersectionPointWorld.clone(),
            object: object
        };
    }

    function checkBufferGeometryIntersection(object, raycaster, ray, position, uv, a, b, c) {

        vA.fromBufferAttribute(position, a);
        vB.fromBufferAttribute(position, b);
        vC.fromBufferAttribute(position, c);

        var intersection = checkIntersection(object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint);

        if (intersection) {

            if (uv) {

                uvA.fromBufferAttribute(uv, a);
                uvB.fromBufferAttribute(uv, b);
                uvC.fromBufferAttribute(uv, c);

                intersection.uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);
            }

            var face = new Face3(a, b, c);
            Triangle.getNormal(vA, vB, vC, face.normal);

            intersection.face = face;
        }

        return intersection;
    }

    return function raycast(raycaster, intersects) {

        var geometry = this.geometry;
        var material = this.material;
        var matrixWorld = this.matrixWorld;

        if (material === undefined) return;

        // Checking boundingSphere distance to ray

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        sphere.copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);

        if (raycaster.ray.intersectsSphere(sphere) === false) return;

        //

        inverseMatrix.getInverse(matrixWorld);
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

        // Check boundingBox before continuing

        if (geometry.boundingBox !== null) {

            if (ray.intersectsBox(geometry.boundingBox) === false) return;
        }

        var intersection;

        if (geometry.isBufferGeometry) {

            var a, b, c;
            var index = geometry.index;
            var position = geometry.attributes.position;
            var uv = geometry.attributes.uv;
            var i, l;

            if (index !== null) {

                // indexed buffer geometry

                for (i = 0, l = index.count; i < l; i += 3) {

                    a = index.getX(i);
                    b = index.getX(i + 1);
                    c = index.getX(i + 2);

                    intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);

                    if (intersection) {

                        intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
                        intersects.push(intersection);
                    }
                }
            } else if (position !== undefined) {

                // non-indexed buffer geometry

                for (i = 0, l = position.count; i < l; i += 3) {

                    a = i;
                    b = i + 1;
                    c = i + 2;

                    intersection = checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);

                    if (intersection) {

                        intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
                        intersects.push(intersection);
                    }
                }
            }
        } else if (geometry.isGeometry) {

            var fvA, fvB, fvC;
            var isMultiMaterial = Array.isArray(material);

            var vertices = geometry.vertices;
            var faces = geometry.faces;
            var uvs;

            var faceVertexUvs = geometry.faceVertexUvs[0];
            if (faceVertexUvs.length > 0) uvs = faceVertexUvs;

            for (var f = 0, fl = faces.length; f < fl; f++) {

                var face = faces[f];
                var faceMaterial = isMultiMaterial ? material[face.materialIndex] : material;

                if (faceMaterial === undefined) continue;

                fvA = vertices[face.a];
                fvB = vertices[face.b];
                fvC = vertices[face.c];

                if (faceMaterial.morphTargets === true) {

                    var morphTargets = geometry.morphTargets;
                    var morphInfluences = this.morphTargetInfluences;

                    vA.set(0, 0, 0);
                    vB.set(0, 0, 0);
                    vC.set(0, 0, 0);

                    for (var t = 0, tl = morphTargets.length; t < tl; t++) {

                        var influence = morphInfluences[t];

                        if (influence === 0) continue;

                        var targets = morphTargets[t].vertices;

                        vA.addScaledVector(tempA.subVectors(targets[face.a], fvA), influence);
                        vB.addScaledVector(tempB.subVectors(targets[face.b], fvB), influence);
                        vC.addScaledVector(tempC.subVectors(targets[face.c], fvC), influence);
                    }

                    vA.add(fvA);
                    vB.add(fvB);
                    vC.add(fvC);

                    fvA = vA;
                    fvB = vB;
                    fvC = vC;
                }

                intersection = checkIntersection(this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint);

                if (intersection) {

                    if (uvs && uvs[f]) {

                        var uvs_f = uvs[f];
                        uvA.copy(uvs_f[0]);
                        uvB.copy(uvs_f[1]);
                        uvC.copy(uvs_f[2]);

                        intersection.uv = uvIntersection(intersectionPoint, fvA, fvB, fvC, uvA, uvB, uvC);
                    }

                    intersection.face = face;
                    intersection.faceIndex = f;
                    intersects.push(intersection);
                }
            }
        }
    };
}();

var LineBasicMaterial = function (_Material) {
    inherits(LineBasicMaterial, _Material);

    function LineBasicMaterial(parameters) {
        classCallCheck(this, LineBasicMaterial);

        var _this = possibleConstructorReturn(this, (LineBasicMaterial.__proto__ || Object.getPrototypeOf(LineBasicMaterial)).call(this));

        _this.type = 'LineBasicMaterial';
        _this.color = new Color$1(0xffffff);
        _this.linewidth = 1;

        //todo 暂不需要
        _this.lights = false;

        _this.setValues(parameters);
        _this.isLineBasicMaterial = true;
        return _this;
    }

    createClass(LineBasicMaterial, [{
        key: "copy",
        value: function copy(source) {
            get(LineBasicMaterial.prototype.__proto__ || Object.getPrototypeOf(LineBasicMaterial.prototype), "copy", this).call(this, source);
            this.color.copy(source.color);
            this.linewidth = source.linewidth;

            return this;
        }
    }]);
    return LineBasicMaterial;
}(Material);

/**
 * @class  线条
 * @description 线条对象
 * @author bujue
 */

var Line = function (_Object3D) {
    inherits(Line, _Object3D);

    function Line(geometry, material) {
        classCallCheck(this, Line);

        var _this = possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

        _this.type = 'Line';

        _this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
        _this.material = material !== undefined ? material : new LineBasicMaterial({ color: Math.random() * 0xffffff });
        _this.isLine = true;
        _this.drawMode = LinesMode;

        if (_this.material.isLineDashedMaterial) {
            _this.computeLineDistances();
        }

        return _this;
    }

    createClass(Line, [{
        key: 'setDrawMode',
        value: function setDrawMode(value) {
            this.drawMode = value;
        }
    }, {
        key: 'computeLineDistances',
        value: function computeLineDistances() {
            _computeLineDistances.call(this);
        }
    }, {
        key: 'raycast',
        value: function raycast(raycaster, intersects) {
            _raycast$1.call(this, raycaster, intersects);
        }
    }]);
    return Line;
}(Object3D);

var _computeLineDistances = function () {

    var start = new Vector3$1();
    var end = new Vector3$1();

    return function computeLineDistances() {

        var geometry = this.geometry;

        if (geometry.isBufferGeometry) {

            // we assume non-indexed geometry

            if (geometry.index === null) {

                var positionAttribute = geometry.attributes.position;
                var lineDistances = [];

                for (var i = 0, l = positionAttribute.count; i < l; i += 2) {

                    start.fromBufferAttribute(positionAttribute, i);
                    end.fromBufferAttribute(positionAttribute, i + 1);

                    lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
                    lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
                }

                geometry.addAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));
            }
        } else if (geometry.isGeometry) {

            var vertices = geometry.vertices;
            var lineDistances = geometry.lineDistances;

            for (var i = 0, l = vertices.length; i < l; i += 2) {

                start.copy(vertices[i]);
                end.copy(vertices[i + 1]);

                lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
                lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
            }
        }

        return this;
    };
}();

var _raycast$1 = function () {

    var inverseMatrix = new Matrix4();
    var ray = new Ray();
    var sphere = new Sphere();

    return function raycast(raycaster, intersects) {

        var precision = raycaster.linePrecision;
        var precisionSq = precision * precision;

        var geometry = this.geometry;
        var matrixWorld = this.matrixWorld;

        // Checking boundingSphere distance to ray

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        sphere.copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);

        if (raycaster.ray.intersectsSphere(sphere) === false) return;

        //

        inverseMatrix.getInverse(matrixWorld);
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

        var vStart = new Vector3$1();
        var vEnd = new Vector3$1();
        var interSegment = new Vector3$1();
        var interRay = new Vector3$1();
        var step = 1;

        if (geometry.isBufferGeometry) {

            var index = geometry.index;
            var attributes = geometry.attributes;
            var positions = attributes.position.array;

            if (index !== null) {

                var indices = index.array;

                for (var i = 0, l = indices.length - 1; i < l; i += step) {

                    var a = indices[i];
                    var b = indices[i + 1];

                    vStart.fromArray(positions, a * 3);
                    vEnd.fromArray(positions, b * 3);

                    var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                    if (distSq > precisionSq) continue;

                    interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                    var distance = raycaster.ray.origin.distanceTo(interRay);

                    if (distance < raycaster.near || distance > raycaster.far) continue;

                    intersects.push({

                        distance: distance,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this

                    });
                }
            } else {

                for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {

                    vStart.fromArray(positions, 3 * i);
                    vEnd.fromArray(positions, 3 * i + 3);

                    var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);

                    if (distSq > precisionSq) continue;

                    interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                    var distance = raycaster.ray.origin.distanceTo(interRay);

                    if (distance < raycaster.near || distance > raycaster.far) continue;

                    intersects.push({

                        distance: distance,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                        index: i,
                        face: null,
                        faceIndex: null,
                        object: this

                    });
                }
            }
        } else if (geometry.isGeometry) {

            var vertices = geometry.vertices;
            var nbVertices = vertices.length;

            for (var i = 0; i < nbVertices - 1; i += step) {

                var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);

                if (distSq > precisionSq) continue;

                interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

                var distance = raycaster.ray.origin.distanceTo(interRay);

                if (distance < raycaster.near || distance > raycaster.far) continue;

                intersects.push({

                    distance: distance,
                    // What do we want? intersection point on the ray or on the segment??
                    // point: raycaster.ray.at( distance ),
                    point: interSegment.clone().applyMatrix4(this.matrixWorld),
                    index: i,
                    face: null,
                    faceIndex: null,
                    object: this

                });
            }
        }
    };
}();

var InterleavedBufferAttribute = function () {
    function InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized) {
        classCallCheck(this, InterleavedBufferAttribute);


        this.data = interleavedBuffer;
        this.itemSize = itemSize;
        this.offset = offset;

        this.normalized = normalized === true;

        this.isInterleavedBufferAttribute = true;
    }

    createClass(InterleavedBufferAttribute, [{
        key: "setX",
        value: function setX(index, x) {

            this.data.array[index * this.data.stride + this.offset] = x;

            return this;
        }
    }, {
        key: "setY",
        value: function setY(index, y) {

            this.data.array[index * this.data.stride + this.offset + 1] = y;

            return this;
        }
    }, {
        key: "setZ",
        value: function setZ(index, z) {

            this.data.array[index * this.data.stride + this.offset + 2] = z;

            return this;
        }
    }, {
        key: "setW",
        value: function setW(index, w) {

            this.data.array[index * this.data.stride + this.offset + 3] = w;

            return this;
        }
    }, {
        key: "getX",
        value: function getX(index) {

            return this.data.array[index * this.data.stride + this.offset];
        }
    }, {
        key: "getY",
        value: function getY(index) {

            return this.data.array[index * this.data.stride + this.offset + 1];
        }
    }, {
        key: "getZ",
        value: function getZ(index) {

            return this.data.array[index * this.data.stride + this.offset + 2];
        }
    }, {
        key: "getW",
        value: function getW(index) {

            return this.data.array[index * this.data.stride + this.offset + 3];
        }
    }, {
        key: "setXY",
        value: function setXY(index, x, y) {

            this.setX(index, x);
            this.setY(index, y);

            return this;
        }
    }, {
        key: "setXYZ",
        value: function setXYZ(index, x, y, z) {

            this.setX(index, x);
            this.setY(index, y);
            this.setZ(index, z);

            return this;
        }
    }, {
        key: "setXYZW",
        value: function setXYZW(index, x, y, z, w) {

            this.setX(index, x);
            this.setY(index, y);
            this.setZ(index, z);
            this.setW(index, w);

            return this;
        }
    }, {
        key: "count",
        get: function get$$1() {
            return this.data.count;
        }
    }, {
        key: "array",
        get: function get$$1() {
            return this.data.array;
        }
    }]);
    return InterleavedBufferAttribute;
}();

var InterleavedBuffer = function () {
    function InterleavedBuffer(array, stride) {
        classCallCheck(this, InterleavedBuffer);


        this.array = array;
        this.stride = stride;
        this.count = array !== undefined ? array.length / stride : 0;

        this.dynamic = false;
        this.updateRange = { offset: 0, count: -1 };

        this.version = 0;

        this.isInterleavedBuffer = true;
    }

    createClass(InterleavedBuffer, [{
        key: 'onUploadCallback',
        value: function onUploadCallback() {}
    }, {
        key: 'setArray',
        value: function setArray(array) {

            if (Array.isArray(array)) {

                throw new TypeError('BufferAttribute: array should be a Typed Array.');
            }

            this.count = array !== undefined ? array.length / this.stride : 0;
            this.array = array;

            return this;
        }
    }, {
        key: 'setDynamic',
        value: function setDynamic(value) {

            this.dynamic = value;

            return this;
        }
    }, {
        key: 'copy',
        value: function copy(source) {

            this.array = new source.array.constructor(source.array);
            this.count = source.count;
            this.stride = source.stride;
            this.dynamic = source.dynamic;

            return this;
        }
    }, {
        key: 'copyAt',
        value: function copyAt(index1, attribute, index2) {

            index1 *= this.stride;
            index2 *= attribute.stride;

            for (var i = 0, l = this.stride; i < l; i++) {

                this.array[index1 + i] = attribute.array[index2 + i];
            }

            return this;
        }
    }, {
        key: 'set',
        value: function set$$1(value, offset) {

            if (offset === undefined) offset = 0;

            this.array.set(value, offset);

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.constructor().copy(this);
        }
    }, {
        key: 'onUpload',
        value: function onUpload(callback) {

            this.onUploadCallback = callback;

            return this;
        }
    }, {
        key: 'needsUpdate',
        set: function set$$1(value) {
            if (value === true) this.version++;
        }
    }]);
    return InterleavedBuffer;
}();

var InstancedInterleavedBuffer = function (_InterleavedBuffer) {
    inherits(InstancedInterleavedBuffer, _InterleavedBuffer);

    function InstancedInterleavedBuffer(array, stride, meshPerAttribute) {
        classCallCheck(this, InstancedInterleavedBuffer);

        var _this = possibleConstructorReturn(this, (InstancedInterleavedBuffer.__proto__ || Object.getPrototypeOf(InstancedInterleavedBuffer)).call(this, array, stride));

        _this.meshPerAttribute = meshPerAttribute || 1;
        _this.isInstancedInterleavedBuffer = true;

        return _this;
    }

    createClass(InstancedInterleavedBuffer, [{
        key: 'copy',
        value: function copy(source) {

            get(InstancedInterleavedBuffer.prototype.__proto__ || Object.getPrototypeOf(InstancedInterleavedBuffer.prototype), 'copy', this).call(this, source);

            this.meshPerAttribute = source.meshPerAttribute;

            return this;
        }
    }]);
    return InstancedInterleavedBuffer;
}(InterleavedBuffer);

var Line2 = function (_Mesh) {
    inherits(Line2, _Mesh);

    function Line2(geometry, material) {
        classCallCheck(this, Line2);

        var _this = possibleConstructorReturn(this, (Line2.__proto__ || Object.getPrototypeOf(Line2)).call(this, geometry, material));

        _this.geometry = geometry !== undefined ? geometry : new THREE.LineGeometry();
        _this.material = material !== undefined ? material : new THREE.LineMaterial({ color: Math.random() * 0xffffff });
        return _this;
    }

    createClass(Line2, [{
        key: 'computeLineDistances',
        value: function computeLineDistances() {
            _computeLineDistances$1.call(this);
        }
    }]);
    return Line2;
}(Mesh);

var _computeLineDistances$1 = function () {
    // for backwards-compatability, but could be a method of LineSegmentsGeometry...

    var start = new Vector3$1();
    var end = new Vector3$1();

    return function computeLineDistances() {

        var geometry = this.geometry;

        var instanceStart = geometry.attributes.instanceStart;
        var instanceEnd = geometry.attributes.instanceEnd;
        var lineDistances = new Float32Array(2 * instanceStart.data.count);

        for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {

            start.fromBufferAttribute(instanceStart, i);
            end.fromBufferAttribute(instanceEnd, i);

            lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
            lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);
        }

        var instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

        geometry.addAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0
        geometry.addAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

        return this;
    };
}();

var PointsMaterial = function (_Material) {
    inherits(PointsMaterial, _Material);

    function PointsMaterial(parameters) {
        classCallCheck(this, PointsMaterial);

        var _this = possibleConstructorReturn(this, (PointsMaterial.__proto__ || Object.getPrototypeOf(PointsMaterial)).call(this));

        _this.type = 'PointsMaterial';
        _this.color = new Color$1(0xffffff);

        _this.map = null;
        //点的大小
        _this.size = 1;
        //启用/禁用随距离而发生尺寸衰减
        _this.sizeAttenuation = true;
        //不接受灯光
        _this.lights = false;

        _this.setValues(parameters);

        _this.isPointsMaterial = true;

        return _this;
    }

    createClass(PointsMaterial, [{
        key: "copy",
        value: function copy(source) {
            get(PointsMaterial.prototype.__proto__ || Object.getPrototypeOf(PointsMaterial.prototype), "copy", this).call(this, source);
            this.color.copy(source.color);

            this.map = source.map;

            this.size = source.size;
            this.sizeAttenuation = source.sizeAttenuation;

            return this;
        }
    }]);
    return PointsMaterial;
}(Material);

var Points = function (_Object3D) {
    inherits(Points, _Object3D);

    function Points(geometry, material) {
        classCallCheck(this, Points);

        var _this = possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).call(this));

        _this.type = 'Points';

        _this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
        _this.material = material !== undefined ? material : new PointsMaterial({ color: Math.random() * 0xffffff });
        _this.isPoints = true;
        return _this;
    }

    createClass(Points, [{
        key: 'raycast',
        value: function raycast(raycaster, intersects) {
            _raycast$2.call(this, raycaster, intersects);
        }
    }]);
    return Points;
}(Object3D);

var _raycast$2 = function () {

    var inverseMatrix = new Matrix4();
    var ray = new Ray();
    var sphere = new Sphere();

    return function raycast(raycaster, intersects) {

        var object = this;
        var geometry = this.geometry;
        var matrixWorld = this.matrixWorld;
        var threshold = raycaster.params.Points.threshold;

        // Checking boundingSphere distance to ray

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        sphere.copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);
        sphere.radius += threshold;

        if (raycaster.ray.intersectsSphere(sphere) === false) return;

        //

        inverseMatrix.getInverse(matrixWorld);
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

        var localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
        var localThresholdSq = localThreshold * localThreshold;
        var position = new Vector3$1();
        var intersectPoint = new Vector3$1();

        function testPoint(point, index) {

            var rayPointDistanceSq = ray.distanceSqToPoint(point);

            if (rayPointDistanceSq < localThresholdSq) {

                ray.closestPointToPoint(point, intersectPoint);
                intersectPoint.applyMatrix4(matrixWorld);

                var distance = raycaster.ray.origin.distanceTo(intersectPoint);

                if (distance < raycaster.near || distance > raycaster.far) return;

                intersects.push({

                    distance: distance,
                    distanceToRay: Math.sqrt(rayPointDistanceSq),
                    point: intersectPoint.clone(),
                    index: index,
                    face: null,
                    object: object

                });
            }
        }

        if (geometry.isBufferGeometry) {

            var index = geometry.index;
            var attributes = geometry.attributes;
            var positions = attributes.position.array;

            if (index !== null) {

                var indices = index.array;

                for (var i = 0, il = indices.length; i < il; i++) {

                    var a = indices[i];

                    position.fromArray(positions, a * 3);

                    testPoint(position, a);
                }
            } else {

                for (var i = 0, l = positions.length / 3; i < l; i++) {

                    position.fromArray(positions, i * 3);

                    testPoint(position, i);
                }
            }
        } else {

            var vertices = geometry.vertices;

            for (var i = 0, l = vertices.length; i < l; i++) {

                testPoint(vertices[i], i);
            }
        }
    };
}();

var SpriteMaterial$$1 = function (_Material) {
    inherits(SpriteMaterial$$1, _Material);

    function SpriteMaterial$$1(parameters) {
        classCallCheck(this, SpriteMaterial$$1);

        var _this = possibleConstructorReturn(this, (SpriteMaterial$$1.__proto__ || Object.getPrototypeOf(SpriteMaterial$$1)).call(this));

        _this.type = 'SpriteMaterial';

        _this.color = new Color$1(0xffffff);
        _this.map = null;

        //纹理旋转角度
        _this.rotation = 0;
        //不接受灯光
        _this.lights = false;

        _this.setValues(parameters);
        _this.isSpriteMaterial = true;

        return _this;
    }

    createClass(SpriteMaterial$$1, [{
        key: "copy",
        value: function copy(source) {
            get(SpriteMaterial$$1.prototype.__proto__ || Object.getPrototypeOf(SpriteMaterial$$1.prototype), "copy", this).call(this, source);

            this.color.copy(source.color);
            this.map = source.map;

            this.rotation = source.rotation;

            return this;
        }
    }]);
    return SpriteMaterial$$1;
}(Material);

var Sprite = function (_Object3D) {
    inherits(Sprite, _Object3D);

    function Sprite(material) {
        classCallCheck(this, Sprite);

        var _this = possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

        _this.type = 'Sprite';

        _this.material = material !== undefined ? material : new SpriteMaterial$$1();

        _this.center = new Vector2(0.5, 0.5);
        _this.isSprite = true;
        return _this;
    }

    createClass(Sprite, [{
        key: 'raycast',
        value: function raycast(raycaster, intersects) {
            _raycast$3.call(this, raycaster, intersects);
        }
    }]);
    return Sprite;
}(Object3D);

var _raycast$3 = function () {

    var intersectPoint = new Vector3$1();
    var worldPosition = new Vector3$1();
    var worldScale = new Vector3$1();

    return function raycast(raycaster, intersects) {

        worldPosition.setFromMatrixPosition(this.matrixWorld);
        raycaster.ray.closestPointToPoint(worldPosition, intersectPoint);

        worldScale.setFromMatrixScale(this.matrixWorld);
        var guessSizeSq = worldScale.x * worldScale.y / 4;

        if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq) return;

        var distance = raycaster.ray.origin.distanceTo(intersectPoint);

        if (distance < raycaster.near || distance > raycaster.far) return;

        intersects.push({

            distance: distance,
            point: intersectPoint.clone(),
            face: null,
            object: this

        });
    };
}();

/**
 * @class BufferGeometry 三维几何体的基类
 * @description 实现三维几何体的一些基本操作
 * @author bujue
 */

var geometryId = 0;

var Geometry = function (_Events) {
    inherits(Geometry, _Events);

    function Geometry() {
        classCallCheck(this, Geometry);

        var _this = possibleConstructorReturn(this, (Geometry.__proto__ || Object.getPrototypeOf(Geometry)).call(this));

        Object.defineProperty(_this, 'id', { value: geometryId += 2 });
        _this.type = 'Geometry';

        _this.vertices = [];
        _this.colors = [];
        _this.faces = [];
        _this.faceVertexUvs = [[]];

        _this.isGeometry = true;

        _this.boundingSphere = null;
        _this.boundingBox = null;

        // update flags

        _this.elementsNeedUpdate = false;
        _this.verticesNeedUpdate = false;
        _this.uvsNeedUpdate = false;
        _this.normalsNeedUpdate = false;
        _this.colorsNeedUpdate = false;
        _this.lineDistancesNeedUpdate = false;
        _this.groupsNeedUpdate = false;
        return _this;
    }

    createClass(Geometry, [{
        key: 'fromBufferGeometry',
        value: function fromBufferGeometry(geometry) {

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

                scope.vertices.push(new Vector3$1(positions[i], positions[i + 1], positions[i + 2]));

                if (normals !== undefined) {

                    tempNormals.push(new Vector3$1(normals[i], normals[i + 1], normals[i + 2]));
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
    }, {
        key: 'computeBoundingBox',
        value: function computeBoundingBox() {

            if (this.boundingBox === null) {

                this.boundingBox = new Box3();
            }

            this.boundingBox.setFromPoints(this.vertices);
        }
    }, {
        key: 'computeBoundingSphere',
        value: function computeBoundingSphere() {

            if (this.boundingSphere === null) {

                this.boundingSphere = new Sphere();
            }

            this.boundingSphere.setFromPoints(this.vertices);
        }
    }, {
        key: 'computeFaceNormals',
        value: function computeFaceNormals() {

            var cb = new Vector3$1(),
                ab = new Vector3$1();

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

    }, {
        key: 'mergeVertices',
        value: function mergeVertices() {

            var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
            var unique = [],
                changes = [];

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
    }, {
        key: 'clone',
        value: function clone() {
            return new Geometry().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(source) {

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

                    var uvs = faceVertexUvs[j],
                        uvsCopy = [];

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
    }, {
        key: 'clone',
        value: function clone() {

            return new Geometry().copy(this);
        }
    }, {
        key: 'copy',
        value: function copy(source) {

            var i = void 0,
                il = void 0,
                j = void 0,
                jl = void 0,
                k = void 0,
                kl = void 0;

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

                    var uvs = faceVertexUvs[j],
                        uvsCopy = [];

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
    }, {
        key: 'dispose',
        value: function dispose() {

            this.fire({ type: 'dispose' });
        }
    }]);
    return Geometry;
}(Events);

// CircleGeometry

var CircleGeometry = function (_Geometry) {
    inherits(CircleGeometry, _Geometry);

    function CircleGeometry(radius, segments, thetaStart, thetaLength) {
        classCallCheck(this, CircleGeometry);

        var _this = possibleConstructorReturn(this, (CircleGeometry.__proto__ || Object.getPrototypeOf(CircleGeometry)).call(this));

        _this.type = 'CircleGeometry';

        _this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        _this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));
        _this.mergeVertices();

        return _this;
    }

    return CircleGeometry;
}(Geometry);

// CircleBufferGeometry

var CircleBufferGeometry = function (_BufferGeometry) {
    inherits(CircleBufferGeometry, _BufferGeometry);

    function CircleBufferGeometry(radius, segments, thetaStart, thetaLength) {
        classCallCheck(this, CircleBufferGeometry);

        var _this2 = possibleConstructorReturn(this, (CircleBufferGeometry.__proto__ || Object.getPrototypeOf(CircleBufferGeometry)).call(this));

        _this2.type = 'CircleBufferGeometry';

        _this2.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        radius = radius || 50;
        segments = segments !== undefined ? Math.max(3, segments) : 8;

        thetaStart = thetaStart !== undefined ? thetaStart : 0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // helper variables

        var i, s;
        var vertex = new Vector3$1();
        var uv = new Vector2();

        // center point

        vertices.push(0, 0, 0);
        normals.push(0, 0, 1);
        uvs.push(0.5, 0.5);

        for (s = 0, i = 3; s <= segments; s++, i += 3) {

            var segment = thetaStart + s / segments * thetaLength;

            // vertex

            vertex.x = radius * Math.cos(segment);
            vertex.y = radius * Math.sin(segment);

            vertices.push(vertex.x, vertex.y, vertex.z);

            // normal

            normals.push(0, 0, 1);

            // uvs

            uv.x = (vertices[i] / radius + 1) / 2;
            uv.y = (vertices[i + 1] / radius + 1) / 2;

            uvs.push(uv.x, uv.y);
        }

        // indices

        for (i = 1; i <= segments; i++) {

            indices.push(i, i + 1, 0);
        }

        // build geometry

        _this2.setIndex(indices);
        _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        return _this2;
    }

    return CircleBufferGeometry;
}(BufferGeometry);

// PlaneGeometry

var PlaneGeometry = function (_Geometry) {
    inherits(PlaneGeometry, _Geometry);

    function PlaneGeometry(width, height, widthSegments, heightSegments) {
        classCallCheck(this, PlaneGeometry);

        var _this = possibleConstructorReturn(this, (PlaneGeometry.__proto__ || Object.getPrototypeOf(PlaneGeometry)).call(this));

        _this.type = 'PlaneGeometry';

        _this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments
        };

        _this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
        _this.mergeVertices();

        return _this;
    }

    return PlaneGeometry;
}(Geometry);

// PlaneBufferGeometry

var PlaneBufferGeometry = function (_BufferGeometry) {
    inherits(PlaneBufferGeometry, _BufferGeometry);

    function PlaneBufferGeometry(width, height, widthSegments, heightSegments) {
        classCallCheck(this, PlaneBufferGeometry);

        var _this2 = possibleConstructorReturn(this, (PlaneBufferGeometry.__proto__ || Object.getPrototypeOf(PlaneBufferGeometry)).call(this));

        _this2.type = 'PlaneBufferGeometry';

        _this2.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments
        };

        var width_half = width / 2;
        var height_half = height / 2;

        var gridX = Math.floor(widthSegments) || 1;
        var gridY = Math.floor(heightSegments) || 1;

        var gridX1 = gridX + 1;
        var gridY1 = gridY + 1;

        var segment_width = width / gridX;
        var segment_height = height / gridY;

        var ix, iy;

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // generate vertices, normals and uvs

        for (iy = 0; iy < gridY1; iy++) {

            var y = iy * segment_height - height_half;

            for (ix = 0; ix < gridX1; ix++) {

                var x = ix * segment_width - width_half;

                vertices.push(x, -y, 0);

                normals.push(0, 0, 1);

                uvs.push(ix / gridX);
                uvs.push(1 - iy / gridY);
            }
        }

        // indices

        for (iy = 0; iy < gridY; iy++) {

            for (ix = 0; ix < gridX; ix++) {

                var a = ix + gridX1 * iy;
                var b = ix + gridX1 * (iy + 1);
                var c = ix + 1 + gridX1 * (iy + 1);
                var d = ix + 1 + gridX1 * iy;

                // faces

                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }

        // build geometry

        _this2.setIndex(indices);
        _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        return _this2;
    }

    return PlaneBufferGeometry;
}(BufferGeometry);

// BoxGeometry

var BoxGeometry = function (_Geometry) {
    inherits(BoxGeometry, _Geometry);

    function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
        classCallCheck(this, BoxGeometry);

        var _this = possibleConstructorReturn(this, (BoxGeometry.__proto__ || Object.getPrototypeOf(BoxGeometry)).call(this));

        _this.type = 'BoxGeometry';
        _this.parameters = {
            width: width,
            height: height,
            depth: depth,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            depthSegments: depthSegments
        };

        _this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));
        _this.mergeVertices();
        return _this;
    }

    return BoxGeometry;
}(Geometry);
// BoxBufferGeometry

var BoxBufferGeometry = function (_BufferGeometry) {
    inherits(BoxBufferGeometry, _BufferGeometry);

    function BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
        classCallCheck(this, BoxBufferGeometry);

        var _this2 = possibleConstructorReturn(this, (BoxBufferGeometry.__proto__ || Object.getPrototypeOf(BoxBufferGeometry)).call(this));

        _this2.type = 'BoxBufferGeometry';

        _this2.parameters = {
            width: width,
            height: height,
            depth: depth,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            depthSegments: depthSegments
        };

        var scope = _this2;

        // segments

        widthSegments = Math.floor(widthSegments) || 1;
        heightSegments = Math.floor(heightSegments) || 1;
        depthSegments = Math.floor(depthSegments) || 1;

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // helper variables

        var numberOfVertices = 0;
        var groupStart = 0;

        // build each side of the box geometry

        buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
        buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
        buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
        buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
        buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
        buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz

        // build geometry

        _this2.setIndex(indices);
        _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {

            var segmentWidth = width / gridX;
            var segmentHeight = height / gridY;

            var widthHalf = width / 2;
            var heightHalf = height / 2;
            var depthHalf = depth / 2;

            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;

            var vertexCounter = 0;
            var groupCount = 0;

            var ix, iy;

            var vector = new Vector3$1();

            // generate vertices, normals and uvs

            for (iy = 0; iy < gridY1; iy++) {

                var y = iy * segmentHeight - heightHalf;

                for (ix = 0; ix < gridX1; ix++) {

                    var x = ix * segmentWidth - widthHalf;

                    // set values to correct vector component

                    vector[u] = x * udir;
                    vector[v] = y * vdir;
                    vector[w] = depthHalf;

                    // now apply vector to vertex buffer

                    vertices.push(vector.x, vector.y, vector.z);

                    // set values to correct vector component

                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth > 0 ? 1 : -1;

                    // now apply vector to normal buffer

                    normals.push(vector.x, vector.y, vector.z);

                    // uvs

                    uvs.push(ix / gridX);
                    uvs.push(1 - iy / gridY);

                    // counters

                    vertexCounter += 1;
                }
            }

            // indices

            // 1. you need three indices to draw a single face
            // 2. a single segment consists of two faces
            // 3. so we need to generate six (2*3) indices per segment

            for (iy = 0; iy < gridY; iy++) {

                for (ix = 0; ix < gridX; ix++) {

                    var a = numberOfVertices + ix + gridX1 * iy;
                    var b = numberOfVertices + ix + gridX1 * (iy + 1);
                    var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                    var d = numberOfVertices + (ix + 1) + gridX1 * iy;

                    // faces

                    indices.push(a, b, d);
                    indices.push(b, c, d);

                    // increase counter

                    groupCount += 6;
                }
            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup(groupStart, groupCount, materialIndex);

            // calculate new start value for groups

            groupStart += groupCount;

            // update total number of vertices

            numberOfVertices += vertexCounter;
        }
        return _this2;
    }

    return BoxBufferGeometry;
}(BufferGeometry);

// SphereGeometry

var SphereGeometry = function (_Geometry) {
    inherits(SphereGeometry, _Geometry);

    function SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
        classCallCheck(this, SphereGeometry);

        var _this = possibleConstructorReturn(this, (SphereGeometry.__proto__ || Object.getPrototypeOf(SphereGeometry)).call(this));

        _this.type = 'SphereGeometry';

        _this.parameters = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        _this.fromBufferGeometry(new SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength));
        _this.mergeVertices();

        return _this;
    }

    return SphereGeometry;
}(Geometry);

// SphereBufferGeometry

var SphereBufferGeometry = function (_BufferGeometry) {
    inherits(SphereBufferGeometry, _BufferGeometry);

    function SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
        classCallCheck(this, SphereBufferGeometry);

        var _this2 = possibleConstructorReturn(this, (SphereBufferGeometry.__proto__ || Object.getPrototypeOf(SphereBufferGeometry)).call(this));

        _this2.type = 'SphereBufferGeometry';

        _this2.parameters = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        radius = radius || 50;

        widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
        heightSegments = Math.max(2, Math.floor(heightSegments) || 6);

        phiStart = phiStart !== undefined ? phiStart : 0;
        phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

        thetaStart = thetaStart !== undefined ? thetaStart : 0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

        var thetaEnd = thetaStart + thetaLength;

        var ix, iy;

        var index = 0;
        var grid = [];

        var vertex = new Vector3$1();
        var normal = new Vector3$1();

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // generate vertices, normals and uvs

        for (iy = 0; iy <= heightSegments; iy++) {

            var verticesRow = [];

            var v = iy / heightSegments;

            for (ix = 0; ix <= widthSegments; ix++) {

                var u = ix / widthSegments;

                // vertex

                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal

                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);

                // uv

                uvs.push(u, 1 - v);

                verticesRow.push(index++);
            }

            grid.push(verticesRow);
        }

        // indices

        for (iy = 0; iy < heightSegments; iy++) {

            for (ix = 0; ix < widthSegments; ix++) {

                var a = grid[iy][ix + 1];
                var b = grid[iy][ix];
                var c = grid[iy + 1][ix];
                var d = grid[iy + 1][ix + 1];

                if (iy !== 0 || thetaStart > 0) indices.push(a, b, d);
                if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
            }
        }

        // build geometry

        _this2.setIndex(indices);
        _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        return _this2;
    }

    return SphereBufferGeometry;
}(BufferGeometry);

// CylinderGeometry

var CylinderGeometry = function (_Geometry) {
    inherits(CylinderGeometry, _Geometry);

    function CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        classCallCheck(this, CylinderGeometry);

        var _this = possibleConstructorReturn(this, (CylinderGeometry.__proto__ || Object.getPrototypeOf(CylinderGeometry)).call(this));

        _this.type = 'CylinderGeometry';

        _this.parameters = {
            radiusTop: radiusTop,
            radiusBottom: radiusBottom,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
            openEnded: openEnded,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        _this.fromBufferGeometry(new CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));
        _this.mergeVertices();

        return _this;
    }

    return CylinderGeometry;
}(Geometry);

// CylinderBufferGeometry

var CylinderBufferGeometry = function (_BufferGeometry) {
    inherits(CylinderBufferGeometry, _BufferGeometry);

    function CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        classCallCheck(this, CylinderBufferGeometry);

        var _this2 = possibleConstructorReturn(this, (CylinderBufferGeometry.__proto__ || Object.getPrototypeOf(CylinderBufferGeometry)).call(this));

        _this2.type = 'CylinderBufferGeometry';

        _this2.parameters = {
            radiusTop: radiusTop,
            radiusBottom: radiusBottom,
            height: height,
            radialSegments: radialSegments,
            heightSegments: heightSegments,
            openEnded: openEnded,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        var scope = _this2;

        radiusTop = radiusTop !== undefined ? radiusTop : 20;
        radiusBottom = radiusBottom !== undefined ? radiusBottom : 20;
        height = height !== undefined ? height : 100;

        radialSegments = Math.floor(radialSegments) || 8;
        heightSegments = Math.floor(heightSegments) || 1;

        openEnded = openEnded !== undefined ? openEnded : false;
        thetaStart = thetaStart !== undefined ? thetaStart : 0.0;
        thetaLength = thetaLength !== undefined ? thetaLength : 2.0 * Math.PI;

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

        // generate geometry

        generateTorso();

        if (openEnded === false) {

            if (radiusTop > 0) generateCap(true);
            if (radiusBottom > 0) generateCap(false);
        }

        // build geometry

        _this2.setIndex(indices);
        _this2.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        _this2.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        _this2.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        function generateTorso() {

            var x, y;
            var normal = new Vector3$1();
            var vertex = new Vector3$1();

            var groupCount = 0;

            // this will be used to calculate the normal
            var slope = (radiusBottom - radiusTop) / height;

            // generate vertices, normals and uvs

            for (y = 0; y <= heightSegments; y++) {

                var indexRow = [];

                var v = y / heightSegments;

                // calculate the radius of the current row

                var radius = v * (radiusBottom - radiusTop) + radiusTop;

                for (x = 0; x <= radialSegments; x++) {

                    var u = x / radialSegments;

                    var theta = u * thetaLength + thetaStart;

                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);

                    // vertex

                    vertex.x = radius * sinTheta;
                    vertex.y = -v * height + halfHeight;
                    vertex.z = radius * cosTheta;
                    vertices.push(vertex.x, vertex.y, vertex.z);

                    // normal

                    normal.set(sinTheta, slope, cosTheta).normalize();
                    normals.push(normal.x, normal.y, normal.z);

                    // uv

                    uvs.push(u, 1 - v);

                    // save index of vertex in respective row

                    indexRow.push(index++);
                }

                // now save vertices of the row in our index array

                indexArray.push(indexRow);
            }

            // generate indices

            for (x = 0; x < radialSegments; x++) {

                for (y = 0; y < heightSegments; y++) {

                    // we use the index array to access the correct indices

                    var a = indexArray[y][x];
                    var b = indexArray[y + 1][x];
                    var c = indexArray[y + 1][x + 1];
                    var d = indexArray[y][x + 1];

                    // faces

                    indices.push(a, b, d);
                    indices.push(b, c, d);

                    // update group counter

                    groupCount += 6;
                }
            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup(groupStart, groupCount, 0);

            // calculate new start value for groups

            groupStart += groupCount;
        }

        function generateCap(top) {

            var x, centerIndexStart, centerIndexEnd;

            var uv = new Vector2();
            var vertex = new Vector3$1();

            var groupCount = 0;

            var radius = top === true ? radiusTop : radiusBottom;
            var sign = top === true ? 1 : -1;

            // save the index of the first center vertex
            centerIndexStart = index;

            // first we generate the center vertex data of the cap.
            // because the geometry needs one set of uvs per face,
            // we must generate a center vertex per face/segment

            for (x = 1; x <= radialSegments; x++) {

                // vertex

                vertices.push(0, halfHeight * sign, 0);

                // normal

                normals.push(0, sign, 0);

                // uv

                uvs.push(0.5, 0.5);

                // increase index

                index++;
            }

            // save the index of the last center vertex

            centerIndexEnd = index;

            // now we generate the surrounding vertices, normals and uvs

            for (x = 0; x <= radialSegments; x++) {

                var u = x / radialSegments;
                var theta = u * thetaLength + thetaStart;

                var cosTheta = Math.cos(theta);
                var sinTheta = Math.sin(theta);

                // vertex

                vertex.x = radius * sinTheta;
                vertex.y = halfHeight * sign;
                vertex.z = radius * cosTheta;
                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal

                normals.push(0, sign, 0);

                // uv

                uv.x = cosTheta * 0.5 + 0.5;
                uv.y = sinTheta * 0.5 * sign + 0.5;
                uvs.push(uv.x, uv.y);

                // increase index

                index++;
            }

            // generate indices

            for (x = 0; x < radialSegments; x++) {

                var c = centerIndexStart + x;
                var i = centerIndexEnd + x;

                if (top === true) {

                    // face top

                    indices.push(i, i + 1, c);
                } else {

                    // face bottom

                    indices.push(i + 1, i, c);
                }

                groupCount += 3;
            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup(groupStart, groupCount, top === true ? 1 : 2);

            // calculate new start value for groups

            groupStart += groupCount;
        }

        return _this2;
    }

    return CylinderBufferGeometry;
}(BufferGeometry);

var InstancedBufferGeometry = function (_BufferGeometry) {
    inherits(InstancedBufferGeometry, _BufferGeometry);

    function InstancedBufferGeometry() {
        classCallCheck(this, InstancedBufferGeometry);

        var _this = possibleConstructorReturn(this, (InstancedBufferGeometry.__proto__ || Object.getPrototypeOf(InstancedBufferGeometry)).call(this));

        _this.type = 'InstancedBufferGeometry';
        _this.maxInstancedCount = undefined;
        _this.isInstancedBufferGeometry = true;

        return _this;
    }

    createClass(InstancedBufferGeometry, [{
        key: 'copy',
        value: function copy(source) {

            get(InstancedBufferGeometry.prototype.__proto__ || Object.getPrototypeOf(InstancedBufferGeometry.prototype), 'copy', this).call(this, source);

            this.maxInstancedCount = source.maxInstancedCount;

            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {

            return new this.coFnstructor().copy(this);
        }
    }]);
    return InstancedBufferGeometry;
}(BufferGeometry);

var LineSegmentsGeometry = function (_InstancedBufferGeome) {
    inherits(LineSegmentsGeometry, _InstancedBufferGeome);

    function LineSegmentsGeometry() {
        classCallCheck(this, LineSegmentsGeometry);

        var _this = possibleConstructorReturn(this, (LineSegmentsGeometry.__proto__ || Object.getPrototypeOf(LineSegmentsGeometry)).call(this));

        _this.type = 'LineSegmentsGeometry';

        var positions = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
        var uvs = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2];
        var index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];

        _this.setIndex(index);
        _this.addAttribute('position', new Float32BufferAttribute(positions, 3));
        _this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));

        _this.isLineSegmentsGeometry = true;
        return _this;
    }

    createClass(LineSegmentsGeometry, [{
        key: 'applyMatrix',
        value: function applyMatrix(matrix) {

            var start = this.attributes.instanceStart;
            var end = this.attributes.instanceEnd;

            if (start !== undefined) {

                matrix.applyToBufferAttribute(start);

                matrix.applyToBufferAttribute(end);

                start.data.needsUpdate = true;
            }

            if (this.boundingBox !== null) {

                this.computeBoundingBox();
            }

            if (this.boundingSphere !== null) {

                this.computeBoundingSphere();
            }

            return this;
        }
    }, {
        key: 'setPositions',
        value: function setPositions(array) {

            var instanceBuffer = getTypeArray(array); // xyz, xyz

            this.addAttribute('instanceStart', new InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz
            this.addAttribute('instanceEnd', new InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz

            //默认顶点颜色为白色
            if (this.getAttribute('instanceColorStart') === undefined && this.getAttribute('instanceColorEnd') === undefined) {

                var colors = array.map(function () {
                    return 1.0;
                });
                _setColors.call(this, colors);
            }

            this.computeBoundingBox();
            this.computeBoundingSphere();

            return this;
        }
    }, {
        key: 'setColors',
        value: function setColors(array) {
            return _setColors.call(this, array);
        }
    }, {
        key: 'computeBoundingBox',
        value: function computeBoundingBox() {

            _computeBoundingBox.call(this);
        }
    }, {
        key: 'computeBoundingSphere',
        value: function computeBoundingSphere() {
            _computeBoundingSphere$1.call(this);
        }
    }]);
    return LineSegmentsGeometry;
}(InstancedBufferGeometry);

var _setColors = function _setColors(array) {

    var instanceColorBuffer = getTypeArray(array);

    this.addAttribute('instanceColorStart', new InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb
    this.addAttribute('instanceColorEnd', new InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

    return this;
};

var _computeBoundingBox = function () {

    var box = new Box3();

    return function computeBoundingBox() {

        if (this.boundingBox === null) {

            this.boundingBox = new Box3();
        }

        var start = this.attributes.instanceStart;
        var end = this.attributes.instanceEnd;

        if (start !== undefined && end !== undefined) {

            this.boundingBox.setFromBufferAttribute(start);

            box.setFromBufferAttribute(end);

            this.boundingBox.union(box);
        }
    };
}();

var _computeBoundingSphere$1 = function () {

    var vector = new Vector3$1();

    return function computeBoundingSphere() {

        if (this.boundingSphere === null) {

            this.boundingSphere = new Sphere();
        }

        if (this.boundingBox === null) {

            this.computeBoundingBox();
        }

        var start = this.attributes.instanceStart;
        var end = this.attributes.instanceEnd;

        if (start !== undefined && end !== undefined) {

            var center = this.boundingSphere.center;

            this.boundingBox.getCenter(center);

            var maxRadiusSq = 0;

            for (var i = 0, il = start.count; i < il; i++) {

                vector.fromBufferAttribute(start, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));

                vector.fromBufferAttribute(end, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
            }

            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

            if (isNaN(this.boundingSphere.radius)) {

                console.error('LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);
            }
        }
    };
}();

function getTypeArray(array) {

    var typeArray = void 0;

    if (array instanceof Float32Array) {

        typeArray = array;
    } else if (Array.isArray(array)) {

        typeArray = new Float32Array(array);
    }

    return new InstancedInterleavedBuffer(typeArray, 6, 1);
}

var LineGeometry = function (_LineSegmentsGeometry) {
    inherits(LineGeometry, _LineSegmentsGeometry);

    function LineGeometry() {
        classCallCheck(this, LineGeometry);

        var _this = possibleConstructorReturn(this, (LineGeometry.__proto__ || Object.getPrototypeOf(LineGeometry)).call(this));

        _this.type = 'LineGeometry';
        _this.isLineGeometry = true;
        return _this;
    }

    createClass(LineGeometry, [{
        key: 'setPositions',
        value: function setPositions(array) {

            var points = createVertexs(array);

            get(LineGeometry.prototype.__proto__ || Object.getPrototypeOf(LineGeometry.prototype), 'setPositions', this).call(this, points);

            return this;
        }
    }, {
        key: 'setColors',
        value: function setColors(array) {

            var colors = createVertexs(array);

            get(LineGeometry.prototype.__proto__ || Object.getPrototypeOf(LineGeometry.prototype), 'setColors', this).call(this, colors);

            return this;
        }
    }, {
        key: 'fromLine',
        value: function fromLine(line) {

            var geometry = line.geometry;

            if (geometry.isGeometry) {

                this.setPositions(geometry.vertices);
            } else if (geometry.isBufferGeometry) {

                this.setPositions(geometry.position.array); // assumes non-indexed
            }

            // set colors, maybe

            return this;
        }
    }]);
    return LineGeometry;
}(LineSegmentsGeometry);

function createVertexs(array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
    var length = array.length - 3;
    var Vertexs = new Float32Array(2 * length);

    for (var i = 0; i < length; i += 3) {

        Vertexs[2 * i] = array[i];
        Vertexs[2 * i + 1] = array[i + 1];
        Vertexs[2 * i + 2] = array[i + 2];

        Vertexs[2 * i + 3] = array[i + 3];
        Vertexs[2 * i + 4] = array[i + 4];
        Vertexs[2 * i + 5] = array[i + 5];
    }

    return Vertexs;
}

//所有的预定几何体

var MeshLambertMaterial = function (_Material) {
    inherits(MeshLambertMaterial, _Material);

    function MeshLambertMaterial(parameters) {
        classCallCheck(this, MeshLambertMaterial);

        var _this = possibleConstructorReturn(this, (MeshLambertMaterial.__proto__ || Object.getPrototypeOf(MeshLambertMaterial)).call(this));

        _this.type = 'MeshLambertMaterial';

        _this.color = new Color$1(0xffffff); // diffuse

        _this.map = null;

        //设置放射光颜色
        _this.emissive = new Color$1(0x000000);
        //设置放射光贴图强度
        _this.emissiveIntensity = 1.0;

        _this.wireframe = false;
        _this.wireframeLinewidth = 1;

        _this.setValues(parameters);

        _this.isMeshLambertMaterial = true;

        return _this;
    }

    createClass(MeshLambertMaterial, [{
        key: 'copy',
        value: function copy(source) {
            get(MeshLambertMaterial.prototype.__proto__ || Object.getPrototypeOf(MeshLambertMaterial.prototype), 'copy', this).call(this, source);

            this.color.copy(source.color);

            this.map = source.map;

            this.emissive.copy(source.emissive);
            this.emissiveIntensity = source.emissiveIntensity;

            this.wireframe = source.wireframe;
            this.wireframeLinewidth = source.wireframeLinewidth;

            return this;
        }
    }]);
    return MeshLambertMaterial;
}(Material);

var MeshPhongMaterial = function (_Material) {
    inherits(MeshPhongMaterial, _Material);

    function MeshPhongMaterial(parameters) {
        classCallCheck(this, MeshPhongMaterial);

        var _this = possibleConstructorReturn(this, (MeshPhongMaterial.__proto__ || Object.getPrototypeOf(MeshPhongMaterial)).call(this));

        _this.type = 'MeshPhongMaterial';

        _this.color = new Color$1(0xffffff); // diffuse
        //高亮的颜色 todo:目前测试没有效果
        _this.specular = new Color$1(0x111111);

        //设置亮度
        _this.shininess = 30;

        _this.map = null;

        //设置放射光颜色
        _this.emissive = new Color$1(0x000000);
        //设置放射光贴图强度
        _this.emissiveIntensity = 1.0;

        _this.wireframe = false;
        _this.wireframeLinewidth = 1;
        _this.setValues(parameters);

        _this.isMeshPhongMaterial = true;

        return _this;
    }

    createClass(MeshPhongMaterial, [{
        key: 'copy',
        value: function copy(source) {
            get(MeshPhongMaterial.prototype.__proto__ || Object.getPrototypeOf(MeshPhongMaterial.prototype), 'copy', this).call(this, source);

            this.color.copy(source.color);
            this.specular.copy(source.specular);
            this.shininess = source.shininess;

            this.map = source.map;

            this.emissive.copy(source.emissive);
            this.emissiveIntensity = source.emissiveIntensity;

            this.wireframe = source.wireframe;
            this.wireframeLinewidth = source.wireframeLinewidth;

            return this;
        }
    }]);
    return MeshPhongMaterial;
}(Material);

var LineDashedMaterial = function (_LineBasicMaterial) {
    inherits(LineDashedMaterial, _LineBasicMaterial);

    function LineDashedMaterial(parameters) {
        classCallCheck(this, LineDashedMaterial);

        var _this = possibleConstructorReturn(this, (LineDashedMaterial.__proto__ || Object.getPrototypeOf(LineDashedMaterial)).call(this));

        _this.type = 'LineDashedMaterial';

        //以下三个参数的配置与顶点数据的大小有关 

        _this.scale = 1; //虚线整体的缩放 
        _this.dashSize = 3; //虚线点的长度  
        _this.gapSize = 1; //虚线间距的大小

        _this.setValues(parameters);

        _this.isLineDashedMaterial = true;

        return _this;
    }

    createClass(LineDashedMaterial, [{
        key: "copy",
        value: function copy(source) {

            get(LineDashedMaterial.prototype.__proto__ || Object.getPrototypeOf(LineDashedMaterial.prototype), "copy", this).call(this, source);
            this.scale = source.scale;
            this.dashSize = source.dashSize;
            this.gapSize = source.gapSize;

            return this;
        }
    }]);
    return LineDashedMaterial;
}(LineBasicMaterial);

var LineMeshMaterial = function (_Material) {
    inherits(LineMeshMaterial, _Material);

    function LineMeshMaterial(parameters) {
        classCallCheck(this, LineMeshMaterial);

        var _this = possibleConstructorReturn(this, (LineMeshMaterial.__proto__ || Object.getPrototypeOf(LineMeshMaterial)).call(this));

        _this.type = 'LineMeshMaterial';
        _this.color = new Color$1(0xffffff);
        _this.linewidth = 1;

        _this.dashed = false;
        _this.scale = 1; //虚线整体的缩放 
        _this.dashSize = 3; //虚线点的长度  
        _this.gapSize = 1; //虚线间距的大小

        _this.resolution = new Vector2();

        //todo 暂不需要
        _this.lights = false;

        _this.setValues(parameters);
        _this.isLineMeshMaterial = true;
        return _this;
    }

    createClass(LineMeshMaterial, [{
        key: "copy",
        value: function copy(source) {
            get(LineMeshMaterial.prototype.__proto__ || Object.getPrototypeOf(LineMeshMaterial.prototype), "copy", this).call(this, source);
            this.color.copy(source.color);
            this.linewidth = source.linewidth;
            this.scale = source.scale;
            this.dashSize = source.dashSize;
            this.gapSize = source.gapSize;
            this.dashed = source.dashed;

            this.resolution.copy(source.resolution);

            return this;
        }
    }]);
    return LineMeshMaterial;
}(Material);

var ShaderMaterial = function (_Material) {
    inherits(ShaderMaterial, _Material);

    function ShaderMaterial(parameters) {
        classCallCheck(this, ShaderMaterial);

        var _this = possibleConstructorReturn(this, (ShaderMaterial.__proto__ || Object.getPrototypeOf(ShaderMaterial)).call(this));

        _this.type = 'ShaderMaterial';

        _this.defines = {};
        _this.uniforms = {};

        _this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
        _this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

        _this.linewidth = 1;

        _this.wireframe = false;
        _this.wireframeLinewidth = 1;

        _this.lights = false;

        // When rendered geometry doesn't include these attributes but the material does,
        // use these default values in WebGL. This avoids errors when buffer data is missing.
        _this.defaultAttributeValues = {
            'color': [1, 1, 1],
            'uv': [0, 0],
            'uv2': [0, 0]
        };

        _this.index0AttributeName = undefined;
        _this.uniformsNeedUpdate = false;

        if (parameters !== undefined) {

            if (parameters.attributes !== undefined) {

                console.error('ShaderMaterial: attributes should now be defined in BufferGeometry instead.');
            }

            _this.setValues(parameters);
        }

        _this.isShaderMaterial = true;

        return _this;
    }

    createClass(ShaderMaterial, [{
        key: 'copy',
        value: function copy(source) {

            get(ShaderMaterial.prototype.__proto__ || Object.getPrototypeOf(ShaderMaterial.prototype), 'copy', this).call(this, source);
            this.fragmentShader = source.fragmentShader;
            this.vertexShader = source.vertexShader;

            this.uniforms = UniformsUtils.clone(source.uniforms);

            this.defines = Object.assign({}, source.defines);

            this.wireframe = source.wireframe;
            this.wireframeLinewidth = source.wireframeLinewidth;

            this.lights = source.lights;

            return this;
        }
    }]);
    return ShaderMaterial;
}(Material);

var RawShaderMaterial = function (_ShaderMaterial) {
    inherits(RawShaderMaterial, _ShaderMaterial);

    function RawShaderMaterial(parameters) {
        classCallCheck(this, RawShaderMaterial);

        var _this = possibleConstructorReturn(this, (RawShaderMaterial.__proto__ || Object.getPrototypeOf(RawShaderMaterial)).call(this, parameters));

        _this.type = 'RawShaderMaterial';
        _this.isRawShaderMaterial = true;

        return _this;
    }

    return RawShaderMaterial;
}(ShaderMaterial);

//所有的材质
//mesh

var Light = function (_Object3D) {
    inherits(Light, _Object3D);

    function Light(color, intensity) {
        classCallCheck(this, Light);

        var _this = possibleConstructorReturn(this, (Light.__proto__ || Object.getPrototypeOf(Light)).call(this));

        _this.type = 'Light';

        _this.color = new Color$1(color);
        _this.intensity = intensity !== undefined ? intensity : 1;

        _this.isLight = Light;
        return _this;
    }

    return Light;
}(Object3D);

var SpotLight = function (_Light) {
    inherits(SpotLight, _Light);

    function SpotLight(color, intensity, distance, angle, penumbra, decay) {
        classCallCheck(this, SpotLight);

        var _this = possibleConstructorReturn(this, (SpotLight.__proto__ || Object.getPrototypeOf(SpotLight)).call(this, color, intensity));

        _this.type = 'SpotLight';

        _this.position.copy(Object3D.DefaultUp);
        _this.updateMatrix();

        _this.target = new Object3D();

        _this.distance = distance !== undefined ? distance : 0;
        _this.angle = angle !== undefined ? angle : Math.PI / 3;
        _this.penumbra = penumbra !== undefined ? penumbra : 0;
        _this.decay = decay !== undefined ? decay : 1; // for physically correct lights, should be 2.

        _this.isSpotLight = true;

        return _this;
    }

    // intensity = power per solid angle.
    // ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf


    createClass(SpotLight, [{
        key: 'power',
        get: function get$$1() {
            return this.intensity * Math.PI;
        },
        set: function set$$1(power) {

            this.intensity = power / Math.PI;
        }
    }]);
    return SpotLight;
}(Light);

var PointLight = function (_Light) {
    inherits(PointLight, _Light);

    function PointLight(color, intensity, distance, decay) {
        classCallCheck(this, PointLight);

        var _this = possibleConstructorReturn(this, (PointLight.__proto__ || Object.getPrototypeOf(PointLight)).call(this, color, intensity));

        _this.type = 'PointLight';

        _this.distance = distance !== undefined ? distance : 0;
        _this.decay = decay !== undefined ? decay : 1; // for physically correct lights, should be 2.

        _this.isPointLight = true;
        return _this;
    }
    // intensity = power per solid angle.
    // ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf


    createClass(PointLight, [{
        key: "power",
        get: function get$$1() {
            return this.intensity * 4 * Math.PI;
        },
        set: function set$$1(power) {

            this.intensity = power / (4 * Math.PI);
        }
    }]);
    return PointLight;
}(Light);

var DirectionalLight = function (_Light) {
    inherits(DirectionalLight, _Light);

    function DirectionalLight(color, intensity) {
        classCallCheck(this, DirectionalLight);

        var _this = possibleConstructorReturn(this, (DirectionalLight.__proto__ || Object.getPrototypeOf(DirectionalLight)).call(this, color, intensity));

        _this.type = 'DirectionalLight';

        _this.position.copy(Object3D.DefaultUp);
        _this.updateMatrix();

        _this.target = new Object3D();

        _this.isDirectionalLight = true;

        return _this;
    }

    return DirectionalLight;
}(Light);

var AmbientLight = function (_Light) {
    inherits(AmbientLight, _Light);

    function AmbientLight(color, intensity) {
        classCallCheck(this, AmbientLight);

        var _this = possibleConstructorReturn(this, (AmbientLight.__proto__ || Object.getPrototypeOf(AmbientLight)).call(this, color, intensity));

        _this.type = 'AmbientLight';
        _this.isAmbientLight = true;
        return _this;
    }

    return AmbientLight;
}(Light);

var Camera = function (_Object3D) {
    inherits(Camera, _Object3D);

    function Camera() {
        classCallCheck(this, Camera);

        //viewMatrix
        var _this = possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this));

        _this.matrixWorldInverse = new Matrix4();
        _this.projectionMatrix = new Matrix4();

        _this.isCamera = true;
        return _this;
    }

    createClass(Camera, [{
        key: 'updateMatrixWorld',
        value: function updateMatrixWorld(force) {

            get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), 'updateMatrixWorld', this).call(this, force);

            this.matrixWorldInverse.getInverse(this.matrixWorld);
        }
    }, {
        key: 'getWorldDirection',
        value: function getWorldDirection(target) {
            return _getWorldDirection.call(this, target);
        }
    }]);
    return Camera;
}(Object3D);

var _getWorldDirection = function () {

    var quaternion = new Quaternion();

    return function getWorldDirection(target) {

        if (target === undefined) {

            console.warn('Camera: .getWorldDirection() target is now required');
            target = new Vector3();
        }

        this.getWorldQuaternion(quaternion);

        return target.set(0, 0, -1).applyQuaternion(quaternion);
    };
}();

/**
 * @class 透视相机
 * @author bujue
 */

var PerspectiveCamera = function (_Camera) {
    inherits(PerspectiveCamera, _Camera);

    function PerspectiveCamera(fov, aspect, near, far) {
        classCallCheck(this, PerspectiveCamera);

        var _this = possibleConstructorReturn(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this));

        _this.type = 'PerspectiveCamera';

        _this.fov = fov !== undefined ? fov : 50;
        _this.zoom = 1;

        _this.near = near !== undefined ? near : 0.1;
        _this.far = far !== undefined ? far : 2000;
        _this.focus = 10;

        _this.aspect = aspect !== undefined ? aspect : 1;
        _this.view = null;

        _this.updateProjectionMatrix();

        _this.isPerspectiveCamera = true;
        return _this;
    }

    createClass(PerspectiveCamera, [{
        key: 'updateProjectionMatrix',
        value: function updateProjectionMatrix() {

            var near = this.near,
                top = near * Math.tan(_Math.DEG2RAD * 0.5 * this.fov) / this.zoom,
                height = 2 * top,
                width = this.aspect * height,
                left = -0.5 * width,
                view = this.view;

            this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
        }
    }]);
    return PerspectiveCamera;
}(Camera);

/**
 * @class 正交投影相机
 * @author bujue
 */

var OrthographicCamera = function (_Camera) {
    inherits(OrthographicCamera, _Camera);

    function OrthographicCamera(left, right, top, bottom, near, far) {
        classCallCheck(this, OrthographicCamera);

        var _this = possibleConstructorReturn(this, (OrthographicCamera.__proto__ || Object.getPrototypeOf(OrthographicCamera)).call(this));

        _this.type = 'OrthographicCamera';

        _this.zoom = 1;
        _this.view = null;

        _this.left = left;
        _this.right = right;
        _this.top = top;
        _this.bottom = bottom;

        _this.near = near !== undefined ? near : 0.1;
        _this.far = far !== undefined ? far : 2000;

        _this.isOrthographicCamera = true;

        _this.updateProjectionMatrix();
        return _this;
    }

    createClass(OrthographicCamera, [{
        key: "updateProjectionMatrix",
        value: function updateProjectionMatrix() {

            var dx = (this.right - this.left) / (2 * this.zoom);
            var dy = (this.top - this.bottom) / (2 * this.zoom);
            var cx = (this.right + this.left) / 2;
            var cy = (this.top + this.bottom) / 2;

            var left = cx - dx;
            var right = cx + dx;
            var top = cy + dy;
            var bottom = cy - dy;

            this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
        }
    }]);
    return OrthographicCamera;
}(Camera);

var InstancedBufferAttribute = function (_BufferAttribute) {
    inherits(InstancedBufferAttribute, _BufferAttribute);

    function InstancedBufferAttribute(array, itemSize, meshPerAttribute) {
        classCallCheck(this, InstancedBufferAttribute);

        var _this = possibleConstructorReturn(this, (InstancedBufferAttribute.__proto__ || Object.getPrototypeOf(InstancedBufferAttribute)).call(this));

        BufferAttribute.call(_this, array, itemSize);

        _this.meshPerAttribute = meshPerAttribute || 1;

        _this.isInstancedBufferAttribute = true;

        return _this;
    }

    createClass(InstancedBufferAttribute, [{
        key: 'copy',
        value: function copy(source) {

            get(InstancedBufferAttribute.prototype.__proto__ || Object.getPrototypeOf(InstancedBufferAttribute.prototype), 'copy', this).call(this, source);

            this.meshPerAttribute = source.meshPerAttribute;

            return this;
        }
    }]);
    return InstancedBufferAttribute;
}(BufferAttribute);

var Raycaster$$1 = function () {
    function Raycaster$$1(origin, direction, near, far) {
        classCallCheck(this, Raycaster$$1);


        //direction is assumed to be normalized (for accurate distance calculations)
        this.ray = new Ray(origin, direction);

        this.near = near || 0;
        this.far = far || Infinity;

        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: { threshold: 1 },
            Sprite: {}
        };

        this.linePrecision = 1;
    }

    createClass(Raycaster$$1, [{
        key: "set",
        value: function set$$1(origin, direction) {

            // direction is assumed to be normalized (for accurate distance calculations)
            this.ray.set(origin, direction);
        }
    }, {
        key: "setFromCamera",
        value: function setFromCamera(coords, camera) {

            //upproject
            var matrix1 = new Matrix4();
            matrix1.multiplyMatrices(camera.matrixWorld, matrix1.getInverse(camera.projectionMatrix));

            if (camera && camera.isPerspectiveCamera) {

                this.ray.origin.setFromMatrixPosition(camera.matrixWorld);

                this.ray.direction.set(coords.x, coords.y, 0.5).applyMatrix4(matrix1).sub(this.ray.origin).normalize();
            } else if (camera && camera.isOrthographicCamera) {

                this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).applyMatrix4(matrix1); // set origin in plane of camera
                this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
            } else {

                console.error('Raycaster: Unsupported camera type.');
            }
        }
    }, {
        key: "intersectObject",
        value: function intersectObject(object, recursive, optionalTarget) {

            var intersects = optionalTarget || [];

            _intersectObject(object, this, intersects, recursive);

            intersects.sort(ascSort);

            return intersects;
        }

        //返回值结构 [ { distance, point, face, faceIndex, indices, object }, ... ]
        //*注意*，对于网格，面（faces）必须朝向射线原点，这样才能被检测到；通过背面的射线的交叉点将不被检测到。 为了光线投射一个对象的正反两面，你得设置 material 的 side 属性为 THREE.DoubleSide

    }, {
        key: "intersectObjects",
        value: function intersectObjects(objects, recursive, optionalTarget) {

            var intersects = optionalTarget || [];

            if (Array.isArray(objects) === false) {

                console.warn('Raycaster.intersectObjects: objects is not an Array.');
                return intersects;
            }

            for (var i = 0, l = objects.length; i < l; i++) {

                _intersectObject(objects[i], this, intersects, recursive);
            }

            intersects.sort(ascSort);

            return intersects;
        }
    }]);
    return Raycaster$$1;
}();

function ascSort(a, b) {

    return a.distance - b.distance;
}

function _intersectObject(object, raycaster, intersects, recursive) {

    if (object.visible === false) return;

    object.raycast(raycaster, intersects);

    if (recursive === true) {

        var children = object.children;

        for (var i = 0, l = children.length; i < l; i++) {

            _intersectObject(children[i], raycaster, intersects, true);
        }
    }
}

export { Events, WebGLRenderer, Scene, Group, Mesh, Line, Line2, Points, Sprite, Texture, Camera, PerspectiveCamera, OrthographicCamera, BufferGeometry, Geometry, InstancedBufferGeometry, InterleavedBufferAttribute, InstancedInterleavedBuffer, InterleavedBuffer, InstancedBufferAttribute, Face3, Object3D, Raycaster$$1 as Raycaster, Triangle, _Math as Math, Plane, Frustum, Sphere, Ray, Matrix4, Matrix3, Box3, Line3, Euler, Vector4, Vector3$1 as Vector3, Vector2, Quaternion, Color$1 as Color, CircleGeometry, CircleBufferGeometry, PlaneGeometry, PlaneBufferGeometry, BoxGeometry, BoxBufferGeometry, SphereGeometry, SphereBufferGeometry, CylinderGeometry, CylinderBufferGeometry, LineSegmentsGeometry, LineGeometry, MeshBasicMaterial$$1 as MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, LineBasicMaterial, LineDashedMaterial, LineMeshMaterial, PointsMaterial, SpriteMaterial$$1 as SpriteMaterial, ShaderMaterial, RawShaderMaterial, SpotLight, PointLight, DirectionalLight, AmbientLight, Light, Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute, BufferAttribute, REVISION, pointsMode, LinesMode, LineLoopMode, LineStripMode, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, FrontSide, BackSide, DoubleSide, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, UVMapping, NoColors, FaceColors, VertexColors };
