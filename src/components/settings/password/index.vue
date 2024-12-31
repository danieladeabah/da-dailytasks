<template>
  <div class="relative my-6">
    <p>
      You are logged in as <strong>{{ userInfo?.first_name }}</strong
      >, If you wish to update your password please do so here. We will send you
      an email to reset your password.
    </p>
  </div>

  <div class="flex flex-col">
    <p v-if="errorMessage" class="mb-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>

    <UInput
      placeholder="Email address"
      v-model="email"
      maxLength="150"
      @keydown.enter="forgotPassword"
    />
    <p class="text-sm italic text-gray-400">[Hit enter to proceed]</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'
import { isValidEmail } from '@/utils/isValidEmail'

const authStore = useAuthenticationStore()
const userInfo = ref<{
  id: number | null
  first_name: string
  last_name: string
  email: string
} | null>(null)

const email = ref('')
const errorMessage = ref<string | null>(null)

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

const forgotPassword = () => {
  if (!email.value) {
    errorMessage.value = 'Please enter your email address'
  } else if (!isValidEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
  } else {
    authStore.forgotPassword(email.value)
    return
  }

  setTimeout(() => {
    errorMessage.value = null
  }, 3000)
}
</script>
