const faker = require('faker');
faker.locale = 'es';

const newProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        thumbnail: faker.image.dataUri()
    }
};

module.exports = { newProduct };