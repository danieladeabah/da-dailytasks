<template>
  <div class="benefit-card rounded-lg bg-white p-6 text-center shadow-md">
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

<style scoped>
.benefit-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
