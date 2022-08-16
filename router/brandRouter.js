const brandRouter = require('express').Router()
const BrandController = require('../controller/BrandController')
const multer = require('multer')
const diskStorage = multer.diskStorage({
    destination: 'uploads/brands',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: diskStorage });

brandRouter.get('/', BrandController.readAllBrand)
brandRouter.post('/', upload.single('logoBrand'), BrandController.addBrand)

module.exports = brandRouter