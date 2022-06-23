import fs from 'fs';

const generateId = async path => {
	try {
		let db = await readDB(path);
		let maxId = db.length;
		db.forEach(item => {
			item.id > maxId ? maxId = item.id : maxId;
		});
		return maxId + 1;
	} catch (err) {
		console.log(err);
	}
}

const readDB = async path => {
	try {
		let db = await fs.promises.readFile(path, 'utf-8');
		db = JSON.parse(db);
		return db;
	} catch (err) {
		console.log(err);
	}
}

const writeDB = async (path, data) => {
	try {
		fs.promises.writeFile(path, JSON.stringify(data, null, 2));
	} catch (err) {
		console.log(err);
	}
}

export { generateId, readDB, writeDB };