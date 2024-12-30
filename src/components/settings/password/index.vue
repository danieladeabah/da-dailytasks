<template>
  <div class="relative my-6">
    <p>
      You are logged in as <strong>{{ userInfo?.first_name }}</strong
      >, If you wish to update your password please do so here. We will send you
      an email to reset your password.
    </p>
  </div>

  <div class="flex flex-col">
    <UInput placeholder="Email address" v-model="email" maxLength="150" />
    <p class="text-sm italic text-gray-400">[Hit enter to proceed]</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'

const authStore = useAuthenticationStore()
const userInfo = ref<{
  id: number | null
  first_name: string
  last_name: string
  email: string
} | null>(null)

const email = ref('')

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
      email.value = newUserInfo.email
    }
  },
  { immediate: true }
)
</script>
