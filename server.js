const { Console } = require("console");
const express = require("express");
const mysql = require("mysql");
const mysqlconnet = require("express-myconnection");
const ejs = require("ejs");
const path = require("path");
const verifyToken = require("./config/tockenizer/tokenizer");
/// rotas de app ---------------------------------
const tokeniser = require("./config/tockenizer/router/routertoken");
const generico = require("./routes/generic");
const participantes = require("./routes/participantes");
const votaciones = require("./routes/votaciones");
/// ----------------------------------------------
const config = require("./config/config.json");

//config
const app = express();
// si se desea utilizar mysql desabilita esto
const dbopccion = config.bd.mysql

app.set("port", process.env.PORT || config.apires.portpru);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//mydellwares ------------------------------------------------------------------
// si se desea utilizar mysql desabilita esto
app.use(mysqlconnet(mysql, dbopccion, 'single'))
app.use(express.json());
//app.use()

// - Configuration origen de acceso de la api rest

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', config.apires.control_access.host);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', config.apires.control_access.peticcioes);

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', config.apires.control_access.hedders);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', config.apires.control_access.credencial);

  // Pass to next layer of middleware
  next();
});

//rootas -----------------------------------------------------------------------
//**** roota principal o gemerica *****/
app.get("/", (req, res) => {
  res.send("welcon to my apy");
});
//**** routers personalizados */
app.use("/tokeniser", tokeniser);
app.use("/genetic", verifyToken, generico);
app.use("/partic", verifyToken, participantes);
app.use("/votacion", verifyToken, votaciones);
//resever runnig----------------------------------------------------------------
app.listen(app.get("port"), config.apires.hosturl, () => {
  console.log("servidor se encuentra corriendo por el puerto", app.get("port"));
});
