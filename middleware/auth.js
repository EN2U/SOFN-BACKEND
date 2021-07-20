const jwt = require('jsonwebtoken');
let config = require("../services/config")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, config.TOKEN_SECRET)
        const userId = decodedToken._id
        if (req.params.id && req.params.id !== userId) throw new Error('Invalid user ID')
        else next()
    } catch (error) {
        res.status(401).json({
            error: `${error}`
        })
    }
};