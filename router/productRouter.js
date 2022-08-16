const productRouter = require('express').Router()
const ProductController = require('../controller/ProductController')

productRouter.get('/', ProductController.readAllProduct)

module.exports = productRouter