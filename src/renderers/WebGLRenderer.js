import { Events } from '../core/Events';
import {
    REVISION,
    TriangleFanDrawMode,
    TriangleStripDrawMode,
    TrianglesDrawMode,
    LinesMode,
    LineLoopMode,
    LineStripMode
} from '../constants';

import { Vector4 } from '../maths/Vector4';
import { Vector3 } from '../maths/Vector3';
import { Color } from '../maths/Color';
import { Matrix4 } from '../maths/Matrix4';
import { Frustum } from '../maths/Frustum';

import { WebGLExtensions } from './webgl/WebGLExtensions';
import { WebGLProperties } from './webgl/WebGLProperties';
import { WebGLCapabilities } from './webgl/WebGLCapabilities';
import { WebGLState } from './webgl/WebGLState';
import { WebGLAttributes } from './webgl/WebGLAttributes';
import { WebGLGeometries } from './webgl/WebGLGeometries';
import { ShaderLib } from './shaders/ShaderLib.js';
import { WebGLInfo } from './webgl/WebGLInfo';
import { WebGLPrograms } from './webgl/WebGLPrograms';
import { WebGLUniforms } from './webgl/WebGLUniforms';
import { UniformsUtils } from './shaders/UniformsUtils';
import { WebGLRenderLists } from './webgl/WebGLRenderList';
import { WebGLBufferRenderer } from './webgl/WebGLBufferRenderer';
import { WebGLObjects } from './webgl/WebGLObjects';
import { WebGLIndexedBufferRenderer } from './webgl/WebGLIndexedBufferRenderer';
import { WebGLTextures } from './webgl/WebGLTextures';
import { WebGLUtils } from './webgl/WebGLUtils';
import { WebGLRenderStates } from './webgl/WebGLRenderStates';


/**
 * @class WebGL渲染对象
 * @author bujue
 */
class WebGLRenderer extends Events {
    constructor(params) {
        super();

        params = params || {};
        //canvas context 渲染对象的上下文
        this.gl = null;

        //canvasDOM 对象
        this.domElement = null;

        //私有变量
        this._width = 0;
        this._height = 0;
        this._isContextLost = false;                //是否丢失上下文

        this._pixelRatio = 1;                        //屏幕的pixelRatio,
        this._currentViewport = new Vector4();       //当前的渲染视口大小
        this._currentRenderList = null;
        this._currentRenderState = null;

        this._currentMaterialId = -1;                //初始化materialId
        this._currentCamera = null;                  //当前的相机
        this._currClearColor = new Color(0x000000);

        this._capabilities = null;                          //GPU渲染能力 
        this._state = null;                                 //GPU的状态管理 



        this._sortObjects = true;   // scene graph

        this._projScreenMatrix = new Matrix4();
        this._vector3 = new Vector3();
        this._frustum = new Frustum();

        this._init(params);
        this._initGLContext(params);
    }

    _init(parameters) {  //创建webGL对象上下文
        let me = this;
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
        let _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
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

            let contextAttributes = {
                alpha: _alpha,
                depth: _depth,
                stencil: _stencil,
                antialias: _antialias,
                premultipliedAlpha: _premultipliedAlpha,
                preserveDrawingBuffer: _preserveDrawingBuffer
            };

            let _gl = _context || _canvas.getContext('webgl', contextAttributes) || _canvas.getContext('experimental-webgl', contextAttributes);

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
            this.fire({ type: 'contextrestore' })
        }

    }
    _initGLContext(parameters) {
        let me = this;
        let _gl = this.gl;
        let _width = this._width;
        let _height = this._height;
        let _viewport = new Vector4(0, 0, _width, _height)

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
        this._state.viewport(this._currentViewport.copy(_viewport).multiplyScalar(this._pixelRatio));


        //console.dir(this._capabilities);
        this._info.programs = this._programCache.programs;

        me.setSize(_width, _height, true);

    }

    getContext() {
        return this.gl;
    }

    getPixelRatio() {
        return this._pixelRatio;
    }

    getCurrentViewport() {
        return this._currentViewport;
    }

    getClearColor() {
        return this._currClearColor;
    }



    //设置设备像素比,默认是 1    
    setPixelRatio(value) {
        let _width = this._width;
        let _height = this._height;

        this._pixelRatio = value;
        this.setSize(_width, _height, false);
    }

    //设置可视区域大小
    setSize(width, height, updateStyle) {
        let me = this;
        let _pixelRatio = this._pixelRatio;
        let _canvas = me.domElement;
        let _width = width;
        let _height = height;


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
    setViewport(x, y, width, height) {
        let gl = this.gl;
        let viewport = new Vector4(x, y, width, height);

        if (this._currentViewport.equals(viewport) === false) {

            this._currentViewport.copy(viewport).multiplyScalar(this._pixelRatio);

            this._state.viewport(this._currentViewport);
        }

    }
    //设置清除色
    setClearColor() {
        let _gl = this.gl;
        let [r, g, b, a] = arguments
        let _color = this._currClearColor.set(r, g, b, a);
        this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
    }

    getClearAlpha() {
        return this._currClearColor.a;
    }

    setClearAlpha(alpha) {
        let _gl = this.gl;
        this._currClearColor.a = alpha;
        let _color = this._currClearColor;
        this._state.buffers.color.setClear(_color.r, _color.g, _color.b, _color.a, this._premultipliedAlpha);
    };

    //清除缓冲
    clear(color, depth, stencil) {
        let _gl = this.gl
        let bits = 0;

        if (color === undefined || color) bits |= _gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth) bits |= _gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil) bits |= _gl.STENCIL_BUFFER_BIT;

        _gl.clear(bits);

    }
    //清除颜色缓冲
    clearColor() {
        this.clear(true, false, false);
    }
    //清除深度缓冲
    clearDepth() {
        this.clear(false, true, false);
    }
    //清除模版缓冲
    clearStencil() {
        this.clear(false, false, true);
    }

    render(scene, camera) {

        if (!(camera && camera.isCamera)) {

            console.error('WebGLRenderer.render: camera is not an instance of Camera.');
            return;

        }
        _currentGeometryProgram = '';
        this._currentMaterialId = - 1;
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
        projectObject.call(this, scene, camera, this._sortObjects)

        if (this._sortObjects === true) {
            this._currentRenderList.sort();
        }

        this._currentRenderState.setupLights(camera);

        if (this._info.autoReset) this._info.reset();

        scene.background === null ? this.setClearColor(this._currClearColor) : this.setClearColor(scene.background);
        this.clearColor(true);

        let opaqueObjects = this._currentRenderList.opaque;
        let transparentObjects = this._currentRenderList.transparent;

        // opaque pass (front-to-back order)

        if (opaqueObjects.length) renderObjects.call(this, opaqueObjects, scene, camera);

        // transparent pass (back-to-front order)

        if (transparentObjects.length) renderObjects.call(this, transparentObjects, scene, camera);





        this._state.buffers.depth.setTest(true);
        this._state.buffers.depth.setMask(true);
        this._state.buffers.color.setMask(true);

        this._state.setPolygonOffset(false);


        this._currentRenderList = null;
        this._currentRenderState = null;


    }
    renderBufferDirect(camera, fog, geometry, material, object, group) {

        let me = this;
        let _gl = this.gl;


        let frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);

        //通过Materail设置 CULL_FACE  Blend clearColor ClearDepth
        this._state.setMaterial(material, frontFaceCW);

        let program = setProgram.call(me, camera, fog, material, object);

        let updateBuffers = isUpdateBuffers(geometry, program, material);


        let index = geometry.index;
        let position = geometry.attributes.position;
        let rangeFactor = 1;

        if (material.wireframe === true) {

            index = this._geometries.getWireframeAttribute(geometry);
            rangeFactor = 2;

        }

        let attribute;
        let renderer = this._bufferRenderer;

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



        let dataCount = Infinity;

        if (index !== null) {

            dataCount = index.count;

        } else if (position !== undefined) {

            dataCount = position.count;

        }

        let rangeStart = geometry.drawRange.start * rangeFactor;
        let rangeCount = geometry.drawRange.count * rangeFactor;

        let groupStart = group !== null ? group.start * rangeFactor : 0;
        let groupCount = group !== null ? group.count * rangeFactor : Infinity;

        let drawStart = Math.max(rangeStart, groupStart);
        let drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;

        let drawCount = Math.max(0, drawEnd - drawStart + 1);

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
            let lineWidth = material.linewidth;

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

        } else if (object.isSprite) {

            renderer.setMode(_gl.TRIANGLES);

        }

        if (geometry && geometry.isInstancedBufferGeometry) {

            if (geometry.maxInstancedCount > 0) {

                renderer.renderInstances(geometry, drawStart, drawCount);

            }

        } else {

            renderer.render(drawStart, drawCount);

        }

    }

    allocTextureUnit() {
        var textureUnit = _usedTextureUnits;

        if (textureUnit >= this._capabilities.maxTextures) {

            console.warn('WebGLRenderer: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures);

        }

        _usedTextureUnits += 1;

        return textureUnit;
    }

    setTexture2D(texture, slot) {
        //todo Use in WebGLUniforms
        this._textures.setTexture2D(texture, slot);
    }

    setTextureCube() {
        //todo Use in WebGLUniforms
    }

    dispose() {

        this._canvas.removeEventListener('webglcontextlost', onContextLost, false);
        this._canvas.removeEventListener('webglcontextrestored', onContextRestore, false);

        this._renderLists.dispose();
        this._renderStates.dispose();
        this._properties.dispose();
        this._objects.dispose();

        //vr.dispose();

        //stopAnimation();

    };
}

//判断是否更新了Buffer
let _currentGeometryProgram = '';
function isUpdateBuffers(geometry, program, material) {

    let geometryProgram = geometry.id + '_' + program.id + '_' + (material.wireframe === true);

    let updateBuffers = false;

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

            if (sortObjects) {

                this._vector3.setFromMatrixPosition(object.matrixWorld)
                    .applyMatrix4(this._projScreenMatrix);

            }

            var geometry = this._objects.update(object);
            var material = object.material;

            this._currentRenderList.push(object, geometry, material, this._vector3.z, null);

        }

    } else if (object.isMesh || object.isLine || object.isPoints) {

        if (!object.frustumCulled || this._frustum.intersectsObject(object)) {

            if (sortObjects) {

                this._vector3.setFromMatrixPosition(object.matrixWorld)
                    .applyMatrix4(this._projScreenMatrix);

            }
            //创建好了attribute buffer
            let geometry = this._objects.update(object);
            let material = object.material;

            //如果是数组,表示geometry根据groups的分组进行分别绘制
            if (Array.isArray(material)) {

                let groups = geometry.groups;

                for (let i = 0, l = groups.length; i < l; i++) {

                    let group = groups[i];
                    let groupMaterial = material[group.materialIndex];

                    if (groupMaterial && groupMaterial.visible) {

                        this._currentRenderList.push(object, geometry, groupMaterial, this._vector3.z, group);

                    }

                }

            } else if (material.visible) {

                this._currentRenderList.push(object, geometry, material, this._vector3.z, null);

            }

        }



    }

    let children = object.children;

    for (let i = 0, l = children.length; i < l; i++) {

        projectObject.call(this, children[i], camera, sortObjects);

    }

}

function renderObjects(renderList, scene, camera) {
    for (let i = 0, l = renderList.length; i < l; i++) {

        let renderItem = renderList[i];

        let object = renderItem.object;
        let geometry = renderItem.geometry;
        let material = renderItem.material;
        let group = renderItem.group;

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


let _usedTextureUnits = 0;                  //当前纹理单元
function setProgram(camera, fog, material, object) {
    _usedTextureUnits = 0;

    let materialProperties = this._properties.get(material);
    let lights = this._currentRenderState.state.lights;


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

    let refreshProgram = false;
    let refreshMaterial = false;
    let refreshLights = false;

    let program = materialProperties.program,
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

        if (material.isMeshBasicMaterial
            || material.isLineBasicMaterial
            || material.isMeshLambertMaterial
            || material.isMeshPhongMaterial
            || material.isPointsMaterial
            || material.isLineMeshMaterial
            || material.isSpriteMaterial) {
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

        function updateLineMaterial() {
            m_uniforms.dashSize.value = material.dashSize;
            m_uniforms.totalSize.value = material.dashSize + material.gapSize;
            m_uniforms.scale.value = material.scale;
        }

        if (material.isLineBasicMaterial) {

            if (material.isLineDashedMaterial) {
                updateLineMaterial();
            }

        } else if (material.isMeshPhongMaterial) {

            m_uniforms.specular.value = material.specular;
            m_uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )

        }

        else if (material.isPointsMaterial) {

            m_uniforms.size.value = material.size * this._pixelRatio;
            m_uniforms.scale.value = this._height * 0.5;

        } else if (material.isSpriteMaterial) {

            m_uniforms.rotation.value = material.rotation;


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

    if (material.isSpriteMaterial) {

        p_uniforms.setValue('center', object.center);

    }


    // common matrices

    p_uniforms.setValue('modelViewMatrix', object.modelViewMatrix);
    p_uniforms.setValue('normalMatrix', object.normalMatrix);
    p_uniforms.setValue('modelMatrix', object.matrixWorld);

    return program;

}

function initMaterial(material, fog, object) {

    let materialProperties = this._properties.get(material);
    let lights = this._currentRenderState.state.lights;
    let parameters = this._programCache.getParameters(material, lights.state);

    let code = this._programCache.getProgramCode(material, parameters);

    let program = materialProperties.program;
    let programChange = true;

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
                uniforms: UniformsUtils.clone(shader.uniforms),
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

    let programAttributes = program.getAttributes();


    let uniforms = materialProperties.shader.uniforms;


    // store the light setup it was created for

    materialProperties.lightsHash = lights.state.hash;

    if (material.lights) {

        // wire up the material to this renderer's lighting state

        uniforms.ambientLightColor.value = lights.state.ambient;
        uniforms.directionalLights.value = lights.state.directional;
        uniforms.spotLights.value = lights.state.spot;
        uniforms.pointLights.value = lights.state.point;

    }

    let progUniforms = materialProperties.program.getUniforms();
    let uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

    materialProperties.uniformsList = uniformsList;

}

function onMaterialDispose(event) {
    let me = this;
    let material = event.target;

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
    let _gl = this.gl;
    let geometryAttributes = geometry.attributes;

    let programAttributes = program.getAttributes();
    let materialDefaultAttributeValues = material.defaultAttributeValues;

    for (let name in programAttributes) {

        let programAttribute = programAttributes[name];

        if (programAttribute >= 0) {

            let geometryAttribute = geometryAttributes[name];

            if (geometryAttribute !== undefined) {

                let normalized = geometryAttribute.normalized;
                let size = geometryAttribute.itemSize;

                let attribute = this._attributes.get(geometryAttribute);

                // TODO Attribute may not be available on context restore

                if (attribute === undefined) continue;

                let buffer = attribute.buffer;
                let type = attribute.type;
                let bytesPerElement = attribute.bytesPerElement;

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


export { WebGLRenderer };