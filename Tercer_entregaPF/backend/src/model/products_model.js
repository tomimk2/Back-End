const mongoose = require('mongoose');
const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    id: {type: Number},
    nombre: {type: String},
    color: {type: Array, of: String},
    talle: {type: Array, of: Number},
    imagen: {type: Array, of: String},
    imagenAlt: {type: Array, of: String},
    id_categoria: {type: Number},
    categoria: {type: String},
    precio: {type: Number},
    stock: {type: Number},
    fecha: {type: String, default: new Date().toLocaleString()},
    habilitado: {type: Boolean, default: true}
});

const productosModel = new mongoose.model(productosCollection, productosSchema);

module.exports = {productosModel};