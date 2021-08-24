const express = require('express')
const enterpriseController = require('../controller/enterpriseController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', enterpriseController.createEnterprise)

router.put('/details', enterpriseController.updateEnterpriseDetails)

router.put('/logo', enterpriseController.updateLogo)
router.put('/banner', enterpriseController.updateBanner)
router.put('/social', enterpriseController.updateSocialMedia)
router.put('/', enterpriseController.updateEnterprise)

router.get('/:id', enterpriseController.getEnterpriseProfile)
router.post('/getSelected', enterpriseController.getEnterpriseById)
router.post('/newProduct', enterpriseController.updateProduct)

module.exports = router
