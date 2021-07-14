const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = 'mysecret'

const initializeUser = (newUser, res) => {
    try {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) throw error
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) throw error
                newUser.password = hash
                newUser.save((error, user) => {
                    if (error) return res.status(400).json(error);
                    res.status(201).send({
                        success: true,
                        user: user,
                        msg: "[SUCCESS] successfully created..."
                    })
                })
            })
        })
    } catch(error) {
        console.error(error)
        res.status(400).send({
            success: false,
            msg: `[ERROR] ${error}`
        })
    }
}

const processUserData = (password, user, res) => {
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if (!isMatch) return res.status(404).send({
            success: false,
            msg: `[ERROR] Password doesnt match...`
        })
        const payload = { _id: user._id, userName: user.userName, email: user.email }
        jwt.sign(payload, key, { expiresIn: 86400000 }, (error, token) => {
            if (error) return res.status(400).send({
                success: false,
                msg: `[ERROR] ${error}`
            })
            return res.status(200).send({
                success: true,
                token: token,
                user: user,
                msg: "[SUCCESS] Login successfully..."
            })
        })
        
    })
}

module.exports = {
    initializeUser,
    processUserData
}