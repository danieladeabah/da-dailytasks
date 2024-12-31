import jwt from 'jsonwebtoken'
import multer from 'multer'
import connection from '../../utils/db'
import path from 'path'

// Multer setup for file uploads (saving locally in 'public/profiles')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profiles/') // Files will be saved in the 'public/profiles/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // File name is the timestamp + file extension
  }
})

const upload = multer({ storage }).single('profile_image')

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const authHeader = event.node.req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return {
      statusCode: 401,
      message: 'No token provided'
    }
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey)

    // Handle file upload using multer
    const file = await new Promise((resolve, reject) => {
      upload(event.node.req, event.node.res, err => {
        if (err) reject(new Error(err))
        resolve(event.node.req.file)
      })
    })

    if (!file) {
      return {
        statusCode: 400,
        message: 'No file uploaded'
      }
    }

    // Save only the filename (e.g., 1735654831556.JPG) in the database
    const profileImageFilename = file.filename // This is just the file name, no path

    // Update the database with the filename only
    await connection.query(`UPDATE users SET profile_image = ? WHERE id = ?`, [
      profileImageFilename,
      decoded.id
    ])

    return {
      statusCode: 200,
      message: 'Profile image updated successfully',
      profile_image: profileImageFilename
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Error updating profile image'
    }
  }
})
