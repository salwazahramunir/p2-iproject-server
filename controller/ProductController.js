const { uploadToCloudinary, deleteToCloudinary } = require('../helper/cloudinary')
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

    static async addProduct(req, res, next) {
        try {
            if (!req.files) {
                throw { name: "FileIsRequired" }
            }
            const file = req.files.imageProduct
            const { nameProduct, price, weight, skinCategory, productCategory, description, BrandId } = req.body

            const dataCloudinary = await uploadToCloudinary(file.tempFilePath, 'p2-individual-project/image-product')

            if (!nameProduct || !price || !weight || !skinCategory || !productCategory || !description || !BrandId ) {
                await deleteToCloudinary(dataCloudinary.public_id, 'p2-individual-project/image-product')
            }

            const newProduct = await Product.create({ nameProduct, imageProduct: dataCloudinary.secure_url, publicIdImage: dataCloudinary.public_id, price, weight, skinCategory, productCategory, description, BrandId })

            res.status(201).json({
                message: `Success created ${newProduct.nameProduct}`,
                data: newProduct
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController