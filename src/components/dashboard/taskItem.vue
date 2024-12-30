<template>
  <label
    class="selected-option option-container flex items-center justify-between"
    for="switch"
  >
    <div
      class="flex items-center gap-5"
      :class="{ 'line-through': isChecked === 1 }"
    >
      <UCheckbox
        v-model="isCheckedBoolean"
        :label="task.name"
        color="sky"
        id="switch"
        @change="handleCheckboxChange"
      />
    </div>
    <span class="option-input" @click="editTaskModel">
      <img
        src="/assets/icons/editIcon.svg"
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
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { createATask as texts_a } from '@/constants/texts.json'
import { useTasksStore } from '@/store/tasks'
import type { Task } from '@/types/types'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const tasksStore = useTasksStore()
const route = useRoute()
const trackId = route.params.tasksindex as string

// Initialize isChecked as 0 or 1
const isChecked = ref(props.task.isChecked ? 0 : 1)
const editATasks = ref(false)
const isCheckedBoolean = computed({
  get: () => isChecked.value === 0,
  set: (val: boolean) => {
    isChecked.value = val ? 1 : 0
  }
})
const editedTaskName = ref(props.task.name || '')
const currentTask = ref<Task | null>(null)

const editTaskModel = () => {
  editATasks.value = !editATasks.value

  if (props.task) {
    currentTask.value = props.task as Task
    editedTaskName.value = props.task.name
  }
}

const handleCheckboxChange = () => {
  if (props.task) {
    // Update isChecked to 0 or 1
    const updatedSubTask = {
      ...props.task,
      id: props.task.id,
      name: props.task.name,
      isChecked: isChecked.value // Use the updated isChecked value
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
  if (!editedTaskName.value) {
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
    isChecked.value = value ? 1 : 0 // Convert to 0 or 1
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
</style>
