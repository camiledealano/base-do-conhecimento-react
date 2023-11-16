const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()

mongoose.connect('mongodb+srv://projetoweb2:78CfoEwAHKNmS4DZ@clusterprojeto2.xkprbmx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
   });


app.listen(8080, function () { console.log('Aplicação executando na porta 8080!'); }); 