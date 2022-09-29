const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8080';
const {log4js} = require('./src/middlewares/logger');
const logger = log4js.getLogger();
const { newProduct } = require('./test/productGenerator/newProduct');


const getAll = () => {
    axios.get('/')
        .then(response => logger.info(response.data))
        .catch(error => logger.error(`Ocurrió un error al buscar todos los productos en la base de datos: ${error}`));
};

const getById = () => {
    const id = 7;

    axios.get(`/${id}`)
        .then(response => logger.info(response.data))
        .catch(error => logger.error(`Ocurrió un error al buscar el producto en la base de datos: ${error}`));
};

const add = () => {
    const product = newProduct();

    axios.post('/add', product)
    .then(response => logger.info(response.data))
    .catch(error => logger.error(`Ocurrió un error al añadir un nuevo producto: ${error}`));
};

const modify = () => {
    const product = newProduct();
    const id = 14;

    axios.put(`/modify/${id}`, product)
    .then(response => logger.info(response.data))
    .catch(error => logger.error(`Ocurrió un error al modificar el producto con id ${id}: ${error}`));
};

const del = () => {
    const id = 26;

    axios.delete(`/${id}`)
    .then(response => logger.info(response.data))
    .catch(error => logger.error(`Ocurrió un error al eliminar el producto con id ${id}: ${error}`));
};

// getAll()
// getById()
// add()
// modify()
// del()