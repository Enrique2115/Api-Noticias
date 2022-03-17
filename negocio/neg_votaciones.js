module.exports = class negvotaciones{

    correcion_dato_fecha(itemtime){
        return (itemtime.toString().length == 1)? "0" + itemtime.toString() : itemtime.toString()
    }
    
    extrac_fecha_actual_code(){
        const fecha = new Date();
        const day = fecha.getDate();
        // se le umenta 1 para evitar errores de mes no sincronosiados
        let month = fecha.getMonth() + 1;
        month = this.correcion_dato_fecha(month)
        const year = fecha.getFullYear();
        let hors = fecha.getHours()
        hors = this.correcion_dato_fecha(hors)
        const minut = fecha.getMinutes()
        const codefecha = (year).toString()+(month).toString()+(day).toString()+(hors)+(minut).toString()
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

    like_participantes(id,token){
        const codefecha = this.extrac_fecha_actual_code()
        const tiemtras = this.calcular_resto_fechas(codefecha, "202203152200")

        if (Math.abs(tiemtras) < 24 ){
            if (this.verifi_participante_to_empresa(token)["code_participe"] != null){
                return {"messege":`El usuario ya a votado antes`}
            }else{
                return {"messege":`Ingresar un like con: ${token} en la fecha ${codefecha} a la empresa ${id}`}
            }
        }else{
            return {"messege":`Ya no se puede votar, tiempo estimado agotado`}
        }
    }

    verifi_participante_to_empresa(token){
        // si el codigo de la empresa es diferente de nulo, se pasa el codigo, sino es nullo
        let code_parti = (true)? 1 : -1
        return {"code_participe": code_parti}
    }

    list_time_apertur(){
        return ["202201152200","202202152200","202202172200"]
    }

    aperturar_votaciones(){
        const codetime = this.extrac_fecha_actual_code()
        const listtime = this.list_time_apertur()
        if (codetime in listtime){
            // ya se entra aperturado aperturamos
            return {"messege": "Ya hay aperturado una encuesta"}
        }else{
            // ya se encuen
            return {"messege": "Aperturado correctamente"}
        }
    }

    reload_votaciones(){
        
    }

    get_time_apertura(){
        var list = list_time_apertur();
        return {"time_aperture": list[list.length - 1]}
    }
}