<script setup lang="ts">
const { width, height, outlineColor } = defineProps({
  width: {
    type: Number,
    default: 17
  },
  height: {
    type: Number,
    default: 17
  },
  outlineColor: {
    type: String,
    default: '#4A4B4D'
  }
})
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 7H21"
      :stroke="outlineColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M6 12H18"
      :stroke="outlineColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M10 17H14"
      :stroke="outlineColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
