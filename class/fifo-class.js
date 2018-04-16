const getObjectsDateOrder = require('../utils/sorteUtils');
class CacheController {
    constructor(dataId) {
        this.date = new Date();
        this.dataId = dataId;
    }
}

function enqueueData(id, obj, map, controllerArray) {
    controllerArray.push(new CacheController(id));
    map[id] = obj;
}

function denqueueData(map, controllerArray) {
    controllerArray.sort(getObjectsDateOrder);
    const o = controllerArray.shift();
    delete map[o.dataId];
}

class CacheFIFO {
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
        if (typeof id != 'number' && typeof id != 'string') {
            return;
        }
        if (this._map[id]) {
            this._map[id] = obj;
            return true;
        }
        if (this._cacheControllers.length >= this.maxLength) {
            denqueueData(this._map, this._cacheControllers);
        }
        enqueueData(id, obj, this._map, this._cacheControllers);
        return true;
    }
}

module.exports = CacheFIFO;