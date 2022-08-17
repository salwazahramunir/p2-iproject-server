const profileRouter = require('express').Router()
const ProfileController = require('../controller/ProfileController')
const { isProfileUserLogin } = require('../middleware/authorization')

profileRouter.get('/:profileId', isProfileUserLogin, ProfileController.showProfile)
profileRouter.put('/:profileId', isProfileUserLogin, ProfileController.updateProfile)

module.exports = profileRouter