const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const { getAll, getById, add, modify, deleteById } = require('../controllers/main');

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String!
        price: Int!
        thumbnail: String!
    }
    input productInput {
        title: String
        price: Int
        thumbnail: String
    }
    type Query {
        getById(id: ID!): Product
        getAll(campo: String, valor: String): [Product]
    }
    type Mutation {
        add(datos: productInput!): Product
        modify(id: ID!, datos: productInput!): Product
        deleteById(id: ID!): Product
    }
`);

const graphqlRoute = graphqlHTTP({
    schema: schema,
    rootValue: {
      getAll,
      getById,
      add,
      modify,
      deleteById,
    },
    graphiql: true,
});

module.exports = { graphqlRoute };