<template>
  <div
    class="container mx-auto w-full rounded-none bg-white shadow-none md:rounded-xl lg:w-full lg:rounded-xl"
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
