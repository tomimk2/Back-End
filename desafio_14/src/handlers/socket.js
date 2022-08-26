const {options} = require("../config/mariaDB");
const knex = require("knex")(options);

const claseContenedor = require('../lib/class_contenedor');
const claseProductos = new claseContenedor(knex);
const claseMensajes = require('../lib/class_mensajes');
const claseChat = new claseMensajes(knex);
let nombre;

const getNombre = (name) => {
    return nombre = name;
};

const socketConfig = async (socket, sockets) => {
    const getProducts = await claseProductos.getAll();
    const getMessages = await claseChat.getAll();

    socket.emit('formProductos');
    socket.emit('mensajes');
    socket.emit('tablaProductos', getProducts);
    socket.emit('chat', getMessages);
    socket.emit('log', nombre);

    socket.on('addProduct', async product => {
        await claseProductos.save(product);
        sockets.emit('tablaProductos', await claseProductos.getAll());
    });

    socket.on('addMsj', async msj => {
        await claseChat.save(msj);
        sockets.emit('chat', await claseChat.getAll());
    });
};

module.exports = {socketConfig, getNombre};