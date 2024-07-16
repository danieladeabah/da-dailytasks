<template>
  <HeaderSlot>
    <span>
      <NuxtLink to="/" class="text-2xl font-bold"
        ><img src="/assets/icons/backIcon.svg" class="w-5 h-5" alt=""
      /></NuxtLink>
    </span>
    <span>
      <button
        class="py-1 rounded-md bg-[#FEF1E6] w-[120px] text-[#df9458] font-semibold"
      >
        In Progress
      </button>
    </span>
  </HeaderSlot>
</template>

<script setup lang="ts">
import HeaderSlot from "./headerSlot.vue";
</script>
