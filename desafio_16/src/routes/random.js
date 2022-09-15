const router = require('express').Router();
const {random} = require('../controllers/random');


router.get('/', random);

module.exports = router;