const showLogin = (req, res) => {
    res.status(200).redirect('/login');
};

const login = (req, res) => {
    const {username, password} = req.body;
    const {id} = req.session.passport.user;
    res.status(200).json({id, username, password});
};

const loginError = (req, res) => {
    res.status(401).redirect('/login');
}

module.exports = {
    showLogin,
    login,
    loginError
};