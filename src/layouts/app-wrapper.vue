<template>
  <div
    class="container mx-auto my-0 w-full rounded-none bg-white shadow-none md:my-5 md:rounded-xl md:border lg:my-10 lg:w-1/3 lg:rounded-xl lg:border"
  >
    <UiKitsLoaderSkeleton v-if="loading" />
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 200)
})
</script>
