<template #footer>
  <footer class="flex items-center justify-center">
    <div
      class="absolute bottom-5 text-center flex items-center justify-center p-5"
    >
      <UButton
        class="flex items-center justify-center fixed bg-[#4E3EC8] hover:bg-[#6e5ee4] h-12 w-12 rounded-full font-extrabold hover:shadow-2xl"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="createTaskModal"
      >
      </UButton>
    </div>
  </footer>

  <!-- Create Task Modal -->
  <UiKitsUiSlotsFormModelSlot
    form-title="Create Task"
    @close-modal="createTaskModal"
    v-if="createATasks"
    v-model="createATasks"
    @closeDialog="createATasks = false"
  >
    <label class="font-bold" for="taskName">{{ texts.taskName }}</label>
    <UInput placeholder="Task Name" v-model="taskName" />

    <label class="font-bold" for="deadline">{{ texts.deadline }}</label>
    <UInput type="date" placeholder="Deadline" v-model="deadline" />

    <label class="font-bold" for="description">{{ texts.description }}</label>
    <UTextarea
      placeholder="Task Description"
      :rows="10"
      v-model="description"
    />

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="createATaskSubmit"
        >{{ texts.buttonAddTask }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { createATask as texts } from "~~/texts/texts.json";

const createATasks = ref(false);
const taskName = ref("");
const deadline = ref("");
const description = ref("");

const createTaskModal = () => {
  createATasks.value = !createATasks.value;

  if (createATasks.value) {
    taskName.value = "";
    deadline.value = "";
    description.value = "";
  }
};

const createATaskSubmit = () => {
  // Logic to create task
  createTaskModal();
};
</script>
