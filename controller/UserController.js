const { uploadToCloudinary, deleteToCloudinary } = require('../helper/cloudinary')
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

    static async addUser(req, res, next) {
        try {
            const { username, email, password, role } = req.body

            const newUser = await User.create({ username, email, password, role })

            const newProfile = await Profile.create({ UserId: newUser.id })

            res.status(201).json({
                message: `Success created ${newUser.username}`,
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    role: newUser.role,
                    UserId: newProfile.UserId
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController