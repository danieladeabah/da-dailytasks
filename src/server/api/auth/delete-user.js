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

    // Delete the user from the database
    const [result] = await connection.query(`DELETE FROM users WHERE id = ?`, [
      decoded.id
    ])

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        message: 'User not found'
      }
    }

    return {
      statusCode: 200,
      message: 'User deleted successfully'
    }
  } catch (error) {
    return {
      statusCode: 401,
      message: 'Invalid or expired token'
    }
  }
})
