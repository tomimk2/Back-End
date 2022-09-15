const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();
const {createInfo} = require('../sevices/info');
const {argumentos_entrada, OS, node_version, rss, path_ejecucion, pid, project_folder} = createInfo();

const info = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).send(`
            <br>
            <h1>Info</h1>
            <br>
            <br>
            <h2>Argumentos de entrada</h2>
            <p>${argumentos_entrada}</p>
            <br>
            <h2>Nombre de la plataforma</h2>
            <p>${OS}</p>
            <br>
            <h2>Versión de NodeJS</h2>
            <p>${node_version}</p>
            <br>
            <h2>Memoria total reservada</h2>
            <p>${rss}</p>
            <br>
            <h2>Path de ejecución</h2>
            <p>${path_ejecucion}</p>
            <br>
            <h2>Process id</h2>
            <p>${pid}</p>
            <br>
            <h2>Carpeta del proyecto</h2>
            <p>${project_folder}</p>
            <br>
            <br>
        `);
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };
};

const infoConsole = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).send(`
            <br>
            <h1>Info</h1>
            <br>
            <br>
            <h2>Argumentos de entrada</h2>
            <p>${argumentos_entrada}</p>
            <br>
            <h2>Nombre de la plataforma</h2>
            <p>${OS}</p>
            <br>
            <h2>Versión de NodeJS</h2>
            <p>${node_version}</p>
            <br>
            <h2>Memoria total reservada</h2>
            <p>${rss}</p>
            <br>
            <h2>Path de ejecución</h2>
            <p>${path_ejecucion}</p>
            <br>
            <h2>Process id</h2>
            <p>${pid}</p>
            <br>
            <h2>Carpeta del proyecto</h2>
            <p>${project_folder}</p>
            <br>
            <br>
        `);
    } catch (error) {
        res.status(500).send(`
            <h1>Ocurrió un error:</h1>
            <h2>${error}</h2>
        `);
    };    
};

module.exports = {info, infoConsole}