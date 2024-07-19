<template>
  <UTooltip :text="alt" :popper="{ arrow: true }">
    <img :src="src" :alt="alt" class="w-10 h-10 object-cover rounded-full" />
  </UTooltip>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
</script>
