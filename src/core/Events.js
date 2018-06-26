
/**
 * @class Events 事件对象
 * @description 事件对象
 * @author bujue
 */
class Events {
    on(type, listener) {

        if (this._listeners === undefined) this._listeners = {};

        var listeners = this._listeners;

        if (listeners[type] === undefined) {

            listeners[type] = [];

        }

        if (listeners[type].indexOf(listener) === - 1) {

            listeners[type].push(listener);

        }

    }

    has(type, listener) {

        if (this._listeners === undefined) return false;

        var listeners = this._listeners;

        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== - 1;

    }

    off(type, listener) {

        if (this._listeners === undefined) return;

        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {

            var index = listenerArray.indexOf(listener);

            if (index !== - 1) {

                listenerArray.splice(index, 1);

            }

        }

    }

    fire(event) {

        if (this._listeners === undefined) return;

        var listeners = this._listeners;
        var listenerArray = listeners[event.type];

        if (listenerArray !== undefined) {

            event.target = this;

            var array = listenerArray.slice(0);

            for (var i = 0, l = array.length; i < l; i++) {

                array[i].call(this, event);

            }

        }

    }
}

export { Events };