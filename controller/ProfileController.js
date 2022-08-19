const { uploadToCloudinary, deleteToCloudinary } = require('../helper/cloudinary')
const { User, Profile } = require('../models/index')

class ProfileController {
    static async showProfile(req, res, next) {
        try {
            const { id } = req.user

            let findUser = await User.findByPk(+id, {
                include: [{
                    model: Profile,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            })

            if (!findUser) {
                throw { name: "NotFound" }
            }

            res.status(200).json(findUser)
        } catch (error) {
            next(error)
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { id } = req.user
            
            let findUser = await User.findByPk(+id, {
                include: [{
                    model: Profile,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            })

            if (!findUser) {
                throw { name: "NotFound" }
            }
            
            let file = req.files
            let { password } = req.body
            const { username, email, fullName, gender, dateOfBirth, phoneNumber } = req.body
            let dataCloudinary = {}

            if (!file) {
                file = {
                    tempFilePath: findUser.Profile.imageUser
                }

                dataCloudinary = {
                    secure_url: findUser.Profile.imageUser,
                    public_id: findUser.Profile.publicIdImage
                }
            } else {
                file = req.files.imageUser
                dataCloudinary = await uploadToCloudinary(file.tempFilePath, 'p2-individual-project/image-user')
            }

            if (!username || !email ) {
                if (file.name) {
                    await deleteToCloudinary(dataCloudinary.public_id, 'p2-individual-project/image-user')
                }
            }

            if (!password) {
                password = findUser.password
            }

            await User.update({ username, email, password }, { where: { id }, individualHooks: true })
            await Profile.update({ imageUser: dataCloudinary.secure_url, publicIdImage: dataCloudinary.public_id, fullName, gender, dateOfBirth, phoneNumber }, { where: { id: findUser.Profile.id }})
            
            if (file.name && findUser.Profile.publicIdImage) {
                await deleteToCloudinary(findUser.Profile.publicIdImage, 'p2-individual-project/image-user')
            }

            findUser = await User.findByPk(+id, {
                include: [{
                    model: Profile,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }) 

            res.status(200).json({
                message: "Success updated profile",
                data: findUser
            })
        } catch (error) {
            next(error)
        }
    }


}

module.exports = ProfileController