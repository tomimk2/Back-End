const { usuariosModel } = require("../model/users_model");

class Users {

    constructor() {
        this.model = usuariosModel;
    };

    async getById(id) {
        try {
            const user = await this.model.find({"id": id});
            return user[0];
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async getByUsername(username) {
        try {
            const user = await this.model.find({"username": username});
            return user[0];
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

    async register (usuario) {
        const userSearch = await this.model.find({"username": usuario.username});
        const all = await this.model.find();
        try {
            if (userSearch.length === 0) {
                usuario.id = all.length + 1;
                const user = new this.model(usuario)
                return await user.save();
            } else {
                return undefined;
            };  
        } catch (error) {
            console.log("Ocurrió un error al intentar crear al usuario en la base de datos, volvé a intentarlo", error);
        };
    };

    async modify(obj) {    
        await this.model.updateOne({"id": obj.id}, {$set: obj});
        try {
            const user = await this.model.find({"id": obj.id});
            return user[0];      
        } catch (error) {
            console.log("Ocurrió un error al intentar modificar el usuario en la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}}); 
        } catch (error) {
            console.log("Ocurrió un error al intentar eliminar al usuario de la base de datos, volvé a intentarlo", error);
        };
    };
};

module.exports = Users;