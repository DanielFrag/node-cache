let idCount = 0;
class CustomObject {
    constructor() {
        this._id = ++idCount;
        this.data = Math.random() * 10;
    }
}

module.exports = CustomObject;