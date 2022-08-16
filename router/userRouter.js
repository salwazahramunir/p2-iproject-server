const userRouter = require('express').Router()
const UserController = require('../controller/UserController')

userRouter.get('/', UserController.readAllUser)

module.exports = userRouter