import connection from '../../utils/db'

export default defineEventHandler(async event => {
  try {
    // Fetch all users from the database
    const [rows] = await connection.query(
      `SELECT id, first_name, last_name, email, profile_image, updated_at FROM users`
    )

    // Check if users exist
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: 'No users found'
      }
    }

    return {
      statusCode: 200,
      users: rows
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      statusCode: 500,
      message: 'Internal server error'
    }
  }
})
