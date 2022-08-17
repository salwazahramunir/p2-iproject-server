const { User, Profile } = require('../models/index')
class ProfileController {
    static async showProfile(req, res, next) {
        try {
            const { profileId } = req.params

            const findProfile = await Profile.findByPk(+profileId, {
                include: [{
                    model: User,
                    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt", "publicIdImage"] }
            })

            if (!findProfile) {
                throw { name: "NotFound" }
            }

            res.status(200).json(findProfile)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController