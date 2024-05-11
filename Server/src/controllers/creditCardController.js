const creditCardPaymentSchema = require('../models/creditCardPayment')

const createCreditcardPayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const creditCardPayment = creditCardPaymentSchema(req.body)
        creditCardPayment
            .save()
            .then(result => res.status(201).json(result))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    const validationErrors = {};
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message;
                    }
                    return res.status(400).json({ errors: validationErrors });
                }
                console.error(error);
            })
    }
}

const getAllCreditcardPayments = (req, res) => {
    creditCardPaymentSchema
        .find()
        .then(results => {
            if (results.length) {
                res.json({
                    status: 'OK',
                    message: 'Credit card payments request',
                    results
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Credit card payments not found',
                    items: results.length
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const getACreditcardPayment = (req, res) => {
    const { id } = req.params;
    creditCardPaymentSchema
        .findById(id)
        .then(result => {
            if (result !== null) {
                res.json({
                    status: 'OK',
                    message: 'Credit card payment request',
                    result
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Credit card payment not found'
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const updateACreditcardPayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const { id } = req.params;
        const { ccuserEmail, cccellphone } = req.body
        creditCardPaymentSchema
            .updateOne({ _id: id }, { $set: { ccuserEmail, cccellphone } })
            .then(result => {
                if (result.modifiedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'Credit card payment updated successfull',
                    idUpdated: id,
                    result
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Credit card payment not found'
                })
            }
            })
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    const validationErrors = {};
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message;
                    }
                    return res.status(400).json({ errors: validationErrors });
                }
                console.error(error);
            })
    }
}


const deleteACreditcardPayment = (req, res) => {
    const { id } = req.params;
    creditCardPaymentSchema
        .deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'Credit card payment deleted successfull',
                    items_deleted: result.deletedCount
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Credit card payment not found',
                    items_deleted: result.deletedCount
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

module.exports = {
    createCreditcardPayment,
    getAllCreditcardPayments,
    getACreditcardPayment,
    updateACreditcardPayment,
    deleteACreditcardPayment
}