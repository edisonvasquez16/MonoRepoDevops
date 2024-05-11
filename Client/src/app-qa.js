require('dotenv').config()
const express = require('express')
const router = express.Router()
const maskRoutes = require('./routes/mask')
const app = express();
const morgan = require('morgan')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.set("views", __dirname + "/views");

app.get("/index", (req, res) => {
    res.render('home', {title: 'HOME'})
});

app.use(express.json())
app.use('/', maskRoutes)

app.use(express.json())

const port = process.env.PORT
app.listen(port, () => console.log('Client QA listening on port: ', port))

module.exports = router