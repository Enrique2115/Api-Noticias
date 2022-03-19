const jwt = require('jsonwebtoken')
// archivo de configuracion
const config = require('../config.json')

// verificacion del token
module.exports = function verifyToken(req,res,next){
    if(!req.headers.authorization){
      return res.status(403).send({message: 'No tienes autorizacion'})
    }
 
    const tokenext =  req.headers['authorization']
    if (typeof tokenext !== undefined){
        const listdatetoken = tokenext.split(" ")
        const token = listdatetoken[listdatetoken.length-1]
        const payload = jwt.decode(token, config.apidatkey)
        if (payload == null) return res.status(403).send({message: 'El toquen es invalido'});
        // coomprobamos la existencia de las key y sus valores dados, entre el json esperado y el json desifrado
        for (var key in config.apidatkey) {
            try{
                if(payload.user[key] != config.apidatkey[key]){
                    return res.status(403).send({message: 'El toquen es invalido'});
                }
            }catch(Exeption){
                return res.status(403).send({message: 'No tienes autorizacion'});
            }   
        }
        req.token = token
        next()
     }else{
         return res.status(403).send({message: 'No presenta el token'})
     }
 }
 //app.use()