//const connet = require("../config/lib/connet_mongo")
//const Participantes = require('../models/md_participantes');
const model = require('../models/md_participantes');
const objmodel = new model()
//######################### rooutes ###################################


/**
 * "id": "hjshfkjdshfjksdhfksd",
    "nombre": "hjhjkfhjkshfdksjhfkds",
    "descripccion": "sdfdfkhdskfhdsf",
    "puntaje": 45,
    "url": "",
    "votaciones":[
        {
            "codigouser": "",
            "time": ""
        }
    ]
 */
module.exports = class negparticipantes{
    
    async leer_participante(req, res){
        const prod = await objmodel.leer(req,res);
        return res.send(prod[0])
    }
    
    async listar_participantes(req, res) {
        const listparti = await objmodel.listar(req,res);
        return res.send(listparti)
    }

    insertar_participante(req, res){
        if (req.body.nombre != "" && req.body.descripccion != "" &&  req.body.url != ""){
            objmodel.insertar(req, res);
        }else{
            return res.send({"messege": "Error al insertar datos al servidor"})
        }
    }

    async actualizar_participante(req, res){
        if (req.body.nombre != "" && req.body.descripccion != "" &&  req.body.url != ""){
            const partici = await this.leer_participante(req, res);
            console.log(partici.length);
            (partici.length != 0)?objmodel.actualizar(req, res):res.send({"messege": "El id no existe en la eliminacion"});
        }else{
            return res.send({"messege": "Error al actualizar datos al servidor"})
        }
    }

    async eliminar_participante(req, res){
        const partici = await objmodel.leer(req, res);
        if (!(partici.length != 0)) return res.send({"messege": "El id no existe en la eliminacion"})
        objmodel.eliminar(req, res)
        //res.json({"messeg": "Error de eliminar el participante"})
    }
    
}