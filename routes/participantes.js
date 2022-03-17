const express = require("express");
const rooutes = express.Router();
const negpatici = require("../negocio/neg_participantes")
const objneg = new negpatici()
//######################### rooutes ###################################

//listar
rooutes.get("/", (req, res) => {
  listpartici = objneg.listar_participantes()
  res.send(listpartici);
});

//instar
rooutes.post("/", (req, res) => {
  jsonbody = req.body
  messege = objneg.insertar_participante(jsonbody)
  res.send(messege);
});

//actualizar
rooutes.put("/:id", (req, res) => {
  jsonbody = req.body;
  jsonbody["id"] = req.params.id;
  messege = objneg.actualizar_participante(jsonbody)
  res.send(messege);
});

//eliminar
rooutes.delete("/:id", (req, res) => {
  messege = objneg.eliminar_participante(id)
  res.send(messege);
})

module.exports = rooutes;
