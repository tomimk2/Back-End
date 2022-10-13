const Router = require('koa-router');
const { getAll, getById, insert, modify, del } = require('../controller/peliculas');
const routes = new Router();

routes.get("/", getAll);
routes.get("/:id", getById);
routes.post("/new", insert);
routes.put("/:id/modify", modify);
routes.delete("/:id/delete", del)

module.exports = routes;