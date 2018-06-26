/**
 * @class WebGLProperties
 * @description 将Material相关的设置转换为对应的渲染参数并关联起来
 * @author bujue
 */

class WebGLProperties {
    constructor() {
        //WeakMap 可以通过一个对象作用key 再关联一个新的对象,  作为key的对象是弱引用
        this._properties = new WeakMap();
    }

    get(object) {

        let map = this._properties.get(object);

        if (map === undefined) {

            map = {};
            this._properties.set(object, map);

        }

        return map;

    }

    remove(object) {

        this._properties.delete(object);

    }

    update(object, key, value) {

        this._properties.get(object)[key] = value;

    }

    dispose() {

        this._properties = new WeakMap();

    }


}

export { WebGLProperties }; 