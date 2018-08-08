import { Sprite } from './Sprite';
import { _Math } from '../maths/Math';
import { Vector3 } from '../maths/Vector3';
import { SpriteMaterial } from '../materials/SpriteMaterial';
import { TextTexture } from '../textures/TextTexture';

class TextSprite extends Sprite {
    constructor({
        fontSize = 16,
        redrawInterval = 1,
        material = {},
        texture = {},
    } = {}) {
        super(new SpriteMaterial({ ...material, map: new TextTexture(texture) }));

        this.fontSize = fontSize;
        this.redrawInterval = redrawInterval;
        this.lastRedraw = 0;
    }

    get isTextSprite() {
        return true;
    }

    onBeforeRender(renderer, scene, camera) {
        this.redraw(renderer, camera);
    }
    updateScale(renderer, camera) {

            let fontsize = this.fontSize;
            
            let screenHeight = renderer.domElement.clientWidth;
            let dist = camera.position.distanceTo(this.position);

            var vFOV = _Math.degToRad(camera.fov); // convert vertical fov to radians

            var height = 2 * Math.tan(vFOV / 2) * dist; // visible height


            //投影位置全屏的Height 与 屏幕的高度比乘以字体的高度 
            let actualFontSize = height / screenHeight * fontsize;

            this.scale.set(this.material.map.imageAspect, 1, 1).multiplyScalar(Math.round(actualFontSize));

    }

    // updateMatrix(...args) {
    //     this.updateScale(...args);
    //     return super.updateMatrix(...args);
    // }

    redraw(renderer, camera) {
        if (this.lastRedraw + this.redrawInterval < Date.now()) {
            if (this.redrawInterval) {
                setTimeout(() => {
                    this.redrawNow(renderer, camera);
                }, 1);
            } else {
                this.redrawNow(renderer, camera);
            }
        }
    }

    redrawNow(renderer, camera) {
        this.updateScale(renderer, camera);
        this.material.map.autoRedraw = true;
        
        this.material.map.fontSize =_Math.ceilPowerOfTwo(getOptimalFontSize(this, renderer, camera));

        this.lastRedraw = Date.now();
    }

    dispose() {
        this.material.map.dispose();
        this.material.dispose();
    }

}

let getOptimalFontSize = (function () {
    const objectWorldPosition = new Vector3();
    const cameraWorldPosition = new Vector3();
    const objectWorldScale = new Vector3();
    return function getOptimalFontSize(object, renderer, camera) {
        if (renderer.domElement.width && renderer.domElement.height && object.material.map.textLines.length) {
            let distance = object.getWorldPosition(objectWorldPosition).distanceTo(camera.getWorldPosition(cameraWorldPosition));
            if (distance) {
                let heightInPixels = object.getWorldScale(objectWorldScale).y * renderer.domElement.height / distance;
                if (heightInPixels) {
                    return Math.round(heightInPixels / object.material.map.imageHeight);
                }
            }
        }
        return 0;
    }

})();




export { TextSprite };