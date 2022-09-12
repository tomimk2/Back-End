const {log4js} = require('../middlewares/logger');
const loggerWarning = log4js.getLogger('warn');

const notFound = (req, res) => {
    const path = req.baseUrl;
    const method = req.method;
    
    loggerWarning.error(`No se encontró la ruta ${path}`);
    res.status(404).json({
        "error": "404 - Not found",
        "descripción": `Ruta '${path}' método '${method}' no implementada`
    });
};

module.exports = notFound;