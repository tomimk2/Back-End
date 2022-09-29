const { getAll, getById, add, modify, deleteById } = require('../controllers/main');
const router = require('express').Router();


router.get('/', getAll);
router.get('/:id', getById);
router.post('/add', add);
router.put('/modify/:id', modify);
router.delete('/:id', deleteById);

module.exports = router;