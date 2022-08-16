const { getValidExtension, saveImage } = require('../helper/multer')
const { Brand } = require('../models/index')
const fs = require('fs');

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
            const logoBrand     = req.file
            const { nameBrand } = req.body

            if (!logoBrand) {
                throw { name: "FileIsRequired" }
            }

            const extension = await getValidExtension(req.file.originalname)

            if (!extension) {
                fs.unlinkSync(req.file.path)
                throw { name: "InvalidFormatFile" }
            } 

            const filename = req.file.fieldname + '-' + Date.now() + '.' + extension

            const pathFrom = req.file.path;
            const pathTo = `uploads/brands/${filename}`

            const newBrand = await Brand.create({nameBrand, logoBrand: pathTo })
            await saveImage(pathFrom, pathTo)
            
            res.status(200).json({
                message: 'Success create brand',
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