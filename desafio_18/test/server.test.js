const supertest = require('supertest');
const { expect } = require('chai');
const { app } = require('../src/server');
const {log4js} = require('../src/middlewares/logger');
const logger = log4js.getLogger();
const { newProduct } = require('./productGenerator/newProduct');

let request;
let server;

const startServer = async () => {
    return new Promise((resolve, reject) => {
        const PORT = 0;
        const server = app.listen(PORT, () => {
            logger.info(`Server running on port ${server.address().port}`)
            resolve(server);
        });
        server.on('error', error => {
            logger.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
            reject(error);
        });
    });
};

describe("Comprobando que el servidor funcione bien", () => {

    before(async () => {
        logger.info('********* COMIENZO TOTAL DEL TEST *********');
        server = await startServer();
        request = supertest(`http://localhost:${server.address().port}`); 
    });

    after(() => {
        server.close();
        logger.info('********* FIN TOTAL DEL TEST *********');
    });

    describe('GET', () => {
        it('Debería mostrar todos los productos', async () => {
            const response = await request.get('/');

            expect(response.status).to.eql(200);
            expect(response.body).not.length(0);
        });
    });

    describe('GET BY ID', () => {
        it('Debería mostrar un producto por id', async () => {
            const response = await request.get('/7');

            expect(response.status).to.eql(200);
            expect(response.body).to.include.keys('title', 'price', 'thumbnail');
        });
    });

    describe('GET BY ID INEXISTENTE', () => {
        it('Debería arrojar un 404 por un producto cuyo id no existe', async () => {
            const response = await request.get('/50');

            expect(response.status).to.eql(404);
            expect(response.body).to.include("No se encontró el producto con id:");
        });
    });

    describe('POST', () => {
        it('Debería crear un nuevo producto', async () => {
            const usuario = newProduct();

            const response = await request.post('/add').send(usuario);

            expect(response.status).to.eql(200);
            expect(response.body).to.include("Se agregó el producto con id:");
        });
    });

    describe('PUT', () => {
        it('Debería modificar un producto por id', async () => {
            const usuario = newProduct();

            const response = await request.put('/modify/8').send(usuario);

            expect(response.status).to.eql(200);
            expect(response.body).to.include("Se modificó el producto con id:");
        });
    });

    describe('PUT BY ID INEXISTENTE', () => {
        it('Debería arrojar un 404 por un producto cuyo id no existe', async () => {
            const usuario = newProduct();

            const response = await request.put('/modify/50').send(usuario);

            expect(response.status).to.eql(404);
            expect(response.body).to.include("No se encontró el producto con id:");
        });
    });
    
    describe('GET', () => {
        it('Debería mostrar todos los productos', async () => {
            const response = await request.get('/');

            expect(response.status).to.eql(200);
            expect(response.body).not.length(0);
        });
    });

    describe('DELETE BY ID', () => {
        it('Debería borrar un producto por id', async () => {
            const id = 18;
            const response = await request.delete(`/${id}`);

            expect(response.status).to.eql(200);
            expect(response.body).to.include("Se eliminó el producto con id:");
        });
    });

    describe('DELETE BY ID INEXISTENTE', () => {
        it('Debería arrojar un 404 por un producto cuyo id no existe', async () => {
            const response = await request.delete('/50');

            expect(response.status).to.eql(404);
            expect(response.body).to.include("No se encontró el producto con id:");
        });
    });
});