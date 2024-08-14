<template>
  <UiKitsUiSlotsHeaderSlot>
    <span>
      <NuxtLink to="/" class="text-2xl font-bold">{{ greeting }}</NuxtLink>
      <p>{{ currentDate }}</p>
    </span>
    <span>
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar src="https://avatars.githubusercontent.com/u/124435531?v=4" />

        <template #account="{ item }">
          <div class="text-left">
            <p>{{ texts_b.specialization }}</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
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
    </span>
  </UiKitsUiSlotsHeaderSlot>
</template>

<script setup lang="ts">
import { userInfo as texts_b } from "~~/texts/texts.json";

const currentDate = new Date().toDateString();

const greeting = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good morning";
  if (hours < 18) return "Good afternoon";
  return "Good evening";
});

const items = [
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
  ],
];
</script>
