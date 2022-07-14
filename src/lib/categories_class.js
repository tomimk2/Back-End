const {categoriasModel} = require('../model/categories_model');

class Categories {

    constructor() {
        this.model = categoriasModel;
    };

    async getById(id) {
        try {
            const cat = await this.model.findAll({where: {"id": id}});
            return cat[0];
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async getAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async save (categoria) {
        try {
            return await this.model.create(categoria);
        } catch (error) {
            console.log("Ocurrió un error al intentar almacenar la categoría en la base de datos, volvé a intentarlo", error);
        };
    };

    async modify(cat, id) {    
        await this.model.update({"categoria": cat}, {where: {"id": id}});
        try {
            return await this.model.findAll({where: {"id": id}});   
        } catch (error) {
            console.log("Ocurrió un error al intentar modificar la categoría en la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.update({"habilitado": false}, {where: {"id": id}});
        } catch (error) {
            console.log("Ocurrió un error al intentar eliminar la categoría de la base de datos, volvé a intentarlo", error);
        };
    };
};

module.exports = Categories;