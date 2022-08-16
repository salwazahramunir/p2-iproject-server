function errorHandler(error, req, res, next) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: error.errors[0].message
        })
    } else if (error.name === "InvalidUsernameOrEmailOrPassword") {
        res.status(400).json({
            message: "Invalid Username or Email or Password"
        })
    } else {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = errorHandler