const contenedorDTO = (table) => {
    table.increments('id', {primaryKey: true}),
    table.string('title', 40).notNullable(),
    table.float('price').notNullable(),
    table.string('thumbnail', 7000).notNullable()
};

module.exports = {contenedorDTO};