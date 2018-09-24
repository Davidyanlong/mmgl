//SDF 算法

class SDF {

    constructor({ fontSize = 24, buffer = 3, radius = 0, cutoff = 0.25, fontFamily = "Microsoft YaHei,sans-serif", fontWeight = 'normal' } = {}) {

        this.fontSize = fontSize;
        this.buffer = buffer;
        this.cutoff = cutoff;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.radius = radius;

        let size = this.size = this.fontSize + this.buffer * 2;
        this.ctx = document.createElement('canvas').getContext('2d');
        this.canvas = this.ctx.canvas;
        this.canvas.width = this.canvas.height = size;

        this.ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'black';



        // temporary arrays for the distance transform
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);

        this.f = new Float64Array(size);
        this.d = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Int16Array(size);

        // hack around https://bugzilla.mozilla.org/show_bug.cgi?id=737852
        this.middle = Math.round((size / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));

    }

    draw(char) {
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.ctx.fillText(char, this.buffer, this.middle);
        let count = this.size * this.size;

        let imgData = this.ctx.getImageData(0, 0, this.size, this.size);
        let alphaChannel = new Uint8ClampedArray(count);

        for (var i = 0; i < count; i++) {
            var a = imgData.data[i * 4 + 3] / 255; // alpha value
            this.gridOuter[i] = a === 1 ? 0 : a === 0 ? SDF.INF : Math.pow(Math.max(0, 0.5 - a), 2);
            this.gridInner[i] = a === 1 ? SDF.INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
        }

        edt(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z);
        edt(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z);

        for (i = 0; i < count; i++) {
            var d = this.gridOuter[i] - this.gridInner[i];
            alphaChannel[i] = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
        }

        return alphaChannel;
    }
    destroy() {

        this.ctx = null;
        this.canvas = null;
        this.gridOuter = null;
        this.gridInner = null;

        this.f = null;
        this.d = null;
        this.z = null;
        this.v = null;


    }
}

SDF.INF = 1e20;


// 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf
function edt(data, width, height, f, d, v, z) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            f[y] = data[y * width + x];
        }
        edt1d(f, d, v, z, height);
        for (y = 0; y < height; y++) {
            data[y * width + x] = d[y];
        }
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            f[x] = data[y * width + x];
        }
        edt1d(f, d, v, z, width);
        for (x = 0; x < width; x++) {
            data[y * width + x] = Math.sqrt(d[x]);
        }
    }
}

// 1D squared distance transform
function edt1d(f, d, v, z, n) {
    v[0] = 0;
    z[0] = -SDF.INF;
    z[1] = +SDF.INF;

    for (var q = 1, k = 0; q < n; q++) {
        var s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) {
            k--;
            s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = +SDF.INF;
    }

    for (q = 0, k = 0; q < n; q++) {
        while (z[k + 1] < q) k++;
        d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
}


export { SDF };