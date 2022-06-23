import { generateId, readDB, writeDB } from './utils.js';

let products = [];
let pathProducts = './data/products.json';

class Product {
	constructor(name, description, code, pic, price, stock) {
		this.timestamp = Date.now();
		this.name = name;
		this.description = description;
		this.code = code;
		this.pic = pic;
		this.price = price;
		this.stock = stock;
	}
	static getProduct = async id => {
		try {
			products = await this.getProducts();
			let productFound = products.find(product => product.id === id);
			return productFound ? productFound : null;
		} catch (err) {
			console.log(err);
		}
	}
	static getProducts = async () => {
		try {
			let productsFS = await readDB(pathProducts);
			return productsFS;
		} catch (err) {
			console.log(err);
		}
	}
	static addProduct = async product => {
		try {
			const readFile = await this.getProducts();
			if (!readFile) {
				const { name, description, code, pic, price, stock } = product;
				const newProduct = new Product(name, description, code, pic, price, stock);
				newProduct.id = await generateId(pathProducts);
				products.push(newProduct);
				writeDB(pathProducts, products);
				return newProduct.id;
			}
			products = readFile;
			const { name, description, code, pic, price, stock } = product;
			const newProduct = new Product(name, description, code, pic, price, stock);
			newProduct.id = await generateId(pathProducts);
			products.push(newProduct);
			writeDB(pathProducts, products);
			return newProduct.id;
		} catch (err) {
			console.log(err);
		}
	}
	static updateProduct = async (id, data) => {
		try {
			let productToUpdate = await this.getProduct(id);
			if (!productToUpdate) return;
			const { name, description, code, pic, price, stock } = data;
			productToUpdate = { id, name, description, code, pic, price, stock };
			await writeDB(pathProducts, products)
			return productToUpdate;
		} catch (err) {
			console.log(err);
		}
	}
	static async deleteProduct(id) {
		try {
			products = await this.getProducts();
			if (id < 1 || id > products.length) return;
			products = products.filter(product => product.id != id);
			writeDB(pathProducts, products);
			return id;
		} catch (err) {
			console.log(err);
		}
	}
}

export default Product;