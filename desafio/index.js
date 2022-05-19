const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    static productos = [];
    async save(obj) {
        try {
            obj.id = Contenedor.objetos.length + 1;
            Contenedor.objetos.push(obj);
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(Contenedor.objetos, null, 2)
            );
            console.log('Id del producto: ', obj.id);
        } catch (err) {
            console.log(`Ocurrió un error ${err.message}`);
        }
    }
    async getByID(id) {
        try {
            const productos = await fs.promises.readFile(
                this.fileName,
                'utf-8'
            );
            const prods = JSON.parse(productos);
            const obj = prods.find(o => o.id === id);
            obj ? console.log('Producto: ', obj) : console.log(null);
        } catch (err) {
            console.log(`Ocurrió un error ${err.message}`);
        }
    }
    async getAll() {
        try {
            const productos = await fs.promises.readFile(this.fileName, 'utf-8');
            const arrProductos = JSON.parse(productos);
            console.log('Productos: ', arrProductos);
        } catch (err) {
            console.log(`Ocurrió un error ${err.message}`);
        }
    }
    async deleteByID(id) {
        try {
            const productos = await fs.promises.readFile(this.fileName, 'utf-8');
            const arrProductos = JSON.parse(productos);
            const obj = arrProductos.find(o => o.id === id);
            const newArr = arrProductos.filter(o => o.id != obj.id);
            Contenedor.objetos = newArr;
            await fs.promises.writeFile(this.fileName, JSON.stringify(newArr, null, 2));
            console.log(`Producto ${obj.title} eliminado`);
        } catch (err) {
            console.log(`Ocurrió un error ${err.message}`);
        }
    }
    async deleteAll() {
        try {
            Contenedor.objetos = [];
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(Contenedor.objetos, null, 2)
            );
        } catch (err) {
            console.log(`Ocurrió un error ${err.message}`);
        }
    }
}

const productos = new Contenedor('productos.txt');

productos.save({
    title: 'producto1',
    price: 100,
    thumbnail: 'url de la foto del producto1',
});

productos.save({
    title: 'producto2',
    price: 200,
    thumbnail: 'url de la foto del producto2',
});

productos.save({
    title: 'nombre del producto3',
    price: 300,
    thumbnail: 'url de la foto del producto3',
});

productos.save({
    title: 'nombre del producto4',
    price: 400,
    thumbnail: 'url de la foto del producto4',
});

productos.getAll();

productos.deleteAll();

productos.getAll();

productos.getByID(1);

productos.deleteByID(2);
