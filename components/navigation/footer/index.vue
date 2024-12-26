<template>
  <div class="w-full text-center py-5">
    <div class="text-sm flex items-center justify-center gap-3">
      © {{ currentYear }} <heartIcon /> Daniel
    </div>
  </div>
</template>

<script setup>
import heartIcon from "~/assets/icons/heartIcon.vue";

const currentYear = ref(new Date().getFullYear());
</script>
