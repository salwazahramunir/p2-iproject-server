const router = require('express').Router()
const authRouter = require('./authRouter')
const errorHandler = require('../middleware/errorHandler');

router.use('/auth', authRouter)
router.use(errorHandler)

module.exports = router