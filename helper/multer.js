const fs = require('fs')
const path = require('path')


function getValidExtension(filename) {
    const formatAllowed = ["jpg", "jpeg", "png"]
    
    const nameArray = filename.split('.');
    const extension = nameArray[nameArray.length - 1].toLowerCase()

    if (formatAllowed.includes(extension)) {
        return extension
    }
    
    return false
}

async function saveImage(pathFrom, pathTo) {
    try {
        if (!fs.existsSync(pathTo)) {
            const destination = path.dirname(pathTo)
            fs.mkdirSync(destination, { recursive: true })
        }

        fs.renameSync(pathFrom, pathTo)
    }
    catch (error) {
        throw (message = error)
    }
}

module.exports = {
    getValidExtension,
    saveImage
}