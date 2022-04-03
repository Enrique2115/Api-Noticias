const express = require("express");
var get_ip = require('ipware')().get_ip;
const rooutes = express.Router();
//######################### rooutes ###################################
//listar
rooutes.get("/", (req, res) => {
  /// ola buenos dias
  var ip_info = get_ip(req);
  res.send({"userag":req.get('User-Agent'), "ipaddresconsult": ip_info});
});

module.exports = rooutes;
