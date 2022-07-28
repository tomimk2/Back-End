const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

const {socketConfig} = require('./src/handlers/socket');
const router = require('./src/routes/main');
const logIn = require('./src/routes/logIn');
const {auth} = require('./src/middlewares/auth');

io.on('connection', async socket => {
    socketConfig(socket, io.sockets);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://macaromero:msm8BYiXaNCnTmJJ@cluster0.qa52w3x.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl: 60,
        collectionName: 'sessions'
    }),
    secret: "clavesecreta",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge:60000
    }
}));

app.use('/log', logIn)
app.use('/', auth, router);


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});