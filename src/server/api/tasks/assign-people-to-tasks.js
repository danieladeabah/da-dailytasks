import connection from '../../utils/db'

export default defineEventHandler(async event => {
  const authHeader = event.node.req.headers.authorization

  if (!authHeader) {
    return { statusCode: 401, message: 'Authorization header missing' }
  }

  try {
    // Read taskId and assignees from request body
    const { taskId, assignees } = await readBody(event)

    // Validate input
    if (!taskId) {
      return { statusCode: 400, message: 'Invalid task ID.' }
    }

    // If there are assignees, deduplicate and process them
    if (Array.isArray(assignees)) {
      // Deduplicate assignees based on their ID
      const uniqueAssignees = Array.from(
        new Map(assignees.map(assignee => [assignee.id, assignee])).values()
      )

      // Delete existing assignees for the task
      await connection.query(`DELETE FROM assignees WHERE task_id = ?`, [
        taskId
      ])

      if (uniqueAssignees.length > 0) {
        // Prepare values for batch insertion
        const assigneeValues = uniqueAssignees.map(
          ({ id, first_name, last_name, profile_image, email, user_id }) => [
            id,
            first_name,
            last_name,
            profile_image,
            email,
            user_id,
            taskId
          ]
        )

        // Insert new assignees into the database
        await connection.query(
          `INSERT INTO assignees (id, first_name, last_name, profile_image, email, user_id, task_id) VALUES ?`,
          [assigneeValues]
        )
      }
    }

    return { statusCode: 200, message: 'People assigned to task successfully.' }
  } catch (error) {
    return { statusCode: 500, message: 'Failed to assign people to task.' }
  }
})
