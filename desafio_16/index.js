require('dotenv').config();
const express = require('express');
const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const session = require('express-session');
const passport = require('passport');
const { mongoConnection } = require('./src/config/mongodb');
const compression = require('compression');
require('./src/middlewares/auth');
const {socketConfig} = require('./src/handlers/socket');
const router = require('./src/routes/main');
const logIn = require('./src/routes/logIn');
const register = require('./src/routes/register');
const info = require('./src/routes/info');
const random = require('./src/routes/random');
const notFound = require('./src/routes/notFound');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(compression());


app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge:60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

io.on('connection', async socket => {
    socketConfig(socket, io.sockets);
});


app.use('/log', logIn);
app.use('/register', register);
app.use('/info', info);
app.use('/randoms', random);
app.use('/', router);
app.use('/*', notFound);


server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await mongoConnection();
});