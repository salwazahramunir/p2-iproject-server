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
}

module.exports = BrandController