class Machine {
    constructor(data) {
        const { outlets, total_items_quantity, beverages } = data.machine;
        this.outlet = outlets.count_n || 0;
        this.stock = total_items_quantity;
        this.beverages = beverages;
    }

    prepareBeverages = async function () {
        const beveragesToPrepare = Object.keys(this.beverages);
        // console.log(beveragesToPrepare);
        const total = beveragesToPrepare.length;
        const promises = [];
        let response = [];
        let i = 0;
        while (i < total) {
            let j = 0;
            // console.log({i})
            while (j < this.outlet) {
                if (j + i >= total) break;
                promises.push(this.process(beveragesToPrepare[j + i]));
                j++;
            }
            response = await Promise.all(promises);
            // console.log({response});
            i += j;
        }
        return response.join('\n');
    }

    process = async function (beverage) {
        let message;
        for (const ingradient in this.beverages[beverage]) {
            if (!(ingradient in this.stock)) {
                message = `${beverage} cannot be prepared because ${ingradient} is not available`;
            }
            if (this.stock[ingradient] < this.beverages[beverage][ingradient]) {
                message = `${beverage} cannot be prepared because item ${ingradient} is not sufficient`;
            }
            this.stock[ingradient] -= this.beverages[beverage][ingradient]
        }
        if (!message) message = `${beverage} is prepared`
        return message;
    }

    refill(ingradient, stock) {
        if (stock <= 0) {
            return 'Please add positive quantity';
        }
        this.stock[ingradient] += stock;
        return 'Stock added successfully!';
    }
}


module.exports = {
    Machine
}