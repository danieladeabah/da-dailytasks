<template>
  <UiKitsUiSlotsProjectActivitySlot v-if="tasks.length > 0">
    <div class="container my-2 mt-8 text-center">
      <h2 class="text-2xl font-bold text-gray-800">
        Trending ({{ tasks.length }})
      </h2>
      <p class="text-gray-600">Explore the latest tasks that are trending.</p>
    </div>
    <div class="my-2">
      <TaskList :tasks="tasks" :emptyMessage="''" />
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import TaskList from '@/components/tasks/tasksLists.vue'

const tasksStore = useTasksStore()

const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress !== 100)
)

onMounted(() => {
  tasksStore.fetchAllTasks()
})
</script>
