const express = require('express')
const enterpriseController = require('../controller/enterpriseController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', enterpriseController.createEnterprise)

module.exports = router
