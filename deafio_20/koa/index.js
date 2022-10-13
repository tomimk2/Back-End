const koa = require('koa');
const app = new koa();
const koaBody = require('koa-body');
const router = require('./routes/peliculas');
const PORT = 8080;

app.use(koaBody());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
.on("error", (e) => {
    console.log(`Ocurrió un error al conectar al servidor: ${e}`)
});