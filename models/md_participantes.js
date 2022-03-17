module.exports = function(){

    var dbconnet = require('../config/lib/connet_mongo');
    const Schema = require('mongoose').Schema;

    const participante = Schema({
        nombre: String,
        descripccion: String,
        urlfoto: String,
        status: Boolean
    });
    console.log(dbconnet)
    return dbconnet.model('participantes',participante);
}


