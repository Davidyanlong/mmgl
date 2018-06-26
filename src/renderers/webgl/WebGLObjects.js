/**
 * @class WebGLObjects
 * @description 通过更新帧来控制更新WebGLGemetries update
 * @author bujue
 */

class WebGLObjects {
    constructor(geometries, info) {
        this._infoRender = info.render;
        this._updateList = {};
        this._geometries = geometries;
    }

    update(object) {

        let frame = this._infoRender.frame;
        let geometries = this._geometries;


        let geometry = object.geometry;
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
    dispose() {

        this._updateList = {};

    }

}

export { WebGLObjects };