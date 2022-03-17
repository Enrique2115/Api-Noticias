const express = require("express");
const rooutes = express.Router();
const negvotacion = require("../negocio/neg_votaciones")
const objneg = new negvotacion()
//######################### rooutes ###################################

// Ingresar un like a un participante
rooutes.get("/reload", (req, res) => {
    messege = objneg.reload_votaciones()
    res.send(messege)
});

// Ingresar un like a un participante
rooutes.get("/aperture", (req, res) => {
    messege = objneg.aperturar_votaciones()
    res.send(messege)
});

// Retorna el tiempo en codigo 202203152200 -> 2022 03 15 22 00
rooutes.get("/time", (req, res) => {
    messege = objneg.aperturar_votaciones()
    res.send(messege)
});

// Ingresar un like a un participante
rooutes.get("/like/:id", (req, res) => {
    messege = objneg.like_participantes(req.params.id,req.headers['authorization'])
    res.send(messege)
});

// Verificar la Participacion
rooutes.get("/verifi", (req, res) => {
    json = objneg.verifi_participante_to_empresa(req.headers['authorization'])
    res.send(json)
});

module.exports = rooutes;
