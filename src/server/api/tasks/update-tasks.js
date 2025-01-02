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

    const [result] = await connection.query(
      `UPDATE tasks SET name = ?, description = ?, progress = ?, deadline = ?, isPrivate = ? WHERE id = ? AND user_id = ?`,
      [
        body.name,
        body.description,
        body.progress,
        body.deadline,
        body.isPrivate,
        body.id,
        decoded.id
      ]
    )

    if (result.affectedRows === 0) {
      return { statusCode: 404, message: 'You are not admin' }
    }

    return { statusCode: 200, message: 'Task updated successfully!' }
  } catch (error) {
    return { statusCode: 500, message: 'Server error occurred' }
  }
})
