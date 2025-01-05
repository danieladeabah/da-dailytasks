<template>
  <div
    v-if="showTasks && tasks.length > 0"
    class="relative z-50 mx-auto mt-5 w-full md:fixed md:bottom-5 md:left-5 md:w-2/5"
  >
    <!-- Close Button -->
    <button
      @click="hideTasks"
      class="absolute right-2 top-2 z-50 rounded-sm bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 focus:outline-none"
      aria-label="Close"
    >
      Hide
    </button>

    <UiKitsUiSlotsProjectActivitySlot>
      <TaskList :tasks="tasks" :emptyMessage="''" />
    </UiKitsUiSlotsProjectActivitySlot>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import TaskList from '@/components/dashboard/tasksLists.vue'

const tasksStore = useTasksStore()
const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress !== 100)
)

const showTasks = ref(true)

const hideTasks = () => {
  showTasks.value = false
}

onMounted(() => {
  tasksStore.fetchAllTasks()

  setTimeout(() => {
    hideTasks()
  }, 60000)
})
</script>
