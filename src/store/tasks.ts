import { defineStore } from 'pinia'
import type { Task } from '~/types/types'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    success: '',
    error: ''
  }),
  actions: {
    // Fetch tasks with authentication
    async authHeaders(url: string, method: string = 'GET', body: any = null) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) throw new Error('Please login to use')

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: body ? JSON.stringify(body) : undefined
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Request failed.')

        return data
      } catch (err) {
        this.handleError(err as Error)
        throw err
      }
    },

    // Fetch tasks by ID
    async fetchTasksById() {
      const data = await this.authHeaders('/api/tasks/fetch-tasks-by-id')
      if (Array.isArray(data.tasks)) {
        this.tasks = data.tasks
      }
    },

    // Fetch all tasks without authentication
    async fetchAllTasks() {
      try {
        const response = await fetch('/api/tasks/fetch-all-tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        if (!response.ok)
          throw new Error(data.message || 'Failed to fetch tasks.')

        if (Array.isArray(data.tasks)) {
          this.tasks = data.tasks
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Find task by ID
    findTaskById(taskId: string): Task | undefined {
      return this.tasks.find(t => t.id === taskId)
    },

    // Create a new task
    async createTask(newTask: Task) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/create-tasks',
          'POST',
          newTask
        )
        if (data.statusCode === 201) {
          this.tasks.push({ ...newTask, id: data.taskId })
          this.success = 'Task created successfully!'
          this.fetchTasksById()
          this.clearSuccessAfterDelay()
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Update an existing task
    async updateTask(taskId: string, updatedTask: Task) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/update-tasks',
          'PUT',
          updatedTask
        )

        if (data.statusCode === 200) {
          const taskIndex = this.tasks.findIndex(t => t.id === taskId)
          if (taskIndex !== -1) {
            this.tasks[taskIndex] = updatedTask
            this.success = data.message
            this.clearSuccessAfterDelay()
          }
        } else if (data.statusCode === 401) {
          this.handleError(new Error(data.message || 'Unauthorized'))
        } else if (data.statusCode === 404) {
          this.handleError(new Error(data.message))
        } else if (data.statusCode === 500) {
          this.handleError(new Error(data.message))
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Delete a task
    async deleteTask(taskId: string) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/delete-tasks',
          'DELETE',
          { id: taskId }
        )
        if (data.statusCode === 200) {
          const taskIndex = this.tasks.findIndex(t => t.id === taskId)
          if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1)
            this.success = 'Task deleted successfully!'
            this.clearSuccessAfterDelay()
          }
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Assign people to a task
    async assignPeopleToTask(task: Task) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/assign-people-to-tasks',
          'POST',
          {
            taskId: task.id,
            assignees: task.assignees
          }
        )
        if (data.statusCode === 200) {
          const taskIndex = this.tasks.findIndex(t => t.id === task.id)
          if (taskIndex !== -1) {
            this.tasks[taskIndex].assignees = task.assignees
            this.success = 'People assigned to task successfully!'
            this.clearSuccessAfterDelay()
          }
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Add a sub-task to a task
    async addSubTask(taskId: string, subTask: Task) {
      try {
        const data = await this.authHeaders('/api/tasks/add-subtasks', 'POST', {
          task_id: taskId,
          name: subTask.name,
          isChecked: subTask.isChecked
        })
        if (data.statusCode === 201) {
          const task = this.findTaskById(taskId)
          if (task) {
            const newSubTask = { ...subTask, id: data.subtaskId }
            task.subTasks.push(newSubTask)
            this.success = 'Sub-task added successfully!'
            this.clearSuccessAfterDelay()
          }
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Update a sub-task
    async updateSubTask(taskId: string, subTask: Task) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/update-subtasks',
          'POST',
          {
            id: subTask.id,
            name: subTask.name,
            isChecked: subTask.isChecked,
            task_id: taskId
          }
        )
        if (data.statusCode === 200) {
          const task = this.findTaskById(taskId)
          if (task) {
            const subTaskIndex = task.subTasks.findIndex(
              st => st.id === subTask.id
            )
            if (subTaskIndex !== -1) {
              task.subTasks[subTaskIndex] = { ...subTask }
              this.clearSuccessAfterDelay()
            }
          }
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Delete a sub-task
    async deleteSubTask(taskId: string, subTaskId: string) {
      try {
        const data = await this.authHeaders(
          '/api/tasks/delete-subtasks',
          'DELETE',
          { id: subTaskId }
        )
        if (data.statusCode === 200) {
          const task = this.findTaskById(taskId)
          if (task) {
            const subTaskIndex = task.subTasks.findIndex(
              st => st.id === subTaskId
            )
            if (subTaskIndex !== -1) {
              task.subTasks.splice(subTaskIndex, 1)
              this.success = 'Sub-task deleted successfully!'
              this.clearSuccessAfterDelay()
            }
          }
        }
      } catch (err) {
        this.handleError(err as Error)
      }
    },

    // Handle errors
    handleError(err: Error) {
      this.error = err.message || 'An unexpected error occurred.'
      this.clearErrorAfterDelay()
    },

    // Clear error message after a delay
    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = ''
      }, 2000)
    },

    // Clear success message after a delay
    clearSuccessAfterDelay() {
      setTimeout(() => {
        this.success = ''
      }, 2000)
    }
  }
})
