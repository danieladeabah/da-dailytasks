<template>
  <div
    class="rounded-lg border bg-white p-6 text-center hover:translate-y-[-5px] hover:transform hover:shadow-xl hover:transition-all hover:duration-300"
  >
    <div class="mb-4 text-5xl">{{ icon }}</div>
    <h3 class="mb-2 text-xl font-semibold text-gray-800">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
