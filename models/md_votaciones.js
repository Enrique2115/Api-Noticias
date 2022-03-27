
const dbcone = require('../config/lib/connet_mysql')
let conexibd = new dbcone()
//######################### dbcurso ###################################
module.exports = class dbvotaciones {

    async leer(req, res) {
        let code = req.headers['authorization'].split(" ")
        code = code[code.length - 1]
        let results = await conexibd.single_query(req, res,'SELECT * FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) AND `code_usser` = ?',[code])
        return (Array.isArray(results))?results:[];
    }

    async listar(req, res) {

        let results = await conexibd.single_query(req, res,'SELECT * FROM `votaciones` WHERE 1',[])
        return (Array.isArray(results))?results:[];
    }

    async insert_votacion(req, res, fecha, horalimint) {
        let results = await conexibd.single_query(req, res,'INSERT INTO `votaciones` (`fecha`, `Hors_filter`) VALUES (?,?);',[fecha, horalimint])
    }

    async like_participantes(req, res) {
        let code = req.headers['authorization'].split(" ")
        code = code[code.length - 1]
        let results = await conexibd.single_query(req, res,'INSERT INTO `votaci_parti`(`id_parti`, `id_votac`, `code_usser`) VALUES (?,(SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1),?)',[req.params.id, code])
    }

    async reload_votaciones(req, res) {

        let results = await conexibd.single_query(req, res,'UPDATE `participante` SET `puntaje`= 0 WHERE `stado` = ?',[1])
        return "Las votaciones se an reainiciado con exito, con la fecha estimada";
    }

    async analitic(req, res) {

        let results = await conexibd.single_query(req, res,'SELECT p.id_negocio ,p.nombre , p.descripccion, p.puntaje, ((p.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) )) as promedio FROM `participante` as p WHERE `stado` = 1 ORDER BY promedio DESC',[])
        return res.json((Array.isArray(results))?results:[]);
    }

    // resultados:
    /**
     * SELECT p.nombre ,p.puntaje, ((p.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) )) as Promedio FROM `participante` as p WHERE `stado` = 1
     * 
     */


}