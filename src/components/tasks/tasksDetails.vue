<template>
  <UiKitsUiSlotsDashboardSlot v-if="task">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ task.name }}</h1>
      <p class="text-xl text-gray-400">
        {{ task.description }}
      </p>

      <div class="my-5 flex items-center justify-between">
        <div
          :title="'Created at: ' + formatDate(task.created_at)"
          class="flex h-[40px] items-center gap-2 rounded-lg border p-5 text-gray-400"
        >
          <img
            src="/assets/icons/bell-icon.svg"
            class="h-5 w-5"
            alt="Notification Icon"
          />
          <p>
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

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-5">
          <img
            v-if="isLoggedIn && String(task.user_id) === String(userInfo?.id)"
            src="/assets/icons/edit-icon.svg"
            alt="edit"
            class="h-4 w-4 cursor-pointer"
            title="Edit"
            @click="openCreateModal"
          />
          <UDropdown
            v-if="isLoggedIn && String(task.user_id) === String(userInfo?.id)"
            mode="click"
            :popper="{ placement: 'right-start' }"
            :items="deleteLists"
          >
            <img
              v-if="isLoggedIn && String(task.user_id) === String(userInfo?.id)"
              src="/assets/icons/delete-icon.svg"
              alt="edit"
              class="h-4 w-4 cursor-pointer"
              title="Delete"
            />
          </UDropdown>
        </div>
        <p class="truncate text-xs italic text-gray-400">
          Admin: {{ task.user.first_name }} {{ task.user.last_name }}
        </p>
      </div>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <TasksCreateEditModal ref="taskModal" />
</template>

<script setup lang="ts">
import { getProgressColor } from '@/utils/progressColor'
import { useTasksStore } from '@/store/tasks'
import { useUser } from '~/composables/useUser'
import { useAuth } from '~/composables/useAuth'

const tasksStore = useTasksStore()
const route = useRoute()
const taskModal = ref()
const { userInfo } = useUser()
const { isLoggedIn } = useAuth()

const task = computed(() => {
  const taskId = Array.isArray(route.params.tasksId)
    ? route.params.tasksId[0]
    : route.params.tasksId

  return tasksStore.findTaskById(taskId) || null
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
