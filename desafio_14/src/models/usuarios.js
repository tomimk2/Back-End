const mongoose = require('mongoose');
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

const usuariosModel = new mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {usuariosModel};