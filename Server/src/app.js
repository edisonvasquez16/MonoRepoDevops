require('dotenv').config()
const express = require('express')
const router = express.Router()
const app = express();
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express')
const pseRoutes = require('./routes/psePayment')
const cashRoutes = require('./routes/cashPayment')
const ccRoutes = require('./routes/creaditCardPayment')
const swaggerConfig = require('./config/swaggerConfig')
const morgan = require('morgan')
const config = require('./config/ports')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.json())
app.use('/api', cashRoutes)
app.use('/api', pseRoutes)
app.use('/api', ccRoutes)
app.use('/api-doc', swaggerUI.serve, swaggerConfig.swaggerSetup)
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page not found'})
})

const environment = process.env.environment || 'dev'; 
const port = config[environment]

const pathdb = process.env.MONGO_BASE + environment + ":" + process.env.MONGO_NAME
console.log('Connect to MongoDB for path:', pathdb)
mongoose
.connect(pathdb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Successfull!'))
    .catch((error) => (console.error(error)))

app.listen(port, () => console.log('Server listening environment and port: ', environment, port))

module.exports = router