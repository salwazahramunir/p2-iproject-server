'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, { foreignKey: "BrandId" })
    }
  }
  Product.init({
    nameProduct: DataTypes.STRING,
    imageProduct: DataTypes.STRING,
    price: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    skinCategory: DataTypes.STRING,
    productCategory: DataTypes.STRING,
    description: DataTypes.TEXT,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};