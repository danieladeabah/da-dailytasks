<template>
  <div class="relative my-6">
    <p>
      You are logged in as <strong>{{ userInfo?.first_name }}</strong
      >, if you wish to update your email please do so here.
    </p>
  </div>

  <div class="flex flex-col">
    <UInput
      placeholder="Email address"
      v-model="email"
      maxLength="250"
      @keyup.enter="updateEmail"
    />
    <p class="text-xs italic text-gray-400">[Press Enter to update]</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'
import { useUser } from '@/composables/useUser'

const authStore = useAuthenticationStore()
const { userInfo } = useUser()

const email = ref('')

watch(
  userInfo,
  newUserInfo => {
    if (newUserInfo) {
      email.value = newUserInfo.email
    }
  },
  { immediate: true }
)

const updateEmail = async () => {
  if (email.value !== userInfo.value?.email) {
    await authStore.updateEmail(email.value)
  }
}
</script>
