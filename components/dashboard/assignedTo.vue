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
    <div class="flex items-center space-x-2">
      <UiKitsUserAvatar
        v-for="(user, index) in users"
        :key="user.id"
        :src="user.avatar"
        :alt="'User avatar ' + (index + 1)"
      />
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
          v-model="option.text"
          placeholder="Full name"
        />
        <UInput
          size="sm"
          class="w-full lg:w-40vw"
          v-model="option.text"
          placeholder="Email"
        />
        <UInput
          size="sm"
          class="w-full lg:w-40vw"
          v-model="option.text"
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

const assignTo = ref(false);
const options = ref([{ text: "" }, { text: "" }]);

watch(
  [options],
  () => {
    options.value.length >= 2 &&
      options.value.length <= 9 &&
      options.value.every((option) => option.text);
  },
  { deep: true }
);

const addOption = () => {
  if (options.value.length < 9) options.value.push({ text: "" });
};

const removeOption = (index: number) => {
  if (options.value.length > 2) options.value.splice(index, 1);
  else options.value[index].text = "";
};

const assignToModel = () => {
  assignTo.value = !assignTo.value;

  if (assignTo.value) {
    options.value = [{ text: "" }, { text: "" }];
  }
};

const assignToubmit = () => {
  // Logic to assign users to task
  assignToModel();
};

const users = [
  {
    id: 1,
    avatar:
      "https://img.freepik.com/free-photo/half-length-close-up-portrait-young-man-shirt-yellow_155003-24905.jpg",
  },
  {
    id: 2,
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    avatar:
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
  },
  {
    id: 4,
    avatar:
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
  },
];
</script>
