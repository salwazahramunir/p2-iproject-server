const profileRouter = require('express').Router()
const ProfileController = require('../controller/ProfileController')
const { isProfileUserLogin } = require('../middleware/authorization')

profileRouter.get('/', isProfileUserLogin, ProfileController.showProfile)
profileRouter.put('/', isProfileUserLogin, ProfileController.updateProfile)

module.exports = profileRouter