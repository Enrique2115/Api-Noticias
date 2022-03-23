const express = require('express')
const rooutes = express.Router()
const path = require('path')
const fs = require('fs')

//read
rooutes.get("/:img", (req, res) => {
    //res.send(req.params.img)
    const ruta = __dirname.replace("serviceftp","ftp") +String.fromCharCode(92)+ req.params.img
    const rutaerror = __dirname + String.fromCharCode(92)+ "res" + String.fromCharCode(92)+ "errorimage.png"
    try {
        if (fs.accessSync(ruta)) res.sendFile(path.join(ruta))
    } catch (error) {
        res.sendFile(path.join(rutaerror))
    }

})

module.exports = rooutes