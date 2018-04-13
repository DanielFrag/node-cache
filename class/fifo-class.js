const getObjectsDateOrder = require('../utils/sorteUtils');
class CacheObject {
    constructor(dataId) {
        this.date = new Date();
        this.dataId = dataId;
    }
}

class CacheFIFO {
    constructor(maxLength) {
        this._cacheController = [];
        this._map = {};
        this.maxLength = maxLength;
    }
    findObj(id) {
        if (typeof id != 'number' && typeof id != 'string') {
            return;
        }
        return this._map[id];
    }
    enqueueData(id, obj) {
        this._cacheController.push(new CacheObject(id));
        this._map[id] = obj;
    }
    denqueueData() {
        this._cacheController.sort(getObjectsDateOrder);
        const o = this._cacheController.shift();
        delete this._map[o.dataId];
    }
    recordObj(id, obj) {
        if (typeof id != 'number' && typeof id != 'string') {
            return;
        }
        if (this._map[id]) {
            this._map[id] = obj;
            return true;
        }
        if (this._cacheController.length >= this.maxLength) {
            this.denqueueData();
        }
        this.enqueueData(id, obj);
        return true;
    }
}

module.exports = CacheFIFO;