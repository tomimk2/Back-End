const router = require("express").Router();
const passport = require('passport');
const {showLogin, login, loginError} = require("../controllers/LoginController");

router.get('/', showLogin);
router.get('/error', loginError);
router.post('/', passport.authenticate('login', {failureRedirect:'login/error'}), login);

module.exports = router;