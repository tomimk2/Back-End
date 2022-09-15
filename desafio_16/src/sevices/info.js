const createInfo = () => {
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

    return obj
};

module.exports = {
    createInfo
};