import jwt from 'jsonwebtoken'
import connection from '../../utils/db'

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { last_name } = body

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

    // Update last name in the database
    await connection.query(`UPDATE users SET last_name = ? WHERE id = ?`, [
      last_name,
      decoded.id
    ])

    return {
      statusCode: 200,
      message: 'Last name updated successfully'
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Error updating last name'
    }
  }
})
