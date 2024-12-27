<template>
    <div
      class="shadow-none md:border lg:border container mx-auto my-0 md:my-5 lg:my-10 rounded-none md:rounded-xl lg:rounded-xl w-full lg:w-full bg-white"
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
  