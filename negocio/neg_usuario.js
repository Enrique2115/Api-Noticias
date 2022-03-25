const uservar = require("../config/config.json")

module.exports = class negvotaciones {

    comprube_usser(req,res) {
      if (!(req.body.usser == uservar.loguser.usser && req.body.pass === uservar.loguser.pass)) return res.send({"logus": 0})
      return res.send({"logus": 1}) 
    }  
};
  