
class RenderFont {
    constructor(params = {}) {

        this.chartInfos = {};
        this.scale = params.scale || window.devicePixelRatio || 1;
        this.style = {
            color: params.color || new mmGL.Color('#ffffff'),
            fontSize: params.fontSize || 16,
            fontFamily: params.fontFamily || '微软雅黑,sans-serif',
            isBold: params.isBold || false,
            textAlign: params.textAlign || 'top',
            textBaseline: params.textBaseline || 'top',
            verticalAlign: params.verticalAlign || 'middle'

        }

        //根据传入的文字内容自动计算 纹理的大小

        this.textureWidth = 2;
        this.textureHeight = 2;

        // this.rcpTextureWidth = 1 / this.textureWidth;
        // this.rcpTextureHeight = 1 / this.textureHeight;

        this.canvas = params.canvas || document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.context = this.canvas.getContext("2d");

    }

    drawText(text) {
        let me = this;
        let top = 0;
        let left = 0;
        let textMatric = me.measureText(text);
        let size = me.resetCanvasSize(textMatric);

        //调整文字在纹理中的位置
        //垂直方向
        let subWidth = size.height - textMatric.height;
        if (me.style.verticalAlign.toLowerCase() == 'middle') {
            if (subWidth) {
                top = subWidth * 0.5;
            }
        } else if (me.style.verticalAlign.toLowerCase() == 'bottom') {
            top = subWidth;
        }

        //水平方向
        let subHeight = size.width - textMatric.width;
        if (me.style.textAlign.toLowerCase() == 'center') {

            if (subHeight) {
                left = subHeight * 0.5 + textMatric.width * 0.5;
            }
        } else if (me.style.textAlign.toLowerCase() == 'right') {
            left = size.width;
        }


        me.context.fillStyle = "#" + me.style.color.getHexString();
        me.context.textAlign = me.style.textAlign;
        me.context.textBaseline = me.style.textBaseline;
        me.context.webkitImageSmoothingEnabled = true;

        me.context.font = me.style.isBold ? 'bold ' : 'normal ' + me.style.fontSize * me.scale + 'px ' + me.style.fontFamily;
        var offset = 0.8;
        me.context.fillStyle = "#222222";
        me.context.fillText(text, left - offset, top - offset);
        me.context.fillStyle = "#222222";
        me.context.fillText(text, left + offset, top - offset);
        me.context.fillStyle = "#222222";
        me.context.fillText(text, left - offset, top + offset);
        me.context.fillStyle = "#222222";
        me.context.fillText(text, left + offset, top + offset);
        me.context.fillStyle = "#" + me.style.color.getHexString();
        me.context.fillText(text, left, top);


        // charInfo.width = textMatric.width;
        // charInfo.height = textMatric.height;

        // charInfo.texcoords_left = (charInfo.left) * rcpTextureWidth;
        // charInfo.texcoords_right = (charInfo.left + charInfo.width) * rcpTextureWidth;
        // charInfo.texcoords_top = (charInfo.top) * rcpTextureHeight;
        // charInfo.texcoords_bottom = (charInfo.top + charInfo.height) * rcpTextureHeight;

    }

    resetCanvasSize(size) {
        let me = this;
        let _Math = mmGL.Math;
        let width = _Math.ceilPowerOfTwo(size.width);
        let height = _Math.ceilPowerOfTwo(size.height);

        me.canvas.width = width * this.scale;
        me.canvas.height = height * this.scale;

        me.canvas.style.width = width + 'px';
        me.canvas.style.height = height + 'px';

        this.textureWidth = width;
        this.textureHeight = height;

        return {
            width,
            height
        }

    }

    measureText(text) {
        let size = null;
        let div = document.createElement("div");
        div.innerHTML = text;
        div.style.position = 'absolute';
        div.style.top = '-9999px';
        div.style.left = '-9999px';
        div.style.fontFamily = this.style.fontFamily;
        div.style.fontWeight = this.style.isBold ? 'bold' : 'normal';
        div.style.fontSize = this.style.fontSize * this.scale + 'px'; // or 'px'
        document.body.appendChild(div);
        size = {
            width: div.offsetWidth,
            height: div.offsetHeight
        }
        document.body.removeChild(div);

        return size;
    }

}

//export { RenderFont };