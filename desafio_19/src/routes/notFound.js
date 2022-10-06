const {notFound} = require('../controllers/notFound');
const router = require('express').Router();


router.get('/', notFound);

module.exports = router;