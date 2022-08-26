const path = require('path');
const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();

const getLogIn = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/logIn.html"));
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
    
};

const logIn = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
};

const logOut = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        req.session.destroy();
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
};

const logError = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/logInError.html"));
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    }; 
};

module.exports = {getLogIn, logIn, logOut, logError};