const mongoose = require('mongoose');

class Container {
	constructor(collection, schema) {
		this.model = mongoose.model(collection, schema);
	}
	async save(obj) {
		try {
		} catch (err) {
			console.log(err);
		}
	}
	getById(id) {
		try {
		} catch (err) {
			console.log(err);
		}
	}
	getAll() {
		try {
		} catch {

		}
	}
	deleteById(id) {
		try {
		} catch (err) {
			console.log(err);
		}
	}
	async deleteAll() {
		try {
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Container;