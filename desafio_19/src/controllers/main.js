const {options} = require("../config/mariaDB");
const knex = require("knex")(options);

const claseContenedor = require('../models/DAO/contenedor');
const claseProductos = new claseContenedor(knex);

const getAll = async () => {
    try {
        return await claseProductos.getAll();
    } catch (error) {
        return error
    };
};

const getById = async ({id}) => {
    try {
        const getById = await claseProductos.getById(id);
        return getById[0];
    } catch (error) {
        return error
    };
};

const add = async ({datos}) => {
    try {
        const newProd = await claseProductos.save(datos);
        return newProd;
    } catch (error) {
        return error
    };
};

const modify = async ({id, datos}) => {
    try {
        const modifyProducts = await claseProductos.modify(id, datos);
        return modifyProducts;
    } catch (error) {
        return error
    };
};

const deleteById = async ({id}) => {
    try {
        const deleteProduct = await claseProductos.deleteById(id);        
        return deleteProduct[0];
    } catch (error) {
        return error
    };
};


module.exports = { 
    getAll,
    getById,
    add,
    modify,
    deleteById
};