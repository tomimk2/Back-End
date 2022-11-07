const router = require("express").Router();
const {getProducts, getProductById} = require("../controllers/ProductsController");

router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;