const express = require('express');
const app = express();
const router = require('./routing');
const cors = require('cors');

// CONFIGURATION DE L'APP
app.use(express.json());
app.use(cors()); // Ajout du middleware cors

app.use(router);

module.exports = app;
