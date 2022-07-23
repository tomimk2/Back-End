const { faker } = require('@faker-js/faker');
faker.locale = 'es';

class MockProduct {
    constructor() {
        this.id = faker.datatype.number(Math.floor(1 + Math.random() * 10 + 1))
        this.title = faker.commerce.productName()
        this.price = faker.commerce.price()
        this.thumbnail = faker.image.image('640', '480', true)
    }
}

module.exports = MockProduct;