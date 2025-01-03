<template>
  <label
    class="selected-option option-container flex items-center justify-between"
    for="switch"
    :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
  >
    <div
      class="flex items-center gap-5"
      :class="{ 'line-through': isChecked, 'cursor-not-allowed': isDisabled }"
    >
      <UCheckbox
        v-model="isCheckedBoolean"
        :label="task.name"
        color="sky"
        id="switch"
        @change="handleCheckboxChange"
        :disabled="isDisabled"
      />
    </div>
    <span class="option-input" @click="editTaskModel" v-if="!isDisabled">
      <img
        src="/assets/icons/edit-icon.svg"
        alt="edit"
        class="h-4 w-4 cursor-pointer"
        title="Edit Task"
      />
    </span>
  </label>

  <UiKitsUiSlotsFormModelSlot
    form-title="Edit Sub Task"
    @close-modal="editTaskModel"
    v-if="editATasks"
    v-model="editATasks"
    @closeDialog="editATasks = false"
  >
    <UInput v-model="editedTaskName" placeholder="Task Name" maxLength="100" />
    <div class="flex items-center justify-between">
      <UDropdown :items="deleteOptions" :popper="{ arrow: true }">
        <UButton
          label="Remove"
          color="white"
          variant="ghost"
          class="w-[120px] rounded-md bg-[#FFF] py-2 font-semibold text-[#c42727]"
        />
      </UDropdown>
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="editTaskSubmit"
        :disabled="isDisabled"
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { createATask as texts_a } from '@/constants/texts.json'
import { useTasksStore } from '@/store/tasks'
import type { Task } from '@/types/types'
import { useUser } from '~/composables/useUser'
import { useAuth } from '~/composables/useAuth'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const { userInfo } = useUser()
const { isLoggedIn } = useAuth()
const tasksStore = useTasksStore()
const route = useRoute()
const trackId = route.params.tasksId as string

// get the task details
const tasks = computed(
  () => tasksStore.findTaskById(route.params.tasksId as string) || null
)

const isUserTask = computed(
  () =>
    tasks.value && String(tasks.value.user_id) === String(userInfo.value?.id)
)

// `isDisabled` checks whether the user is logged in and if they are the task owner.
const isDisabled = computed(() => !isLoggedIn || !isUserTask.value)

const isChecked = ref(props.task.isChecked)
const editATasks = ref(false)
const isCheckedBoolean = computed({
  get: () => isChecked.value === 1,
  set: (val: boolean) => {
    isChecked.value = val ? 1 : 0
  }
})
const editedTaskName = ref(props.task.name || '')
const currentTask = ref<Task | null>(null)

const editTaskModel = () => {
  if (isDisabled.value) return
  editATasks.value = !editATasks.value

  if (props.task) {
    currentTask.value = props.task as Task
    editedTaskName.value = props.task.name
  }
}

const handleCheckboxChange = () => {
  if (props.task && !isDisabled.value) {
    const updatedSubTask = {
      ...props.task,
      id: props.task.id,
      name: props.task.name,
      isChecked: isChecked.value
    }
    tasksStore.updateSubTask(trackId, updatedSubTask as unknown as Task)

    const parentTask = tasksStore.findTaskById(trackId)
    if (parentTask) {
      const progress = calculateTaskProgress(parentTask)
      tasksStore.updateTask(parentTask.id, { ...parentTask, progress })
    }
  }
}

const editTaskSubmit = () => {
  if (!editedTaskName.value || isDisabled.value) {
    return
  }

  if (currentTask.value && props.task.id) {
    const updatedSubTask: Task = {
      ...currentTask.value,
      name: editedTaskName.value
    }
    tasksStore.updateSubTask(trackId, updatedSubTask)
    editATasks.value = false
    currentTask.value = null
  }
}

watch(
  () => props.task.isChecked,
  value => {
    isChecked.value = value ? 1 : 0
  }
)

const deleteOptions = [
  [
    {
      label: 'Cancel'
    },
    {
      label: 'Yes, Remove',
      click: () => {
        if (isDisabled.value) return
        editATasks.value = !editATasks.value
        tasksStore.deleteSubTask(trackId, props.task.id)

        const parentTask = tasksStore.findTaskById(trackId)
        if (parentTask) {
          const progress = calculateTaskProgress(parentTask)
          tasksStore.updateTask(parentTask.id, { ...parentTask, progress })
        }
      }
    }
  ]
]
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.option-input {
  display: none;
}

.option-container:hover .option-input {
  display: block;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.opacity-50 {
  opacity: 0.5;
}
</style>
