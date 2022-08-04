const router = require('express').Router();
const passport = require('passport');
const {getLogIn, logIn, logOut, logError} = require('../controllers/logIn');

router.get('/in', getLogIn);
router.post('/in', passport.authenticate('login', {failureRedirect:'/log/error'}), logIn);
router.post('/out', logOut);
router.get('/error', logError);

module.exports = router;