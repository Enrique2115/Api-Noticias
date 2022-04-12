
const dbcone = require('../config/lib/connet_mysql')
const dbpart = require('./md_participantes')
let conexibd = new dbcone()
let dbpartiobj = new dbpart()
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
        console.log(fecha);
        let results = await conexibd.single_query(req, res,'INSERT INTO `votaciones` (`fecha`, `Hors_filter`) VALUES (?,?);',[fecha,horalimint])
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

    async ultimate_votacion(req, res){
        let results = await conexibd.single_query(req, res,'SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1',[])
        return (Array.isArray(results))?results:[];
    }

    // extrae la puntuacion por participante y por votacion
    async puntos_x_participante(req, res,id_part,id_vot){
        let results = await conexibd.single_query(req, res,'SELECT COUNT(*) as puntaje FROM votaci_parti as v INNER JOIN participante p On p.id_negocio = v.id_parti WHERE v.id_votac = ? and p.id_negocio = ? group by puntaje, v.id_votac, p.id_negocio;',[id_vot,id_part])
        return (Array.isArray(results))?results:[];
    }

    // extraer el puntaje por votacion
    async puntos_x_votacion(req, res,id_vot){
        let results = await conexibd.single_query(req, res,'SELECT COUNT(*) as puntaje FROM votaciones as v inner join votaci_parti vp on vp.id_votac = v.id_votaciones WHERE v.id_votaciones = ? group by v.id_votaciones;',[id_vot])
        return (Array.isArray(results))?results:[];
    }

    async analitic(req, res) {
        // captura la ultima votacion
        let idbusqued = await this.ultimate_votacion(req, res);
        idbusqued = (Array.isArray(idbusqued))?idbusqued[0]:{id_votaciones:0};
        // inicializa la id
        let id = (req.params.id === '0')?((idbusqued.id_votaciones)):req.params.id;
        // let results = await conexibd.single_query(req, res,'SELECT up.nombre, up.descripccion, up.url, up.id_negocio, up.id_categor , up.puntaje, ((up.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = ? )) as promedio FROM (SELECT COUNT(*) as puntaje, p.nombre, p.descripccion, p.url, p.id_negocio, p.id_categor FROM votaci_parti as v INNER JOIN participante p On p.id_negocio = v.id_parti WHERE v.id_votac = ? GROUP BY v.id_parti, v.id_votac) as up;',[id,id]);
        let results = await dbpartiobj.listar(req,res);
        let comproberes = (Array.isArray(results))?results:[]
        let trasformdata = [];

        for (let item of comproberes){
            let puntaje = await this.puntos_x_participante(req,res,item["id_negocio"],id);
            let puntajetot = await this.puntos_x_votacion(req,res,id);
            let resulte = (puntaje.length == 0)?0:puntaje[0].puntaje;
            let resultetotal = (puntajetot.length == 0)?0:puntajetot[0].puntaje;
            // console.log(resulte);
            // console.log(`votaciones: ${id} - participantes : ${item["id_negocio"]}`)
            
            item["puntaje"] = resulte;
            item["promedio"] = (resulte * 100) / resultetotal;
            // console.log(item);
            trasformdata.push(item);
        }

        // ordanar de mayor a menor
        trasformdata.sort(function (a, b) {
            if (a.puntaje > b.puntaje) {
              return -1;
            }
            if (a.puntaje < b.puntaje) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
        // console.log(trasformdata)
        return res.json(trasformdata);
    }

    // resultados:
    /**
     * SELECT p.nombre ,p.puntaje, ((p.puntaje * 100)/(SELECT COUNT(*) as suma FROM `votaci_parti` WHERE `id_votac` = (SELECT `id_votaciones` FROM `votaciones` ORDER BY `id_votaciones` DESC LIMIT 1) )) as Promedio FROM `participante` as p WHERE `stado` = 1
     * 
     */


}