const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { AsyncWrapper } = require('../utils/async-wrapper')
const key = 'mysecret'

const registerUser = AsyncWrapper(async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        success: true,
    })
})

module.exports = {
    registerUser
}