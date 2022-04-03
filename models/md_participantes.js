
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbparticiantes{
    
    async leer(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `participante` WHERE `id_negocio` = ?',[req.params.id])
        return (Array.isArray(results))?results:[];
    }

    async listar_x_categori(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `participante` WHERE `stado` = ? AND `id_categori` = ? ;',[1,req.params.id])
        return (Array.isArray(results))?results:[];
    }
    
    async listar(req,res){
        let results = await conexibd.single_query(req, res,'SELECT * FROM `participante` WHERE `stado` = ?',[1])
        return (Array.isArray(results))?results:[];
    }

    async insertar(req,res){
        let results = await conexibd.single_query(req, res,'INSERT INTO `participante`(`nombre`,`descripccion`,`puntaje`,`url`,`id_categor`,`stado`) VALUES (?,?,?,?,?,?);',
                                                 [req.body.nombre,req.body.descripccion,0,req.body.url,(req.body.hasOwnProperty("id_cat"))?req.body.id_cat:1,1],
                                                 "El participante se inserto con exito")
        return res.send(results)
    }

    async eliminar(req,res){
        let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `stado`= ? WHERE `id_negocio` = ?',
                                                 [0,req.params.id],
                                                 "El Participante se elimino con exito")
        return res.send(results)                
    }

    async actualizar(req,res){
        let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `nombre`= ? ,`descripccion`= ?, `id_categor` = ? ,`url`= ? WHERE `id_negocio`= ?',
                                                 [req.body.nombre,req.body.descripccion,(req.body.hasOwnProperty("id_cat"))?req.body.id_cat:1,req.body.url,req.params.id],
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