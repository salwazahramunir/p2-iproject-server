const { uploadToCloudinary, deleteToCloudinary } = require('../helper/cloudinary')
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

    static async updateProfile(req, res, next) {
        try {
            const { profileId } = req.params
            
            let findProfile = await Profile.findByPk(+profileId, {
                include: [{
                    model: User,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            
            if (!findProfile) {
                throw { name: "NotFound" }
            }
            
            let file = req.files
            let { password } = req.body
            const { username, email, fullName, gender, dateOfBirth, phoneNumber } = req.body
            let dataCloudinary = {}

            if (!file) {
                file = {
                    tempFilePath: findProfile.imageUser
                }

                dataCloudinary = {
                    secure_url: findProfile.imageUser,
                    public_id: findProfile.publicIdImage
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
                password = findProfile.User.password
            }

            await User.update({ username, email, password }, { where: { id: findProfile.UserId } })
            await Profile.update({ imageUser: dataCloudinary.secure_url, publicIdImage: dataCloudinary.public_id, fullName, gender, dateOfBirth, phoneNumber }, { where: { id: profileId }})
            
            if (file.name && findProfile.publicIdImage) {
                await deleteToCloudinary(findProfile.publicIdImage, 'p2-individual-project/image-user')
            }

            findProfile = await Profile.findByPk(+profileId, {
                include: [{
                    model: User,
                    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt", "publicIdImage"] }
            })

            res.status(200).json({
                message: "Success updated profile",
                data: findProfile
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController