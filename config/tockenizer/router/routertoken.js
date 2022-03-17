const express = require('express')
const rooutes = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../../config.json')

//**** atentificacion *****/
rooutes.use('/', (req, res) => {
    const user = config.apidatkey
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
    
})

module.exports = rooutes