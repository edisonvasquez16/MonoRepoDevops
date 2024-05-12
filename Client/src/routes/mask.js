const creditCardPaymentSchema = require('../models/creditCardPayment')
const cashPaymentSchema = require('../models/cashPayment')
const psePaymentSchema = require('../models/psePayment')
const express = require('express')
const router = express.Router()
const axios = require('axios');
const config = require('../config/server-ports')

const environment = process.env.environment || 'dev'; 
const path = process.env.HOST + ":" + config[environment]

//GET ALL ITEMS TO LIST
router.get("/cashform", async (req, res) => {
    const response = await axios.get(path + '/api/v1/cash-payments')
    res.render('forms/cashform', {title: 'CASH', cashPayments: response.data})
});

router.get("/pseform", async (req, res) => {
    const response = await axios.get(path + '/api/v1/pse-payments')
    res.render('forms/pseform', {title: 'PSE', psePayments: response.data})
});

router.get("/ccform", async (req, res) => {
    const response = await axios.get(path + '/api/v1/credit-card-payments')
    res.render('forms/ccform', {title: 'CC', ccPayments: response.data})
});

//CREATE PAYMENTS AND CONSULT DETAILS
router.post("/cashform/create", async (req, res) => {
    const cashPayment = cashPaymentSchema(req.body)
    const responseCreate = await axios.post(path + '/api/v1/cash-payment/', cashPayment)
    res.render('details/cashdetail', {title: 'CASH', cashPayment: responseCreate.data})
});

router.post("/pseform/create", async (req, res) => {
    const psePayment = psePaymentSchema(req.body)
    const responseCreate = await axios.post(path + '/api/v1/pse-payment/', psePayment)
    res.render('details/psedetail', {title: 'PSE', psePayment: responseCreate.data})
});

router.post("/ccform/create", async (req, res) => {
    const ccPayment = creditCardPaymentSchema(req.body)
    const responseCreate = await axios.post(path + '/api/v1/credit-card-payment/', ccPayment)
    res.render('details/ccdetail', {title: 'CC', ccPayment: responseCreate.data})
});

//CONSULT DETAIL A PAYMENT
router.get("/details/cashdetail/:id", async (req, res) => {
    const { id } = req.params;
    const response = await axios.get(path + '/api/v1/cash-payment/' + id)
    res.render('details/cashdetail', {title: 'CASH', cashPayment: response.data.result})
});

router.get("/details/psedetail/:id", async (req, res) => {
    const { id } = req.params;
    const response = await axios.get(path + '/api/v1/pse-payment/' + id)
    res.render('details/psedetail', {title: 'PSE', psePayment: response.data.result})
});

router.get("/details/ccdetail/:id", async (req, res) => {
    const { id } = req.params;
    const response = await axios.get(path + '/api/v1/credit-card-payment/' + id)
    res.render('details/ccdetail', {title: 'CC', ccPayment: response.data.result})
});

module.exports = router;