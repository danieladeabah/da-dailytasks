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
      maxLength="250"
      @keydown.enter="forgotPassword"
    />
    <p class="text-xs italic text-gray-400">[Press Enter to proceed]</p>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { useAuthenticationStore } from '@/store/auth'
import { isValidEmail } from '@/utils/isValidEmail'

const { userInfo } = useUser()
const authStore = useAuthenticationStore()

const email = ref('')
const errorMessage = ref<string | null>(null)

watch(email, newEmail => {
  email.value = newEmail
})

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
