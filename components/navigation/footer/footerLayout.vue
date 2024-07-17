<template #footer>
  <footer class="flex items-center justify-center">
    <div
      class="absolute bottom-5 text-center flex items-center justify-center p-5"
    >
      <UButton
        class="flex items-center justify-center fixed bg-[#4E3EC8] hover:bg-[#6e5ee4] h-12 w-12 rounded-full font-extrabold hover:shadow-2xl"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="createTaskModal = true"
      >
      </UButton>
    </div>
  </footer>

  <div>
    <UModal v-model="createTaskModal">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Add New Task</h1>
        <div class="flex flex-col gap-4 my-2">
          <label class="font-bold" for="taskName">Task Name</label>
          <UInput placeholder="Task Name" />

          <label class="font-bold" for="deadline">Deadline</label>
          <UInput type="date" placeholder="Deadline" />

          <label class="font-bold" for="description">Description</label>
          <UTextarea placeholder="Task Description" :rows="10" />

          <div class="flex justify-end">
            <UButton class="w-fit" color="blue" variant="solid"
              >Add Task</UButton
            >
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const createTaskModal = ref(false);
</script>
