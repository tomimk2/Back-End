const {log4js} = require('../middlewares/logger');
const logger = log4js.getLogger();

let project_folder = process.argv[1].split("\\");
        
const obj = {
    argumentos_entrada: process.argv[2] || "No existen argumentos de entrada",
    OS: process.env.OS,
    node_version: process.version,
    rss: process.memoryUsage().rss,
    path_ejecucion: process.argv0,
    pid: process.pid,
    project_folder: project_folder.slice(0, project_folder.length -1).join("/")
};

const info = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Método: ${req.method}`);

    try {
        res.status(200).send(`
            <br>
            <h1>Info</h1>
            <br>
            <br>
            <h2>Argumentos de entrada</h2>
            <p>${obj.argumentos_entrada}</p>
            <br>
            <h2>Nombre de la plataforma</h2>
            <p>${obj.OS}</p>
            <br>
            <h2>Versión de NodeJS</h2>
            <p>${obj.node_version}</p>
            <br>
            <h2>Memoria total reservada</h2>
            <p>${obj.rss}</p>
            <br>
            <h2>Path de ejecución</h2>
            <p>${obj.path_ejecucion}</p>
            <br>
            <h2>Process id</h2>
            <p>${obj.pid}</p>
            <br>
            <h2>Carpeta del proyecto</h2>
            <p>${obj.project_folder}</p>
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
        console.log(JSON.stringify(obj))
        res.status(200).send(`
            <br>
            <h1>Info</h1>
            <br>
            <br>
            <h2>Argumentos de entrada</h2>
            <p>${obj.argumentos_entrada}</p>
            <br>
            <h2>Nombre de la plataforma</h2>
            <p>${obj.OS}</p>
            <br>
            <h2>Versión de NodeJS</h2>
            <p>${obj.node_version}</p>
            <br>
            <h2>Memoria total reservada</h2>
            <p>${obj.rss}</p>
            <br>
            <h2>Path de ejecución</h2>
            <p>${obj.path_ejecucion}</p>
            <br>
            <h2>Process id</h2>
            <p>${obj.pid}</p>
            <br>
            <h2>Carpeta del proyecto</h2>
            <p>${obj.project_folder}</p>
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