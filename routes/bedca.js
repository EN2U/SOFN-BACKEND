const express = require('express')
const bedcaController = require('../controller/bedcaController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', bedcaController.initializeCSV)
router.get('/', bedcaController.bedcaProducts)
module.exports = router
