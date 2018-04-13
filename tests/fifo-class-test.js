const CacheFIFO = require('../class/fifo-class');
const chai = require('chai');
const CustomObject = require('./mock/fifo-data-mock');

describe('CacheFIFO first test', function() {
    const cacheLength = 4;
    const cacheFifo = new CacheFIFO(cacheLength);
    const dataLength = cacheLength * 2;
    const data = [];
    before('Populate used data', () => {
        for (let i = 0; i < dataLength; i++) {
            data.push(new CustomObject());
        }
    });
    it('Should cache an object', () => {
        const dataIndex = Math.floor(Math.random() * dataLength);
        cacheFifo.recordObj(data[dataIndex]._id, data[dataIndex]);
        chai.expect(cacheFifo.findObj(data[dataIndex]._id)).exist;
    });
    it('Should cache only the lasts sended data of a collection with uinque values', () => {
        for (let i = 0; i < dataLength; i++) {
            cacheFifo.recordObj(data[i]._id, data[i]);
        }
        for (let i = 0; i < dataLength; i++) {
            if (i < dataLength - cacheLength) {
                chai.expect(cacheFifo.findObj(data[i]._id)).not.exist;
            } else {
                chai.expect(cacheFifo.findObj(data[i]._id)).exist;
            }
        }
    });
});

describe('CacheFIFO second test', function() {
    const cacheLength = 4;
    const cacheFifo = new CacheFIFO(cacheLength);
    const dataLength = cacheLength * 2;
    const data = [];
    before('Populate used data', () => {
        for (let i = 0; i < dataLength; i++) {
            data.push(new CustomObject());
        }
    });
    it('Should insert many documents based on a collection with repetitions, but cache only the lasts of then', () => {
        const access = Math.floor(Math.random() * 1000) + dataLength;
        const proof = [];
        for (let i = 0; i < access; i++) {
            const dataIndex = Math.floor(Math.random() * dataLength);
            cacheFifo.recordObj(data[dataIndex]._id, data[dataIndex]);
            if (proof.indexOf(data[dataIndex]._id) > -1) {
                continue;
            }
            if (proof.length >= cacheLength) {
                proof.shift();
            }
            proof.push(data[dataIndex]._id);
        }
        proof.forEach(p => {
            chai.expect(cacheFifo.findObj(p)).exist;
        });
    });
});