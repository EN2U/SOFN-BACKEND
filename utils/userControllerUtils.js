const bcrypt = require('bcrypt')

const initializeUser = (newUser, res) => {
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
}


module.exports = {
    initializeUser
}