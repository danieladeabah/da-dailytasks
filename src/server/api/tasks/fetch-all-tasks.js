import connection from '../../utils/db'

export default defineEventHandler(async event => {
  try {
    // Fetch tasks with users, assignees, and subtasks using JOIN
    const [tasksData] = await connection.query(
      `SELECT 
        tasks.id AS task_id,
        tasks.user_id,
        tasks.name AS task_name,
        tasks.deadline,
        tasks.description,
        tasks.isPrivate,
        tasks.progress,
        tasks.created_at,
        tasks.updated_at,
        users.first_name AS user_first_name,
        users.last_name AS user_last_name,
        users.profile_image AS user_profile_image,
        users.created_at AS user_created_at,
        users.updated_at AS user_updated_at,
        assignees.id AS assignee_id,
        assignees.first_name AS assignee_first_name,
        assignees.last_name AS assignee_last_name,
        assignees.email AS assignee_email,
        assignees.profile_image AS assignee_profile_image,
        assignees.created_at AS assignee_created_at,
        assignees.updated_at AS assignee_updated_at,
        subtasks.id AS subtask_id,
        subtasks.name AS subtask_name,
        subtasks.isChecked AS subtask_isChecked
       FROM tasks
       LEFT JOIN users ON tasks.user_id = users.id
       LEFT JOIN assignees ON tasks.id = assignees.task_id
       LEFT JOIN subtasks ON tasks.id = subtasks.task_id WHERE tasks.isPrivate = 1 ORDER BY tasks.deadline DESC`
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
          created_at: task.created_at,
          updated_at: task.updated_at,
          user: {
            first_name: task.user_first_name,
            last_name: task.user_last_name,
            profile_image: task.user_profile_image,
            created_at: task.user_created_at,
            updated_at: task.user_updated_at
          },
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
          first_name: task.assignee_first_name,
          last_name: task.assignee_last_name,
          email: task.assignee_email,
          profile_image: task.assignee_profile_image,
          created_at: task.assignee_created_at,
          updated_at: task.assignee_updated_at
        })
      }

      // Add subtasks to the task (avoid duplicates)
      if (task.subtask_id) {
        const existingSubtask = acc[taskId].subTasks.find(
          subtask => subtask.id === task.subtask_id
        )
        if (!existingSubtask) {
          acc[taskId].subTasks.push({
            id: task.subtask_id,
            name: task.subtask_name,
            isChecked: task.subtask_isChecked
          })
        }
      }

      return acc
    }, {})

    // Convert the grouped tasks object to an array
    const result = Object.values(groupedTasks)

    // Limit the number of tasks to 10
    const limitedResult = result.slice(0, 10)

    return {
      statusCode: 200,
      tasks: limitedResult
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: 'An error occurred while fetching tasks'
    }
  }
})
