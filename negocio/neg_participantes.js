const express = require("express");
const rooutes = express.Router();
const model = require('../models/md_participantes')();
//######################### rooutes ###################################

module.exports = class negparticipantes{
    
    listar_participantes() {
        model.find({},(err,part)=>{
            return part;
        })
    }

    insertar_participante(){

    }

    actualizar_participante(){

    }

    eliminar_participante(){

    }
    
}