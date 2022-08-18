const path = require('path');

const getRegister = (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "/public/register.html"));
};

const postRegister = (req, res) => {
    res.status(200).redirect('/log/in');  
};

const registerError = (req, res) => {
    res.status(500).sendFile(path.join(process.cwd(), "/public/registerError.html"));
};

module.exports = {getRegister, postRegister, registerError};