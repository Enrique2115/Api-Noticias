const jwt = require('jsonwebtoken')
// archivo de configuracion
const config = require('../config.json')

// verificacion del token
module.exports = function verifyToken(req,res,next){
    if(!req.headers.authorization){
      return res.status(403).send({message: 'No tienes autorizacion'})
    }
 
    const tokenext =  req.headers['authorization']
    if (typeof tokenext !== 'undefined'){
         const token = tokenext.split(" ")[1]
         const payload = jwt.decode(token, config.apidatkey)
         req.token = token
         next()
     }else{
         return res.status(403).send({message: 'No presenta el token'})
     }
 }
 //app.use()