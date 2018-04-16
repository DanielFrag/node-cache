const getObjectsDateOrder = require('../utils/sorteUtils');
class CacheController {
    constructor(parent, left, right) {
        this.childs = {
            left,
            right
        };
        this.parent = parent;
        this.pointer = 'left';
    }
    changePointer() {
        this.pointer = this.pointer === 'left' ? 'right' : 'left';
    }
    pushData(data) {
        this.childs[this.pointer] = data;
        this.changePointer();
    }
}

class CacheControllerTree {
    constructor(height) {
    }
    generate
}


function insertData(id, obj, map, controllerArray) {
    
}

function updateData(map, controllerArray) {

}

class LruClass {
    constructor(maxLength) {
        this._cacheControllers = [];
        this._map = {};
        this.maxLength = maxLength;
    }
    findObj(id) {
        if (typeof id != 'number' && typeof id != 'string') {
            return;
        }
        return this._map[id];
    }
    recordObj(id, obj) {
        
    }
};

module.exports = LruClass;