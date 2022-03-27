
//mydellwares ------------------------------------------------------------------

// conection de mysql
module.exports = class dbmysql{
    
    connection(req,res){
        let connt = null;
        req.getConnection((err, conn) => {
            
            connt = conn
        })
        return connt
    }

    // esta funcion mas sirve la los selet - para los pool
    // async pool_query(req,res, query, parameter){
    //     let result = await new Promise(async (resol, reject) => await req.getConnection((err, connection)=>{
    //         if (err) console.log(err) // en caso que de un error de conexion
    //         console.log("connetado")
    //         connection.query(query, parameter, (err, rows) => {
    //             //console.log(req._freeConnections.indexOf(connection)); // -1
    //             //connection.release(); // apaga la conexion
    //             if (err) return reject(err);
    //             resol(rows);
    //             //console.log(req._freeConnections.indexOf(connection)); // 0
    //         })
    //     })).catch((err) => setImmediate(() => { console.log(err.message);})); // si da un error de promesa;
    //     return result
    // }

    // esta funcion mas sirve la los selet
    async single_query(req,res, query, parameter, messege = ""){
        let result = await new Promise(async (resol, reject) => await req.getConnection((err, connection)=>{
            if (err) return res.send(err) // en caso que de un error de conexion
            connection.query(query, parameter, (err, rows) => {
                if (err) return reject(err);
                if (messege === "") resol(rows);
                resol(messege);
            })
        })).catch((err) => setImmediate(() => { console.log(err.message); })); // si da un error de promesa;
        if (messege === "") return result
        console.log('\x1b[32m',messege)
        return messege
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