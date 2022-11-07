const showRegister = (req, res) => {
    res.redirect('/register');
};

const register = (req, res) => {
    const {id, nombre, direccion, telefono, username} = req.session.passport.user;
    res.status(200).json({id, nombre, direccion, telefono, "avatar": req.file.path, username});
};

module.exports = {
    showRegister,
    register
};