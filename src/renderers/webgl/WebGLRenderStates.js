import { WebGLLights } from "./WebGLLights";

class WebGLRenderState {
    constructor() {

        this.state = {
            lights: new WebGLLights(),
            lightsArray: [],
            spritesArray: []
        };

    }
    init() {
        this.state.spritesArray.length = 0;
        this.state.lightsArray.length = 0;
    }

    pushLight(light) {

        this.state.lightsArray.push(light);

    }

    pushSprite(sprite) {

        this.state.spritesArray.push(sprite);
    }

    setupLights(camera) {

        //todo 阴影为空
        let shadowsArray = [];

        this.state.lights.setup(this.state.lightsArray, shadowsArray, camera);

    }
    dispose() {
        this.state.lights.dispose();
        this.state = null;
    }

}


class WebGLRenderStates {
    constructor() {
        this._renderStates = {};
    }

    get(scene, camera) {

        let hash = scene.id + ',' + camera.id;

        let renderState = this._renderStates[hash];

        if (renderState === undefined) {

            renderState = new WebGLRenderState();
            this._renderStates[hash] = renderState;

        }

        return renderState;

    }

    dispose() {

        for (let key in this._renderStates) {
            this._renderStates[key] && this._renderStates[key].dispose();
        }

        this._renderStates = {};

    }

}

export { WebGLRenderStates }