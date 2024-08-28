<template>
  <UiKitsUiSlotsDashboardSlot v-if="task">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ task.name }}</h1>
      <p class="text-gray-400 text-xl">
        {{ task.description }}
      </p>

      <div class="flex items-center justify-between my-5">
        <div
          class="flex items-center gap-2 h-[40px] rounded-lg bg-gray-100 text-gray-400 p-5"
        >
          <img
            src="/assets/icons/bellIcon.svg"
            class="w-5 h-5"
            alt="Notification Icon"
          />
          <p>
            {{ texts.deadline }}
            <span class="text-[#000] font-semibold">{{ task.deadline }}</span>
          </p>
        </div>
        <div>
          <button
            class="relative py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold progressTasksColor"
            :style="{
              backgroundImage: `linear-gradient(to right, ${getProgressColor(
                task.progress
              )} ${task.progress}%, #E5E7EB ${task.progress}%)`,
            }"
          >
            {{ task.progress }}%
          </button>
        </div>
      </div>

      <div class="flex items-center justify-start gap-5">
        <img
          src="/assets/icons/editIcon.svg"
          alt="edit"
          class="cursor-pointer w-4 h-4"
          title="Edit"
          @click="editTaskModal"
        />
        <UDropdown
          mode="hover"
          :popper="{ placement: 'right-start' }"
          :items="deleteLists"
        >
          <img
            src="/assets/icons/deleteIcon.svg"
            alt="edit"
            class="cursor-pointer w-4 h-4"
            title="Delete"
          />
        </UDropdown>
      </div>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <!-- Edit Task Modal -->
  <UiKitsUiSlotsFormModelSlot
    form-title="Edit Task"
    @close-modal="editTaskModal"
    v-if="createATasks"
    v-model="createATasks"
    @closeDialog="editTaskModal"
  >
    <label class="font-bold" for="taskName">{{ texts_a.taskName }}</label>
    <UInput placeholder="Task Name" v-model="taskName" maxLength="100" />

    <label class="font-bold" for="deadline">{{ texts_a.deadline }}</label>
    <UInput
      type="date"
      placeholder="Deadline"
      v-model="deadline"
      :min="minDate"
      maxLength="10"
    />

    <label class="font-bold" for="description">{{ texts_a.description }}</label>
    <UTextarea
      placeholder="Task Description"
      :rows="10"
      v-model="description"
      maxLength="500"
    />

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="editATaskSubmit"
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  dashboard as texts,
  createATask as texts_a,
} from "@/texts/texts.json";
import { getProgressColor } from "@/utils/progressColor";
import { useTasksStore } from "@/store/tasks";
import type { Task } from "@/types/types";

const tasksStore = useTasksStore();
const route = useRoute();
const minDate = ref(getMinDate());
const createATasks = ref(false);

const task = computed(() => {
  const taskId = Array.isArray(route.params.tasksindex)
    ? route.params.tasksindex[0]
    : route.params.tasksindex;

  return tasksStore.findTaskById(taskId) || null;
});

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();
});

const taskName = ref("");
const deadline = ref("");
const description = ref("");

const editTaskModal = () => {
  createATasks.value = !createATasks.value;

  if (task.value) {
    taskName.value = task.value.name;
    deadline.value = task.value.deadline;
    description.value = task.value.description;
  }
};

const editATaskSubmit = () => {
  if (!taskName.value || !deadline.value || !description.value) {
    console.error("All fields are required to update the task.");
    return;
  }

  const updatedTask = {
    ...task.value,
    name: taskName.value,
    deadline: deadline.value,
    description: description.value,
  };

  if (task.value) {
    tasksStore.updateTask(task.value.id, updatedTask as Task);
  }

  editTaskModal();
};

const deleteLists = [
  [
    {
      label: "Cancel",
    },
    {
      label: "Yes, Remove",
      click() {
        if (task.value) {
          tasksStore.deleteTask(task.value.id);
        }
        navigateTo("/");
      },
    },
  ],
];
</script>
