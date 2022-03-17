const { Console } = require('console')
const express = require('express')
const mysql = require('mysql')
const mysqlconnet = require('express-myconnection')
const ejs = require('ejs');
const path = require('path')
const verifyToken = require('./config/tockenizer/tokenizer')
/// rotas de app ---------------------------------
const tokeniser = require('./config/tockenizer/router/routertoken')
const generico = require('./routes/generic')
/// ----------------------------------------------
const config = require('./config/config.json')

//config
const app = express()
// si se desea utilizar mysql desabilita esto
//const dbopccion = config.bd.mysql

app.set('port', process.env.PORT || config.apires.portpru)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mydellwares ------------------------------------------------------------------
// si se desea utilizar mysql desabilita esto
//app.use(mysqlconnet(mysql, dbopccion, 'single'))
app.use(express.json())
//app.use()

//rootas -----------------------------------------------------------------------
//**** roota principal o gemerica *****/
app.get('/', (req, res) => {
    res.send('welcon to my apy')
})
//**** routers personalizados */
app.use('/tokeniser',tokeniser)
app.use('/genetic',verifyToken,generico)

//resever runnig----------------------------------------------------------------
app.listen(app.get('port'),config.apires.hosturl, () => {
    console.log("servidor se encuentra corriendo por el puerto", app.get('port'))
})