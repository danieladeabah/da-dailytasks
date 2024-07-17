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
    <DashboardTaskItem
      v-for="(task, index) in tasks"
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
        @click="addATasksubmit"
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
const addATasks = ref(false);

const addTaskModel = () => {
  addATasks.value = !addATasks.value;
};

const addATasksubmit = () => {
  // Logic to add task
  addTaskModel();
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

const tasks = [
  {
    id: 1,
    name: "Job Search Platform UI",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 2,
    name: "Create a Landing Page",
    avatars: [
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 3,
    name: "Withdraw Funds",
    avatars: [
      "https://people.com/thmb/iqs6rlswMghL9gqPgZHMSmUcFb8=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(578x0:580x2)/SMA-23-men-of-year-Timothee-Chalamet-72cbf2e3a9604ae48423122ae8ff44ed.jpg",
      "https://img.freepik.com/free-photo/half-length-close-up-portrait-young-man-shirt-yellow_155003-24905.jpg",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 4,
    name: "Generate Reports & Analysis",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://img.freepik.com/free-photo/half-length-close-up-portrait-young-man-shirt-yellow_155003-24905.jpg",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 5,
    name: "Verify Account Details",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 6,
    name: "Manipulate Files & Data",
    avatars: [
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 7,
    name: "Assign Tasks for Development",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
    ],
  },
  {
    id: 8,
    name: "Upload Files & Documents",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 9,
    name: "Ghana Development Team",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 10,
    name: "Send Email To Clients",
    avatars: [
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 11,
    name: "Apply For Loan",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
  {
    id: 12,
    name: "Launch New Website",
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
    ],
  },
];

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
