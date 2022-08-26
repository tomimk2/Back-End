const path = require('path');
const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();

const getRegister = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/register.html"));
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
    
};

const postRegister = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
       res.status(200).redirect('/log/in');  
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
};

const registerError = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/registerError.html"));
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };  
};

module.exports = {getRegister, postRegister, registerError};