const classP = require("../lib/products_class");
const classProducts = new classP;

const getProducts = async (req, res) => {
    try {
        const all = await classProducts.getAll();
        res.status(200).json({
            "Productos": all
        });
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getProductById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const prod = await classProducts.getById(id);
        
        if (prod.length != 0) {
            res.status(200).json({
                "Producto": prod
            });
        } else {
            res.status(404).json(`No se encontró producto con el id ${id}`);
        };
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const createProduct = async (req, res) => {
    let {nombre, color, talle, imagen, imagenAlt, id_categoria, categoria, precio, stock} = req.body;
    const all = await classProducts.getAll();

    const id = all.length + 1;

    if ((nombre !== undefined) && (color !== undefined) && (talle !== undefined) && (imagen !== undefined) && (imagenAlt !== undefined) && (id_categoria !== undefined) && (categoria !== undefined) && (precio !== undefined) && (stock !== undefined)) {

        const createArray = (string) => {
            let newString = string.replaceAll(", ", ",");
            return newString = newString.split(",");
        };

        color = createArray(color);
        talle = talle.split(", ");
        let talleNumber = talle.map(t => {
            return Number(t);
        });
        imagen = createArray(imagen);
        imagenAlt = createArray(imagenAlt);

        const product = {
            id: id,
            nombre: nombre,
            color: color,
            talle: talleNumber,
            imagen: imagen,
            imagenAlt: imagenAlt,
            id_categoria: Number(id_categoria),
            categoria: categoria,
            precio: Number(precio),
            stock: Number(stock)
        };

        const save = await classProducts.save(product);

        try {
            res.status(200).json({
                "Estado": `Producto con id ${save.id} fue añadido correctamente`,
                "Producto": save
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(206).json("Todos los campos son obligatorios, volvé a intentarlo");
    };    
};

const modifyProduct = async (req, res) => {
    let {nombre, color, talle, imagen, imagenAlt, id_categoria, categoria, precio, stock} = req.body;
    const id = Number(req.params.id);

    const prod = await classProducts.getById(id);

    if (prod != undefined) {

        switch (nombre) {
            case undefined:
                nombre = prod.nombre
                break;
            default:
                break;
        };
    
        switch (color) {
            case undefined:
                color = prod.color
                break;
            default:
                break;
        };
    
        switch (talle) {
            case undefined:
                talle = prod.talle
                break;
            default:
                break;
        };
    
        switch (imagen) {
            case undefined:
                imagen = prod.imagen
                break;
            default:
                break;
        };

        switch (imagenAlt) {
            case undefined:
                imagenAlt = prod.imagenAlt
                break;
            default:
                break;
        };
    
        switch (id_categoria) {
            case undefined:
                id_categoria = prod.id_categoria
                break;
            default:
                id_categoria = Number(id_categoria)
                break;
        };
    
        switch (categoria) {
            case undefined:
                categoria = prod.categoria
                break;
            default:
                break;
        };
    
        switch (precio) {
            case undefined:
                precio = prod.precio
                break;
            default:
                precio = Number(precio)
                break;
        };
    
        switch (stock) {
            case undefined:
                stock = prod.stock
                break;
            default:
                stock = Number(stock)
                break;
        };
    
        const product = {
            id: id,
            nombre: nombre,
            color: color,
            talle: talle,
            imagen: imagen,
            imagenAlt: imagenAlt,
            id_categoria: id_categoria,
            categoria: categoria,
            precio: precio,
            stock: stock,
            habilitado: prod.habilitado
        };
    
        const modify = await classProducts.modify(product);
    
        try {
            res.status(200).json({
                "Estado": `El producto con id ${id} se modificó correctamente`,
                "Producto": modify
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró producto con el id ${id}`);
    }; 
};

const delProduct = async (req, res) => {
    const id = Number(req.params.id);
    const del = await classProducts.deleteById(id);
    console.log(del)

    if (del.modifiedCount != 0) {
        try {
            res.status(200).json({
                "Estado": `Producto con id ${id} eliminado correctamente`
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró producto con el id ${id}`);
    };
};

module.exports = {getProducts, getProductById, createProduct, modifyProduct, delProduct};