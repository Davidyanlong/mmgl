import { Texture } from './Texture';
import { LinearFilter } from '../constants';

class TextTexture extends Texture {
    constructor(
        { autoRedraw = true,
            text = '',
            textAlign = 'center',
            textLineHeight = 1.15,
            fontFamily = 'sans-serif',
            fontSize = 16,
            fontWeight = 'normal',
            fontVariant = 'normal',
            fontStyle = 'normal',
            fillStyle = 'white',
            lineWidth = 0,
            strokeStyle = 'black',
            padding = 0.25,
            magFilter = LinearFilter,
            minFilter = LinearFilter,
            mapping,
            wrapS,
            wrapT,
            format,
            type,
            anisotropy } = {}) {

        super(
            createCanvas(),
            mapping,
            wrapS,
            wrapT,
            magFilter,
            minFilter,
            format,
            type,
            anisotropy
        );

        this.autoRedraw = autoRedraw;
        this._text = text;
        this._textAlign = textAlign;
        this._textLineHeight = textLineHeight;
        this._fontFamily = fontFamily;
        this._fontSize = fontSize;
        this._fontWeight = fontWeight;
        this._fontVariant = fontVariant;
        this._fontStyle = fontStyle;
        this._fillStyle = fillStyle;
        this._lineWidth = lineWidth;
        this._strokeStyle = strokeStyle;
        this._padding = padding;

        this.redraw();


    }
    get isTextTexture() {
        return true;
    }
    redraw() {

        let ctx = this.image.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (this.textWidthInPixels && this.textHeightInPixels) {
            ctx.canvas.width = this.imageWidthInPixels;
            ctx.canvas.height = this.imageHeightInPixels;

            ctx.font = this.font;
            ctx.textBaseline = 'middle';
            let left;
            switch (this.textAlign) {
                case 'left':
                    ctx.textAlign = 'left';
                    left = this.paddingInPixels + this.lineWidthInPixels / 2;
                    break;
                case 'right':
                    ctx.textAlign = 'right';
                    left = this.paddingInPixels + this.lineWidthInPixels / 2 + this.textWidthInPixels;
                    break;
                case 'center':
                    ctx.textAlign = 'center';
                    left = this.paddingInPixels + this.lineWidthInPixels / 4 + this.textWidthInPixels / 2;
                    break;
            }
            let top = this.paddingInPixels + this.lineWidthInPixels / 2 + this.fontSize / 2;
            ctx.fillStyle = this.fillStyle;
            ctx.miterLimit = 1;
            ctx.lineWidth = this.lineWidthInPixels;
            ctx.strokeStyle = this.strokeStyle;

            this.textLines.forEach(text => {
                if (this.lineWidth) {
                    ctx.strokeText(text, left, top);
                }
                ctx.fillText(text, left, top);
                top += this.textLineHeightInPixels;
            });
        } else {
            ctx.canvas.width = ctx.canvas.height = 1;
        }
        this.needsUpdate = true;
    }

    _redrawIfAuto() {
        if (this.autoRedraw) {
            this.redraw();
        }
    }

    get text() {
        return this._text;
    }

    set text(value) {
        if (this._text !== value) {
            this._text = value;
            this._textLines = undefined;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign(value) {
        if (this._textAlign !== value) {
            this._textAlign = value;
            this._redrawIfAuto();
        }
    }

    get textLines() {
        if (Lang_isUndefined(this._textLines)) {
            this._textLines = getTextLines(this.text);
        }
        return this._textLines;
    }

    get textLineHeight() {
        return this._textLineHeight;
    }

    set textLineHeight(value) {
        if (this._textLineHeight !== value) {
            this._textLineHeight = value;
            this._redrawIfAuto();
        }
    }

    get textLineHeightInPixels() {
        return this.fontSize * this.textLineHeight;
    }

    get fontFamily() {
        return this._fontFamily;
    }

    set fontFamily(value) {
        if (this._fontFamily !== value) {
            this._fontFamily = value;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(value) {
        if (this._fontSize !== value) {
            this._fontSize = value;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get fontWeight() {
        return this._fontWeight;
    }

    set fontWeight(value) {
        if (this._fontWeight !== value) {
            this._fontWeight = value;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get fontVariant() {
        return this._fontVariant;
    }

    set fontVariant(value) {
        if (this._fontVariant !== value) {
            this._fontVariant = value;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get fontStyle() {
        return this._fontStyle;
    }

    set fontStyle(value) {
        if (this._fontStyle !== value) {
            this._fontStyle = value;
            this._textWidthInPixels = undefined;
            this._redrawIfAuto();
        }
    }

    get font() {
        return getFont(
            this.fontStyle,
            this.fontVariant,
            this.fontWeight,
            this.fontSize,
            this.fontFamily,
        );
    }

    get fillStyle() {
        return this._fillStyle;
    }

    set fillStyle(value) {
        if (this._fillStyle !== value) {
            this._fillStyle = value;
            this._redrawIfAuto();
        }
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        if (this._lineWidth !== value) {
            this._lineWidth = value;
            this._redrawIfAuto();
        }
    }

    get lineWidthInPixels() {
        return this._lineWidth * this.fontSize;
    }

    get strokeStyle() {
        return this._strokeStyle;
    }

    set strokeStyle(value) {
        if (this._strokeStyle !== value) {
            this._strokeStyle = value;
            this._redrawIfAuto();
        }
    }

    get textWidthInPixels() {
        if (Lang_isUndefined(this._textWidthInPixels)) {
            this._textWidthInPixels = getTextWidth(
                this.textLines,
                this.font,
            );
        }
        return this._textWidthInPixels;
    }

    get textHeight() {
        return this.textLineHeight * (this.textLines.length - 1) + 1;
    }

    get textHeightInPixels() {
        return this.textHeight * this.fontSize;
    }

    get padding() {
        return this._padding;
    }

    set padding(value) {
        if (this._padding !== value) {
            this._padding = value;
            this._redrawIfAuto();
        }
    }

    get paddingInPixels() {
        return this.padding * this.fontSize;
    }

    get imageWidthInPixels() {
        return this.textWidthInPixels + this.lineWidthInPixels + this.paddingInPixels * 2;
    }

    get imageHeight() {
        return this.textHeight + this.lineWidth + this.padding * 2;
    }

    get imageHeightInPixels() {
        return this.imageHeight * this.fontSize;
    }

    get imageAspect() {
        if (this.image.width && this.image.height) {
            return this.image.width / this.image.height;
        }
        return 1;
    }


}
TextTexture.getTextWidth = (textLines, font) => {
    return getTextWidth(textLines, font);
}

function Lang_isUndefined(value) {
    return value === undefined;
};

function getTextLines(text) {
    return text ? text.split('\n') : [];
}

function getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily) {
    return [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
}


function getTextWidth(textLines, font) {
    if (textLines.length) {
        let ctx = createCanvas().getContext('2d');
        ctx.font = font;
        return Array_max(textLines.map(text => ctx.measureText(text).width));
    }
    return 0;
}


function Array_max(array) {
    if (array.length > 0) {
        return array.reduce((maxValue, value) => Math.max(maxValue, value));
    }
}


function createCanvas() {
    return document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
};

export { TextTexture };