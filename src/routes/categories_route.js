const router = require("express").Router();
const {getCategories, createCategory, getCategoryById, modifyCategory, delCategory} = require("../controllers/categories_controller");

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.put('/:id', modifyCategory);
router.get('/delete/:id', delCategory);

module.exports = router;