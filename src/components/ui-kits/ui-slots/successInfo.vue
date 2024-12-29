<template #info>
  <AppWrapper>
    <div class="px-4 py-20">
      <div class="flex items-center justify-center py-5">
        <slot name="infoIcon"></slot>
      </div>

      <h1 class="pb-2 text-center text-2xl font-normal">
        <slot name="infoTitle"></slot>
      </h1>

      <p class="text-normal pb-4 text-center text-gray-400">
        <slot name="infoText"></slot>
      </p>

      <div class="flex items-center justify-center py-5">
        <slot name="infoLink"></slot>
      </div>

      <p class="text-normal py-4 text-center text-gray-400">
        <slot name="infoLinkText"></slot>
      </p>

      <footer class="w-full pt-40 text-center text-sm">
        <slot name="infoFooter"></slot>
      </footer>
    </div>
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '~/layouts/app-wrapper.vue'
</script>
