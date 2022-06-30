const { options } = require('./options/SQLite3.js');
const knex = require('knex')(options);

knex.from('cars').del()
	.then(() => console.log('All cars deleted'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())