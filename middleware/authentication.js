const { verifyToken } = require("../helper/jwt");
const { User } = require('../models/index');

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
    
        if (!access_token) { 
            throw { name: "NoToken"}
        }

        const payload = verifyToken(access_token);

        const user = await User.findByPk(+payload.id);

        if (!user) {
            throw { name: "Unauthorized"}
        }

        req.user = {
            id: user.id,
            role: user.role
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authentication
}