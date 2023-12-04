const express = require('express');
const app = express()
const cors = require('cors');

require('dotenv').config();

// Db Connection

const conn = require("./src/db/conn")
conn();

// Routes

const routes = require("./src/routes/router");

app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));
app.use(express.json());
app.use("/api", routes);



app.listen(8080, function () { console.log('Aplicação executando na porta 8080!'); }); 