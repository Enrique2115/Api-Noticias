const express = require("express");
const rooutes = express.Router();
const model = require('../models/md_participantes');
//######################### rooutes ###################################

module.exports = class negparticipantes{
    
    listar_participantes() {
        var conquery = model()
        conquery.find({},(err,part)=>{
            if (err) return [];
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