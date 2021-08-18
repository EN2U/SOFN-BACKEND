const express = require('express')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/profile/:id', auth, userController.getProfile)

router.post('/signup', userController.signup)

router.post('/login', userController.loginUser)

// /:id
router.delete('/:id', userController.deleteUser)

router.put('/:id', auth, userController.updateUser)

module.exports = router
