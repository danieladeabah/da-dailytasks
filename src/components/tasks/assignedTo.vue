<template>
  <CommonHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.assignTo }}</h1>
      <UButton
        v-if="canManageTask"
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="toggleAssignToModal"
      />
    </template>
    <div class="flex items-center space-x-2 overflow-auto">
      <template v-if="users.length > 0">
        <UiKitsCommonUserAvatar
          v-for="user in users"
          :key="user.id"
          :src="getUserProfileImage(user.profile_image)"
          :alt="getUserFullName(user)"
        />
      </template>
      <p v-else class="text-gray-500">{{ texts.noAssignedUsers }}</p>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <UiKitsUiSlotsFormModelSlot
    form-title="Assign To"
    v-model="assignToModal"
    @closeDialog="assignToModal = false"
    v-if="assignToModal"
  >
    <div
      v-for="(option, index) in options"
      :key="option.id"
      class="flex items-center gap-5"
    >
      <span>{{ index + 1 }}.</span>
      <div class="flex flex-grow items-center gap-5 pr-2">
        <UInput
          size="sm"
          class="lg:w-40vw w-full"
          v-model="option.email"
          type="email"
          placeholder="Email address"
          maxLength="250"
          @keyup.enter="debouncedFetchUserDetails(option.email, index)"
        />
        <template v-for="field in userDetailFields">
          <UInput
            v-if="field.visible"
            :key="field.key"
            size="sm"
            class="lg:w-40vw hidden w-full"
            :placeholder="field.placeholder"
            :value="option[field.key as keyof typeof option]"
            readonly
            disabled
          />
        </template>
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
      v-if="options.length < maxAssignees"
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
        @click="submitAssignees"
      >
        {{ texts_a.buttonAssign }}
      </UButton>
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
import {
  dashboard as texts,
  createATask as texts_a
} from '@/constants/texts.json'
import { useTasksStore } from '@/store/tasks'
import { useTaskDetails } from '~/composables/useTaskDetails'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const tasksStore = useTasksStore()
const { isLoggedIn } = useAuth()
const { taskDetails, isTaskAdmin } = useTaskDetails()
const assignToModal = ref(false)
const warningMessage = ref('')
const maxAssignees = 9
const optionIndex = ref(0)

const options = ref([createEmptyOption()])

const userDetailFields = [
  { key: 'first_name', placeholder: 'First Name', visible: false },
  { key: 'last_name', placeholder: 'Last Name', visible: false },
  { key: 'profile_image', placeholder: 'Image URL', visible: false }
]

const users = computed(() => {
  const taskId = route.params.tasksId as string
  const task = tasksStore.findTaskById(taskId)
  return task?.assignees || []
})

const canManageTask = computed(
  () => isLoggedIn.value && taskDetails.value && isTaskAdmin.value
)

function createEmptyOption() {
  return {
    id: generateAssigneeId(),
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    user_id: ''
  }
}

function generateAssigneeId() {
  return assigneesEncodeBase62(Date.now(), optionIndex.value++)
}

function toggleAssignToModal() {
  assignToModal.value = !assignToModal.value
  if (assignToModal.value) loadAssignees()
}

function loadAssignees() {
  const taskId = route.params.tasksId as string
  const task = tasksStore.findTaskById(taskId)
  options.value = task?.assignees?.length
    ? task.assignees.map(mapToOption)
    : [createEmptyOption()]
}

function mapToOption(assignee: any) {
  return {
    id: assignee.id,
    first_name: assignee.first_name,
    last_name: assignee.last_name,
    email: assignee.email,
    profile_image: assignee.profile_image,
    user_id: assignee.user_id
  }
}

function addOption() {
  if (options.value.length < maxAssignees)
    options.value.push(createEmptyOption())
}

function removeOption(index: number) {
  if (options.value.length > 1) {
    options.value.splice(index, 1)
  } else {
    Object.assign(options.value[index], createEmptyOption())
  }
}

async function fetchUserDetails(email: string, index: number) {
  if (!isValidEmail(email)) return resetOptionFields(index)

  try {
    const data = await fetchUser(email)
    if (data?.user) {
      const { first_name, last_name, profile_image, id } = data.user
      Object.assign(options.value[index], {
        first_name,
        last_name,
        profile_image,
        user_id: id
      })
    } else resetOptionFields(index)
  } catch {
    resetOptionFields(index)
  }
}

function resetOptionFields(index: number) {
  Object.assign(options.value[index], createEmptyOption())
}

async function fetchUser(email: string) {
  const response = await fetch(
    `../../api/auth/get-user-by-email?email=${encodeURIComponent(email)}`
  )
  return response.json()
}

const debouncedFetchUserDetails = debounce(fetchUserDetails, 300)

function submitAssignees() {
  const invalidImages = getMissingImages()
  if (invalidImages.length) {
    warningMessage.value = formatWarningMessage(
      invalidImages.filter(image => image !== null)
    )
    return
  }
  assignValidAssignees()
}

function getMissingImages() {
  return options.value
    .map((option, index) => (optionRequiresImage(option) ? index + 1 : null))
    .filter(Boolean)
}

function optionRequiresImage(option: any) {
  return (
    (option.first_name || option.last_name || option.email) &&
    !option.profile_image?.trim()
  )
}

function formatWarningMessage(missingImages: number[]) {
  const plural = missingImages.length > 1
  return `#${missingImages.join(', ')} ${plural ? 'do not have images' : 'does not have an image'}.`
}

function assignValidAssignees() {
  const taskId = route.params.tasksId as string
  const task = tasksStore.findTaskById(taskId)
  if (!task) return
  task.assignees = options.value.filter(isValidOption).map(prepareAssigneeData)
  tasksStore.assignPeopleToTask(task)
  warningMessage.value = ''
  assignToModal.value = false
}

function isValidOption(option: any) {
  return (
    option.first_name?.trim() &&
    option.last_name?.trim() &&
    option.email?.trim() &&
    option.profile_image?.trim()
  )
}

function prepareAssigneeData(option: any) {
  return {
    ...option,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

function getUserFullName(user: any) {
  return `${user.first_name} ${user.last_name}`
}

function getUserProfileImage(profileImage: string) {
  return `https://raw.githubusercontent.com/danieladeabah/da-dailytasks/refs/heads/main/public/profiles/${profileImage}`
}
</script>
