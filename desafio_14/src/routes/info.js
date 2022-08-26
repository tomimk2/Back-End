const router = require('express').Router();
const {info, infoConsole} = require('../controllers/info');


router.get('/', info);
router.get('/console', infoConsole);

module.exports = router;