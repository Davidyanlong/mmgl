
export const REVISION = '0.0.10';

//draw Point
export const pointsMode = 0;

//draw Line mode
export const LinesMode = 1;
export const LineLoopMode = 2;
export const LineStripMode = 3;

//draw triangle  mode
export const TrianglesDrawMode = 4;
export const TriangleStripDrawMode = 5;
export const TriangleFanDrawMode = 6;








//depth buffer 
export const NeverDepth = 0;
export const AlwaysDepth = 1;
export const LessDepth = 2;
export const LessEqualDepth = 3;
export const EqualDepth = 4;
export const GreaterEqualDepth = 5;
export const GreaterDepth = 6;
export const NotEqualDepth = 7;

//cull face
export const CullFaceNone = 0;
export const CullFaceBack = 1;
export const CullFaceFront = 2;
export const CullFaceFrontBack = 3;
export const FrontFaceDirectionCW = 0;
export const FrontFaceDirectionCCW = 1;

//draw side
export const FrontSide = 0;
export const BackSide = 1;
export const DoubleSide = 2;


//blending 
export const NoBlending = 0;
export const NormalBlending = 1;
export const AdditiveBlending = 2;
export const SubtractiveBlending = 3;
export const MultiplyBlending = 4;
export const CustomBlending = 5;
export const AddEquation = 100;
export const SubtractEquation = 101;
export const ReverseSubtractEquation = 102;
export const MinEquation = 103;
export const MaxEquation = 104;
export const ZeroFactor = 200;
export const OneFactor = 201;
export const SrcColorFactor = 202;
export const OneMinusSrcColorFactor = 203;
export const SrcAlphaFactor = 204;
export const OneMinusSrcAlphaFactor = 205;
export const DstAlphaFactor = 206;
export const OneMinusDstAlphaFactor = 207;
export const DstColorFactor = 208;
export const OneMinusDstColorFactor = 209;
export const SrcAlphaSaturateFactor = 210;

//texture map  or format
export const RepeatWrapping = 1000;
export const ClampToEdgeWrapping = 1001;
export const MirroredRepeatWrapping = 1002;
export const NearestFilter = 1003;
export const NearestMipMapNearestFilter = 1004;
export const NearestMipMapLinearFilter = 1005;
export const LinearFilter = 1006;
export const LinearMipMapNearestFilter = 1007;
export const LinearMipMapLinearFilter = 1008;
export const UnsignedByteType = 1009;
export const ByteType = 1010;
export const ShortType = 1011;
export const UnsignedShortType = 1012;
export const IntType = 1013;
export const UnsignedIntType = 1014;
export const FloatType = 1015;
export const HalfFloatType = 1016;
export const UnsignedShort4444Type = 1017;
export const UnsignedShort5551Type = 1018;
export const UnsignedShort565Type = 1019;
export const UnsignedInt248Type = 1020;
export const AlphaFormat = 1021;
export const RGBFormat = 1022;
export const RGBAFormat = 1023;
export const LuminanceFormat = 1024;
export const LuminanceAlphaFormat = 1025;
export const RGBEFormat = RGBAFormat;
export const DepthFormat = 1026;
export const DepthStencilFormat = 1027;
export const UVMapping = 300;
//material  
export const NoColors = 0; //不用颜色
export const FaceColors = 1; //面颜色
export const VertexColors = 2; //顶点颜色 去geometry.colors取色


