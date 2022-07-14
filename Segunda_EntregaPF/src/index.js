const express = require('express');
const app = express();
const PORT = 8080;
const productsRoute = require('./routes/products_route');
const cartRoute = require('./routes/cart_route');
const categoriesRoute = require('./routes/categories_route');
const notFoundRoute = require('./routes/main');

const {mongoConnection, mysqlConnection} = require('./model/db_connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productsRoute);
app.use("/api/carrito", cartRoute);
app.use("/api/categorias", categoriesRoute);
app.use("/*", notFoundRoute);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnection();
    await mysqlConnection();
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("Ocurrió un error al intentar conectarse al servidor", error);
    };  
});