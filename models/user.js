const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema ({
    userName: {
        type: String,
        required: [true, 'Please include an username...'],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Please include your fullName...']
    },
    location: [{
        street: {
            type: String,
            required: [true, 'Please include a location...']
        },
        number: {
            type: Number,
            required: false
        }
    }],
    phone: {
        type: String,
        required: [true, 'Please include your phone...']
    },
    email: {
        type: String,
        required: [true, 'Please include your email...']
    },
    password: {
        type: String,
        required: [true, 'Please include your password...']
    }
})

module.exports = mongoose.model('User', User)