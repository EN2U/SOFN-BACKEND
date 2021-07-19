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
        const token = await user.generateToken()
        res.status(201).send({
            user: user,
            msg: "[SUCCESS] User created successfully!..."
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: `${error}`
        })
    }
})

const loginUser = AsyncWrapper(async(req, res, next, error) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({
            user: user,
            token: token,
            msg: `[SUCCESS] Welcome ${user.userName}, you logged in...`
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            msg: `${error}`
        })
    }
})

const deleteUser = AsyncWrapper(async(req, res, next) => {
        await User.findByIdAndDelete(req.params.id).exec()
            .then(doc => {
                if (!doc) return res.status(404).end()
                return res.status(204).end()
            }).catch(error => next(error))
})

const logout = AsyncWrapper(async (req, res, next) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, { token: "" })
        return res.status(200).end()
    } catch (error) {
        return res.status(400).send({
            success: false,
            msg: `${error}`
        })
    }
    
})

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    logout
}