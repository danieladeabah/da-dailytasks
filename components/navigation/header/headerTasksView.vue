<template>
  <UiKitsUiSlotsHeaderSlot>
    <span>
      <NuxtLink to="/" class="text-2xl font-bold"
        ><img src="/assets/icons/backIcon.svg" class="w-5 h-5" alt=""
      /></NuxtLink>
    </span>
    <span>
      <UDropdown :items="options" :popper="{ arrow: true }">
        <UButton
          label="In Progress"
          color="white"
          variant="ghost"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          class="py-2 rounded-md bg-[#FEF1E6] w-[120px] text-[#df9458] font-semibold"
        />
      </UDropdown>
    </span>
  </UiKitsUiSlotsHeaderSlot>
</template>

<script setup lang="ts">
const options = [
  [
    {
      label: "To-Do",
    },
    {
      label: "In Progress",
    },
    {
      label: "Done",
    },
  ],
];
</script>
