const express = require('express')
const userControllerUtils = require('../utils/userControllerUtils')
const router = express.Router()
const passport = require('passport')
const { AsyncWrapper } = require('../utils/async-wrapper')
const bcrypt = require('bcrypt')


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

const loginUser = AsyncWrapper(async(req, res, next, error) => {
    User.findOne({
        userName: req.body.userName
    }).then(user => {
        if (!user) return res.status(404).send({
            success: false,
            msg: `[ERROR] User not found...`
        })

        userControllerUtils.processUserData(req.body.password, user, res)
    })
})

const removeUser = AsyncWrapper(async(req, res, next, error) => {
    User.findOne({
        userName: req.body.userName
    }).then(user => {
        if (!user) return res.status(404).send({
            success: false,
            msg: `[ERROR] No document matches the provided user....`
        })
        bcrypt.compare(req.body.password, user.password, (error, data) => {
            if (error) return res.status(404).send({
                success: false,
                msg: `[ERROR] Error on password evaluation ${error}..`
            })
            if (data) {
                User.deleteOne(user)
                    .then(result => res.status(202).send({
                        success: true,
                        msg: `[SUCCESS] Deleted ${result.deletedCount} item.`
                    }))
                    .catch(error => res.status(400).send({ 
                        success: false,
                        msg: `[ERROR] Delete failed with error: ${error}`
                    }))
            }
            else return res.status(401).send({ 
                success: false,
                msg: "[ERROR] Password doesnt match..." 
            })
        })
    })
})

module.exports = {
    registerUser,
    loginUser,
    removeUser
}