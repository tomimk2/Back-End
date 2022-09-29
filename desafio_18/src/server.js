require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/main');
const notFound = require('./routes/notFound');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/*', notFound);

module.exports = { app };