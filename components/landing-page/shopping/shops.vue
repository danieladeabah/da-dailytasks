<template>
  <div class="course-card bg-white shadow-md rounded-lg overflow-hidden">
    <img :src="image" alt="Course" class="w-full h-40 object-cover" />
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <span class="text-sm text-gray-500">{{ duration }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
