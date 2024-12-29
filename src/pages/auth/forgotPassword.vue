<template>
  <UiKitsUiSlotsAuthWrapper>
    <template #title>{{ text.resetPassword }}</template>
    <template #forgotPassword>
      {{ text.resetPasswordInfo }}
    </template>
    <template #errors>
      <div v-if="store.error" class="text-red-600">
        {{ store.error }}
      </div>
    </template>
    <template #form>
      <UInput
        placeholder="Email address"
        v-model="email"
        maxLength="100"
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

const email = ref('')

const store = useAuthenticationStore()

const forgotPassword = () => {
  store.forgotPassword(email.value)
}
</script>
