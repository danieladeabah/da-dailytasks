import { defineStore } from "pinia";
import type { Task } from "~/types/types";

export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [] as Task[],
    success: "",
    error: "",
  }),
  actions: {
    loadTasksFromLocalStorage() {
      const savedTasks = localStorage.getItem("da-daily-tasks-xi");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
    findTaskById(taskId: string): Task | undefined {
      return this.tasks.find((t) => t.id === taskId);
    },
    createTask(newTask: Task) {
      try {
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        this.success = "Task created successfully!";
        this.clearSuccessAfterDelay();
      } catch (err) {
        this.error = "Failed to create task.";
        this.clearErrorAfterDelay();
      }
    },
    updateTask(taskId: string, updatedTask: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
        this.saveTasksToLocalStorage();
        this.success = "Task updated successfully!";
        this.clearSuccessAfterDelay();
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    deleteTask(taskId: string) {
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage();
        this.success = "Task deleted successfully!";
        this.clearSuccessAfterDelay();
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem("da-daily-tasks-xi", JSON.stringify(this.tasks));
    },
    assignPeopleToTask(task: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].assignees = task.assignees;
        this.saveTasksToLocalStorage();
        this.success = "People assigned to task successfully!";
        this.clearSuccessAfterDelay();
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    addSubTask(taskId: string, subTask: Task) {
      const task = this.findTaskById(taskId);
      if (task) {
        task.subTasks.push(subTask);
        this.saveTasksToLocalStorage();
        this.success = "Sub-task added successfully!";
        this.clearSuccessAfterDelay();
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    updateSubTask(taskId: string, subTask: Task) {
      const task = this.findTaskById(taskId);
      if (task) {
        const subTaskIndex = task.subTasks.findIndex(
          (st) => st.id === subTask.id
        );
        if (subTaskIndex !== -1) {
          task.subTasks[subTaskIndex] = subTask;
          this.saveTasksToLocalStorage();
          this.success = "Sub-task updated successfully!";
          this.clearSuccessAfterDelay();
        } else {
          this.error = "Sub-task not found.";
          this.clearErrorAfterDelay();
        }
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    deleteSubTask(taskId: string, subTaskId: string) {
      const task = this.findTaskById(taskId);
      if (task) {
        const subTaskIndex = task.subTasks.findIndex(
          (st) => st.id === subTaskId
        );
        if (subTaskIndex !== -1) {
          task.subTasks.splice(subTaskIndex, 1);
          this.saveTasksToLocalStorage();
          this.success = "Sub-task deleted successfully!";
          this.clearSuccessAfterDelay();
        } else {
          this.error = "Sub-task not found.";
          this.clearErrorAfterDelay();
        }
      } else {
        this.error = "Task not found.";
        this.clearErrorAfterDelay();
      }
    },
    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = "";
      }, 2000);
    },
    clearSuccessAfterDelay() {
      setTimeout(() => {
        this.success = "";
      }, 2000);
    },
  },
});
