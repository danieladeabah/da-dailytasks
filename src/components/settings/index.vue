<template>
  <UiKitsUiSlotsProjectActivitySlot v-if="isLoggedIn">
    <UTabs :items="tabItems" class="my-5 w-full">
      <template #me>
        <SettingsMe class="my-5 flex items-center justify-center" />
      </template>
      <template #email>
        <SettingsEmail class="my-5 flex items-center justify-center" />
      </template>
      <template #password>
        <SettingsPassword class="my-5 flex items-center justify-center" />
      </template>
    </UTabs>
  </UiKitsUiSlotsProjectActivitySlot>
  <UiKitsUiSlotsProjectActivitySlot v-else>
    <div>
      <p class="my-10 text-center text-2xl">You are not logged in</p>
      <UButton
        @click="navigateTo('/auth/login')"
        color="blue"
        class="mx-auto my-10 flex w-[200px] items-center justify-center"
      >
        Login
      </UButton>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'

const authStore = useAuthenticationStore()
const isLoggedIn = computed(() => !!authStore.token)

const tabItems = computed(() => [
  { slot: 'me', label: `Me` },
  { slot: 'email', label: `Email` },
  { slot: 'password', label: `Password` }
])
</script>
