<template #default>
  <AppWrapper>
    <div class="px-4 py-5">
      <slot name="backLink"></slot>
    </div>

    <div class="px-4 py-2">
      <p class="text-left text-sm pb-5">
        <slot name="greet"></slot>
      </p>

      <h1 class="text-2xl text-left font-normal pb-2">
        <slot name="title"></slot>
      </h1>

      <p class="text-left text-normal text-gray-400 pb-4">
        <slot name="forgotPassword"></slot>
      </p>

      <p class="text-left text-sm pb-4">
        <slot name="errors"></slot>
      </p>

      <div class="flex flex-col gap-5">
        <slot name="form"></slot>
      </div>

      <div>
        <p class="text-left py-2 text-sm">
          <slot name="info"></slot>
        </p>
      </div>
    </div>

    <UiKitsHorizontalLine />

    <footer class="w-full text-center py-5 text-sm">
      <span>© {{ currentYear }}</span>
    </footer>
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '~/layouts/app-wrapper.vue';

const currentYear = ref(new Date().getFullYear());
</script>
