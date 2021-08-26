const express = require('express')
const bedcaController = require('../controller/bedcaController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, bedcaController.initializeCSV)
router.get('/', auth, bedcaController.bedcaProducts)
module.exports = router
