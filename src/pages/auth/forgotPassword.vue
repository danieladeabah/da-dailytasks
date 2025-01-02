<template>
  <UiKitsUiSlotsAuthWrapper>
    <template #title>{{ text.resetPassword }}</template>
    <template #forgotPassword>
      {{ text.resetPasswordInfo }}
    </template>

    <template #errors>
      <div v-if="errorMessage" class="mb-2 text-red-600">
        {{ errorMessage }}
      </div>
    </template>

    <template #form>
      <UInput
        placeholder="Email address"
        v-model="email"
        maxLength="250"
        size="xl"
      />
      <UButton
        class="flex w-full justify-center font-bold hover:shadow-2xl"
        color="blue"
        label="Send Instructions"
        variant="solid"
        size="xl"
        @click="forgotPassword"
      />
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '~/store/auth'
import { authentication as text } from '@/constants/texts.json'
import { isValidEmail } from '@/utils/isValidEmail'

const email = ref('')
const errorMessage = ref<string | null>(null)

const store = useAuthenticationStore()

const forgotPassword = () => {
  errorMessage.value = null

  if (!email.value) {
    errorMessage.value = 'Please enter your email address'
  } else if (!isValidEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
  } else {
    store.forgotPassword(email.value)
    return
  }

  setTimeout(() => {
    errorMessage.value = null
  }, 3000)
}
</script>
