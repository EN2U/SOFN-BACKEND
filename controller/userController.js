const express = require('express')
const userControllerUtils = require('../utils/userControllerUtils')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { AsyncWrapper } = require('../utils/async-wrapper')
const key = 'mysecret'

const User = require('../models/User')


const registerUser = AsyncWrapper(async (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    
    /* ///////////////////////////////////
                Password Validation
    /////////////////////////////////// */

    if (req.body.password !== req.body.repeatPassword) {
        return res.status(422).send({
            success: false,
            msg: "[ERROR] Password not match..."
        })
    } else {

    /* ///////////////////////////////////
                User Validation
    /////////////////////////////////// */

        const userName = await User.findOne({ userName: req.body.userName }).catch(error => {console.error(error)})
        const mail = await User.findOne({ email: req.body.email }).catch(error => { console.error(error)})

        if (userName) return res.status(422).send({
            success: false,
            msg: "[ERROR] Username is already taken..."
        })
        else if (mail) return res.status(422).send({
            success: false,
            msg: "[ERROR] Mail is already taken..."
        }) 
        else userControllerUtils.initializeUser(new User({
            userName: req.body.userName,
            fullName: req.body.fullName,
            street: req.body.street,
            number: req.body.number,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        }), res)
    }
})

module.exports = {
    registerUser
}