<template>
  <div class="my-6 flex flex-col items-center justify-center">
    <!-- Profile Image with Preview -->
    <UiKitsProfileImage
      :img-src="preview || userInfo?.profile_image"
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
    <UInput placeholder="First Name" v-model="first_name" maxLength="50" />

    <UInput placeholder="Last Name" v-model="last_name" maxLength="50" />
  </div>
  <p class="text-sm italic text-gray-400">[Auto save]</p>
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
const profile_image = ref('')

const preview = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    preview.value = URL.createObjectURL(file)
  }
}

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
      profile_image.value = newUserInfo.profile_image
    }
  },
  { immediate: true }
)
</script>
