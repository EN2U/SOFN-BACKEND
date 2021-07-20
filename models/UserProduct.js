const mongoose = require('mongoose')
const { Schema } = mongoose

const UserProduct = new Schema ({
    userName: {
        type: String,
        required: [true, 'Please include an username...'],
        unique: true
    },
    product: {
        type: String,
        required: [true, 'Please include a product name...']
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: [true, 'Please include a price for the product per /Kg....']
    },
    amount: {
        type: String,
        required: [true, 'Please include the amount of the product you have available...']
    },
    brand: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('UserProduct', UserProduct)