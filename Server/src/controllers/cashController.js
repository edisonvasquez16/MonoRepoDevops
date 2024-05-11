const cashPaymentSchema = require('../models/cashPayment')

const createCashPayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const cashPayment = cashPaymentSchema(req.body)
        cashPayment
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

const getAllCashPayments = (req, res) => {
    cashPaymentSchema
        .find()
        .then(results => {
            if (results.length) {
                res.json({
                    status: 'OK',
                    message: 'Cash payments request',
                    results
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Cash payments not found',
                    items: results.length
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const getACashPayment = (req, res) => {
    const { id } = req.params;
    cashPaymentSchema
        .findById(id)
        .then(result => {
            if (result !== null) {
                res.json({
                    status: 'OK',
                    message: 'Cash payment request',
                    result
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Cash payment not found'
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const updateACashPayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const { id } = req.params;
        const { cashuserEmail, cashcellphone } = req.body
        cashPaymentSchema
            .updateOne({ _id: id }, { $set: { cashuserEmail, cashcellphone } })
            .then(result => {
                if (result.modifiedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'Cash payment updated successfull',
                    idUpdated: id,
                    result
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Cash payment not found'
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

const deleteACashPayment = (req, res) => {
    const { id } = req.params;
    cashPaymentSchema
        .deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'Cash payment deleted successfull',
                    items_deleted: result.deletedCount
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'Cash payment not found',
                    items_deleted: result.deletedCount
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}


module.exports = {
    createCashPayment,
    getAllCashPayments,
    getACashPayment,
    updateACashPayment,
    deleteACashPayment
}