
// INSERT INTO `categori_parti`(`nombre`, `urlcode`) VALUES ('Default','')
// SELECT * FROM `categori_parti` WHERE 1
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbparticiantes{
    
    async leer(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `categori_parti` WHERE `id` = ? ;',[req.params.id])
        return (Array.isArray(results))?results:[];
    }
    
    async listar(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `categori_parti` WHERE ? ;',[1])
        return (Array.isArray(results))?results:[];
    }

    async insertar(req,res){
        let results = await conexibd.single_query(req, res,'INSERT INTO `categori_parti`(`nombre`, `urlcode`, `stade`) VALUES (?,?,?);',
                                                 [req.body.nombre,req.body.codeurl,1],
                                                 "El participante se inserto con exito")
        return res.send(results)
    }

    async eliminar(req,res){                
    }

    async actualizar(req,res){
    }
}