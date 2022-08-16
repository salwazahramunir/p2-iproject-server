'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Product, { foreignKey: "BrandId" })
    }
  }
  Brand.init({
    nameBrand: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name brand is required"
        },
        notNull: {
          msg: "Name brand is required"
        }
      }
    },
    logoBrand: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Logo brand is required"
        },
        notNull: {
          msg: "Logo brand is required"
        }
      }
    },
    publicIdLogo: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};