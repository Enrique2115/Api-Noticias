
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

    // Mesta la consulta basica - con la conexxion por medio de un callback
    async single_query(req,res, query, parameter, messege = ""){
        // se crea una promesa, apuntando a la cnexxion - en cual botara el error y la connection
        let result = await new Promise(async (resol, reject) => await req.getConnection((err, connection)=>{
            if (err) return reject(err) // en caso que de un error de conexion
            // -- Inicio de consulta
            connection.query(query, parameter, (err, rows) => {
                if (err) return reject(err);
                if (messege === "") resol(rows);
                resol(messege);
            })
            // -- Fin - Inicio de consulta
        })).catch((err) => setImmediate(() => { console.log(err.message);})); // si da un error de promesa;
        // Si no se envia un mensaje , inprime el resultado
        if (messege === "") return result
        //  si se envia el mensaje, lo retorna
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