const { User, Profile } = require('../models/index')
async function isProfileUserLogin(req, res, next) {
    try {
        const { id } = req.user
        const { profileId } = req.params

        const findProfile = await Profile.findOne({ where: { id: profileId} })

        if (findProfile.UserId !== id) {
            throw { name: "Forbidden" }
        }

        next()
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    isProfileUserLogin
}