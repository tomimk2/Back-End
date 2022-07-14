const classC = require("../lib/carts_class");
const classCarts = new classC;
const classP = require("../lib/products_class");
const classProducts = new classP;
const uuid = require("uuid");

const createCart = async (req, res) => {
    const {comprador, productos} = req.body;
    let products = [];
    let finalPrice = 0;

    productos.map(p => {
        let obj = {
            id_producto: p.id_producto,
            nombre: p.nombre,
            color: p.color,
            talle: p.talle,
            precio: p.precio,
            cantidad: p.cantidad,
            precioTotal: p.precio * p.cantidad
        };
        products.push(obj);
        finalPrice += obj.precioTotal;
    });

    const carrito = {
        id: uuid.v4(),
        comprador: {
            id_comprador: comprador.id_comprador,
            nombre: comprador.nombre,
            email: comprador.email,
            usuario: comprador.usuario,
            password: comprador.password,
            telefono: comprador.telefono
        },
        productos: products,
        precioFinal: finalPrice
    };
    
    try {
        const result = await classCarts.createCart(carrito);
        res.status(200).json({
            "Estado": `El carrito con id ${carrito.id} fue creado correctamente`,
            "Carrito": result
        });
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const delCart = async (req, res) => {
    const {id} = req.params;
    const del = await classCarts.deleteById(id);

    if (del != undefined) {
        try {
            res.status(200).json({
                "Estado": `Carrito con id ${id} eliminado correctamente`,
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró el carrito con el id ${id}`);
    };
};

const getProductsByCartId = async (req, res) => {
    const {id} = req.params;

    const products = await classCarts.getProducts(id);

    if (products != undefined) {
        try {
            res.status(200).json({
                "Productos": products
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró el carrito con id ${id}`);
    };
};

const addProductByCartId = async (req, res) => {
    const {id_prod} = req.body;
    const idCart = req.params.id;
    
    const exists = await classCarts.getById(idCart);

    if (exists != undefined) {
        let product = await classProducts.getById(id_prod);

        if (product != undefined) {
            const {nombre, color, talle, precio, precioTotal} = product;

            const selectVariable = (variable) => {
                let i = Math.floor(Math.random() * variable.length);
                return variable[i]
            };

            product = {
                id_producto: id_prod,
                nombre: nombre,
                color: selectVariable(color),
                talle: selectVariable(talle),
                precio: precio,
                cantidad: Math.floor(Math.random() * 10) + 1,
                precioTotal: precioTotal
            };
            
            const add = await classCarts.addProducts(idCart, product);
    
            if (add != undefined) {
                try {
                    res.status(200).json({
                        "Estado": `Producto con id ${id_prod} añadido correctamente al carrito`,
                        "Carrito": add
                    });
                } catch (error) {
                    res.status(500).json({
                        "Ocurrió un error": error
                    });
                };
            };
        } else {
            res.status(404).json(`No se encontró el producto con id ${id_prod}`);
        };
    } else {
        res.status(404).json(`No se encontró el carrito con id ${idCart}`);
    };
};

const delProductByCartId = async (req, res) => {
    const {id_prod, id} = req.params;
    const del = await classCarts.deleteProductByCartId(id, id_prod);

    if (del !== "empty") {
        if (del != undefined) {
            try {
                res.status(200).json({
                    "Estado": `Producto con id ${id_prod} eliminado correctamente del carrito`,
                    "Carrito": del
                });
            } catch (error) {
                res.status(500).json({
                    "Ocurrió un error": error
                });
            };
        } else {
            res.status(404).json(`No se encontró producto con el id ${id_prod} en el carrito`);
        };
    } else {
        res.status(404).json(`No se encontró carrito con el id ${id}`);
    };
};

module.exports = {createCart, delCart, getProductsByCartId, addProductByCartId, delProductByCartId};