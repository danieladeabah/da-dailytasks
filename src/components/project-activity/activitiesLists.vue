<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsProjectActivitySlot>
    <h1 class="text-2xl font-bold">{{ texts_c.projectActivity }}</h1>
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
import TaskList from '@/components/project-activity/tasksLists.vue'
import { projectActivity as texts_c } from '@/texts/texts.json'

const tasksStore = useTasksStore()

const tasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress !== 100)
)
const completedTasks = computed(() =>
  tasksStore.tasks.filter(task => task.progress === 100)
)

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage()
})

const tabItems = computed(() => [
  { slot: 'browse', label: `Browse (${tasks.value.length})` },
  { slot: 'completed', label: `Completed (${completedTasks.value.length})` }
])
</script>
