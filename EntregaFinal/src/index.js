const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const {mongoConnection} = require('./config/mongoDB');
require('dotenv').config();
require('./middlewares/auth');
const {log4js} = require('./middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');
const products = require('./routes/products');
const register = require('./routes/register');
const login = require('./routes/login');
const users = require('./routes/users');
const cart = require('./routes/cart');
const categories = require('./routes/categories');
const notFound = require('./routes/main');


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: process.env.SESSION_RESAVE,
    saveUninitialized: process.env.SESSION_SAVEUNINITIALIZED,
    cookie: {
        maxAge:60000
    }
}));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/products", products);
app.use("/register", register);
app.use("/login", login);
app.use("/user", users);
app.use("/cart", cart);
app.use("/categories", categories);
app.use("/*", notFound);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnection();
    try {
        logger.info(`Server running on PORT:${PORT}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
    };  
});