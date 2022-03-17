const express = require("express");
const rooutes = express.Router();
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
  res.send(`Ingresar un like con: ${req.header["authorization"]}`);
});

// Verificar la Participacion
rooutes.get("/verifi/", (req, res) => {
  res.send(`Verificar un like con: ${req.header["authorization"]}`);
});

module.exports = rooutes;
