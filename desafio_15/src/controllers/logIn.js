const path = require('path');

const getLogIn = (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/logIn.html"));
};

const logIn = (req, res) => {
    res.status(200).redirect('/');
};

const logOut = (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/');
};

const logError = (req, res) => {
    res.status(401).sendFile(path.join(process.cwd(), "/public/logInError.html"));
};

module.exports = {getLogIn, logIn, logOut, logError};