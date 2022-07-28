const {home} = require('../controllers/main');
const router = require('express').Router();


router.get('/', home);

module.exports = router;