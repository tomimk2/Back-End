const router = require("express").Router();
const passport = require('passport');
const fileUpload = require('../config/multer');
const {showRegister, register} = require("../controllers/RegisterController");

router.get('/', showRegister);
router.post('/', fileUpload.single('avatar'), passport.authenticate('register'), register);


module.exports = router;