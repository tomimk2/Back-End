const {carritoModel} = require('../model/cart_model');

class Carts {

    constructor() {
        this.model = carritoModel;
    };

    async getById(id) {
        try {
            const product = await this.model.find({"id": id});
            return product[0];
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo", error);
        };
    };

    async createCart(carrito) {

        try {
            const cart = new this.model(carrito)
            return await cart.save();
        } catch (error) {
            console.log("Ocurrió un error al intentar almacenar el carrito en la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}});
        } catch (error) {
            console.log("Ocurrió un error al intentar eliminar el carrito de la base de datos, volvé a intentarlo", error);
        };
    };

    async getCarts(id) {
        const carts = await this.model.find({"comprador.id_comprador": id});
        
        try {
            if (carts != undefined) {
                let carrito = [];
                carts.map(c => {
                    carrito.push({"id": c.id, "productos": c.productos, "precioFinal": c.precioFinal, "fecha": c.fecha})
                })
                return carrito;
            } else {
                return undefined;
            };  

        } catch (error) {
            console.log("Ocurrió un error al realizar la búsqueda en la base de datos", error);
        };
    };
    
    async addProducts(id_cart, product) {
        try {
            const cart = await this.getById(id_cart);
        
            if (cart != undefined) {
                let price = product.cantidad * product.precio;
                product.precioTotal = price;
                cart.precioFinal += price;
                cart.productos.push(product);
                await this.model.updateMany({"id": id_cart}, {$set: {"productos": cart.productos, "precioFinal": price + cart.precioFinal}});
                return cart;
            } else {
                return undefined;
            };  

        } catch (error) {
            console.log("Ocurrió un error al intentar agregar el producto a la base de datos, volvé a intentarlo", error);
        };
    };

    async deleteProductByCartId(id_cart, id_prod) {
        const cart = await this.getById(id_cart);

        if (cart != undefined) {
            const prod = cart.productos.find(p => p.id_producto == id_prod);

            if (prod != undefined) {
                try {
                    return await this.model.updateOne({"id": id_cart}, {$pullAll: {"productos": [prod]}});
                } catch (error) {
                    console.log("Ocurrió un error al eliminar el producto de la base de datos, volvé a intentarlo", error);
                };
            } else {
                return undefined;
            };
        } else {
            return "empty";
        };
    };
};

module.exports = Carts;