const express = require("express");
const rooutes = express.Router();
//######################### rooutes ###################################
//listar
rooutes.get("/", (req, res) => {
  /// ola buenos dias
  res.send("La ruta esta funcionando correctamente");
});

module.exports = rooutes;
