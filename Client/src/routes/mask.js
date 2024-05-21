const express = require('express');
const axios = require('axios');
const creditCardPaymentSchema = require('../models/creditCardPayment');
const cashPaymentSchema = require('../models/cashPayment');
const psePaymentSchema = require('../models/psePayment');

const router = express.Router();

const path = `${process.env.HOST_SERVER}:${process.env.PORT_SERVER}`;

const fetchPaymentDetails = (paymentType, schema) => async (req, res, next) => {
    try {
        const response = await axios.get(`${path}/api/v1/${paymentType}-payments`);
        req.paymentData = response.data;
        req.paymentType = paymentType.toUpperCase();
        req.schema = schema;
        next();
    } catch (error) {
        console.error(`Error fetching ${paymentType} payments:`, error);
        res.status(500).send('Error fetching payment data');
    }
};

const fetchPaymentDetail = (paymentType) => async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${path}/api/v1/${paymentType}-payment/${id}`);
        req.paymentDetail = response.data.result;
        req.paymentType = paymentType.toUpperCase();
        next();
    } catch (error) {
        console.error(`Error fetching ${paymentType} payment detail:`, error);
        res.status(500).send('Error fetching payment detail');
    }
};

router.get("/cashform", fetchPaymentDetails('cash', cashPaymentSchema), (req, res) => {
    res.render('forms/cashform', { title: 'CASH', cashPayments: req.paymentData });
});

router.get("/pseform", fetchPaymentDetails('pse', psePaymentSchema), (req, res) => {
    res.render('forms/pseform', { title: 'PSE', psePayments: req.paymentData });
});

router.get("/ccform", fetchPaymentDetails('credit-card', creditCardPaymentSchema), (req, res) => {
    res.render('forms/ccform', { title: 'CC', ccPayments: req.paymentData });
});

const createPayment = (paymentType, schema) => async (req, res) => {
    try {
        const payment = new schema(req.body);
        const response = await axios.post(`${path}/api/v1/${paymentType}-payment/`, payment);
        if (paymentType === 'credit-card')
            paymentType = 'cc'
        res.render(`details/${paymentType}detail`, { title: req.paymentType, [`${paymentType}Payment`]: response.data });
    } catch (error) {
        console.error(`Error creating ${paymentType} payment:`, error);
        res.status(500).send('Error creating payment');
    }
};

router.post("/cashform/create", createPayment('cash', cashPaymentSchema));
router.post("/pseform/create", createPayment('pse', psePaymentSchema));
router.post("/ccform/create", createPayment('credit-card', creditCardPaymentSchema));

router.get("/details/cashdetail/:id", fetchPaymentDetail('cash'), (req, res) => {
    res.render('details/cashdetail', { title: 'CASH', cashPayment: req.paymentDetail });
});

router.get("/details/psedetail/:id", fetchPaymentDetail('pse'), (req, res) => {
    res.render('details/psedetail', { title: 'PSE', psePayment: req.paymentDetail });
});

router.get("/details/ccdetail/:id", fetchPaymentDetail('credit-card'), (req, res) => {
    res.render('details/ccdetail', { title: 'CC', ccPayment: req.paymentDetail });
});

module.exports = router;
