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
          <p>
            {{ texts.deadline }}
            <span class="font-semibold text-[#000]">{{ task.deadline }}</span>
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
          @click="editTaskModal"
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

  <!-- Edit Task Modal -->
  <UiKitsUiSlotsFormModelSlot
    form-title="Edit Task"
    @close-modal="editTaskModal"
    v-if="createATasks"
    v-model="createATasks"
    @closeDialog="editTaskModal"
  >
    <label class="font-bold" for="taskName">{{ texts_a.taskName }}</label>
    <UInput placeholder="Task Name" v-model="taskName" maxLength="100" />

    <label class="font-bold" for="deadline">{{ texts_a.deadline }}</label>
    <UInput
      type="date"
      placeholder="Deadline"
      v-model="deadline"
      :min="minDate"
      maxLength="10"
    />

    <label class="font-bold" for="description">{{ texts_a.description }}</label>
    <UTextarea
      placeholder="Task Description"
      :rows="10"
      v-model="description"
      maxLength="500"
    />

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="editATaskSubmit"
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  dashboard as texts,
  createATask as texts_a
} from '@/constants/texts.json'
import { getProgressColor } from '@/utils/progressColor'
import { useTasksStore } from '@/store/tasks'
import type { Task } from '@/types/types'

const tasksStore = useTasksStore()
const route = useRoute()
const minDate = ref(getMinDate())
const createATasks = ref(false)

const task = computed(() => {
  const taskId = Array.isArray(route.params.tasksindex)
    ? route.params.tasksindex[0]
    : route.params.tasksindex

  return tasksStore.findTaskById(taskId) || null
})

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage()
})

const taskName = ref('')
const deadline = ref('')
const description = ref('')

const editTaskModal = () => {
  createATasks.value = !createATasks.value

  if (task.value) {
    taskName.value = task.value.name
    deadline.value = task.value.deadline
    description.value = task.value.description
  }
}

const editATaskSubmit = () => {
  if (!taskName.value || !deadline.value || !description.value) {
    console.error('All fields are required to update the task.')
    return
  }

  const updatedTask = {
    ...task.value,
    name: taskName.value,
    deadline: deadline.value,
    description: description.value
  }

  if (task.value) {
    tasksStore.updateTask(task.value.id, updatedTask as Task)
  }

  editTaskModal()
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
