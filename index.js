const fs = require('fs');
const { Machine } = require('./src/machine');

async function init(fileName) {
    try {
        const data = JSON.parse(fs.readFileSync(`./uploads/${fileName}`, 'utf8'));

        const machine = new Machine(data);
        const result = await machine.prepareBeverages();

        console.log(result);
        return result;

    } catch (err) {
        console.error(err)
    }
}
init(fileName='test.json');

module.exports = {
    init
}


// 4 outlets, 3 beverages