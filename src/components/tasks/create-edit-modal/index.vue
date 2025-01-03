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
        :checked="isPrivateComputed"
        @change="toggleIsPrivate"
        id="isPrivate"
        class="h-5 w-5 cursor-pointer"
      />
      <label for="isPrivate" class="cursor-pointer text-sm">
        {{ isPrivate === 0 ? texts_a.isPrivate : texts_a.isPublic }}
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
import { createATask as texts_a } from '@/constants/texts.json'
import { encodeBase62 } from '@/utils/encodeBase62'
import type { Task } from '~/types/types'
import { useUser } from '@/composables/useUser'

const tasksStore = useTasksStore()
const { userInfo } = useUser()

const isOpen = ref(false)
const taskName = ref('')
const deadline = ref('')
const description = ref('')
const isPrivate = ref<number>(0)
const minDate = ref(getMinDate())
const formTitle = ref('Create Task')
const buttonText = ref(texts_a.buttonAddTask)

const isPrivateComputed = computed({
  get: () => isPrivate.value === 1,
  set: (value: boolean) => (isPrivate.value = value ? 1 : 0)
})

const toggleIsPrivate = () => {
  isPrivate.value = isPrivate.value === 1 ? 0 : 1
}

const openModal = (type: 'create' | 'edit', task: Task | null = null) => {
  isOpen.value = true
  if (type === 'edit' && task) {
    formTitle.value = 'Edit Task'
    buttonText.value = texts_a.buttonEdit
    taskName.value = task.name
    deadline.value = new Date(task.deadline).toISOString().split('T')[0]
    description.value = task.description
    isPrivate.value = task.isPrivate || 0
  } else {
    formTitle.value = 'Create Task'
    buttonText.value = texts_a.buttonAddTask
    taskName.value = ''
    deadline.value = ''
    description.value = ''
    isPrivate.value = 0
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
  if (Array.isArray(route.params.tasksId)) {
    taskId = route.params.tasksId[0]
  } else {
    taskId = route.params.tasksId
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
      user_id: userInfo.value?.id?.toString() || '',
      name: taskName.value,
      deadline: deadline.value,
      description: description.value,
      isPrivate: isPrivate.value,
      assignees: [],
      subTasks: [],
      progress: 0,
      isChecked: 0
    }
    tasksStore.createTask(newTask as any)
  }

  closeModal()
}

defineExpose({ openModal, closeModal })
</script>
