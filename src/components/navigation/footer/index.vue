<template>
  <div class="w-full py-5 text-center">
    <div class="flex items-center justify-center gap-3 text-sm">
      © {{ currentYear }} <heartIcon />
      <a href="https://danieladeabah.vercel.app/" target="_blank"
        >Daniel Adeabah's Portfolio</a
      >
    </div>
  </div>
</template>

<script setup>
import heartIcon from '~/assets/icons/heartIcon.vue'

const currentYear = ref(new Date().getFullYear())
</script>
