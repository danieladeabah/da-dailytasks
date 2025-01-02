<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.assignTo }}</h1>
      <UButton
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="assignToModel"
      />
    </template>
    <div class="flex items-center space-x-2 overflow-auto">
      <template v-if="users.length > 0">
        <UiKitsUserAvatar
          v-for="user in users"
          :key="user.id"
          :src="`https://raw.githubusercontent.com/danieladeabah/da-dailytasks/refs/heads/main/public/profiles/${user.image}`"
          :alt="user.name"
        />
      </template>
      <p v-else class="text-gray-500">{{ texts.noAssignedUsers }}</p>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <UiKitsUiSlotsFormModelSlot
    form-title="Assign To"
    @close-modal="assignToModel"
    v-if="assignTo"
    v-model="assignTo"
    @closeDialog="assignTo = false"
  >
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-5"
    >
      <span>{{ index + 1 }}.</span>
      <div class="flex flex-grow items-center gap-5 rounded-2xl pr-2">
        <UInput
          size="sm"
          class="lg:w-40vw w-full"
          v-model="option.email"
          type="email"
          placeholder="Email address"
          @keyup.enter="fetchUserDetails(option.email, index)"
        />
        <UInput
          size="sm"
          class="lg:w-40vw hidden w-full"
          v-model="option.name"
          placeholder="Full name"
          :readonly="true"
          :disabled="true"
        />
        <UInput
          size="sm"
          class="lg:w-40vw hidden w-full"
          v-model="option.image"
          type="url"
          placeholder="Image URL"
          :readonly="true"
          :disabled="true"
        />
        <img
          src="/assets/icons/delete-icon.svg"
          alt="delete"
          class="cursor-pointer"
          @click="removeOption(index)"
        />
      </div>
    </div>

    <span class="text-xs italic text-gray-400"
      >[Press Enter to confirm user details]</span
    >
    <UButton
      v-if="options.length < 9"
      size="sm"
      color="gray"
      variant="ghost"
      trailing-icon="i-heroicons-plus-20-solid"
      class="w-16 rounded-2xl px-6"
      @click="addOption"
    />

    <p v-if="warningMessage" class="text-xs text-red-500">
      {{ warningMessage }}
    </p>

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="assignToubmit"
        >{{ texts_a.buttonAssign }}</UButton
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

const route = useRoute()
const tasksStore = useTasksStore()

const assignTo = ref(false)
const optionIndex = ref(0)
const options = ref([
  {
    id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
    name: '',
    email: '',
    image: ''
  }
])
const warningMessage = ref('')

const addOption = () => {
  if (options.value.length < 9)
    options.value.push({
      id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
      name: '',
      email: '',
      image: ''
    })
}

const removeOption = (index: number) => {
  if (options.value.length > 1) options.value.splice(index, 1)
  else {
    options.value[index].name = ''
    options.value[index].email = ''
    options.value[index].image = ''
  }
}

const fetchUserDetails = async (email: string, index: number) => {
  try {
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      options.value[index].name = ''
      options.value[index].image = ''
      return
    }

    // Simulate API call to fetch user details
    const response = await fetch(
      `../../api/auth/get-user-by-email?email=${encodeURIComponent(email)}`
    )
    const data = await response.json()

    if (data?.user) {
      const { first_name, last_name, profile_image } = data.user

      // Set full name and image in the fields
      options.value[index].name = `${first_name} ${last_name}`
      options.value[index].image = profile_image
    } else {
      // Clear fields if no valid user data is returned
      options.value[index].name = ''
      options.value[index].image = ''
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
    options.value[index].name = ''
    options.value[index].image = ''
  }
}

const assignToModel = () => {
  assignTo.value = !assignTo.value

  if (assignTo.value) {
    const taskId = route.params.tasksId as string
    const task = tasksStore.findTaskById(taskId)
    if (task && task.assignees.length > 0) {
      options.value = task.assignees.map(assignee => ({
        id: assignee.id,
        name: assignee.name,
        email: assignee.email,
        image: assignee.image
      }))
    } else {
      options.value = [
        {
          id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
          name: '',
          email: '',
          image: ''
        }
      ]
    }
  }
}

const assignToubmit = () => {
  const missingImageAssignees = options.value
    .map((option, index) => {
      if (
        (option.name?.trim() !== '' || option.email?.trim() !== '') &&
        (!option.image || option.image.trim() === '')
      ) {
        return `#${index + 1}`
      }
      return null
    })
    .filter(assignee => assignee !== null) as string[]

  if (missingImageAssignees.length > 0) {
    warningMessage.value = `${missingImageAssignees.join(', ')} ${missingImageAssignees.length > 1 ? 'do not have images' : 'does not have an image'}.`
    return
  }

  const taskId = route.params.tasksId as string
  const task = tasksStore.findTaskById(taskId)
  if (task) {
    task.assignees = options.value
      .filter(
        option =>
          option.name?.trim() !== '' &&
          option.email?.trim() !== '' &&
          option.image?.trim() !== '' &&
          option.image !== null
      )
      .map(option => ({
        id: option.id,
        name: option.name,
        email: option.email,
        image: option.image
      }))
    tasksStore.assignPeopleToTask(task)
  }
  warningMessage.value = ''
  assignToModel()
}

const users = computed(() => {
  const taskId = route.params.tasksId as string
  const task = tasksStore.findTaskById(taskId)
  return task ? task.assignees : []
})
</script>
