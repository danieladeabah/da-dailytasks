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

    // Fetch tasks with assignees and subtasks using JOIN
    const [tasksData] = await connection.query(
      `SELECT tasks.id AS task_id,
              tasks.user_id,
              tasks.name AS task_name,
              tasks.deadline,
              tasks.description,
              tasks.isPrivate,
              tasks.progress,
              assignees.id AS assignee_id,
              assignees.name AS assignee_name,
              assignees.email AS assignee_email,
              assignees.image AS assignee_image,
              subtasks.id AS subtask_id,
              subtasks.name AS subtask_name,
              subtasks.isChecked AS subtask_isChecked
       FROM tasks
       LEFT JOIN assignees ON tasks.id = assignees.task_id
       LEFT JOIN subtasks ON tasks.id = subtasks.task_id
       WHERE tasks.user_id = ?`,
      [decoded.id]
    )

    // Group tasks, assignees, and subtasks
    const groupedTasks = tasksData.reduce((acc, task) => {
      const taskId = task.task_id
      if (!acc[taskId]) {
        acc[taskId] = {
          id: taskId,
          user_id: task.user_id,
          name: task.task_name,
          deadline: task.deadline,
          description: task.description,
          isPrivate: task.isPrivate,
          progress: task.progress,
          assignees: [],
          subTasks: []
        }
      }

      // Add assignees to the task (avoid duplicates)
      if (
        task.assignee_id &&
        !acc[taskId].assignees.some(
          assignee => assignee.id === task.assignee_id
        )
      ) {
        acc[taskId].assignees.push({
          id: task.assignee_id,
          name: task.assignee_name,
          email: task.assignee_email,
          image: task.assignee_image
        })
      }

      // Add subtasks to the task
      if (task.subtask_id) {
        acc[taskId].subTasks.push({
          id: task.subtask_id,
          name: task.subtask_name,
          isChecked: task.subtask_isChecked
        })
      }

      return acc
    }, {})

    // Convert the grouped tasks object to an array
    const result = Object.values(groupedTasks)

    return {
      statusCode: 200,
      tasks: result
    }
  } catch (error) {
    return { statusCode: 401, message: 'Invalid or expired token' }
  }
})
