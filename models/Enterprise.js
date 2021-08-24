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
    type: String
  },
  contact_phone: {
    type: Number,
    required: [true, 'Please select a contact phone...']
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'User needed...']
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
  long_description: {
    type: String
  },
  short_description: {
    type: String
  },

  product: [
    {
      name: {
        type: String,
        required: [true, 'Please add a name of the product...']
      },
      description: {
        type: String
      },
      unit_size: {
        type: Number,
        required: [true, 'Please add the amount of the product you wanna sell...']
      },
      unit_type: {
        type: String
      },
      category: {
        type: String
      },
      price: {
        type: Number
      },
      ammount: {
        type: Number
      }
    }
  ],
  address:
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
      country: {
        type: String,
        required: [true, 'Please add a country...']
      }
    }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Enterprise', Enterprise)
