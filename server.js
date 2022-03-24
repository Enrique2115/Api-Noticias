const { Console } = require("console");
const express = require("express");
const mysql = require("mysql");
const mysqlconnet = require("express-myconnection");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const verifyToken = require("./config/tockenizer/tokenizer");
/// rotas de app ---------------------------------
const tokeniser = require("./config/tockenizer/router/routertoken");
const imageftp = require("./config/serviceftp/uploudimage");
const gimageftp = require("./config/serviceftp/getimage");
const generico = require("./routes/generic");
const participantes = require("./routes/participantes");
const votaciones = require("./routes/votaciones");
/// ----------------------------------------------
const config = require("./config/config.json");

//config
const app = express();
// si se desea utilizar mysql desabilita esto
const dbopccion = config.bd.mysql;

app.set("port", process.env.PORT || config.apires.portpru);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//mydellwares ------------------------------------------------------------------
// si se desea utilizar mysql desabilita esto
app.use(mysqlconnet(mysql, dbopccion, "single"));
app.use(express.json());
//app.use()

// - Configuration origen de acceso de la api rest
app.use(cors());

//rootas -----------------------------------------------------------------------
//**** roota principal o gemerica */
app.get("/", (req, res) => {
  res.send("welcon to my apy");
});
//**** routers personalizados */
app.use("/tokeniser", tokeniser);
app.use("/genetic", verifyToken, generico);
app.use("/partic", verifyToken, participantes);
app.use("/votacion", verifyToken, votaciones);
app.use("/ftp", verifyToken, imageftp);
app.use("/gftp", gimageftp);
//resever runnig----------------------------------------------------------------
app.listen(app.get("port"), () => {
  console.log("servidor se encuentra corriendo por el puerto", app.get("port"));
});
