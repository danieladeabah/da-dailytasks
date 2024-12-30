<template>
  <div class="relative my-6">
    <p>
      You are logged in as <strong>{{ userInfo?.first_name }}</strong
      >, If you wish to update your password please do so here. We will send you
      an email to reset your password
    </p>
  </div>

  <div class="flex flex-col">
    <UInput placeholder="Email address" v-model="email" maxLength="100" />
    <p class="text-sm italic text-gray-400">[Hit enter to proceed]</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'

const authStore = useAuthenticationStore()
const isLoggedIn = computed(() => !!authStore.token)
const userInfo = ref<{
  id: number | null
  first_name: string
  last_name: string
} | null>(null)

onMounted(async () => {
  authStore.loadToken()
  if (authStore.token) {
    await authStore.fetchUserDetails()
    userInfo.value = authStore.getUserInfo()
  }
})

const email = ref('')
</script>
