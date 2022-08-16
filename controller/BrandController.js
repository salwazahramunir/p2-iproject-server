const { uploadToCloudinary, deleteToCloudinary } = require('../helper/cloudinary')
const { Brand } = require('../models/index')

class BrandController {
    static async readAllBrand(req, res, next) {
        try {
            const brands = await Brand.findAll()

            res.status(200).json(brands)
        } catch (error) {
            next(error)
        }
    }    

    static async addBrand(req, res, next) {
        try {
            if (!req.files) {
                throw {name: "FileIsRequired" }
            }

            const file = req.files.logoBrand
            const { nameBrand } = req.body

            const dataCloudinary = await uploadToCloudinary(file.tempFilePath, 'p2-individual-project/logo-brand');

            if (!nameBrand) {
                await deleteToCloudinary(dataCloudinary.public_id, 'p2-individual-project/logo-brand')
            }
            
            const newBrand = await Brand.create({ nameBrand, logoBrand: dataCloudinary.secure_url, publicIdLogo: dataCloudinary.public_id })
        
            res.status(201).json({
                message: "Success created brand",
                data: {
                    id: newBrand.id,
                    nameBrand: newBrand.nameBrand,
                    logoBrand: newBrand.logoBrand
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = BrandController