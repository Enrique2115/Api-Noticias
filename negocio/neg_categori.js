//const connet = require("../config/lib/connet_mongo")
//const Participantes = require('../models/md_participantes');
const model = require('../models/md_categori');
const objmodel = new model()
//######################### rooutes ###################################

module.exports = class negcategori{
    
    async leer_categori(req, res){
        const prod = await objmodel.leer(req,res);
        return res.send(prod[0])
    }
    
    async listar_categori(req, res) {
        const listparti = await objmodel.listar(req,res);
        return res.send(listparti)
    }

    insertar_categori(req, res){
        if (!(req.body.nombre != "")) return res.send({"messege": "Error al insertar datos al servidor"})
        objmodel.insertar(req, res);
    }

    async actualizar_categori(req, res){
        if (!(req.body.codeurl != "" && req.body.nombre != "")) return res.send({"messege": "Error al actualizar datos al servidor"})
        objmodel.actualizar(req, res);
    }

    async eliminar_categori(req, res){
        
    }
    
}