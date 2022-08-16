const brandRouter = require('express').Router()
const BrandController = require('../controller/BrandController')

brandRouter.get('/', BrandController.readAllBrand)

module.exports = brandRouter