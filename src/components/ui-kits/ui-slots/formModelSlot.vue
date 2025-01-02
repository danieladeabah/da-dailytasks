<template>
  <UModal>
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">{{ formTitle }}</h1>
        <img
          src="/assets/icons/close-icon.svg"
          class="h-5 w-5 cursor-pointer"
          title="Close Dialog"
          alt=""
          @click="$emit('closeDialog')"
        />
      </div>
      <div class="my-2 flex flex-col gap-4">
        <slot></slot>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineProps({
  formTitle: {
    type: String,
    required: true
  }
})
</script>
