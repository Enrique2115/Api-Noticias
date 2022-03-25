const express = require("express");
const rooutes = express.Router();
const obj = require("../negocio/neg_usuario")
const objneg = new obj()
//######################### rooutes ###################################

//instar un participante
rooutes.post("/log", (req, res) => {
    objneg.comprube_usser(req, res)
});

module.exports = rooutes;
