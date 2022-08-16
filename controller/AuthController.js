const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcryptjs')
const { createToken } = require('../helper/jwt')

class AuthController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
    
            const newUser = await User.create({ username, email, password, role: "Admin" })

            res.status(201).json({
                message: "Success register",
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            })
        } catch (error) {
           next(error)
        }
    }

    static async login(req, res, next) {
        try {  
            const { username, email, password } = req.body
            let findUser = {};

            if (!username) {
                findUser = await User.findOne({ where: { email } })
            }

            if (!email) {
                findUser = await User.findOne({ where: { username } })
            }
    
            if (!findUser) {
                throw { name: "InvalidUsernameOrEmailOrPassword" }
            }
    
            const comparePass = comparePassword(password, findUser.password)
    
            if (!comparePass) {
                throw { name: "InvalidUsernameOrEmailOrPassword" }
            }
    
            const payload = {
                id: findUser.id,
                role: findUser.role
            }
    
            const access_token = createToken(payload)
    
            res.status(200).json({
                message: "Success login",
                access_token
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController