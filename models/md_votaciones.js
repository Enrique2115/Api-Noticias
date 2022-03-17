
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbvotaciones{
    
    async leer(req,res){
        let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        if(conet != null){
            let results = await new Promise((resol, reject) => conet.query('SELECT * FROM `participante` WHERE `id_negocio` = ?',[req.params.id], (err, rows) => {
                if (err) reject(err);
                resol(rows);
            }));
            return results;
        }
    }
    
    listar(req,res){
        let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        if(conet != null){
            conet.query('SELECT * FROM `participante` WHERE `stado` = ?',[1],(err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
        }
    }

    like_participantes(req,res){
        let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        if(conet != null){
            conet.query('INSERT INTO `participante`(`nombre`,`descripccion`,`puntaje`,`url`,`stado`) VALUES (?,?,?,?,?);',[req.body.nombre,req.body.descripccion,0,req.body.url,1], (err, rows) => {
                if (err) return res.send(err)
                res.send("el curso a sido redistrado")
            })
        }
    }

    eliminar(req,res){
        let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        if(conet != null){
            conet.query('UPDATE `participante` SET `stado`= ? WHERE `id_negocio` = ?',[0,req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send("el curso a sido eliminado")
            })
        }
    }

    actualizar(req,res){
        let conet = conexibd.connection(req,res)
        // verifica si hay conexion si no la hay manda el error
        if(conet != null){
            conet.query('UPDATE `participante` SET `nombre`= ? ,`descripccion`= ? ,`url`= ? WHERE `id_negocio`= ?',[req.body.nombre,req.body.descripccion,req.body.url,req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send("el curso a sido actualizaro")
            })
        }
    }
}