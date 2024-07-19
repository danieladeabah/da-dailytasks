<template>
  <div>
    <canvas id="chart" width="350" height="350"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { useTasksStore } from "@/store/tasks";
import type { Task } from "~/types/types";

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();

  // Calculate task statistics
  const totalTasks = tasksStore.tasks.length;

  const todoPercentage =
    totalTasks > 0
      ? (tasksStore.tasks.filter((task: Task) => task.progress === 0).length /
          totalTasks) *
        100
      : 0;

  const inProgressPercentage =
    totalTasks > 0
      ? (tasksStore.tasks.filter(
          (task: Task) => task.progress > 0 && task.progress < 100
        ).length /
          totalTasks) *
        100
      : 0;

  const donePercentage =
    totalTasks > 0
      ? (tasksStore.tasks.filter((task: Task) => task.progress === 100).length /
          totalTasks) *
        100
      : 0;

  // Chart data
  const data = {
    labels: ["To-Do", "In Progress", "Done"],
    datasets: [
      {
        data: [todoPercentage, inProgressPercentage, donePercentage],
        backgroundColor: ["#F17105", "#FDCA40", "#4E3EC8"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
  };

  // Initialize Chart
  const ctx = document.getElementById("chart") as HTMLCanvasElement;
  new Chart(ctx, config);
});
</script>
