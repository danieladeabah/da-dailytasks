<template>
    <label class="flex items-center justify-between cursor-pointer">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="isChecked" />
        {{ task.name }}
      </div>
      <div class="flex items-center">
        <img
          v-for="(avatar, index) in task.avatars"
          :key="index"
          :src="avatar"
          class="w-5 h-5 object-cover rounded-full"
          alt=""
        />
      </div>
    </label>
  </template>
  
  <script setup>
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  });
  
  const isChecked = ref(false);
  
  watch(() => props.task.isChecked, (value) => {
    isChecked.value = value;
  });
  
  </script>
  