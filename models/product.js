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
    nameProduct: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name product is required"
        },
        notNull: {
          msg: "Name product is required"
        }
      }
    },
    imageProduct: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Image product is required"
        },
        notNull: {
          msg: "Image product is required"
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Price is required"
        },
        notNull: {
          msg: "Price is required"
        },
        min: {
          args: [1],
          msg: "Price must be more than 0"
        }
      }
    },
    weight: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: "Weight is required"
        },
        notNull: {
          msg: "Weight is required"
        },
        min: {
          args: [1],
          msg: "Weight must be more than 0"
        }
      }
    },
    skinCategory: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Skin category is required"
        },
        notNull: {
          msg: "Skin category is required"
        }
      }
    },
    productCategory: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Product category is required"
        },
        notNull: {
          msg: "Product category is required"
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    BrandId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Brand is required"
        },
        notNull: {
          msg: "Brand is required"
        }
      }
    },
    publicIdImage: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};