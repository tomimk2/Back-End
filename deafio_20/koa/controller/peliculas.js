let peliculas = [];

const getAll = (ctx, next) => {
    if (peliculas.length === 0) {
        ctx.response.status = 404;
        ctx.body = {
            status: "Failed",
            message: "No hay ninguna película almacenada"
        };
    } else {
        ctx.response.status = 200;
        ctx.body = {
            status: "Success",
            message: peliculas
        };
    };
    next();
};

const getById = (ctx, next) => {
    const {id} = ctx.request.params;
 
    if (peliculas.length === 0) {
        ctx.response.status = 404;
        ctx.body = {
            status: "Failed",
            message: "No hay ninguna película almacenada"
        };
    } else {
        const pelicula = peliculas.find(peli => peli.id == id);
        if (pelicula) {
            ctx.response.status = 200;
            ctx.body = {
                status: "Success",
                message: pelicula
            };
        } else {
            ctx.response.status = 404;
            ctx.body = {
                status: "Failed",
                message: `No existe la película con id ${id}`
            };
        }
        
    };
    next();
};

const insert = (ctx, next) => {
    const { body } = ctx.request;

    if (body.title == undefined || body.genre == undefined || body.year == undefined) {
        ctx.response.status = 501;
        ctx.body = {
            status: "Failed",
            message: "Faltó ingresar algún dato"
        };
    } else {
        let id;
        if (peliculas.length === 0) {
            id = 1;
            body.id = id;
        } else {
            peliculas.map(peli => {
                return id = peli.id +1
            });
            body.id = id;
        };
        
        peliculas.push(body);
        ctx.response.status = 201;
        ctx.body = {
            status: "Success",
            message: body
        };
    };
    next();
};

const modify = (ctx, next) => {
    const { body } = ctx.request;
    const { id } = ctx.request.params;

    const pelicula = peliculas.find(peli => peli.id == id);

    if (pelicula) {
        if (body.title != undefined) pelicula.title = body.title;
        if (body.genre != undefined) pelicula.genre = body.genre;
        if (body.year != undefined) pelicula.year = body.year;

        ctx.response.status = 202;
        ctx.body = {
            status: "Success",
            message: pelicula
        };
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: "Failed",
            message: `No existe la película con id ${id}`
        };
    };
    next();
};

const del = (ctx, next) => {
    const { id } = ctx.request.params;

    const pelicula = peliculas.find(peli => peli.id == id);

    if (pelicula) {
        const newArray = peliculas.filter(peli => peli != pelicula);
        peliculas = newArray;
        ctx.response.status = 200;
        ctx.body = {
            status: "Success",
            message: `Se eliminó la película con id ${id}`
        };
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: "Failed",
            message: `No existe la película con id ${id}`
        };
    };
    next();
};

module.exports = {
    getAll,
    getById,
    insert,
    modify,
    del
};