const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Container = require('./container.js');
const { optionsMariaDB, optionsSQLite3 } = require('./options/config.js');

const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const products = new Container(optionsSQLite3, 'products');
const messages = new Container(optionsMariaDB, 'messages');

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    const dbProducts = await products.getAll();
    res.render('form', { dbProducts });
});

io.on('connection', socket => {
    console.log('Conexión establecida');
    products.getAll().then(dbProducts => io.sockets.emit('products', dbProducts));
    messages.getAll().then(dbMessages => io.sockets.emit('messages', dbMessages));
    socket.on('product', product => {
        products.save(product);
        products.getAll().then(dbProducts => io.sockets.emit('products', dbProducts));
    })
    socket.on('message', message => {
        messages.save(message);
        messages.getAll().then(dbMessages => io.sockets.emit('messages', dbMessages));
    })
});

const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));