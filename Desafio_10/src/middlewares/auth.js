const path = require('path')
const {getNombre} = require('../handlers/socket');

const auth = (req, res, next) => {
    if (req.session?.nombre !== undefined) {
        getNombre(req.session.nombre);
        next();
    } else {
        res.sendFile(path.join(process.cwd(), "/public/logIn.html"));
    };
};

module.exports = {auth};