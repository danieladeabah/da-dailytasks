<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsProjectActivitySlot>
    <h1 class="text-2xl font-bold">Project Activity</h1>
    <div class="flex items-center gap-10 py-3">
      <button
        class="py-1 rounded-2xl bg-[#4E3EC8] w-[120px] text-[#fff] font-semibold"
      >
        Pending
      </button>
      <button>In Progress</button>
      <button>Done</button>
    </div>
    <div class="flex flex-col gap-5">
      <NuxtLink
        v-for="(task, index) in tasks"
        :key="index"
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>{{ task.title }}</p>
          <p class="text-gray-400">Deadline: {{ task.deadline }}</p>
          <div class="flex items-center my-2">
            <img
              v-for="(member, idx) in task.team"
              :key="idx"
              :src="member.image"
              class="w-7 h-7 object-cover rounded-full"
              alt="Team member"
            />
          </div>
        </div>
        <div>
          <button
            class="relative py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4 progressTasksColor"
            :style="{
              backgroundImage: `linear-gradient(to right, ${getProgressColor(
                task.progress
              )} ${task.progress}%, #E5E7EB ${task.progress}%)`,
            }"
          >
            {{ task.progress }}%
          </button>
        </div>
      </NuxtLink>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { getProgressColor } from "../../utils/progressColor";

const tasks = [
  {
    id: 1,
    title: "Job Search Platform UI",
    deadline: "28 Sep 2024",
    team: [
      {
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        image:
          "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      },
      {
        image:
          "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
      },
      {
        image:
          "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      },
    ],
    progress: 78,
  },
  {
    id: 2,
    title: "Create a Landing Page",
    deadline: "28 Sep 2024",
    team: [
      {
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        image:
          "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      },
      {
        image:
          "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
      },
      {
        image:
          "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      },
    ],
    progress: 10,
  },
  {
    id: 3,
    title: "Widget Development",
    deadline: "28 Sep 2024",
    team: [
      {
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        image:
          "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      },
      {
        image:
          "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
      },
      {
        image:
          "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      },
    ],
    progress: 58.5,
  },
  {
    id: 4,
    title: "General Project Management",
    deadline: "28 Sep 2024",
    team: [
      {
        image:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        image:
          "https://www.vmcdn.ca/f/files/alimoshotoday/images/picsabfjjd.jpg;w=960",
      },
      {
        image:
          "https://us.movember.com/uploads/images/resources/5df779f991cf99e6610bf01a9d93d70d5861282e-org.png",
      },
      {
        image:
          "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.webp?b=1&s=612x612&w=0&k=20&c=07SAQPb33q39bTswXx3DsQWU0Mwnuvs2GxigTlLo9Lg=",
      },
    ],
    progress: 45,
  },
];
</script>

