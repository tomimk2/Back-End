const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const session = require('express-session');
const passport = require('passport');
require('./src/middlewares/auth');
const {socketConfig} = require('./src/handlers/socket');
const router = require('./src/routes/main');
const logIn = require('./src/routes/logIn');
const register = require('./src/routes/register');
const { mongoConnection } = require('./src/config/mongodb');

io.on('connection', async socket => {
    socketConfig(socket, io.sockets);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


app.use(session({
    secret: "clavesecreta",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge:60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/log', logIn);
app.use('/register', register);
app.use('/', router);


server.listen(PORT, async () => {
    await mongoConnection();
    console.log(`Server running on port ${PORT}`);
});