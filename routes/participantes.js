const express = require("express");
const rooutes = express.Router();
const negpatici = require("../negocio/neg_participantes")
const objneg = new negpatici()
//######################### rooutes ###################################

//listar
rooutes.get("/", (req, res) => {
    objneg.listar_participantes(req, res)
});

//leer
rooutes.get("/r/:id", (req, res) => {
  objneg.leer_participante(req, res)
});

//instar
rooutes.post("/", (req, res) => {
    objneg.insertar_participante(req, res)
  //res.send(messege);
});

//actualizar
rooutes.put("/:id", (req, res) => {
  // jsonbody = req.body;
  // jsonbody["id"] = req.params.id;
  objneg.actualizar_participante(req, res)
  //res.send(messege);
});

//eliminar
rooutes.delete("/:id", (req, res) => {
  objneg.eliminar_participante(req, res)
  //res.send(messege);
})

module.exports = rooutes;
