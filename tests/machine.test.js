const {should} = require('chai');
should();

const {init} = require('../index');


describe('Beverage vending machine',() => {
    it('prepare hot tea, hot coffee, black tea, green tea',async() => {
        const resp = await init(`test1.json`);
        resp.should.be.a('string');
    })

    it('prepare ginger tea, hot coffee, black tea',async() => {
        const resp = await init(`test2.json`);
        resp.should.be.a('string');
    })

    it('prepare ginger tea, hot coffee, black tea, green tea, ginger tea',async() => {
        const resp = await init(`test3.json`);
        resp.should.be.a('string');
    })
});