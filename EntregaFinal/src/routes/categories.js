const router = require("express").Router();
const {getCategories, getCategoryById} = require("../controllers/CategoriesController");

router.get('/', getCategories);
router.get('/:id', getCategoryById);

module.exports = router;