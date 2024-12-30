import jwt from 'jsonwebtoken'
import connection from '../../utils/db'

const secretKey = process.env.JWT_SECRET

export default defineEventHandler(async event => {
  const authHeader = event.node.req.headers.authorization

  if (!authHeader) {
    return { statusCode: 401, message: 'Authorization header missing' }
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the JWT token
    jwt.verify(token, secretKey)

    // Read the request body
    const body = await readBody(event)

    // Check if the required fields are present
    if (!body.task_id || !body.name) {
      return { statusCode: 400, message: 'Missing required fields' }
    }

    // Insert the subtask into the database
    const [result] = await connection.query(
      `INSERT INTO subtasks (task_id, name, isChecked) VALUES (?, ?, ?)`,
      [body.task_id, body.name, body.isChecked]
    )

    // Return success response
    return {
      statusCode: 201,
      message: 'Subtask added successfully',
      subtaskId: result.insertId
    }
  } catch (error) {
    console.error(error) // Log the error for debugging
    // Return error response
    return {
      statusCode: 500,
      message: 'Failed to add subtask',
      error: error.message
    }
  }
})
