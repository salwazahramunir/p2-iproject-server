const cloudinary = require('cloudinary').v2

function uploadToCloudinary(image, path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, {folder: path}, (error, result) => {
      if (error) return reject(error)
      return resolve(result)
    })
  })
}

function deleteToCloudinary(publicId, path) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, {folder: path}, (error, result) => {
      if (error) return reject(error)
      return resolve(result)
    })
  })
}


module.exports = {
    uploadToCloudinary,
    deleteToCloudinary
}