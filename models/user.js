'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: "Username must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Username is required"
        },
        notNull: {
          msg: "Username is required"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Incorrect email format"
        }
      }
    }, 
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        }
      }
    }, 
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Role is required"
        },
        notNull: {
          msg: "Role is required"
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate(instance, option) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};