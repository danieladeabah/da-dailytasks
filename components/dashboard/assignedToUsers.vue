<template>
  <label class="flex items-center justify-between" for="switch">
    <div class="flex items-center gap-2">
      <UCheckbox v-model="isChecked" color="sky" id="switch" /><img
        v-for="(avatar, index) in user.avatars"
        :key="index"
        :src="avatar"
        class="w-5 h-5 object-cover rounded-full"
        alt=""
      />
      <span class="text-sm">{{ user.name }}</span>
    </div>
  </label>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const isChecked = ref(props.user.isChecked);

watch(
  () => props.user.isChecked,
  (value) => {
    isChecked.value = value;
  }
);
</script>
