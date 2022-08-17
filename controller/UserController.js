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
                    ProfileId: newProfile.id
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { userId } = req.params
            const { username, email, password, role } = req.body

            let findUser = await User.findByPk(+userId)

            if (!findUser) {
                throw { name: "NotFound" }
            }

            await User.update({ username, email, password, role }, { where: { id: userId } })
            
            findUser = await User.findByPk(+userId)

            const findProfile = await Profile.findOne({ where: { UserId: +userId } })

            res.status(200).json({
                message: `Success updated ${findUser.username}`,
                data: {
                    id: findUser.id,
                    username: findUser.username,
                    role: findUser.role,
                    UserId: findProfile.id
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async showUser(req, res, next) {
        try {
            const { userId } = req.params

            const findUser = await User.findByPk(+userId, {
                attributes: {exclude:  ["password", "createdAt", "updatedAt"]}
            })

            if (!findUser) {
                throw { name: "NotFound" }
            }

            const findProfile = await Profile.findOne({ where: { UserId: +userId } })

            res.status(200).json({
                 data: {
                    id: findUser.id,
                    username: findUser.username,
                    role: findUser.role,
                    UserId: findProfile.id
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController