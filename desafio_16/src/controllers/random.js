const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const {createNums} = require('../sevices/random');

const random = (req, res) => {
    logger.info(`Ruta: /randoms${req.url} - Método: ${req.method}`);

    const {cant} = req.query;

    try {
        const numbers = createNums(cant);

        res.status(200).json({"Números": numbers})
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };    
};

module.exports = {random}