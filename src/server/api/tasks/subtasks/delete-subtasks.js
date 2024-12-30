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
    const { id } = await readBody(event)

    const [result] = await connection.query(
      `DELETE FROM subtasks WHERE id = ? AND task_id IN (SELECT id FROM tasks WHERE user_id = ?)`,
      [id, decoded.id]
    )

    if (result.affectedRows === 0) {
      return { statusCode: 404, message: 'Subtask not found' }
    }

    return { statusCode: 200, message: 'Subtask deleted successfully' }
  } catch (error) {
    return { statusCode: 500, message: 'Failed to delete subtask' }
  }
})
