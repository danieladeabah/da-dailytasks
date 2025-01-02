<template>
  <div class="flex items-center justify-center">
    <div
      class="absolute bottom-5 flex items-center justify-center p-5 text-center"
    >
      <UButton
        class="fixed flex h-12 w-12 items-center justify-center rounded-full bg-[#4E3EC8] font-extrabold hover:bg-[#6e5ee4] hover:shadow-2xl"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="openCreateModal"
      />
    </div>
  </div>

  <TasksCreateEditModal ref="taskModal" />
</template>

<script setup lang="ts">
const taskModal = ref()

const openCreateModal = () => {
  taskModal.value.openModal('create')
}
</script>
