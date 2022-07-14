const Products = require('../controllers/containerProducts.js');

const products = new Products();
console.log(products);

const getProducts = (req, res) => {
	if (req.params.id == undefined) return res.send(products.getAll());
	const id = Number(req.params.id);
	const product = products.getById(id);
	if (!product) return res.status(404).send({ message: 'El ID seleccionado no corresponde a un producto activo' });
	res.json(product);
}

const addProduct = (req, res) => {
	const { name, description, code, pic, price, stock } = req.body;
	products.save({ name, description, code, pic, price, stock });
	res.json({ message: 'Producto añadido con exito!' });
}

const updateProduct = (req, res) => {
	const id = Number(req.params.id);
	if (id < 0 || id > products.objects.length) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
	products.update(id, req.body);
	res.json({ message: 'Producto correctamente actualizado' });
}

const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un producto listado' });
	const productDeleted = products.deleteById(id);
	if (productDeleted === -1) return res.status(404).json({ message: 'El ID seleccionado no corresponde a un producto activo' });
	res.json({ message: 'Producto correctamente eliminado' });
};

module.exports = { products, getProducts, addProduct, updateProduct, deleteProduct };