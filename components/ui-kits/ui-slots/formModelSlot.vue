<template>
  <UModal>
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">{{ formTitle }}</h1>
        <img
          src="/assets/icons/closeIcon.svg"
          class="w-5 h-5 cursor-pointer"
          title="Close Dialog"
          alt=""
          @click="$emit('closeDialog')"
        />
      </div>
      <div class="flex flex-col gap-4 my-2">
        <slot></slot>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineProps({
  formTitle: {
    type: String,
    required: true,
  },
});
</script>
