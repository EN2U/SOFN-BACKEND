const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const Enterprise = new Schema({
  name: {
    type: String,
    required: [true, 'Please incluse the name of the company...'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please include your email...'],
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address...']
  },
  owner: {
    type: String,
    required: [true, 'Please include an owner of the company...']
  },
  is_productor: {
    type: Boolean,
    required: [true, 'Please select if you are a productor...']
  },
  company_number: {
    type: String,
    unique: true
  },
  contact_phone: {
    type: Number,
    required: [true, 'Please select a contact phone...']
  },
  website: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  linkedin: {
    type: String
  },
  instagram: {
    type: String
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  banner: {
    data: Buffer,
    contentType: String
  },
  address: [
    {
      first_address: {
        type: String,
        required: [true, 'Please add an address...']
      },
      second_address: {
        type: String
      },
      zip_code: {
        type: String,
        required: [true, 'Please add a zip code...']
      },
      province: {
        type: String,
        required: [true, 'Please add a province...']
      },
      city: {
        type: String,
        required: [true, 'Please add a city...']
      }
    }
  ],
  long_description: {
    type: String
  },
  short_description: {
    type: String
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Enterprise', Enterprise)
