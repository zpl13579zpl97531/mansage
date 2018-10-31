const express = require('express')

const router = express.Router()

const positionController = require('../controllers/position.controller')
const fsUploadMiddleware = require('../middlewares/fileupload')

router.get('/list', positionController.list)

router.post('/save', fsUploadMiddleware.fileupload, positionController.save)

router.delete('/remove', positionController.remove)

router.get('/listone', positionController.listone)

router.post('/update', fsUploadMiddleware.fileupload, positionController.update)

module.exports = router

//http
//mothed: get, post, put, delete