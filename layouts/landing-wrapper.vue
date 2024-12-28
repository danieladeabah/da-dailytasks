<template>
    <div
      class="shadow-none container mx-auto rounded-none md:rounded-xl lg:rounded-xl w-full lg:w-full bg-white"
    >
      <UiKitsLoaderSkeleton v-if="loading" />
      <div v-else>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const loading = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 200);
  });
  </script>
  