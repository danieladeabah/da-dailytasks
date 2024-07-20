// store.ts
import { defineStore } from "pinia";
import type { Task } from "~/types/types";

export const useTasksStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [] as Task[],
    selectedTask: null as Task | null,
    createATasks: false,
  }),
  actions: {
    loadTasksFromLocalStorage() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
    findTaskById(taskId: string): Task | undefined {
      return this.tasks.find((t) => t.id === taskId);
    },
    createTask(newTask: Task) {
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    updateTask(taskId: string, updatedTask: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
        this.saveTasksToLocalStorage();
      } else {
        console.error("Task not found.");
      }
    },    
    deleteTask(taskId: string) {
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage();
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    assignPeopleToTask(task: Task) {
      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].assignees = task.assignees;
        this.saveTasksToLocalStorage();
      }
    },
    // New actions for sub-tasks
    addSubTask(taskId: string, subTask: Task) {
      const task = this.findTaskById(taskId);
      if (task) {
        task.subTasks.push(subTask);
        this.saveTasksToLocalStorage();
      }
    },
    updateSubTask(taskId: string, subTask: Task) {
      console.log("Updating Sub-Task in Task ID:", taskId);
      const task = this.findTaskById(taskId);
      if (task) {
        const subTaskIndex = task.subTasks.findIndex((st) => st.id === subTask.id);
        if (subTaskIndex !== -1) {
          task.subTasks[subTaskIndex] = subTask;
          this.saveTasksToLocalStorage();
        } else {
          console.error("Sub-task not found in task.");
        }
      } else {
        console.error("Task not found.");
      }
    },         
    deleteSubTask(taskId: string, subTaskId: string) {
      const task = this.findTaskById(taskId);
      if (task) {
        const subTaskIndex = task.subTasks.findIndex((st) => st.id === subTaskId);
        if (subTaskIndex !== -1) {
          task.subTasks.splice(subTaskIndex, 1);
          this.saveTasksToLocalStorage();
        }
      }
    },
  },
});
