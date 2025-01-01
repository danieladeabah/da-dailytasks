import jwt from 'jsonwebtoken'
import connection from '../../utils/db'

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const authHeader = event.node.req.headers.authorization

  // Check if the Authorization header exists
  if (!authHeader) {
    return {
      statusCode: 401,
      message: 'Authorization header missing'
    }
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1]

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey)

    // Fetch user details from the database
    const [rows] = await connection.query(
      `SELECT id, first_name, last_name, profile_image, email FROM users WHERE id = ?`,
      [decoded.id]
    )

    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: 'User not found'
      }
    }

    const user = rows[0]

    return {
      statusCode: 200,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
      email: user.email
    }
  } catch (error) {
    return {
      statusCode: 401,
      message: 'Invalid or expired token'
    }
  }
})
