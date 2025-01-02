<template>
  <UiKitsUiSlotsHeaderSlot>
    <span>
      <NuxtLink to="/dashboard" class="text-2xl font-bold">
        <img
          src="/assets/icons/back-icon.svg"
          class="h-5 w-5"
          alt="Back Icon"
        />
      </NuxtLink>
    </span>
    <span>
      <UButton
        :label="dropdownLabel"
        :style="{
          color: buttonColor.text
        }"
        color="white"
        variant="ghost"
        class="flex items-center justify-end rounded-md font-semibold"
      />
    </span>
  </UiKitsUiSlotsHeaderSlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'

const tasksStore = useTasksStore()
const route = useRoute()

const selectedTask = computed(() => {
  const taskId = route.params.tasksId as string
  return tasksStore.findTaskById(taskId) || null
})

const dropdownLabel = computed(() => {
  const progress = selectedTask.value?.progress ?? 0
  if (progress === 0) return 'To-Do'
  if (progress > 0 && progress < 100) return 'In Progress'
  if (progress === 100) return 'Done'
  return 'Unknown Status'
})

const buttonColor = computed(() => {
  const progress = selectedTask.value?.progress ?? 0
  if (progress === 0) return { text: '#F17105' }
  if (progress > 0 && progress < 100) return { text: '#FDCA40' }
  if (progress === 100) return { text: '#4E3EC8' }
  return { text: '#E5E7EB' }
})

onMounted(() => {
  tasksStore.fetchTasksById()
})
</script>
