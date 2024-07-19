<template>
  <label
    class="flex items-center justify-between"
    for="switch"
    @click="handleSelectUser"
  >
    <div class="flex items-center gap-2">
      <UCheckbox v-model="id" color="sky" id="switch" /><span
        class="text-sm"
        >{{ user.name }}</span
      >
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

const emit = defineEmits(["select-user"]);

const handleSelectUser = () => {
  emit("select-user", props.user.id);
};
</script>
