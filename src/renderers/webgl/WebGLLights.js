import { Color } from '../../maths/Color.js';
import { Vector3 } from '../../maths/Vector3.js';

let webglLightsCount = 0
let _webGLLightsVector3 = new Vector3();
class WebGLLights {
    constructor() {
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

    setup(lights, shadows, camera) {
        let r = 0, g = 0, b = 0;

        let directionalLength = 0;
        let pointLength = 0;
        let spotLength = 0;

        let state = this.state;
        let cache = this.cache;

        let viewMatrix = camera.matrixWorldInverse;

        for (let i = 0, l = lights.length; i < l; i++) {

            let light = lights[i];

            let color = light.color;
            let intensity = light.intensity;
            let distance = light.distance;




            if (light.isAmbientLight) {

                r += color.r * intensity;
                g += color.g * intensity;
                b += color.b * intensity;

            } else if (light.isDirectionalLight) {

                let uniforms = cache.get(light);

                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                _webGLLightsVector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(_webGLLightsVector3);
                uniforms.direction.transformDirection(viewMatrix);


                state.directional[directionalLength] = uniforms;

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
                uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

                state.spot[spotLength] = uniforms;

                spotLength++;

            } else if (light.isPointLight) {

                var uniforms = cache.get(light);

                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);

                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.distance = light.distance;
                uniforms.decay = (light.distance === 0) ? 0.0 : light.decay;

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
    dispose() {
        this.cache.dispose();
        this.cache = null;
        this.state = null;
    }

}

class UniformsCache {
    constructor() {
        this._lights = {};
    }

    get(light) {

        let lights = this._lights;

        if (lights[light.id] !== undefined) {

            return lights[light.id];
        }

        let uniforms;

        switch (light.type) {

            case 'DirectionalLight':
                uniforms = {
                    direction: new Vector3(),
                    color: new Color()
                };
                break;

            case 'SpotLight':
                uniforms = {
                    position: new Vector3(),
                    direction: new Vector3(),
                    color: new Color(),
                    distance: 0,
                    coneCos: 0,
                    penumbraCos: 0,
                    decay: 0
                };
                break;

            case 'PointLight':
                uniforms = {
                    position: new Vector3(),
                    color: new Color(),
                    distance: 0,
                    decay: 0
                };
                break;

            case 'HemisphereLight':
            case 'RectAreaLight':
                console.error('没有实现 HemisphereLight 和 RectAreaLight 灯光')
        }

        lights[light.id] = uniforms;

        return uniforms;

    }
    dispose() {
        this._lights = null;
    }

}

export { WebGLLights };