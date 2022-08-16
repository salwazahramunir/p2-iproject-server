const { Product, Brand } = require('../models/index')

class ProductController {
    static async readAllProduct(req, res, next) {
        try {
            const products = await Product.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [{
                    model: Brand,
                    attributes: { exclude: ["createdAt", "updatedAt", "publicIdLogo"] },
                }]
            })

            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController