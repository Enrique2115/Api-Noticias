const dbobje = require('../models/md_votaciones');
const dbobjeP = require('../models/md_participantes');
const objconsul = new dbobje()
const objconsulP = new dbobjeP()
module.exports = class negvotaciones{

    correcion_dato_fecha(itemtime){
        return (itemtime.toString().length == 1)? "0" + itemtime.toString() : itemtime.toString()
    }
    
    extrac_fecha_actual_code(fecha){
        const day = fecha.getDate();
        // se le umenta 1 para evitar errores de mes no sincronosiados
        let month = fecha.getMonth() + 1;
        month = this.correcion_dato_fecha(month)
        const year = fecha.getFullYear();
        let hors = fecha.getHours()
        hors = this.correcion_dato_fecha(hors)
        const minut = fecha.getMinutes()
        const codefecha = (year).toString()+(month).toString()+(day).toString()+this.correcion_dato_fecha(hors)+this.correcion_dato_fecha(minut)
        return codefecha
    }

    calcular_resto_fechas(fechaactual, fechaapertura){
        // restamos la cantidad de dias
        var year = 1000*60*60*24;
        let fecha1 = `${fechaactual.substring(0,4)}-${fechaactual.substring(4,6)}-${fechaactual.substring(6,8)}`
        let fecha2 = `${fechaapertura.substring(0,4)}-${fechaapertura.substring(4,6)}-${fechaapertura.substring(6,8)}`
        let fechactual = new Date(fecha1);
        let fechapert = new Date(fecha2);
        let time1 = fechactual.getTime();
        let time2 = fechapert.getTime();
        let resul = time1 - time2;
        resul = Math.floor(resul/year);
        // calculams la cantidad de horas trascurridas
        let horaactual = fechaactual.substring(8,10)
        let horaapertu = fechaapertura.substring(8,10)
        if(resul == 1){    
            return parseInt(horaactual) + (24 - parseInt(horaapertu))
        }else{
            return parseInt(horaactual) + (24 - parseInt(horaapertu)) + ((resul - 1) * 24)
        }
    }

    async like_participantes(req,res){
        const codefecha = this.extrac_fecha_actual_code(new Date())
        const listtime = await this.list_time_apertur(req,res)
        const list = listtime.map((item)=>{
            return this.extrac_fecha_actual_code(item["fecha"])
        });
        // Calcula la cantidad de horas que an  trascurrido
        const tiemtras = this.calcular_resto_fechas(codefecha, list[list.length - 1])
        // Comprueba si se hay tiempo aun para poder botar
        if (Math.abs(tiemtras) < 24 ){
            // verifica si el usuario ya voto
            const vote = await this.verifi_participante_to_empresa(req,res) 
            if ( vote != 0){
                return res.send({"messege":`El usuario ya a votado antes`})
            }else{
                objconsul.like_participantes(req,res)
                objconsulP.actualizer_puntuacion(req,res)
                return res.send({"messege":`Ingresar un like correctamente`})
            }
        }else{
            return res.send({"messege":`Ya no se puede votar, tiempo estimado agotado`})
        }
    }

    async verifi_participante_to_empresa(req,res){
        // si el codigo de la empresa es diferente de nulo, se pasa el codigo, sino es nullo
        let list = await objconsul.leer(req,res)
        const conten = (list.length != 0)? list[0] : {}
        let result = ("id_parti" in conten)? conten["id_parti"] : 0
        return  result
    }

    async list_time_apertur(req,res){
        let result = await objconsul.listar(req,res);
        return result
    }

    format_date_mysql(fechaactual){
        return `${fechaactual.substring(0,4)}-${fechaactual.substring(4,6)}-${fechaactual.substring(6,8)} ${fechaactual.substring(8,10)}:${this.correcion_dato_fecha(fechaactual.substring(10,12))}:00`
    }

    async aperturar_votaciones(req,res){
        const codetime = this.extrac_fecha_actual_code(new Date())
        const listtime = await this.list_time_apertur(req,res)
        const list = listtime.map((item)=>{
            return this.extrac_fecha_actual_code(item["fecha"])
        });
        // si ya hay encuentas aperturaras a futuro
        if (list.length != 0){
            let hors = this.calcular_resto_fechas(codetime,list[list.length-1])
            // si es mayor de 24 horas se puede registrar
            if(hors > 24){
                // ya no hay una votacion en proceso
                objconsul.insert_votacion(req,res,this.format_date_mysql(codetime), 24)
                const resultado = objconsul.reload_votaciones(req,res);
                return res.send({"messege": "Aperturado correctamente"})
            }else{
                // si hay una votacion en proceso
                objconsul.insert_votacion(req,res,this.format_date_mysql(codetime), 24)
                const resultado = objconsul.reload_votaciones(req,res);
                return res.send({"messege": "Ya hay aperturado una encuesta en este mismo instante - tener en cuenta"})
            }
        }
    }

    reload_votaciones(req,res){
        const resultado = objconsul.reload_votaciones(req,res);
        return res.send({"messege": resultado})
    }

    async get_time_apertura(req,res){
        const listtime = await this.list_time_apertur(req,res)
        const list = listtime.map((item)=>{
            return {"code_time": this.extrac_fecha_actual_code(item["fecha"]), "time_filter": item["Hors_filter"]}
        });
        return res.send(list[list.length - 1])
    }

    async analicis_votaciones(req,res){
        // refrescamos la puntuacion ......
        await objconsulP.actualizer_puntuacion(req,res)
        // analizamos los puntos
        objconsul.analitic(req,res)
    }
}