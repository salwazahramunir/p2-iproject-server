'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Profile.init({
    imageUser: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    fullName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    }, 
    dateOfBirth: {
      allowNull: true,
      type: DataTypes.DATE,
    }, 
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "UserId is required"
        },
        notNull: {
          msg: "UserId is required"
        }
      }
    },
    publicIdImage: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};