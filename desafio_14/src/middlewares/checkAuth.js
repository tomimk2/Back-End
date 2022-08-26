const { getNombre } = require("../handlers/socket");

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        getNombre(req.session.passport.user);
        return next();
    }
    res.redirect('/log/in');
};

module.exports = {checkAuth};