require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
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
const info = require('./src/routes/info');
const random = require('./src/routes/random')
const { mongoConnection } = require('./src/config/mongodb');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: process.env.SESSION_RESAVE,
    saveUninitialized: process.env.SESSION_SAVEUNINITIALIZED,
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
app.use('/api/randoms', random)
app.use('/', router);


server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await mongoConnection();
});