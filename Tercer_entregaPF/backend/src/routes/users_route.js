const router = require("express").Router();
const {checkAuth} = require('../middlewares/checkAuth');
const {getUserById, getUserImg, logout} = require("../controllers/users_controller");

router.get('/:id', checkAuth, getUserById);
router.get('/:id/image', checkAuth, getUserImg);
router.get('/logout', logout);

module.exports = router;