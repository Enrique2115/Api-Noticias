const express = require("express");
const rooutes = express.Router();
//######################### rooutes ###################################

module.exports = class negparticipantes{
    
    listar_participantes() {
        
    }

    like_participantes(token){
        const fecha = new Date();
        const day = fecha.getDate();
        const month = fecha.getMonth();
        const year = fecha.getFullYear();
        const hors = fecha.getHours()
        const minut = fecha.getMinutes()
        const codefecha = (year).toString()+(month).toString()+(day).toString()+(hors).toString()+(minut).toString()
        const tiemtras = parseInt(codefecha) - parseInt("20222162200")
        console.log(tiemtras)

        if (Math.abs(tiemtras) < 2400 ){
            if (this.verifi_participante_to_empresa()["code_participe"] != null){
                return {"messege":`El usuario ya a votado antes`}
            }else{
                return {"messege":`Ingresar un like con: ${token} en la fecha ${codefecha}`}
            }
        }
    }

    verifi_participante_to_empresa(){
        // si el codigo de la empresa es diferente de nulo, se pasa el codigo, sino es nullo
        let code_parti = (true)? 1 : null
        return {"code_participe": code_parti}
    }
}