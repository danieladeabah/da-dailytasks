import jwt from 'jsonwebtoken'
import connection from '../../utils/db'

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { email } = body

  // Get the token from the Authorization header
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

    // Check if the email is already in use
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    )

    if (rows.length > 0) {
      return {
        statusCode: 409,
        message: 'Email is already in use'
      }
    }

    // Update email in the database
    await connection.query(`UPDATE users SET email = ? WHERE id = ?`, [
      email,
      decoded.id
    ])

    return {
      statusCode: 200,
      message: 'Email updated successfully'
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Error updating email'
    }
  }
})
