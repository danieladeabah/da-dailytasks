import connection from '../../utils/db'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const email = query.email

  if (!email) {
    return {
      statusCode: 400,
      message: 'Email is required'
    }
  }

  try {
    // Query the database to fetch user by email
    const [rows] = await connection.query(
      `SELECT id, first_name, last_name, profile_image, email FROM users WHERE email = ?`,
      [email]
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
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
        email: user.email
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return {
      statusCode: 500,
      message: 'Internal Server Error'
    }
  }
})
