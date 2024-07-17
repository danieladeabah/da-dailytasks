<template>
  <UiKitsUiSlotsDashboardSlot>
    <h1 class="text-2xl font-bold">{{ task.title }}</h1>
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
  </UiKitsUiSlotsDashboardSlot>
</template>

<script setup lang="ts">
import { dashboard as texts } from "~~/texts/texts.json";
import { getProgressColor } from "../../utils/progressColor";

const task = {
  id: 1,
  title: "Job Search Platform UI",
  description:
    "This Platform helps to aggregate job listings from thousands of platforms, including job boards, staffing firms, associations, etc.",
  deadline: "28 Sep 2024",
  progress: 78,
};
</script>
