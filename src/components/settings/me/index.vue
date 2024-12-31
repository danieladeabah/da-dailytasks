<template>
  <div class="my-6 flex flex-col items-center justify-center">
    <UiKitsProfileImage
      :img-src="profileImageSrc"
      :name="userInfo?.first_name"
      :scale="true"
      :height-size="'15rem'"
      :width-size="'15rem'"
    />
    <UBadge
      label="Change photo"
      color="gray"
      class="mt-4 cursor-pointer"
      @click="triggerFileInput"
    />
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </div>

  <div class="flex flex-col space-y-4">
    <UInput
      placeholder="First Name"
      v-model="first_name"
      maxLength="50"
      @keyup.enter="updateFirstName"
    />

    <UInput
      placeholder="Last Name"
      v-model="last_name"
      maxLength="50"
      @keyup.enter="updateLastName"
    />
  </div>
  <p class="text-sm italic text-gray-400">[Press Enter to update]</p>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'

const authStore = useAuthenticationStore()
const userInfo = ref<{
  id: number | null
  first_name: string
  last_name: string
  profile_image: string
} | null>(null)

const first_name = ref('')
const last_name = ref('')

const preview = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    preview.value = URL.createObjectURL(file)
    await updateProfileImage(file)
  }
}

const updateProfileImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('profile_image', file)
    await authStore.updateProfileImage(formData)
  } catch (error) {
    console.error('Error updating profile image:', error)
  }
}

const updateFirstName = async () => {
  if (first_name.value !== userInfo.value?.first_name) {
    try {
      await authStore.updateFirstName(first_name.value)
    } catch (error) {
      console.error('Error updating first name:', error)
    }
  }
}

const updateLastName = async () => {
  if (last_name.value !== userInfo.value?.last_name) {
    try {
      await authStore.updateLastName(last_name.value)
    } catch (error) {
      console.error('Error updating last name:', error)
    }
  }
}

const profileImageSrc = computed(() => {
  return (
    preview.value ||
    (userInfo.value?.profile_image
      ? `https://raw.githubusercontent.com/danieladeabah/da-dailytasks/refs/heads/main/public/profiles/${userInfo.value.profile_image}`
      : '')
  )
})

onMounted(async () => {
  authStore.loadToken()
  if (authStore.token) {
    await authStore.fetchUserDetails()
    userInfo.value = authStore.getUserInfo()
  }
})

watch(
  userInfo,
  newUserInfo => {
    if (newUserInfo) {
      first_name.value = newUserInfo.first_name
      last_name.value = newUserInfo.last_name
    }
  },
  { immediate: true }
)
</script>
