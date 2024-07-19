<template>
  <UiKitsUiSlotsDashboardSlot v-if="task">
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
  </UiKitsUiSlotsDashboardSlot>
</template>

<script setup lang="ts">
import { dashboard as texts } from "~~/texts/texts.json";
import { getProgressColor } from "../../utils/progressColor";
import { useTasksStore } from "@/store/tasks";

const tasksStore = useTasksStore();
const route = useRoute();

const task = computed(() => {
  const taskId = Array.isArray(route.params.tasksindex)
    ? route.params.tasksindex[0]
    : route.params.tasksindex;

  return tasksStore.findTaskById(taskId) || null;
});

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();
});
</script>
