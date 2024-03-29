const mongoose = require('mongoose');
const categoriasCollection = 'categorias';

const categoriasSchema = new mongoose.Schema({
    id: {type: Number},
    categoria: {type: String},
    habilitado: {type: Boolean, default: true}
});

const categoriesModel = new mongoose.model(categoriasCollection, categoriasSchema);

module.exports = {categoriesModel};