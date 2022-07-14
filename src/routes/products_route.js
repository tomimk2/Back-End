const router = require("express").Router();
const {getProducts, createProduct, getProductById, modifyProduct, delProduct} = require("../controllers/products_controller");

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', modifyProduct);
router.get('/delete/:id', delProduct);

module.exports = router;