import { SDF } from './sdf.js';



class SDFImage {
    constructor(sdf_params, chars) {

        this._sdf = new SDF(sdf_params);
        this.ctx = document.createElement('canvas').getContext('2d');
        this.ctx.font = this._sdf.font;
        this.canvas = this.ctx.canvas;
        this.canvas.width=this.canvas.height=512;
        this.sdfs = {};
        this.chars = chars;
    }

    updateSDF() {
        let ctx = this.ctx;
        let canvas = this.canvas;
        var sdf = this._sdf;
        let chars = this.chars;

        let  makeRGBAImageData = function(alphaChannel, size) {
            var imageData = ctx.createImageData(size, size);
            var data = imageData.data;
            for (var i = 0; i < alphaChannel.length; i++) {
                data[4 * i + 0] = alphaChannel[i];
                data[4 * i + 1] = alphaChannel[i];
                data[4 * i + 2] = alphaChannel[i];
                data[4 * i + 3] = 255;
            }
            return imageData;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var now = performance.now();
        for (var y = 0, i = 0; y + sdf.size <= canvas.height && i < chars.length; y += sdf.size) {
            for (var x = 0; x + sdf.size <= canvas.width && i < chars.length; x += sdf.size) {
                ctx.putImageData(makeRGBAImageData(sdf.draw(chars[i]), sdf.size), x, y);
                this.sdfs[chars[i]] = { x: x, y: y };
                i++;
            }
        }
        console.log('SDF time:',Math.round(performance.now() - now) + 'ms.');
    }

}


export { SDFImage };