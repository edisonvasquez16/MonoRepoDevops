const mongoose = require('mongoose')

const creditCardPaymentSchema = mongoose.Schema({

  ccreference: {
    type: String,
    required: [true, 'Reference is required'],
    unique: true,
    trim: true,
    minlength: [5, 'Reference must be at least 5 characters long.'],
    maxlength: [10, 'Reference cannot be more than 10 characters long.']
  },
  ccName: {
    type: String,
    required: [true, 'Name in credit card is required'],
    minlength: [10, 'Name must be at least 10 characters long.'],
    maxlength: [50, 'Name cannot be more than 50 characters long.']
  },
  ccNumber: {
    type: String,
    required: [true, 'Number is required'],
    trim: true,
    minlength: [16, 'Number must be at least 16 digits long.'],
    maxlength: [16, 'Number cannot be more than 16 digits long.']
  },
  cclevel: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['VISA', 'MASTERCARD', 'AMERICAN_EXPRESS'],
    message: 'Level must be "VISA," "MASTERCARD," or "AMERICAN_EXPRESS."'
  },
  ccMonthExp: {
    type: Number,
    required: [true, 'Month expiration is required'],
    min: [1, 'Month expiration must be at least 1.'],
    max: [12, 'Month expiration cannot be more than 12.']
  },
  ccYearExp: {
    type: Number,
    required: [true, 'Year expiration is required'],
    min: [23, 'Year expiration must be at least 23.'],
    max: [50, 'Year expiration cannot be more than 50.']
  },
  ccDues: {
    type: Number,
    required: [true, 'Dues is required'],
    min: [1, 'Dues must be at least 1.'],
    max: [48, 'Dues cannot be more than 48.']
  },
  ccSecurityCode: {
    type: Number,
    required: [true, 'Security code is required'],
    minlength: [3, 'Security code must be at least 3 characters long.'],
    maxlength: [3, 'Security code be more than 3 characters long.']
  },
  ccPayDate: {
    type: String,
    required: [true, 'Pay date is required'],
    validate: {
      validator: function (value) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      },
      message: 'Invalid date format. Please use "YYYY-MM-DD".'
    }
  },
  ccuserEmail: {
    type: String,
    required: [true, 'Email is required'],
    unique: false,
    trim: true,
    lowercase: true,
    minlength: [5, 'Email must be at least 5 characters long.'],
    maxlength: [50, 'Email cannot be more than 50 characters long.'],
    validate: {
      validator: (value) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Email is not valid',
    }
  },
  ccamount: {
    type: String,
    required: [true, 'Amount is required'],
    trim: true,
    minlength: [4, 'Amount must be at least 4 characters long.'],
    maxlength: [7, 'Amount cannot be more than 7 characters long.']
  },
  cccellphone: {
    type: String,
    required: [true, 'Cellphone is required'],
    trim: true,
    minlength: [10, 'Cellphone must be at least 10 characters long.'],
    maxlength: [15, 'Cellphone cannot be more than 15 characters long.']
  }

})

module.exports = mongoose.model('creditCardPayment', creditCardPaymentSchema)