import express from "express";
import routerProducts from './routes/routerProducts.js';
import routerCart from './routes/routerCart.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);
app.get('*', (req, res) => res.send({ message: 'PAGE NOT FOUND' }));

const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
server.on('error', err => console.log(err));