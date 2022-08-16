const router = require('express').Router()
const authRouter = require('./authRouter')
const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const errorHandler = require('../middleware/errorHandler');
const { authentication } = require('../middleware/authentication')

router.use('/auth', authRouter)

router.use(authentication)

router.use('/brands', brandRouter)
router.use('/products', productRouter)

router.use(errorHandler)

module.exports = router