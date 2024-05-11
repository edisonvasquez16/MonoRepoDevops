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

mongoose
    .connect(process.env.MONGO_DATABASE_QA)
    .then(() => console.log('Connected to MongoDB QA Successfull!'))
    .catch((error) => (console.error(error)))

const port = process.env.PORT
app.listen(port, () => console.log('Server QA listening on port: ', port))

module.exports = router