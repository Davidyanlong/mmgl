
import { Object3D } from "../core/Object3D";

/**
 * @class  分组
 * @description 主要是为了将部分对象做批量变换,同Sence,名称上更容易让读者理解
 * @author bujue
 */

class Group extends Object3D {
    constructor() {
        super();
        this.type = 'Group';
        this.isGroup = true
    }
}

export { Group };