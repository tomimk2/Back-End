const { options } = require('./options/mariaDB.js');
const knex = require('knex')(options)


knex.schema.createTable('cars', table => {
	table.increments('id')
	table.string('name')
	table.integer('price')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())