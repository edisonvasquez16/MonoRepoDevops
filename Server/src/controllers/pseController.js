const psePaymentSchema = require('../models/psePayment')

const createPsePayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const psePayment = psePaymentSchema(req.body)
        psePayment
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

const getAllPsePayments = (req, res) => {
    psePaymentSchema
        .find()
        .then(results => {
            if (results.length) {
                res.json({
                    status: 'OK',
                    message: 'PSE payments request',
                    results
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'PSE payments not found',
                    items: results.length
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const getAPsePayment = (req, res) => {
    const { id } = req.params;
    psePaymentSchema
        .findById(id)
        .then(result => {
            if (result !== null) {
                res.json({
                    status: 'OK',
                    message: 'PSE payment request',
                    result
                })
            } else {
                res.status(204).json({
                    status: '404',
                    message: 'PSE payment not found'
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

const updateAPsePayment = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 'Error',
            message: 'Body cannot be empty'
        })
    } else {
        const { id } = req.params;
        const { psereference, psereferencePse, pseuserEmail, psefullNameUser, psecellphone, pseamount } = req.body
        psePaymentSchema
            .updateOne({ _id: id }, { $set: { psereference, psereferencePse, pseuserEmail, psefullNameUser, psecellphone, pseamount } })
            .then(result => {
                if (result.modifiedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'PSE payment updated successfull',
                    idUpdated: id,
                    result
                })
            } else {
                res.status(204).json({
                    status: 'Error',
                    message: 'PSE payment not found'
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

const deleteAPsePayment = (req, res) => {
    const { id } = req.params;
    psePaymentSchema
        .deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(201).json({
                    status: 'OK',
                    message: 'PSE payment deleted successfull',
                    items_deleted: result.deletedCount
                })
            } else {
                res.status(404)
                res.json({
                    status: 'Error',
                    message: 'PSE payment not found',
                    items_deleted: result.deletedCount
                })
            }
        })
        .catch((error) => res.status(400).json({ message: error }))
}

module.exports = {
    createPsePayment,
    getAllPsePayments,
    getAPsePayment,
    updateAPsePayment,
    deleteAPsePayment
}