require('dotenv').config();
const express = require('express');
const app = express();
const PORT = parseInt(process.argv[2]) || process.env.PORT;
const { graphqlRoute } = require('./src/schema/schema');
const notFound = require('./src/routes/notFound');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', graphqlRoute);
app.use('/*', notFound);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});