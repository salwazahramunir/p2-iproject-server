const productRouter = require('express').Router()
const ProductController = require('../controller/ProductController')

productRouter.get('/', ProductController.readAllProduct)
productRouter.post('/', ProductController.addProduct)

module.exports = productRouter