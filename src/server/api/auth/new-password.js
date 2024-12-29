import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connection from '../../utils/db'

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const { password, token } = await readBody(event)

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey)

    // Find the user by token and ensure it's still valid
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE id = ? AND resetPasswordToken = ? AND resetPasswordExpires > ?`,
      [decoded.id, token, Date.now()]
    )
    if (rows.length === 0) {
      return {
        statusCode: 400,
        message: 'Invalid or expired token'
      }
    }

    const user = rows[0]

    // Hash new password and update user record
    const hashedPassword = await bcrypt.hash(password, 10)
    await connection.query(
      `UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?`,
      [hashedPassword, user.id]
    )

    return {
      statusCode: 200,
      message: 'Password changed successfully. You can now log in.'
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      message: 'Server error'
    }
  }
})
