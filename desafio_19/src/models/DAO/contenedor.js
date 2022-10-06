const {contenedorDTO} = require('../DTO/contenedor');
const {log4js} = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

class Contenedor {

    constructor(knex) {
        this.knex = knex;
        this.table = 'productos'
    };

    async getById(id) {
        try {
            return await this.knex(this.table).where("id", "=", id);
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async getAll() {
        const prodExists = await this.knex.schema.hasTable(this.table);
        if (!prodExists) {
            await this.knex.schema.createTable(this.table, table => contenedorDTO(table));
        };

        try {
            let prod = await this.knex(this.table).select('*');
            if (prod.length != 0) {
                return prod;
            } else {
                return prod = []
            }
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async save (producto) {
        try {
            const id = await this.knex(this.table).insert(producto);
            const newProd = await this.getById(id[0]);
            return newProd[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar almacenar el producto en la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async modify(id, obj) {    
        try {
            const result = await this.knex(this.table).where("id", "=", id).update(obj);

            if (result > 0) {
                const modify = await this.getById(id);
                return modify[0];
            }            
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar modificar el producto en la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async deleteById(id) {
        try {
            const product = await this.getById(id);
            await this.knex(this.table).where("id", "=", id).del();
            return product;
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar el producto de la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async deleteAll() {
        try {
            await this.knex(this.table).select("*").del();
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar todos los productos de la base de datos, volvé a intentarlo: ${error}`);
        };
    };
};

module.exports = Contenedor;