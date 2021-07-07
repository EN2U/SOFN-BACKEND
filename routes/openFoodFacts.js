const express = require('express')
const router = express.Router()

router.get('/allElements', (req, res) => {
    console.log(req.body)
    if (Object.keys(req.body).length === 1) {
        res.status(200).json({
            success: true,
            msg: '[SUCCESS] Elements retrieved successfully...!'
        })
    } else {
        res.status(400).json({
            success: false,
            msg: "[ERROR] No page specified..."
        })
    }
    
})

router.get('/searchElement', (req, res) => {
    console.log(req.body)
    if (Object.keys(req.body).length === 2) {
        res.status(200).json({
            success: true,
            msg: '[SUCCESS] Elements retrieved successfully...!'
        })
    } else {
        res.status(400).json({
            success: false,
            msg: '[ERROR] No page or product specified...!'
        })
    }
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify("Pagina para obtener los productos especificos", null, 2))
})


module.exports = router