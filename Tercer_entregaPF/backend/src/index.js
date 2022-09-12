require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
require('./middlewares/auth');
const {log4js} = require('./middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');
const productsRoute = require('./routes/products_route');
const registerRoute = require('./routes/register_route');
const loginRoute = require('./routes/login_route');
const usersRoute = require('./routes/users_route');
const cartRoute = require('./routes/cart_route');
const categoriesRoute = require('./routes/categories_route');
const notFoundRoute = require('./routes/main');

const {mongoConnection} = require('./config/mongoDB');

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

app.use("/products", productsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", usersRoute);
app.use("/cart", cartRoute);
app.use("/categories", categoriesRoute);
app.use("/*", notFoundRoute);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnection();
    try {
        logger.info(`Servidor corriendo en puerto ${PORT}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
    };  
});