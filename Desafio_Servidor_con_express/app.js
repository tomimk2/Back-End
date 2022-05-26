const Contenedor = require ('../desafio/index.js');
const express = require('express');

const PORT = 8080;
const app = express();

const server = app.listen(process.env.PORT || PORT, ()=> console.log(`listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

const productos = new Contenedor ('productos.txt');

app.get('/productos', async (req, res)=> {
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos);
})

app.get('/productoRandom', async (req,res) =>{
    const producto = await productos.getAll();
    const producRandom = Math.floor(Math.random() * producto.length);
    res.send(producto[producRandom]);
})