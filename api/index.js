require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

routes(app);

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;
