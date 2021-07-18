const express = require('express')
const userControllerUtils = require('../utils/userControllerUtils')
const router = express.Router()
const passport = require('passport')
const { AsyncWrapper } = require('../utils/async-wrapper')
const bcrypt = require('bcrypt')

const User = require('../models/User')


const registerUser = AsyncWrapper(async (req, res) => {
    const user = new User(req.body)

    try {
        if (req.body.password !== req.body.repeatPassword) throw new Error("Password doesnt match")
        await user.save()
        console.log(user)
        const token = await user.generateToken()

        res.status(201).send({
            user,
            token
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: `${error}`
        })
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
                        msg: `[SUCCESS] Deleted ${result.deletedCount} item...`
                    }))
                    .catch(error => res.status(400).send({ 
                        success: false,
                        msg: `[ERROR] Delete failed with error: ${error}...`
                    }))
            }
            else return res.status(400).send({ 
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