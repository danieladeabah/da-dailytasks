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
        <UAvatar src="https://avatars.githubusercontent.com/u/124435531?v=4" />

        <template #account="{ item }">
          <div class="flex items-center justify-between gap-5">
            <div class="text-left">
              <p>{{ texts_b.specialization }}</p>
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
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>
  </UiKitsUiSlotsHeaderSlot>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/auth";
import { userInfo as texts_b } from "@/texts/texts.json";

const greeting = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good morning";
  if (hours < 18) return "Good afternoon";
  return "Good evening";
});
const currentDate = new Date().toDateString();

const authStore = useAuthenticationStore();
onMounted(() => {
  authStore.loadToken();
});

const isLoggedIn = computed(() => !!authStore.token);

const logout = () => {
  authStore.logout();
  navigateTo("/authentication/login");
};

const items = computed(() => [
  [
    {
      label: "Daniel Adeabah",
      slot: "account",
      disabled: true,
    },
    {
      label: "Portfolio",
      icon: "i-heroicons-link-20-solid",
      click() {
        window.open("https://danieladeabah.vercel.app", "_blank");
      },
    },
    {
      label: "LinkedIn",
      icon: "i-heroicons-link-20-solid",
      click() {
        window.open("https://www.linkedin.com/in/danieladeabaa/", "_blank");
      },
    },
    {
      label: "GitHub",
      icon: "i-heroicons-link-20-solid",
      click() {
        window.open("https://github.com/danieladeabah", "_blank");
      },
    },
    {
      label: isLoggedIn.value ? "Logout" : "Login",
      icon: isLoggedIn.value
        ? "i-heroicons-arrow-right-start-on-rectangle"
        : "i-heroicons-arrow-right-20-solid",
      click() {
        if (isLoggedIn.value) {
          logout();
        } else {
          navigateTo("/authentication/login");
        }
      },
    },
  ],
]);
</script>
