const { User, Profile } = require('../models/index')

class UserController {
    static async readAllUser(req, res, next) {
        try {
            const users = await User.findAll({
                include: [{
                    model: Profile,
                    attributes: { exclude: ["createdAt", "updatedAt", "publicIdImage"] }
                }],
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            })

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }   
}

module.exports = UserController