<template>
  <div class="flex items-center justify-center">
    <div v-if="totalTasks > 0">
      <canvas id="chart" width="350" height="350"></canvas>
    </div>
    <div v-else class="my-10 text-center text-gray-400">
      <p>No tasks available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, type ChartConfiguration } from 'chart.js/auto'
import { useTasksStore } from '@/store/tasks'
import type { Task } from '@/types/types'

const tasksStore = useTasksStore()

const chartInstance = ref<InstanceType<typeof Chart> | null>(null)

const totalTasks = computed(() => tasksStore.tasks.length)

const todoPercentage = computed(() =>
  totalTasks.value > 0
    ? (tasksStore.tasks.filter((task: Task) => task.progress === 0).length /
        totalTasks.value) *
      100
    : 0
)

const inProgressPercentage = computed(() =>
  totalTasks.value > 0
    ? (tasksStore.tasks.filter(
        (task: Task) => task.progress > 0 && task.progress < 100
      ).length /
        totalTasks.value) *
      100
    : 0
)

const donePercentage = computed(() =>
  totalTasks.value > 0
    ? (tasksStore.tasks.filter((task: Task) => task.progress === 100).length /
        totalTasks.value) *
      100
    : 0
)

const chartData = computed(() => ({
  labels: ['To-Do', 'In Progress', 'Done'],
  datasets: [
    {
      data: [
        todoPercentage.value,
        inProgressPercentage.value,
        donePercentage.value
      ],
      backgroundColor: ['#F17105', '#FDCA40', '#4E3EC8'],
      hoverOffset: 4
    }
  ]
}))

const createChart = () => {
  const ctx = document.getElementById('chart') as HTMLCanvasElement
  if (ctx) {
    const config: ChartConfiguration = {
      type: 'pie',
      data: chartData.value
    }

    if (chartInstance.value) {
      chartInstance.value.destroy()
    }

    chartInstance.value = new Chart(ctx, config) as any
  }
}

onMounted(async () => {
  await tasksStore.fetchTasksById()
  createChart()
})

watch(
  () => chartData.value,
  () => {
    createChart()
  },
  { deep: true }
)
</script>
