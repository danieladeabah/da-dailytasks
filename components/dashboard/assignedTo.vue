<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsDashboardSlot>
    <template #header>
      <h1 class="font-bold">{{ texts.assignTo }}</h1>
      <UButton
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-plus-20-solid"
        @click="assignToModel"
      />
    </template>
    <div class="flex items-center space-x-2 overflow-auto">
      <template v-if="users.length > 0">
        <UiKitsUserAvatar
          v-for="user in users"
          :key="user.id"
          :src="user.image"
          :alt="user.name"
        />
      </template>
      <p v-else class="text-gray-500">No users assigned</p>
    </div>
  </UiKitsUiSlotsDashboardSlot>

  <UiKitsUiSlotsFormModelSlot
    form-title="Assign To"
    @close-modal="assignToModel"
    v-if="assignTo"
    v-model="assignTo"
    @closeDialog="assignTo = false"
  >
    <label class="text-sm text-gray-400" for="taskName">{{
      texts_a.formDescription
    }}</label>
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-5"
    >
      <span>{{ index + 1 }}.</span>
      <div class="flex gap-5 rounded-2xl pr-2 items-center flex-grow">
        <UInput
          size="sm"
          class="w-full lg:w-40vw"
          v-model="option.name"
          placeholder="Full name"
        />
        <UInput
          size="sm"
          class="w-full lg:w-40vw"
          v-model="option.email"
          placeholder="Email"
        />
        <UInput
          size="sm"
          class="w-full lg:w-40vw"
          v-model="option.image"
          placeholder="Image URL"
        />
        <img
          src="/assets/icons/deleteIcon.svg"
          alt="delete"
          class="cursor-pointer"
          @click="removeOption(index)"
        />
      </div>
    </div>

    <UButton
      v-if="options.length < 9"
      size="sm"
      color="gray"
      variant="ghost"
      trailing-icon="i-heroicons-plus-20-solid"
      class="rounded-2xl px-6 w-16"
      @click="addOption"
    />

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="assignToubmit"
        >{{ texts_a.buttonAssign }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  dashboard as texts,
  createATask as texts_a,
} from "~~/texts/texts.json";
import { useTasksStore } from "@/store/tasks";

const route = useRoute();
const tasksStore = useTasksStore();

const assignTo = ref(false);
const optionIndex = ref(0);
const options = ref([
  {
    id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
    name: "",
    email: "",
    image: "",
  },
]);

watch(
  [options],
  () => {
    options.value.length >= 1 &&
      options.value.length <= 9 &&
      options.value.every(
        (option) => option.name && option.email && option.image
      );
  },
  { deep: true }
);

const addOption = () => {
  if (options.value.length < 9)
    options.value.push({
      id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
      name: "",
      email: "",
      image: "",
    });
};

const removeOption = (index: number) => {
  if (options.value.length > 1) options.value.splice(index, 1);
  else {
    options.value[index].name = "";
    options.value[index].email = "";
    options.value[index].image = "";
  }
};

const assignToModel = () => {
  assignTo.value = !assignTo.value;

  if (assignTo.value) {
    const taskId = route.params.tasksindex as string;
    const task = tasksStore.findTaskById(taskId);
    if (task && task.assignees.length > 0) {
      options.value = task.assignees.map((assignee) => ({
        id: assignee.id,
        name: assignee.name,
        email: assignee.email,
        image: assignee.image,
      }));
    } else {
      options.value = [
        {
          id: assigneesEncodeBase62(Date.now(), optionIndex.value++),
          name: "",
          email: "",
          image: "",
        },
      ];
    }
  }
};

const assignToubmit = () => {
  if (
    !options.value.every(
      (option) => option.name && option.email && option.image
    )
  ) {
    return;
  }

  const taskId = route.params.tasksindex as string;
  const task = tasksStore.findTaskById(taskId);
  if (task) {
    task.assignees = options.value.map((option) => ({
      id: option.id,
      name: option.name,
      email: option.email,
      image: option.image,
    }));
    tasksStore.assignPeopleToTask(task);
  }
  assignToModel();
};

const users = computed(() => {
  const taskId = route.params.tasksindex as string;
  const task = tasksStore.findTaskById(taskId);
  return task ? task.assignees : [];
});
</script>
