const express = require("express");
const router = require('./routes/products.js');

const PORT = 8080;
const app = express;
const server = app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api' , routerProducts);
