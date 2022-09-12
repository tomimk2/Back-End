const mongoose = require('mongoose');
const carritoCollection = 'carrito';

const carritoSchema = new mongoose.Schema({
    id: {type: String},
    comprador:{
        id_comprador: Number,
        nombre: String,
        direccion: String,
        telefono: String,
        avatar: String,
        username: String,
        password: String
    },
    productos: [
        {
            id_producto: Number,
            nombre: String,
            color: String,
            talle: Number,
            precio: Number,
            cantidad: Number,
            precioTotal: Number
        }
    ],
    precioFinal: {type: Number},
    fecha: {type: String, default: new Date().toLocaleString()},
    habilitado: {type: Boolean, default: true}
});

const carritoModel = new mongoose.model(carritoCollection, carritoSchema);

module.exports = {carritoModel};