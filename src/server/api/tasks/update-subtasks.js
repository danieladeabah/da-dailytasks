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
    const decoded = jwt.verify(token, secretKey)
    const body = await readBody(event)

    // Update subtask query with the values passed in the request
    const [result] = await connection.query(
      `UPDATE subtasks SET id = ?, name = ?, isChecked = ?, task_id = ? WHERE id = ? AND task_id IN (SELECT id FROM tasks WHERE user_id = ?)`,
      [body.id, body.name, body.isChecked, body.task_id, body.id, decoded.id]
    )

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        message: 'Subtask not found or you do not have permission to update it'
      }
    }

    // Successfully updated the subtask
    return { statusCode: 200, message: 'Subtask updated successfully' }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, message: 'Failed to update subtask' }
  }
})
