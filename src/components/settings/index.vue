<template>
  <UiKitsUiSlotsProjectActivitySlot>
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
</template>

<script setup lang="ts">
const tabItems = computed(() => [
  { slot: 'me', label: `Me` },
  { slot: 'email', label: `Email` },
  { slot: 'password', label: `Password` }
])
</script>
