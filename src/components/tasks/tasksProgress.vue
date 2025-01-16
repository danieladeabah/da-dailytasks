<template>
  <CommonHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.tasksProgress }}</h1>
      <UDropdown
        v-if="canManageTask"
        :items="dropdownLists"
        :popper="{ arrow: true }"
      >
        <UButton
          color="white"
          variant="ghost"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </template>
    <div v-if="subTasks.length === 0" class="text-gray-500">
      {{ texts_a.noTasksAdded }}
    </div>
    <TasksTaskItem
      v-else
      v-for="(task, index) in subTasks"
      :key="index"
      :task="task"
    />
  </UiKitsUiSlotsDashboardSlot>

  <UiKitsUiSlotsFormModelSlot
    form-title="Add Sub Task"
    @close-modal="addTaskModel"
    v-if="addATasks"
    v-model="addATasks"
    @closeDialog="addATasks = false"
  >
    <UInput placeholder="Task Name" v-model="newSubTaskName" maxLength="100" />
    <div class="flex justify-end">
      <UButton class="w-fit" color="blue" variant="solid" @click="addSubTask"
        >Add</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  dashboard as texts,
  createATask as texts_a
} from '@/constants/texts.json'
import { useTasksStore } from '@/store/tasks'
import type { Task } from '@/types/types'
import { useAuth } from '~/composables/useAuth'
import { useTaskDetails } from '~/composables/useTaskDetails'

const route = useRoute()
const selectedTaskId = route.params.tasksId as string

const newSubTaskName = ref('')
const addATasks = ref(false)

const { isLoggedIn } = useAuth()
const tasksStore = useTasksStore()
const { taskDetails, isTaskAdmin } = useTaskDetails()
const viewedFromHome = computed(() => route.query.h === 'true')

const canManageTask = computed(
  () => isLoggedIn.value && taskDetails.value && isTaskAdmin.value
)

const subTasks = computed(() => taskDetails.value?.subTasks || [])

const dropdownLists = [
  [
    {
      label: 'Add Sub Task',
      click: () => {
        addTaskModel()
      }
    }
  ]
]

onMounted(() => {
  if (!isLoggedIn.value || viewedFromHome.value) {
    tasksStore.fetchAllTasks()
  } else {
    tasksStore.fetchTasksById()
  }
})

const addTaskModel = () => {
  addATasks.value = !addATasks.value
  if (addATasks.value) newSubTaskName.value = ''
}

const addSubTask = () => {
  if (!newSubTaskName.value) return

  const task = {
    id: encodeBase62(Date.now()),
    name: newSubTaskName.value,
    isChecked: false
  }

  tasksStore.addSubTask(selectedTaskId, task as unknown as Task)
  addTaskModel()
}
</script>
