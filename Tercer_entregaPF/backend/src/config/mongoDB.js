const mongoose = require('mongoose');
const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');

const mongoConnection = async () => {
    const CS = 'mongodb+srv://tomimk2:alvarito1@cluster0.p70mk.mongodb.net/?retryWrites=true&w=majority';
    try {
        await mongoose.connect(CS, {serverSelectionTimeoutMS: 10000});
        logger.info("Conexión a base de datos mongodb establecida");
    } catch (error) {
        loggerError.error(`Ocurrió un error al conectarse a la base de datos de mongodb: ${error}`);
    };
};

module.exports = { mongoConnection };
