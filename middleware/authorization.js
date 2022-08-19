const { User, Profile } = require('../models/index')
async function isProfileUserLogin(req, res, next) {
    try {
        const { id } = req.user
        
        const findProfile = await Profile.findOne({ where: { UserId: +id} })

        if (findProfile.UserId !== id) {
            throw { name: "Forbidden" }
        }

        next()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    isProfileUserLogin
}