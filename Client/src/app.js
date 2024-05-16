require('dotenv').config()
const express = require('express')
const router = express.Router()
const maskRoutes = require('./routes/mask')
const app = express();
const morgan = require('morgan')
const config = require('./config/ports')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");

app.get("/index", (req, res) => {
    res.render('home', {title: 'HOME'})
});

app.get("/", (req, res) => {
    res.render('home', {title: 'HOME'})
});

app.use(express.json())
app.use('/', maskRoutes)

app.use(express.json())

const environment = process.env.environment || 'dev'; 
const port = config[environment]

app.listen(port, () => console.log('Client listening environment and port: ', environment, port))

module.exports = router