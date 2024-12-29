<template>
  <UiKitsUiSlotsHeaderSlot>
    <span>
      <NuxtLink to="/" class="text-2xl font-bold">{{ greeting }}</NuxtLink>
      <p>{{ currentDate }}</p>
    </span>
    <div class="flex gap-5">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
          v-if="isLoggedIn"
          src="https://avatars.githubusercontent.com/u/124435531?v=4"
        />
        <UBadge v-else label="Get Started" color="gray" />

        <template v-if="isLoggedIn" #account="{ item }">
          <div class="flex items-center justify-between gap-5">
            <div class="text-left">
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon
            :name="item.icon"
            class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
          />
        </template>
      </UDropdown>
    </div>
  </UiKitsUiSlotsHeaderSlot>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/store/auth'

const greeting = computed(() => {
  const hours = new Date().getHours()
  if (hours < 12) return 'Good morning'
  if (hours < 18) return 'Good afternoon'
  return 'Good evening'
})
const currentDate = new Date().toDateString()

const authStore = useAuthenticationStore()
onMounted(() => {
  authStore.loadToken()
})

const isLoggedIn = computed(() => !!authStore.token)

const logout = () => {
  authStore.logout()
  navigateTo('/dashboard')
}

const items = computed(() => [
  [
    {
      label: isLoggedIn.value ? 'Daniel Adeabah' : 'You are not logged in',
      slot: 'account',
      disabled: true
    },
    {
      label: isLoggedIn.value ? 'Logout' : 'Login',
      icon: isLoggedIn.value
        ? 'i-heroicons-arrow-right-start-on-rectangle'
        : 'i-heroicons-arrow-right-20-solid',
      click() {
        if (isLoggedIn.value) {
          logout()
        } else {
          navigateTo('/auth/login')
        }
      }
    }
  ]
])
</script>
