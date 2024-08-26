<template>
  <AppWrapper>
    <div class="px-4 py-5">
      <NuxtLink :to="backLink" class="text-2xl font-bold">
        <img src="/assets/icons/backIcon.svg" class="w-5 h-5" alt="Back Icon" />
      </NuxtLink>
    </div>
    <div class="px-4 py-5">
      <h1 class="text-2xl text-center font-semibold pb-2">
        <slot name="title"></slot>
      </h1>
      <p class="text-center text-gray-400 text-sm pb-10">
        <slot name="subtitle"></slot>
      </p>
      <p class="text-center text-gray-400 text-sm pb-10">
        <slot name="errors"></slot>
      </p>

      <div class="flex flex-col gap-5">
        <slot name="form"></slot>
      </div>

      <div>
        <p class="text-left text-gray-400 py-2 text-sm">
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
defineProps({
  backLink: {
    type: String,
    required: true,
  },
});

const currentYear = ref(new Date().getFullYear());
</script>
