const express = require("express");
const rooutes = express.Router();
const negvotacion = require("../negocio/neg_votaciones")
const objneg = new negvotacion()
//######################### rooutes ###################################

// Ingresar un like a un participante
rooutes.get("/reload", (req, res) => {
    objneg.reload_votaciones(req, res)
    //res.send(messege)
});

// Analiza las respuesta de la ultima encuesta creada o aperturada
rooutes.get("/analic/:id", (req, res) => {
    objneg.analicis_votaciones(req, res)
    //res.send(messege)
});

// Ingresar un like a un participante
rooutes.get("/aperture", (req, res) => {
    objneg.aperturar_votaciones(req,res)
    //res.send(messege)
});

// Retorna el tiempo en codigo 202203152200 -> 2022 03 15 22 00
rooutes.get("/time", (req, res) => {
    objneg.get_time_apertura(req, res)
    //res.send(messege)
});

// Ingresar un like a un participante
rooutes.get("/like/:id", (req, res) => {
    objneg.like_participantes(req, res)
    //res.send(messege)
});

// Verificar la Participacion
rooutes.get("/verifi", async (req, res) => {
    let result = await objneg.verifi_participante_to_empresa(req, res)
    res.send({"id_partici": result})
});

// Retorna las votaciones aperturadas
rooutes.get("/", (req, res) => {
    objneg.listar_votaciones(req, res);
    //res.send(messege)
});

module.exports = rooutes;
