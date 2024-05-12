const path = require('path')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const config = require('../config/ports')

const environment = process.env.environment || 'dev'; 
const port = config[environment]

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Example application - Payments with MongoBD",
            version: "1.0.1"
        },
        servers: [
            {
                url: process.env.HOST + ":" + port
            }
        ]
    },
    apis: [`${path.join(__dirname, "../routes/*.js")}`]
}

const swaggerSetup = swaggerUI.setup(swaggerJsDoc(swaggerSpec))


module.exports = {
    swaggerSetup
}