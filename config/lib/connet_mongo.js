const mongoose = require('mongoose');
const configdata = require('../config.json');

let db;

function connection(){
    if(!db) {
        let urlconnet = `mongodb://${configdata.bd.mongo.host}:27017/${configdata.bd.mongo.schema[0]}`
        db = mongoose.connect(urlconnet);
    }
    return db;
}

module.exports = connection()