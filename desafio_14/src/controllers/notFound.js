const path = require('path');
const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const loggerWarn = log4js.getLogger('warn');

const notFound = (req, res) => {
    logger.warn(`Ruta: ${req.originalUrl} - Método: ${req.method}`);
    loggerWarn.warn(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).sendFile(path.join(process.cwd(), "/public/notFound.html"));
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
    
};

module.exports = {notFound}