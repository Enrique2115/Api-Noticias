const express = require("express");
const rooutes = express.Router();
const negpatici = require("../negocio/neg_categori")
const objneg = new negpatici()
//######################### rooutes ###################################

//listar
rooutes.get("/", (req, res) => {
    objneg.listar_categori(req, res);
});

//leer
rooutes.get("/r/:id", (req, res) => {
  objneg.leer_categori(req, res);
});

//instar un participante
rooutes.post("/", (req, res) => {
    objneg.insertar_categori(req, res);
});

//actualizar
// rooutes.put("/:id", (req, res) => {
//   // jsonbody = req.body;
//   // jsonbody["id"] = req.params.id;
//   objneg.actualizar_participante(req, res)
//   //res.send(messege);
// });

//eliminar
// rooutes.delete("/:id", (req, res) => {
//   objneg.eliminar_categori(req, res)
//   //res.send(messege);
// })

module.exports = rooutes;