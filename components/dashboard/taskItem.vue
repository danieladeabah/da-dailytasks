<template>
  <label
    class="relative flex items-center justify-between selected-option"
    for="switch"
  >
    <div
      class="flex items-center gap-5 option-container"
      :class="{ 'line-through': isChecked }"
    >
      <span class="option-input" @click="editTaskModel">
        <img
          src="/assets/icons/editIcon.svg"
          alt="edit"
          class="absolute top-1 cursor-pointer w-3 h-3"
          title="Edit Task"
        />
      </span>
      <UCheckbox
        v-model="isChecked"
        :label="task.name"
        color="sky"
        id="switch"
      />
    </div>
    <div class="flex items-center">
      <img
        v-for="(avatar, index) in task.avatars"
        :key="index"
        :src="avatar"
        class="w-5 h-5 object-cover rounded-full"
        alt=""
      />
    </div>
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
    <UInput placeholder="Task Name" />

    <DashboardAssignedToUsers
      v-for="(user, index) in users"
      :key="index"
      :user="user"
    />

    <div class="flex justify-end">
      <UButton
        class="w-fit"
        color="blue"
        variant="solid"
        @click="editATasksubmit"
        >{{ texts_a.buttonEdit }}</UButton
      >
    </div>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import { createATask as texts_a } from "~~/texts/texts.json";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const isChecked = ref(false);
const editATasks = ref(false);

const editTaskModel = () => {
  editATasks.value = !editATasks.value;
};

const editATasksubmit = () => {
  // Logic to edit task
  editTaskModel();
};

watch(
  () => props.task.isChecked,
  (value) => {
    isChecked.value = value;
  }
);

const users = [
  {
    id: 1,
    name: "Jacob Doe",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  {
    id: 2,
    name: "Fiz Danielz",
    avatars: [
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
    ],
  },
  {
    id: 3,
    name: "Steve Jobs",
    avatars: [
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 4,
    name: "Mark Smith",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  {
    id: 5,
    name: "Ellon Musk",
    avatars: [
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
    ],
  },
  {
    id: 6,
    name: "Jane Cooper",
    avatars: [
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
    ],
  },
  {
    id: 7,
    name: "Daniel Adeabah",
    avatars: ["https://avatars.githubusercontent.com/u/124435531?v=4"],
  },
  {
    id: 8,
    name: "Mark Zuckerberg",
    avatars: [
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 9,
    name: "Ellen Devis",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  {
    id: 10,
    name: "Will Smith",
    avatars: [
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 11,
    name: "Emma Watson",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  {
    id: 12,
    name: "Frank Ocean",
    avatars: [
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
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
