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
      `INSERT INTO tasks (id, user_id, name, description, progress, deadline, isPrivate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.id,
        decoded.id,
        body.name,
        body.description,
        body.progress,
        body.deadline,
        body.isPrivate
      ]
    )

    return {
      statusCode: 201,
      message: 'Task created successfully',
      taskId: result.insertId
    }
  } catch (error) {
    return { statusCode: 500, message: 'Failed to create task' }
  }
})
