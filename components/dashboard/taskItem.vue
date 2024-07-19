<template>
  <label
    class="flex items-center justify-between selected-option option-container"
    for="switch"
  >
    <div class="flex items-center gap-5" :class="{ 'line-through': isChecked }">
      <UCheckbox
        v-model="isChecked"
        :label="task.name"
        color="sky"
        id="switch"
        @change="handleCheckboxChange"
      />
    </div>
    <span class="option-input" @click="editTaskModel">
      <img
        src="/assets/icons/editIcon.svg"
        alt="edit"
        class="cursor-pointer w-4 h-4"
        title="Edit Task"
      />
    </span>
  </label>

  <!-- Edit Task Modal -->
  <UiKitsUiSlotsFormModelSlot
    form-title="Edit Task"
    @close-modal="editTaskModel"
    v-if="editATasks"
    v-model="editATasks"
    @closeDialog="editATasks = false"
  >
    <label class="text-sm text-gray-400" for="taskName">{{
      texts_a.formEditDescription
    }}</label>
    <UInput v-model="editedTaskName" placeholder="Task Name" />

    <div class="flex items-center justify-between">
      <UDropdown :items="deleteOptions" :popper="{ arrow: true }">
        <UButton
          label="Remove"
          color="white"
          variant="ghost"
          class="py-2 rounded-md bg-[#FFF] w-[120px] text-[#c42727] font-semibold"
        />
      </UDropdown>
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="editTaskSubmit"
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { createATask as texts_a } from "~~/texts/texts.json";
import { useTasksStore } from "@/store/tasks";
import type { Task } from "@/types/types";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const tasksStore = useTasksStore();
const route = useRoute();
const trackId = route.params.tasksindex as string;

const isChecked = ref(props.task.isChecked || false);
const editATasks = ref(false);
const editedTaskName = ref(props.task.name || "");
const currentTask = ref<Task | null>(null);

const editTaskModel = () => {
  editATasks.value = !editATasks.value;
  if (props.task) {
    currentTask.value = props.task;
    editedTaskName.value = props.task.name;
  }
};

const calculateTaskProgress = (task: Task) => {
  const totalSubTasks = task.subTasks.length;
  if (totalSubTasks === 0) return 0;

  const completedSubTasks = task.subTasks.filter(
    (subTask) => subTask.isChecked
  ).length;
  return Math.round((completedSubTasks / totalSubTasks) * 100);
};

const handleCheckboxChange = () => {
  if (props.task) {
    const updatedSubTask = { ...props.task, isChecked: isChecked.value };
    tasksStore.updateSubTask(trackId, updatedSubTask);

    // Calculate and update parent task progress
    const parentTask = tasksStore.findTaskById(trackId);
    if (parentTask) {
      const progress = calculateTaskProgress(parentTask);
      tasksStore.updateTask(parentTask.id, { ...parentTask, progress });
    }
  }
};

const editTaskSubmit = () => {
  if (currentTask.value && props.task.id) {
    const updatedSubTask: Task = {
      ...currentTask.value,
      name: editedTaskName.value,
    };
    tasksStore.updateSubTask(trackId, updatedSubTask);
    editATasks.value = false;
    currentTask.value = null;
  }
};

watch(
  () => props.task.isChecked,
  (value) => {
    isChecked.value = value;
  }
);

const deleteOptions = [
  [
    {
      label: "Cancel",
    },
    {
      label: "Yes, Remove",
      click: () => {
        editATasks.value = !editATasks.value;
        tasksStore.deleteSubTask(trackId, props.task.id);

        // Calculate and update parent task progress
        const parentTask = tasksStore.findTaskById(trackId);
        if (parentTask) {
          const progress = calculateTaskProgress(parentTask);
          tasksStore.updateTask(parentTask.id, { ...parentTask, progress });
        }
      },
    },
  ],
];
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.option-input {
  display: none;
}

.option-container:hover .option-input {
  display: block;
}
</style>
