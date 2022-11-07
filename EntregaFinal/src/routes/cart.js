const router = require("express").Router();
const {createCart, getProductsByUserId} = require("../controllers/CartController");


router.post('/', createCart);
router.get('/:id/productos', getProductsByUserId);

module.exports = router;