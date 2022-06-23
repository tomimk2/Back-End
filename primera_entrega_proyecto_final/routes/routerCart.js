import express from "express";
import Cart from "../controllers/controlCart.js";
import Product from '../controllers/controlProducts.js';

const routerCart = express.Router();
let admin;

routerCart.post('/', async (req, res) => {
	await Cart.createCart();
	res.send({ message: 'Carrito creado' });
});

routerCart.delete('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	let cartDeleted = await Cart.deleteCart(id);
	if (!cartDeleted) return res.send({ message: 'No se puede eliminar el carrito ya que no existe' });
	res.send({ message: 'Carrito eliminado' });
});

routerCart.get('/:id/products', async (req, res) => {
	if (isNaN(req.params.id)) return res.send({ message: 'Ingresa el ID del carrito que deseas consultar sus productos' });
	const id = parseInt(req.params.id);
	let cartProducts = await Cart.getProductsCart(id);
	if (!cartProducts) return res.send({ message: 'No hay productos listados' });
	res.send(cartProducts);
});

routerCart.post('/:id/products', async (req, res) => {
	const id = parseInt(req.params.id);
});

routerCart.delete('/:id/products/:id_prod', (req, res) => {

});

export default routerCart;