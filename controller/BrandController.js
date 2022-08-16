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

    static async updateBrand(req, res, next) {
        try {
            const { brandId } = req.params

            let findBrand = await Brand.findByPk(+brandId)

            if (!findBrand) {
                throw { name: "NotFound" }    
            }

            let file = req.files
            const { nameBrand } = req.body
            let dataCloudinary = {}

            if (!file) {
                file = {
                    tempFilePath: findBrand.logoBrand
                }
            } else {
                file = req.files.logoBrand
                dataCloudinary = await uploadToCloudinary(file.tempFilePath, 'p2-individual-project/logo-brand')
            }

            if (!nameBrand) {
                await deleteToCloudinary(dataCloudinary.public_id, 'p2-individual-project/logo-brand')
            }

            await Brand.update({ nameBrand, logoBrand: dataCloudinary.secure_url, publicIdLogo: dataCloudinary.public_id }, { where: { id: brandId }})
            
            if (file.name) {
                await deleteToCloudinary(findBrand.publicIdLogo, 'p2-individual-project/logo-brand')
            }
            
            findBrand = await Brand.findByPk(+brandId)
            
            res.status(200).json({
                message: `Success updated ${findBrand.nameBrand}`,
                data: {
                    id: findBrand.id,
                    nameBrand: findBrand.nameBrand,
                    logoBrand: findBrand.logoBrand
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async showBrand(req, res, next) {
        try {
            const { brandId } = req.params

            const findBrand = await Brand.findByPk(+brandId, {
                attributes: {exclude:  ["createdAt", "updatedAt", "publicIdLogo"]}
            })

            if (!findBrand) {
                throw { name: "NotFound" }
            }

            res.status(200).json(findBrand)
        } catch (error) {
            next(error)
        }
    }

    static async deleteBrand(req, res, next) {
        try {
            const { brandId } = req.params

            const findBrand = await Brand.findByPk(+brandId)

            if (!findBrand) {
                throw { name: "NotFound" }
            }

            const deleteBrand = await Brand.destroy({ where: { id: brandId } })
            
            if (deleteBrand) {
                await deleteToCloudinary(findBrand.publicIdLogo, 'p2-individual-project/logo-brand')
            }

            res.status(200).json({
                message: `Success deleted ${findBrand.nameBrand}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BrandController