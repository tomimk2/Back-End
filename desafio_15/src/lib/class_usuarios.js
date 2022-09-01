const {usuariosModel} = require('../models/usuarios');

class Usuarios {

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

    async getUser(username) {
        try {
            const user = await this.model.find({"username": username});
            return user[0];
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        }
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async register (usuario) {
        try {
            const uSearch = await this.model.find({"username": usuario.username});
            if (uSearch.length === 0) {
                let id = await this.getAll();
                usuario.id = Number(id.length + 1);
                const user = new this.model(usuario);
                return await user.save();
            } else {
                return undefined;
            };
            
        } catch (error) {
            console.log("Ocurrió un error al intentar crear el usuario en la base de datos, volvé a intentarlo", error);
        };
    };
};

module.exports = Usuarios;