const router = require('express').Router();
const Product = require('../ProductClass.js');

router.get('/products', (req,res)=>{

    res.send(Product.products)
});

router.get('/products/:id' , (req,res)=>{
    let product = Product.products.find(product = product.id === Number(req.params.id));

    if(product){
        res.send(product);
    }
    else {
        res.status(404).send({error: 'Product not find'})
    }

});

router.post('/products', (req, res) => {
    let { title, price, thumbnail } = req.body;
    const product = { title, price, thumbnail };
    product.id = Product.products.length + 1;
    Product.products.push(product);
    res.send(Product.products);
});

router.put('/products/:id', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let index = Product.products.findIndex(product => product.id === Number(req.params.id));
    if (index >= 0) {
        Product.products[index] = { title, price, thumbnail };
        Product.products[index].id = Number(req.params.id);
        res.send(Product.products[index]);
    } else {
        res.status(404).send({ error: 'Product not find' });
    }
});

router.delete('/products/:id', (req, res) => {
    let index = Product.products.findIndex(product => product.id === Number(req.params.id));
    if (index >= 0) {
        Product.products.splice(index, 1);
        res.send({ message: 'Removed Product' });
    } else {
        res.status(404).send({ error: 'Product not find' });
    }
})

module.exports = router;