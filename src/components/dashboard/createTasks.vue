<template #footer>
  <footer class="flex items-center justify-center">
    <div class="absolute bottom-5 flex items-center justify-center p-5 text-center">
      <UButton
        class="fixed flex h-12 w-12 items-center justify-center rounded-full bg-[#4E3EC8] font-extrabold hover:bg-[#6e5ee4] hover:shadow-2xl"
        trailing-icon="i-heroicons-plus-20-solid" @click="createTaskModal">
      </UButton>
    </div>
  </footer>

  <UiKitsUiSlotsFormModelSlot form-title="Create Task" @close-modal="createTaskModal" v-if="createATasks"
    v-model="createATasks" @closeDialog="createTaskModal">
    <label class="font-bold" for="taskName">{{ texts_a.taskName }}</label>
    <UInput placeholder="Task Name" v-model="taskName" maxLength="100" />

    <label class="font-bold" for="deadline">{{ texts_a.deadline }}</label>
    <UInput type="date" placeholder="Deadline" v-model="deadline" :min="minDate" maxLength="10" />

    <label class="font-bold" for="description">{{ texts_a.description }}</label>
    <UTextarea placeholder="Task Description" :rows="10" v-model="description" maxLength="500" />

    <div class="flex justify-end">
      <UButton class="w-fit" color="blue" variant="solid" @click="createATaskSubmit">
        {{ texts_a.buttonAddTask }}
      </UButton>
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/store/tasks'
import { createATask as texts_a } from '@/constants/texts.json'
import { encodeBase62 } from '@/utils/encodeBase62'

const tasksStore = useTasksStore()

const createATasks = ref(false)
const taskName = ref('')
const deadline = ref('')
const description = ref('')
const minDate = ref(getMinDate())

const createTaskModal = () => {
  createATasks.value = !createATasks.value

  if (!createATasks.value) {
    taskName.value = ''
    deadline.value = ''
    description.value = ''
  }
}

const createATaskSubmit = () => {
  if (!taskName.value || !deadline.value || !description.value) {
    console.error('All fields are required to create a task.')
    return
  }

  const uniqueId = encodeBase62(Date.now())
  const newTask = {
    id: uniqueId,
    name: taskName.value,
    deadline: deadline.value,
    description: description.value,
    assignees: [],
    subTasks: [],
    progress: 0
  }

  tasksStore.createTask(newTask)
  createTaskModal()
}
</script>
