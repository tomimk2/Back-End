const info = (req, res) => {
    const argumentos_entrada = process.argv[2] || "No existen argumentos de entrada"
    const OS = process.env.OS;
    const node_version = process.version;
    const rss = process.memoryUsage().rss;
    const path_ejecucion = process.argv0;
    const pid = process.pid;
    let project_folder = process.argv[1].split("\\");
    project_folder = project_folder.slice(0, project_folder.length -1).join("/")

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
};

module.exports = {info}