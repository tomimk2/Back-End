const { categoriasModel } = require("../model/categories_model");

class Categories {

    constructor() {
        this.model = categoriasModel;
    };

    async getById(id) {
        try {
            const category = await this.model.find({"id": id});
            return category[0];
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async save (categoria) {
        let id = await this.getAll();
        try {
            categoria.id = Number(id.length + 1);
            const cat = new this.model(categoria);
            return await cat.save();
        } catch (error) {
            console.log("Ocurrió un error al intentar almacenar la categoría en la base de datos, volvé a intentarlo", error);
        };
    };

    async modify(cat, id) {
        await this.model.updateOne({"id": id}, {$set: {"categoria": cat}});
        try {
            return this.getById(id);   
        } catch (error) {
            console.log("Ocurrió un error al intentar modificar la categoría en la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}}); 
        } catch (error) {
            console.log("Ocurrió un error al intentar eliminar la categoría de la base de datos, volvé a intentarlo", error);
        };
    };
};

module.exports = Categories;