const {productosModel} = require('../model/products_model');

class Products {

    constructor() {
        this.model = productosModel;
    };

    async getById(id) {
        try {
            const product = await this.model.find({"id": id});
            return product[0];
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

    async save (producto) {
        try {
            const prod = new this.model(producto)
            return await prod.save();
        } catch (error) {
            console.log("Ocurrió un error al intentar almacenar el producto en la base de datos, volvé a intentarlo", error);
        };
    };

    async modify(obj) {    
        await this.model.updateOne({"id": obj.id}, {$set: obj});
        try {
            const product = await this.model.find({"id": obj.id});
            return product[0];      
        } catch (error) {
            console.log("Ocurrió un error al intentar modificar el producto en la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}});
        } catch (error) {
            console.log("Ocurrió un error al intentar eliminar el producto de la base de datos, volvé a intentarlo", error);
        };
    };
};

module.exports = Products;