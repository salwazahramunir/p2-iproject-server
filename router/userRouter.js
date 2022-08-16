const userRouter = require('express').Router()
const UserController = require('../controller/UserController')

userRouter.get('/', UserController.readAllUser)
userRouter.post('/', UserController.addUser)

module.exports = userRouter