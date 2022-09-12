const classP = require("../lib/products_class");
const classProducts = new classP;
const {log4js} = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');

const getProducts = async (req, res) => {
    try {
        const all = await classProducts.getAll();
        res.status(200).json(all);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener los productos: ${error}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getProductById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const prod = await classProducts.getById(id);
        
        if (prod.length != 0) {
            res.status(200).json(prod);
        } else {
            loggerWarning.error(`No se encontró producto con el id ${id}`);
            res.status(404).json(`No se encontró producto con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener el producto con id ${id}: ${error}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};


module.exports = {
    getProducts,
    getProductById
};