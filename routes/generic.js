const express = require('express')
const rooutes = express.Router()
//######################### rooutes ###################################
//listar
rooutes.get('/', (req, res) => {
    res.send("La ruta esta funcionando correctamente")
})

module.exports = rooutes