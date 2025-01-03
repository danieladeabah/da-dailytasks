<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.tasksProgress }}</h1>
      <UDropdown
        v-if="isLoggedIn && task && isUserTask"
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
import { useUser } from '~/composables/useUser'
import { useAuth } from '~/composables/useAuth'

const addATasks = ref(false)
const newSubTaskName = ref('')
const tasksStore = useTasksStore()
const route = useRoute()
const selectedTaskId = route.params.tasksId as string
const { userInfo } = useUser()
const { isLoggedIn } = useAuth()
const viewedFromHome = computed(() => route.query.h === 'true')

// get the task details
const task = computed(
  () => tasksStore.findTaskById(route.params.tasksId as string) || null
)
const isUserTask = computed(
  () => task.value && String(task.value.user_id) === String(userInfo.value?.id)
)

const subTasks = computed(() => task.value?.subTasks || [])

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
    isChecked: 0
  }

  tasksStore.addSubTask(selectedTaskId, task as unknown as Task)
  addTaskModel()
}
</script>
