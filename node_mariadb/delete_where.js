const { options } = require('./options/mariaDB.js');
const knex = require('knex')(options)

knex.from('cars').where('price', '>', '50000').del()
	.then(() => console.log('Cars deleted'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())