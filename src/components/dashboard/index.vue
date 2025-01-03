<template>
  <div v-if="isLoggedIn">
    <DashboardStatistics />
    <DashboardTasksTab />
  </div>
  <div v-else>
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
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn } = useAuth()
</script>
