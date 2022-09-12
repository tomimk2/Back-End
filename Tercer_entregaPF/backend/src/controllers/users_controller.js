const classU = require("../lib/users_class");
const classUsers = new classU;
const path = require('path');
const {log4js} = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const getUserById = async (req, res) => {
    const {id} = req.session.passport.user;

    try {
        const user = await classUsers.getById(id);
        if (user.length != 0) {
            res.status(200).json(user);
        } else {
            loggerWarning.error(`No se encontró usuario con el id ${id}`);
            res.status(404).json(`No se encontró usuario con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener el usuario con id ${id}: ${error}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getUserImg = (req, res) => {
    const {avatar} = req.session.passport.user;
    res.status(200).sendFile(path.join(process.cwd(),`/${avatar}`));
};

const logout = (req, res) => {
    req.session.destroy( error => {
        if(error) {
            loggerError.error(`Ocurrió un error al intentar cerrar la sesión del usuario: ${error}`);
            return res.status(400).json({
                "Ocurrió un error": error
            });
        };
        res.redirect('/')
    })
};


module.exports = {
    getUserById,
    getUserImg,
    logout
};