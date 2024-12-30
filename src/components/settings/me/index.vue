<template>
  <div class="my-6 flex flex-col items-center justify-center">
    <UiKitsProfileImage
      :img-src="''"
      :name="userInfo?.first_name"
      :scale="true"
      :height-size="'15rem'"
      :width-size="'15rem'"
    />
    <UBadge label="Change photo" color="gray" class="mt-4" />
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
} | null>(null)

const first_name = ref('')
const last_name = ref('')

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
