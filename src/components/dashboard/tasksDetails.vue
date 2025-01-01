<template>
  <UiKitsUiSlotsDashboardSlot v-if="task">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ task.name }}</h1>
      <p class="text-xl text-gray-400">
        {{ task.description }}
      </p>

      <div class="my-5 flex items-center justify-between">
        <div
          class="flex h-[40px] items-center gap-2 rounded-lg bg-gray-100 p-5 text-gray-400"
        >
          <img
            src="/assets/icons/bellIcon.svg"
            class="h-5 w-5"
            alt="Notification Icon"
          />
          <p title="Deadline">
            <span class="font-semibold text-[#000]">{{
              formatDate(task.deadline)
            }}</span>
          </p>
        </div>
        <div>
          <button
            class="progressTasksColor relative h-[60px] w-[60px] rounded-full py-1 font-semibold text-[#000]"
            :style="{
              backgroundImage: `linear-gradient(to right, ${getProgressColor(
                task.progress
              )} ${task.progress}%, #E5E7EB ${task.progress}%)`
            }"
          >
            {{ task.progress }}%
          </button>
        </div>
      </div>

      <div class="flex items-center justify-start gap-5">
        <img
          src="/assets/icons/editIcon.svg"
          alt="edit"
          class="h-4 w-4 cursor-pointer"
          title="Edit"
          @click="openCreateModal"
        />
        <UDropdown
          mode="hover"
          :popper="{ placement: 'right-start' }"
          :items="deleteLists"
        >
          <img
            src="/assets/icons/deleteIcon.svg"
            alt="edit"
            class="h-4 w-4 cursor-pointer"
            title="Delete"
          />
        </UDropdown>
      </div>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <DashboardCreateEditModal ref="taskModal" />
</template>

<script setup lang="ts">
import { getProgressColor } from '@/utils/progressColor'
import { useTasksStore } from '@/store/tasks'

const tasksStore = useTasksStore()
const route = useRoute()
const taskModal = ref()

const task = computed(() => {
  const taskId = Array.isArray(route.params.tasksId)
    ? route.params.tasksId[0]
    : route.params.tasksId

  return tasksStore.findTaskById(taskId) || null
})

onMounted(() => {
  tasksStore.fetchTasksById()
})

const openCreateModal = () => {
  taskModal.value.openModal('edit', task.value)
}

const deleteLists = [
  [
    {
      label: 'Cancel'
    },
    {
      label: 'Yes, Remove',
      click() {
        if (task.value) {
          tasksStore.deleteTask(task.value.id)
        }
        navigateTo('/dashboard')
      }
    }
  ]
]
</script>
