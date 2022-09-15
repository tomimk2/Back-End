const router = require('express').Router();
const passport = require('passport');
const {getRegister, postRegister, registerError} = require('../controllers/register');

router.get('/', getRegister);
router.post('/', passport.authenticate('register', {failureRedirect:'/register/error'}), postRegister);
router.get('/error', registerError)

module.exports = router;