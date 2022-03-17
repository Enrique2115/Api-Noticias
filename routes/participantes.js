const express = require("express");
const rooutes = express.Router();
const negpatici = require("../negocio/neg_participantes")
const objneg = new negpatici()
//######################### rooutes ###################################

//listar
rooutes.get("/", (req, res) => {
  res.send("La ruta esta funcionando correctamente");
});

//instar
rooutes.post("/", (req, res) => {
  res.send("La ruta esta funcionando correctamente");
});

// Ingresar un like a un participante
rooutes.get("/like/", (req, res) => {
    messege = objneg.like_participantes(req.headers['authorization'])
    res.send(messege)
});

// Verificar la Participacion
rooutes.get("/verifi/", (req, res) => {
  res.send(`Verificar un like con: ${req.headers['authorization']}`);
});

module.exports = rooutes;
