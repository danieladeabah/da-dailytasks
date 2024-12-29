<template>
  <UTooltip :text="alt" :popper="{ arrow: true }">
    <img :src="src" :alt="alt" class="h-10 w-10 rounded-full object-cover" />
  </UTooltip>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>
