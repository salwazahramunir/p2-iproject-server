const profileRouter = require('express').Router()
const ProfileController = require('../controller/ProfileController')
const { isProfileUserLogin } = require('../middleware/authorization')

profileRouter.get('/:profileId', isProfileUserLogin, ProfileController.showProfile)

module.exports = profileRouter