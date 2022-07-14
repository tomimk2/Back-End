const express = require("express");
const { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } = require("../controllers/controllerCart.js");
const routerCart = express.Router();

routerCart.post('/', (req, res) => addCart(req, res));

routerCart.delete('/:id', (req, res) => deleteCart(req, res));

routerCart.get('/:id/products', (req, res) => getProducts(req, res));

routerCart.post('/:id/products', (req, res) => addProductToCart(req, res));

routerCart.delete('/:id/products/:id_prod', (req, res) => deleteProduct(req, res));

module.exports = routerCart;