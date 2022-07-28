const {logIn, logOut} = require('../controllers/logIn');
const router = require('express').Router()

router.post('/in', logIn);
router.post('/out', logOut);

module.exports = router;