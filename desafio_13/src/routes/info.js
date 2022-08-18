const router = require('express').Router();
const {info} = require('../controllers/info');


router.get('/', info);

module.exports = router;