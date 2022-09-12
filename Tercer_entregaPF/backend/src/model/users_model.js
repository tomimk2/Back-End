const mongoose = require('mongoose');
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    id: {type: Number},
    nombre: {type: String},
    direccion: {type: String},
    telefono: {type: String},
    avatar: {type: String},
    username: {type: String},
    password: {type: String},
});

const usuariosModel = new mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {usuariosModel};