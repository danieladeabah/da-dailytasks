import { defineStore } from 'pinia'
import type { Task } from '~/types/types'

export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: [] as Task[],
    success: '',
    error: ''
  }),
  actions: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }
        const response = await fetch('/api/tasks/main-task/fetch-tasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch tasks.')
        }
        const responseData = await response.json()
        if (responseData && Array.isArray(responseData.tasks)) {
          this.tasks = responseData.tasks
        } else {
          throw new Error('Unexpected response format')
        }
      } catch (err) {
        this.error = (err as Error).message || 'Error loading tasks.'
        this.clearErrorAfterDelay()
      }
    },
    findTaskById(taskId: string): Task | undefined {
      return this.tasks.find(t => t.id === taskId)
    },
    createTask(newTask: Task) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }
        fetch('/api/tasks/main-task/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: newTask.id,
            user_id: newTask.user_id,
            name: newTask.name,
            description: newTask.description,
            progress: newTask.progress,
            deadline: newTask.deadline,
            isPrivate: newTask.isPrivate
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.statusCode === 201) {
              const createdTask = {
                ...newTask,
                id: data.taskId
              }
              this.tasks.push(createdTask)
              this.success = 'Task created successfully!'
              this.clearSuccessAfterDelay()
            } else {
              throw new Error(data.message || 'Failed to create task.')
            }
          })
      } catch (err) {
        this.error = (err as Error).message || 'Error creating task.'
        this.clearErrorAfterDelay()
      }
    },
    updateTask(taskId: string, updatedTask: Task) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }

        fetch(`/api/tasks/main-task/update`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: taskId,
            name: updatedTask.name,
            description: updatedTask.description,
            progress: updatedTask.progress,
            deadline: updatedTask.deadline,
            isPrivate: updatedTask.isPrivate
          })
        })
          .then(async response => {
            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.message || 'Failed to update task.')
            }
            return response.json()
          })
          .then(() => {
            const taskIndex = this.tasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              this.tasks[taskIndex] = updatedTask
              this.success = 'Task updated successfully!'
              this.clearSuccessAfterDelay()
            }
          })
          .catch(err => {
            this.error = (err as Error).message || 'Error updating task.'
            this.clearErrorAfterDelay()
          })
      } catch (err) {
        this.error = (err as Error).message || 'Error updating task.'
        this.clearErrorAfterDelay()
      }
    },
    deleteTask(taskId: string) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }

        fetch(`/api/tasks/main-task/delete-tasks`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: taskId })
        })
          .then(async response => {
            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.message || 'Failed to delete task.')
            }
            return response.json()
          })
          .then(() => {
            const taskIndex = this.tasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              this.tasks.splice(taskIndex, 1)
              this.success = 'Task deleted successfully!'
              this.clearSuccessAfterDelay()
            }
          })
          .catch(err => {
            this.error = (err as Error).message || 'Error deleting task.'
            this.clearErrorAfterDelay()
          })
      } catch (err) {
        this.error = (err as Error).message || 'Error deleting task.'
        this.clearErrorAfterDelay()
      }
    },
    async assignPeopleToTask(task: Task) {
      const taskId = task.id // Extract only the task ID
      const assignees = task.assignees // Use the assignees array

      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }
        const response = await fetch(`/api/tasks/main-task/assign`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is valid
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskId, assignees })
        })

        const data = await response.json()
        if (response.ok) {
          // Update the local state only if the API succeeds
          const taskIndex = this.tasks.findIndex(t => t.id === task.id)
          if (taskIndex !== -1) {
            this.tasks[taskIndex].assignees = assignees
            this.success = 'People assigned to task successfully!'
            this.clearSuccessAfterDelay()
          }
        } else {
          this.error = data.message || 'Failed to assign people to task.'
          this.clearErrorAfterDelay()
        }
      } catch (error) {
        this.error = 'An unexpected error occurred.'
        this.clearErrorAfterDelay()
      }
    },
    addSubTask(taskId: string, subTask: Task) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }

        fetch(`/api/tasks/subtask/add-subtasks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task_id: taskId,
            name: subTask.name,
            isChecked: subTask.isChecked
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.statusCode === 201) {
              const task = this.findTaskById(taskId)
              if (task) {
                const newSubTask = {
                  ...subTask,
                  id: data.subtaskId
                }
                task.subTasks.push(newSubTask)
                this.success = 'Sub-task added successfully!'
                this.clearSuccessAfterDelay()
              }
            } else {
              throw new Error(data.message || 'Failed to add subtask.')
            }
          })
          .catch(err => {
            this.error = (err as Error).message || 'Error adding subtask.'
            this.clearErrorAfterDelay()
          })
      } catch (err) {
        this.error = (err as Error).message || 'Error adding subtask.'
        this.clearErrorAfterDelay()
      }
    },
    async updateSubTask(taskId: string, subTask: Task) {
      // Find the task containing the subtask
      const task = this.findTaskById(taskId)

      if (task) {
        // Find the subtask to update within the task
        const subTaskIndex = task.subTasks.findIndex(st => st.id === subTask.id)

        if (subTaskIndex !== -1) {
          try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken')
            if (!token) {
              throw new Error('No token found. Please log in again.')
            }

            // Call the API to update the subtask in the database
            const response = await fetch('/api/tasks/subtask/update-subtasks', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: subTask.id,
                name: subTask.name,
                isChecked: subTask.isChecked,
                task_id: task.id
              })
            })

            // If the update is successful, update the subtask in the store
            if (response.status === 200) {
              task.subTasks[subTaskIndex] = subTask
              this.success = 'Sub-task updated successfully!'
              this.clearSuccessAfterDelay()
            } else {
              this.error = 'Failed to update subtask.'
              this.clearErrorAfterDelay()
            }
          } catch (error) {
            this.error = 'Error while updating subtask.'
            this.clearErrorAfterDelay()
          }
        } else {
          this.error = 'Sub-task not found.'
          this.clearErrorAfterDelay()
        }
      } else {
        this.error = 'Task not found.'
        this.clearErrorAfterDelay()
      }
    },
    deleteSubTask(taskId: string, subTaskId: string) {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          throw new Error('No token found. Please log in again.')
        }

        fetch(`/api/tasks/subtask/delete-subtasks`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: subTaskId })
        })
          .then(async response => {
            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.message || 'Failed to delete sub-task.')
            }
            return response.json()
          })
          .then(() => {
            // Find the task that contains the sub-task
            const task = this.findTaskById(taskId)
            if (task) {
              const subTaskIndex = task.subTasks.findIndex(
                st => st.id === subTaskId
              )
              if (subTaskIndex !== -1) {
                task.subTasks.splice(subTaskIndex, 1) // Remove the sub-task from the list
                this.success = 'Sub-task deleted successfully!'
                this.clearSuccessAfterDelay()
              }
            }
          })
          .catch(err => {
            this.error = (err as Error).message || 'Error deleting sub-task.'
            this.clearErrorAfterDelay()
          })
      } catch (err) {
        this.error = (err as Error).message || 'Error deleting sub-task.'
        this.clearErrorAfterDelay()
      }
    },
    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = ''
      }, 2000)
    },
    clearSuccessAfterDelay() {
      setTimeout(() => {
        this.success = ''
      }, 2000)
    }
  }
})
