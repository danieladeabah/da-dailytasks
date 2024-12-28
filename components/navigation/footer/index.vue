<template>
  <div class="w-full text-center py-5">
    <div class="text-sm flex items-center justify-center gap-3">
      © {{ currentYear }} <heartIcon />
      <a href="https://danieladeabah.vercel.app/" target="_blank"
        >Daniel Adeabah's Portfolio</a
      >
    </div>
  </div>
</template>

<script setup>
import heartIcon from "~/assets/icons/heartIcon.vue";

const currentYear = ref(new Date().getFullYear());
</script>
