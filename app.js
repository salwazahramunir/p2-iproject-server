if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require('./router/index')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const fileupload = require('express-fileupload')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_USER_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
app.use(fileupload({
  useTempFiles: true
}))

app.use(router)
module.exports = {
  app
}