
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbvotaciones {

    async leer(req, res) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            let code = req.headers['authorization'].split(" ")
            code = code[code.length - 1]
            let results = await new Promise((resol, reject) => conet.query('SELECT * FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) AND `code_usser` = ?', [code], (err, rows) => {
                if (err) reject(err);
                resol(rows);
            }));
            return results;
        }
    }

    async listar(req, res) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            let results = await new Promise((resol, reject) => conet.query('SELECT * FROM `votaciones` WHERE 1', (err, rows) => {
                if (err) return reject(err);
                resol(rows);
            }))
            return results;
        }
    }

    insert_votacion(req, res, fecha, horalimint) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            conet.query('INSERT INTO `votaciones` (`fecha`, `Hors_filter`) VALUES (?,?);', [fecha, horalimint], (err, rows) => {
                if (err) return res.send(err)
                //res.send("el curso a sido redistrado")
            })
        }
    }

    like_participantes(req, res) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            let code = req.headers['authorization'].split(" ")
            code = code[code.length - 1]
            conet.query('INSERT INTO `votaci_parti`(`id_parti`, `id_votac`, `code_usser`) VALUES (?,(SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1),?)', [req.params.id, code], (err, rows) => {
                if (err) return res.send(err)
                //res.send("el curso a sido redistrado")
            })
        }
    }

    reload_votaciones(req, res) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            conet.query('UPDATE `participante` SET `puntaje`= 0 WHERE `stado` = ?', [1], (err, rows) => {
                if (err) return res.send(err)
                //res.send("el curso a sido eliminado")
            })
            return "Las votaciones se an reainiciado con exito, con la fecha estimada";
        }
    }

    analitic(req, res) {
        let conet = conexibd.connection(req, res)
        // verifica si hay conexion si no la hay manda el error
        if (conet != null) {
            conet.query('SELECT p.id_negocio ,p.nombre , p.descripccion, p.puntaje, ((p.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) )) as promedio FROM `participante` as p WHERE `stado` = 1', [], (err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
        }
    }

    // resultados:
    /**
     * SELECT p.nombre ,p.puntaje, ((p.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) )) as Promedio FROM `participante` as p WHERE `stado` = 1
     * 
     */


}