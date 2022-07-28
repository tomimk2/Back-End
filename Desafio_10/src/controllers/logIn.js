const logIn = (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/');
}

const logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {logIn, logOut}