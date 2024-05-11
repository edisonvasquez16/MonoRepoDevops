const mongoose = require('mongoose')

const pseSchema = mongoose.Schema({

  pseuserEmail: {
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
      message: 'Email is not valid'
    }
  },
  psefullNameUser: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [5, 'Name must be at least 5 characters long.'],
    maxlength: [50, 'Name cannot be more than 50 characters long.']
  },
  psereference: {
    type: String,
    required: [true, 'Reference is required'],
    unique: true,
    trim: true,
    minlength: [5, 'Reference must be at least 5 characters long.'],
    maxlength: [10, 'Reference cannot be more than 10 characters long.']
  },
  psereferencePse: {
    type: String,
    required: [true, 'Reference PSE is required'],
    unique: true,
    trim: true,
    minlength: [5, 'Reference PSE must be at least 5 characters long.'],
    maxlength: [10, 'Reference PSE cannot be more than 10 characters long.']
  },
  pseamount: {
    type: Number,
    required: [true, 'Amount is required'],
    trim: true,
    minlength: [4, 'Amount must be at least 4 digits long.'],
    maxlength: [7, 'Amount cannot be more than 7 digits long.']
  },
  psecellphone: {
    type: String,
    required: [true, 'Cellphone is required'],
    trim: true,
    minlength: [10, 'Cellphone must be at least 10 digits long.'],
    maxlength: [15, 'Cellphone cannot be more than 15 digits long.']
  }

})

module.exports = mongoose.model('psePayment', pseSchema)