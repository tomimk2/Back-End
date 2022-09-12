const classC = require("../lib/categories_class");
const classCategories = new classC;
const {log4js} = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const getCategories = async (req, res) => {
    try {
        const all = await classCategories.getAll();
        res.status(200).json(all);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener las categorías: ${error}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getCategoryById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const cat = await classCategories.getById(id);
        
        if (cat.length != 0) {
            res.status(200).json(cat);
        } else {
            loggerWarning.error(`No se encontró categoría con id ${id}`);
            res.status(404).json(`No se encontró categoría con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener la categoría: ${err}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};


module.exports = {
    getCategories,
    getCategoryById
};