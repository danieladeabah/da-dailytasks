<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div v-if="tasks.length > 0" class="container my-10 text-center">
      <h2 class="mb-6 text-3xl font-bold text-gray-800">Popular Tasks</h2>
      <p class="text-gray-600">See what our users are doing.</p>
    </div>
    <div class="my-5">
      <TaskList :tasks="tasks" :emptyMessage="''" />
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import TaskList from '@/components/project-activity/tasksLists.vue'

const tasksStore = useTasksStore()

const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress !== 100)
)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
