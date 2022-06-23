import express from "express";
import Product from "../controllers/controlProducts.js";
const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
	let products = await Product.getProducts();
	if (!products) return res.send({ message: 'No hay productos listados' });
	res.send(products);
});

routerProducts.get('/:id', async (req, res) => {
	if (isNaN(req.params.id)) return res.send({ message: 'Ingresá el número del producto que quieres consultar' });
	const id = parseInt(req.params.id);
	let productFound = await Product.getProduct(id);
	if (!productFound) return res.send({ message: 'El ID buscado no pertenece a un producto listado' });
	res.send(productFound);
});

routerProducts.post('/', (req, res) => {
	const { timestamp, name, description, code, pic, price, stock } = req.body;
	const productToAdd = { timestamp, name, description, code, pic, price, stock };
	Product.addProduct(productToAdd);
	res.send({ message: 'Producto agregado' });
});

routerProducts.put('/:id', async (req, res) => {
	if (isNaN(req.params.id)) return res.send({ message: 'Ingresá el número del producto que quieres editar' });
	const id = parseInt(req.params.id);
	const data = req.body;
	let update = await Product.updateProduct(id, data);
	if (!update) return res.send({ message: 'El ID buscado no pertenece a un producto listado' });
	res.send({ message: 'Producto actualizado' });
});

routerProducts.delete('/:id', async (req, res) => {
	if (isNaN(req.params.id)) return res.send({ message: 'Ingresá el número del producto que quieres editar' });
	const id = parseInt(req.params.id);
	let productDeleted = await Product.deleteProduct(id);
	if (!productDeleted) return res.send({ message: 'El ID buscado no pertenece a un producto listado' });
	res.send({ message: 'Producto eliminado' });
});

export default routerProducts;