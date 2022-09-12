const router = require("express").Router();
const {createCart, getProductsByUserId} = require("../controllers/cart_controller");


router.post('/', createCart);
router.get('/:id/productos', getProductsByUserId);

module.exports = router;