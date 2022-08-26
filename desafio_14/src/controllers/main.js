const path = require('path');
const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');

const home = (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/main.html"));
    } catch (error) {
        loggerError.error(`Ocurrió un error: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
    
};

module.exports = {home}