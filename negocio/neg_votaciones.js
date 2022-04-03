const dbobje = require("../models/md_votaciones");
const dbobjeP = require("../models/md_participantes");
const objconsul = new dbobje();
const objconsulP = new dbobjeP();
module.exports = class negvotaciones {
  correcion_dato_fecha(itemtime) {
    return itemtime.toString().length == 1
      ? "0" + itemtime.toString()
      : itemtime.toString();
  }
  //#######################################################
  // Convertir de una fecha (Date) a un codigo de fecha
  // nota: cuando un dia o mes o hora o minuto, tine un formato de un caracter, se trasforma con el metodo correcion_dato_fecha
  // para poder evitar errores, esto quiere decir que si el dia es 1 -> 01 o si la hora es 24 -> 24
  //#######################################################
  extrac_fecha_actual_code(fecha) {
    // # dia
    let day = fecha.getDate();
    day = this.correcion_dato_fecha(day);
    // # mes
    // se le umenta 1 para evitar errores de mes no sincronosiados
    let month = fecha.getMonth() + 1;
    month = this.correcion_dato_fecha(month);
    // # año
    const year = fecha.getFullYear();
    // # hora
    let hors = fecha.getHours();
    hors = this.correcion_dato_fecha(hors);
    // # minuros
    let minut = fecha.getMinutes();
    minut = this.correcion_dato_fecha(minut);
    //# concatenamos a un codigo
    const codefecha =
      year.toString() +
      month.toString() +
      day.toString() +
      hors.toString() +
      this.correcion_dato_fecha(minut);
    return codefecha;
  }

  calcular_resto_fechas(fechaactual, fechaapertura) {
    // restamos la cantidad de dias
    var year = 1000 * 60 * 60 * 24;
    let fecha1 = `${fechaactual.substring(0, 4)}-${fechaactual.substring(
      4,
      6
    )}-${fechaactual.substring(6, 8)}`;
    let fecha2 = `${fechaapertura.substring(0, 4)}-${fechaapertura.substring(
      4,
      6
    )}-${fechaapertura.substring(6, 8)}`;
    let fechactual = new Date(fecha1);
    let fechapert = new Date(fecha2);
    let time1 = fechactual.getTime();
    let time2 = fechapert.getTime();
    let resul = time1 - time2;
    resul = Math.floor(resul / year);
    // calculams la cantidad de horas trascurridas
    let horaactual = fechaactual.substring(8, 10);
    let horaapertu = fechaapertura.substring(8, 10);
    if (resul == 1) {
      return parseInt(horaactual) + (24 - parseInt(horaapertu));
    } else {
      return (
        parseInt(horaactual) + (24 - parseInt(horaapertu)) + (resul - 1) * 24
      );
    }
  }

  async like_participantes(req, res) {
    const codefecha = this.extrac_fecha_actual_code(new Date());
    const listtime = await this.list_time_apertur(req, res);
    const list = listtime.map((item) => {
      return this.extrac_fecha_actual_code(item["fecha"]);
    });
    // Calcula la cantidad de horas que an  trascurrido
    const tiemtras = this.calcular_resto_fechas(
      codefecha,
      list[list.length - 1]
    );
    const fitettiem = listtime[listtime.length - 1];
    // Comprueba si se hay tiempo aun para poder botar
    if (!(Math.abs(tiemtras) < parseInt(fitettiem["Hors_filter"])))
      return res.send({
        messege: `Ya no se puede votar, tiempo estimado agotado`,
      });

    // verifica si el usuario ya voto
    const vote = await this.verifi_participante_to_empresa(req, res);
    if (vote != 0) return res.send({ messege: `El usuario ya a votado antes` });

    objconsul.like_participantes(req, res);
    objconsulP.actualizer_puntuacion(req, res);
    return res.send({ messege: `Ingresar un like correctamente` });
  }

  async verifi_participante_to_empresa(req, res) {
    // si el codigo de la empresa es diferente de nulo, se pasa el codigo, sino es nullo
    let list = await objconsul.leer(req, res);
    const conten = list.length != 0 ? list[0] : {};
    let result = "id_parti" in conten ? conten["id_parti"] : 0;
    return result;
  }

  async list_time_apertur(req, res) {
    let result = await objconsul.listar(req, res);
    return result;
  }

  format_date_mysql(fechaactual) {
    return `${fechaactual.substring(0, 4)}-${fechaactual.substring(
      4,
      6
    )}-${fechaactual.substring(6, 8)} ${fechaactual.substring(
      8,
      10
    )}:${this.correcion_dato_fecha(fechaactual.substring(10, 12))}:00`;
  }

  async aperturar_votaciones(req, res) {
    const codetime = this.extrac_fecha_actual_code(new Date(Date.now()));
    const listtime = await this.list_time_apertur(req, res);
    console.log(codetime);
    const list = listtime.map((item) => {
      return this.extrac_fecha_actual_code(item["fecha"]);
    });
    // si no se encuentra una apertura
    if(list.length == 0){
      // ya no hay una votacion en proceso
      objconsul.insert_votacion(
        req,
        res,
        this.format_date_mysql(codetime),
        24
      );
      const resultado = objconsul.reload_votaciones(req, res);
      return res.send({ messege: "Aperturado correctamente" });
    }
    // si ya hay encuentas aperturaras a futuro
    let hors = this.calcular_resto_fechas(codetime, list[list.length - 1]);
      // si es mayor de 24 horas se puede registrar
    if (!(hors > listtime)) {
        // si hay una votacion en proceso
        objconsul.insert_votacion(
          req,
          res,
          this.format_date_mysql(codetime),
          24
        );
        const resultado = objconsul.reload_votaciones(req, res);
        return res.send({
          messege:
            "Ya hay aperturado una encuesta en este mismo instante - tener en cuenta",
        });
        
      }
      // ya no hay una votacion en proceso
      objconsul.insert_votacion(
        req,
        res,
        this.format_date_mysql(codetime),
        24
      );
      const resultado = objconsul.reload_votaciones(req, res);
      return res.send({ messege: "Aperturado correctamente" });
  }

  reload_votaciones(req, res) {
    const resultado = objconsul.reload_votaciones(req, res);
    return res.send({ messege: resultado });
  }

  // HORAS TRASCURRIDAS
  resta_dos_fechas_a_hora(fecha1, fecha2) {
    // fecha 1 : fecha de apertura
    // fecha 2 : fecha actual
    if (!(fecha1 instanceof Date) || !(fecha2 instanceof Date)) {
      throw TypeError("Las fechas no cumplen don tel timpo de dato DATE");
    }
    // fecha2.getTime() -> vota el tiempo en segundos
    let milisegundosdiferent = fecha2.getTime() - fecha1.getTime();
    // 1000 milisegundos quiere decir 1 segundo
    let diferencia = milisegundosdiferent / 1000;
    // 60 segundos es equivalente a 1 minuto
    // 60 minutos es equivalente a 1 hora
    // 3600 segundos es igual a 1 hora - 60 x 60
    diferencia /= 60 * 60;

    return Math.abs(Math.round(diferencia));
  }
   //#######################################################
  // Extrae del codee, un un array de fecha -> 20000121000000 = [2000,01,21,00,00,00]
  //#######################################################
  format_code_time(fechaactual) {
    return [
      parseInt(fechaactual.substring(0, 4)),
      parseInt(fechaactual.substring(4, 6)),
      parseInt(fechaactual.substring(6, 8)),
      parseInt(fechaactual.substring(8, 10)),
      parseInt(fechaactual.substring(10, 12)),
      0,
    ];
  }
  //#######################################################
  // Se extrae la ultima fecha de apertura de votacion
  //#######################################################
  async get_time_apertura(req, res) {
    const listtime = await this.list_time_apertur(req, res);
    // si no es un array retorna un objeto en hablo
    if (!(Array.isArray(listtime))) return res.send({
      code_time: "000000000000",
      time_filter: 0,
      hors_transcur: 0,
      Time_trascurr: "00:00:00",
      days_trascurr: "00/00/00",
    });

    // si es un array retorna un objeto en 0
    if (listtime.length == 0) return res.send({
      code_time: "000000000000",
      time_filter: 0,
      hors_transcur: 0,
      Time_trascurr: "00:00:00",
      days_trascurr: "00/00/00",
    });

    const list = listtime.map((item) => {
      return {
        code_time: this.extrac_fecha_actual_code(item["fecha"]),
        time_filter: item["Hors_filter"],
      };
    });

    console.log(list[list.length - 1]);
    
    const jsonresul = list[list.length - 1];
    const codetime = jsonresul["code_time"];
    // convertimos el code_time en un array de datos
    const datosapeturearray = this.format_code_time(codetime);
    // capturamos la fecha actual
    const now = new Date(Date.now());
    // capturamos la fecha de apertura
    const apertura = new Date(
      datosapeturearray[0],
      datosapeturearray[1] - 1,
      datosapeturearray[2],
      datosapeturearray[3],
      datosapeturearray[4],
      datosapeturearray[5]
    );
    // horas trascurridas
    const hors_transcur = this.resta_dos_fechas_a_hora(apertura, now);
    // milisegundossegundos de diferencia
    let tiempotrascurrido = now.getTime() - apertura.getTime();
    // extraer fecha, hora, minutos y dias trascurridos
    // asignar el valor de las unidades en milisegundos
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    // Calcular cuentos días contiene el intervalo. Substraer cuantos días
    //tiene el intervalo para determinar el sobrante
    var days = Math.floor(tiempotrascurrido / msecPerDay);
    tiempotrascurrido = tiempotrascurrido - days * msecPerDay;

    // Calcular las horas , minutos y segundos
    var hours = Math.floor(tiempotrascurrido / msecPerHour);
    tiempotrascurrido = tiempotrascurrido - hours * msecPerHour;

    var minutes = Math.floor(tiempotrascurrido / msecPerMinute);
    tiempotrascurrido = tiempotrascurrido - minutes * msecPerMinute;

    var seconds = Math.floor(tiempotrascurrido / 1000);

    jsonresul["hors_transcur"] = hors_transcur;
    jsonresul["Time_trascurr"] = `${this.correcion_dato_fecha(
      hours
    )}:${this.correcion_dato_fecha(minutes)}:${this.correcion_dato_fecha(
      seconds
    )}`;
    jsonresul["days_trascurr"] = `00/00/${this.correcion_dato_fecha(days)}`;

    return res.send(jsonresul);
  }

  async analicis_votaciones(req, res) {
    // refrescamos la puntuacion ......
    // await objconsulP.actualizer_puntuacion(req, res);
    // analizamos los puntos
    objconsul.analitic(req, res);
  }

  async listar_votaciones(req, res){
    let result = await objconsul.listar(req, res);
    let resulted = result.map((item)=>{
        return {
          id_votaciones: item.id_votaciones,
          fecha: this.extrac_fecha_actual_code(item.fecha),
          Hors_filter : item.Hors_filter
        }
    });
    return res.send(resulted);
  }

};
