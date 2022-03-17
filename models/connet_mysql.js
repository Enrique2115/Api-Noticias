
//mydellwares ------------------------------------------------------------------

// conection de mysql
module.exports = class dbconeccion{
    
    connection(req,res){
        let connt = null;
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            connt = conn
        })
        return connt
    }
}

// METODOS DE CONSULTA
// tendremos que pasar el request y el respons de la peticion de 
// la ruta de express.
//
// leer(req,res){
//     # llamamos a la conexion y la almacenamos en una variable
//     # para darle uso en la peticion del query
//     let conet = conexibd.connection(req,res) 
//     // verifica si hay conexion si no la hay manda el error
//     if(conet != null){
//         conet.query('CALL `read_user`(?)',[req.params.id], (err, rows) => {
//             if (err) return res.send(err)
//             res.json(rows[0])
//         })
//     }
// }