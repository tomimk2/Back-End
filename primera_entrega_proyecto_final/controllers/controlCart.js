import { generateId, readDB, writeDB } from './utils.js';

let carts = [];
let pathCarts = './data/carts.json';

class Cart {
	constructor() {
		this.timestamp = Date.now();
		this.products = [];
	}
	static createCart = async () => {
		try {
			let db = await readDB(pathCarts);
			const newCart = new Cart();
			newCart.id = await generateId(pathCarts);
			db.push(newCart);
			writeDB(pathCarts, db);
			return newCart.id;
		} catch (err) {
			console.log(err);
		}
	}
	static deleteCart = async id => {
		try {
			let db = await readDB(pathCarts);
			if (id < 1 || id > db.length) return;
			db = db.filter(c => c.id !== id);
			writeDB(pathCarts, db);
			return id;
		} catch (err) {
			console.log(err);
		}
	}
	static getProductsCart = async id => {
		try {
			let db = await readDB(pathCarts);
			let cartFound = db.find(cart => cart.id === id);
			return cartFound;
		} catch (err) {
			console.log(err);
		}
	}
}

export default Cart;