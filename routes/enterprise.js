const express = require('express')
const enterpriseController = require('../controller/enterpriseController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, enterpriseController.createEnterprise)

router.put('/details', auth, enterpriseController.updateEnterpriseDetails)

router.put('/logo', auth, enterpriseController.updateLogo)
router.put('/banner', auth, enterpriseController.updateBanner)
router.put('/social', auth, enterpriseController.updateSocialMedia)
router.put('/', auth, enterpriseController.updateEnterprise)

router.get('/:id', auth, enterpriseController.getEnterpriseProfile)
router.post('/getSelected', auth, enterpriseController.getEnterpriseById)
router.post('/newProduct', auth, enterpriseController.updateProduct)

router.get('/', auth, enterpriseController.getAllEnterprise)

module.exports = router
