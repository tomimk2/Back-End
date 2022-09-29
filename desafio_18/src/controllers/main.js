const {options} = require("../config/mariaDB");
const knex = require("knex")(options);

const claseContenedor = require('../models/DAO/contenedor');
const claseProductos = new claseContenedor(knex);

const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');

const getAll = async (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);

    try {
        const getProducts = await claseProductos.getAll();
        res.status(200).json(getProducts);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener todos los productos de la base de datos: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).json(`Ocurrió un error al intentar obtener todos los productos de la base de datos: ${error}`);
    };
};

const getById = async (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);
    const {id} = req.params;

    try {
        const getById = await claseProductos.getById(id);

        if (getById.length !== 0) {
            res.status(200).json(getById[0]);
        } else {
            res.status(404).json(`No se encontró el producto con id: ${id}`);
        }
        
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener el producto de la base de datos: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).json(`Ocurrió un error al intentar obtener el producto de la base de datos: ${error}`);
    };
};

const add = async (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);
    const producto = req.body;

    try {
        const addProducts = await claseProductos.save(producto);
        res.status(200).json(`Se agregó el producto con id: ${addProducts}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar agregar el producto a la base de datos: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).json(`Ocurrió un error al intentar agregar el producto a la base de datos: ${error}`);
    };
};

const modify = async (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);
    const producto = req.body;
    const {id} = req.params;

    try {
        const modifyProducts = await claseProductos.modify(producto, Number(id));

        if (modifyProducts > 0) {
            res.status(200).json(`Se modificó el producto con id: ${id}`);
        } else {
            res.status(404).json(`No se encontró el producto con id: ${id}`);
        }    
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar modificar el producto en la base de datos: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).json(`Ocurrió un error al intentar modificar el producto en la base de datos: ${error}`);
    };
};

const deleteById = async (req, res) => {
    logger.info(`Ruta: ${req.url} - Método: ${req.method}`);
    const {id} = req.params;

    try {
        const deleteProduct = await claseProductos.deleteById(id);
        
        if (deleteProduct != 0) {
            res.status(200).json(`Se eliminó el producto con id: ${id}`);
        } else {
            res.status(404).json(`No se encontró el producto con id: ${id}`);
        }        
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar eliminar el producto de la base de datos: ${error}`);
        logger.error(`Ruta: ${req.url} - Método: ${req.method}`);
        res.status(500).json(`Ocurrió un error al intentar eliminar el producto de la base de datos: ${error}`);
    };
};


module.exports = { 
    getAll,
    getById,
    add,
    modify,
    deleteById
};