const { Console } = require("console");
const express = require("express");
const mysql = require("mysql");
const mysqlconnet = require("express-myconnection");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan")
const verifyToken = require("./config/tockenizer/tokenizer");
/// rotas de app ---------------------------------
const tokeniser = require("./config/tockenizer/router/routertoken");
const imageftp = require("./config/serviceftp/uploudimage");
const gimageftp = require("./config/serviceftp/getimage");
const generico = require("./routes/generic");
const participantes = require("./routes/participantes");
const votaciones = require("./routes/votaciones");
const cloudftp = require("./config/serviceftp/uploudcloud");
const usuario = require("./routes/usuarios");
const categori = require("./routes/categori")
/// ----------------------------------------------
const config = require("./config/config.json");

//config
const app = express();
// si se desea utilizar mysql desabilita esto
const dbopccion = config.bd.mysql.pool;

app.set("port", process.env.PORT || config.apires.portpru);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//mydellwares ------------------------------------------------------------------
// si se desea utilizar mysql desabilita esto
app.use(mysqlconnet(mysql, dbopccion, "pool"));
app.use(morgan("dev"))
app.use(express.json());
// control de errores
const logErrors = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(`Some wrong ${err.message}`)
}
// - Configuration origen de acceso de la api rest
app.use(cors((req , callback)=>{
  let corsOptions = { origin: true };
    console.log(req.header('Origin'))
    callback(null, corsOptions)
})); 

//rootas -----------------------------------------------------------------------
//**** roota principal o gemerica */
app.get("/", (req, res) => {
  res.send("welcon to my apy");
});
//**** routers personalizados */
app.use("/tokeniser", tokeniser);
app.use("/user", usuario);
app.use("/genetic", generico);
app.use("/categ", verifyToken, categori)
app.use("/partic", verifyToken, participantes);
app.use("/votacion", verifyToken, votaciones);
// ftp insert image
app.use("/ftp", verifyToken, imageftp);
app.use("/gftp", gimageftp);
// ftp insert image cloudbinary
app.use("/cftp", verifyToken, cloudftp);
// errores de ejecucion 
app.use(logErrors);
//resever runnig----------------------------------------------------------------
app.listen(app.get("port"), () => {
  console.log("servidor se encuentra corriendo por el puerto", app.get("port"));
});
