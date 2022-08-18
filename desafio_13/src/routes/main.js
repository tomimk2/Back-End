const {home} = require('../controllers/main');
const { checkAuth } = require('../middlewares/checkAuth');
const router = require('express').Router();


router.get('/', checkAuth, home);

module.exports = router;