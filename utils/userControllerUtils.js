const bcrypt = require('bcrypt')

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


module.exports = {
    initializeUser
}