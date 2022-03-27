
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbparticiantes{
    
    async leer(req,res){
        //let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        let results = await conexibd.single_query(req, res,'SELECT * FROM `participante` WHERE `id_negocio` = ?',[req.params.id])
        return (Array.isArray(results))?results:[];
    }
    
    async listar(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `participante` WHERE `stado` = ?',[1])
        return (Array.isArray(results))?results:[];
    }

    async insertar(req,res){
        // verifica si hay conexion si no la hay manda el error
        let results = await conexibd.single_query(req, res,'INSERT INTO `participante`(`nombre`,`descripccion`,`puntaje`,`url`,`stado`) VALUES (?,?,?,?,?);',
                                                 [req.body.nombre,req.body.descripccion,0,req.body.url,1],
                                                 "El participante se inserto con exito")
        return res.send(results)
    }

    async eliminar(req,res){
        //let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `stado`= ? WHERE `id_negocio` = ?',
                                                 [0,req.params.id],
                                                 "El Participante se elimino con exito")
        return res.send(results)                
    }

    async actualizar(req,res){
        let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `nombre`= ? ,`descripccion`= ? ,`url`= ? WHERE `id_negocio`= ?',
                                                 [req.body.nombre,req.body.descripccion,req.body.url,req.params.id],
                                                 "El Participante se actualizado con exito")
        return res.send(results)
    }

    async actualizer_puntuacion(req,res){
        const listpartici = await this.listar(req,res)
        for (let element of listpartici){
            let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `puntaje`= (SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) AND `id_parti` = ? ) WHERE `id_negocio` = ?',[element["id_negocio"],element["id_negocio"]])
        }
        
    }
}