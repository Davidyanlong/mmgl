
class WebGLRenderList {
    constructor() {
        this.renderItems = [];
        this.renderItemsIndex = 0;

        this.opaque = [];
        this.transparent = [];
    }
    init() {
        this.renderItemsIndex = 0;

        this.opaque.length = 0;
        this.transparent.length = 0;
    }
    push(object, geometry, material, z, group) {

        var renderItem = this.renderItems[this.renderItemsIndex];

        if (renderItem === undefined) {

            renderItem = {
                id: object.id,
                object: object,
                geometry: geometry,
                material: material,
                program: material.program,
                renderOrder: object.renderOrder,
                z: z,
                group: group
            };

            this.renderItems[this.renderItemsIndex] = renderItem;

        } else {

            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.program = material.program;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;

        }

        (material.transparent === true ? this.transparent : this.opaque).push(renderItem);

        this.renderItemsIndex++;

    }

    sort() {

        if (this.opaque.length > 1) this.opaque.sort(painterSortStable);
        if (this.transparent.length > 1) this.transparent.sort(reversePainterSortStable);

    }


}

function painterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;

    } else if (a.program && b.program && a.program !== b.program) {

        return a.program.id - b.program.id;

    } else if (a.material.id !== b.material.id) {

        return a.material.id - b.material.id;

    } else if (a.z !== b.z) {

        return a.z - b.z;

    } else {

        return a.id - b.id;

    }

}

function reversePainterSortStable(a, b) {

    if (a.renderOrder !== b.renderOrder) {

        return a.renderOrder - b.renderOrder;

    } if (a.z !== b.z) {

        return b.z - a.z;

    } else {

        return a.id - b.id;

    }

}

class WebGLRenderLists {

    constructor() {
        this._lists = {};
    }

    get(scene, camera) {

        var hash = scene.id + ',' + camera.id;
        var list = this._lists[hash];

        if (list === undefined) {

            //console.log('WebGLRenderLists:', hash);

            list = new WebGLRenderList();
            this._lists[hash] = list;

        }

        return list;

    }

    dispose() {

        this._lists = {};

    }


}

export { WebGLRenderLists };