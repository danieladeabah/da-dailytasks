<template>
  <UiKitsUiSlotsFormModelSlot
    :form-title="formTitle"
    @close-modal="closeModal"
    v-if="isOpen"
    v-model="isOpen"
    @closeDialog="closeModal"
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

    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        v-model="isPrivate"
        id="isPrivate"
        class="h-5 w-5 cursor-pointer"
      />
      <label for="isPrivate" class="cursor-pointer text-sm">
        {{ isPrivate ? texts_a.isPublic : texts_a.isPrivate }}
      </label>
    </div>

    <div class="flex items-center justify-end space-x-3">
      <UButton class="w-fit" color="blue" variant="solid" @click="submitTask()">
        {{ buttonText }}
      </UButton>
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import { useAuthenticationStore } from '@/store/auth'
import { createATask as texts_a } from '@/constants/texts.json'
import { encodeBase62 } from '@/utils/encodeBase62'
import type { Task } from '~/types/types'

const tasksStore = useTasksStore()
const authStore = useAuthenticationStore()

const isOpen = ref(false)
const taskName = ref('')
const deadline = ref('')
const description = ref('')
const isPrivate = ref(false)
const minDate = ref(getMinDate())
const formTitle = ref('Create Task')
const buttonText = ref(texts_a.buttonAddTask)

const userInfo = ref<{
  id: number | null
} | null>(null)

onMounted(async () => {
  authStore.loadToken()
  if (authStore.token) {
    await authStore.fetchUserDetails()
    userInfo.value = authStore.getUserInfo()
  }
})

const openModal = (type: 'create' | 'edit', task: Task | null = null) => {
  isOpen.value = true
  if (type === 'edit' && task) {
    formTitle.value = 'Edit Task'
    buttonText.value = texts_a.buttonEdit
    taskName.value = task.name
    deadline.value = task.deadline
    description.value = task.description
    isPrivate.value = task.isPrivate
  } else {
    formTitle.value = 'Create Task'
    buttonText.value = texts_a.buttonAddTask
    taskName.value = ''
    deadline.value = ''
    description.value = ''
    isPrivate.value = false
  }
}

const closeModal = () => {
  isOpen.value = false
}

const route = useRoute()

const submitTask = () => {
  if (!taskName.value || !deadline.value || !description.value) {
    console.error('All fields are required to create a task.')
    return
  }

  let taskId = ''
  if (Array.isArray(route.params.tasksindex)) {
    taskId = route.params.tasksindex[0]
  } else {
    taskId = route.params.tasksindex
  }

  const task = computed(() => {
    return tasksStore.findTaskById(taskId) || null
  })

  if (formTitle.value === 'Edit Task') {
    const updatedTask = {
      ...task.value,
      name: taskName.value,
      deadline: deadline.value,
      description: description.value,
      isPrivate: isPrivate.value
    }
    tasksStore.updateTask(taskId, updatedTask as Task)
  } else if (formTitle.value === 'Create Task') {
    const uniqueId = encodeBase62(Date.now())
    const newTask = {
      id: uniqueId,
      user_id: userInfo.value?.id,
      name: taskName.value,
      deadline: deadline.value,
      description: description.value,
      isPrivate: isPrivate.value,
      assignees: [],
      subTasks: [],
      progress: 0
    }
    tasksStore.createTask(newTask)
  }

  closeModal()
}

defineExpose({ openModal, closeModal })
</script>
