const Container = require('../controllers/containerMongoDB.js');

class Products extends Container {
	constructor() {
		super('products', {
			timestamp: { type: Number, require: true },
			name: { type: String, require: true },
			description: { type: String, require: true },
			code: { type: Number, require: true },
			pic: { type: String, require: true },
			price: { type: Number, require: true },
			stock: { type: Number, require: true }
		});
	}
}

module.exports = Products;