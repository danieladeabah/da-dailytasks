<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <h1 class="text-xl font-bold">
      {{ texts_c.projectActivity }} ({{ tasks.length + completedTasks.length }})
    </h1>
    <div class="my-5">
      <UTabs :items="tabItems" class="w-full">
        <template #browse>
          <TaskList :tasks="tasks" :emptyMessage="texts_c.noTasks" />
        </template>
        <template #completed>
          <TaskList
            :tasks="completedTasks"
            :emptyMessage="texts_c.noCompletedTasks"
          />
        </template>
      </UTabs>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import TaskList from '@/components/dashboard/tasksLists.vue'
import { projectActivity as texts_c } from '@/constants/texts.json'

const tasksStore = useTasksStore()

const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress !== 100)
)
const completedTasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress === 100)
)

onMounted(() => {
  tasksStore.fetchTasksById()
})

const tabItems = computed(() => [
  { slot: 'browse', label: `Browse (${tasks.value.length})` },
  { slot: 'completed', label: `Completed (${completedTasks.value.length})` }
])
</script>
