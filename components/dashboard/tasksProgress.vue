<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.tasksProgress }}</h1>
      <UDropdown :items="dropdownLists" :popper="{ arrow: true }">
        <UButton
          color="white"
          variant="ghost"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </template>
    <div v-if="subTasks.length === 0" class="text-gray-500">No tasks added</div>
    <DashboardTaskItem
      v-else
      v-for="(task, index) in subTasks"
      :key="index"
      :task="task"
    />
  </UiKitsUiSlotsDashboardSlot>

  <!-- Add Task Modal -->
  <UiKitsUiSlotsFormModelSlot
    form-title="Add Task"
    @close-modal="addTaskModel"
    v-if="addATasks"
    v-model="addATasks"
    @closeDialog="addATasks = false"
  >
    <label class="text-sm text-gray-400" for="taskName">{{
      texts_a.addTaskFormDescription
    }}</label>
    <UInput placeholder="Task Name" v-model="newSubTaskName" />

    <DashboardAssignedToUsers
      v-for="user in users"
      :key="user.id"
      :user="user"
      @select-user="selectUser(user)"
    />

    <div class="flex justify-end">
      <UButton class="w-fit" color="blue" variant="solid" @click="addSubTask"
        >Add</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  dashboard as texts,
  createATask as texts_a,
} from "~~/texts/texts.json";
import { useTasksStore } from "~/store/tasks";
import type { Task } from "~/types/types";

const addATasks = ref(false);
const newSubTaskName = ref("");
const tasksStore = useTasksStore();
const route = useRoute();
const selectedTaskId = route.params.tasksindex as string;
const selectedUsers = ref<number[]>([]);

const addTaskModel = () => {
  addATasks.value = !addATasks.value;
};

const addSubTask = () => {
  const task: Task = {
    id: encodeBase62(Date.now()),
    name: newSubTaskName.value,
    assignees: selectedUsers.value,
  };

  tasksStore.addSubTask(selectedTaskId, task);
  newSubTaskName.value = "";
  selectedUsers.value = [];
  addTaskModel();
};

const selectUser = (userId: number) => {
  if (!selectedUsers.value.includes(userId)) {
    selectedUsers.value.push(userId);
  }
};

const dropdownLists = [
  [
    {
      label: "Add Task",
      click: () => {
        addTaskModel();
      },
    },
  ],
];

const subTasks = computed(() => {
  const taskId = route.params.tasksindex as string;
  const task = tasksStore.findTaskById(taskId);
  return task ? task.subTasks : [];
});

const users = computed(() => {
  const taskId = route.params.tasksindex as string;
  const task = tasksStore.findTaskById(taskId);
  return task ? task.assignees : [];
});
</script>
