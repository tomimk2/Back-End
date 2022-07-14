const Container = require('../controllers/containerMongoDB.js');

class Cart extends Container {
	constructor() {
		super('carts', {
			timestamp: { type: Number, require: true },
			products: { type: String, require: true },
			description: { type: String, require: true },
			code: { type: Number, require: true },
			pic: { type: String, require: true },
			price: { type: Number, require: true },
			stock: { type: Number, require: true }
		});
	}
}

module.exports = Cart;