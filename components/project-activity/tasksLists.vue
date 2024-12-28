<template>
  <div
    class="grid gap-5"
    :class="{
      'grid-cols-1': route.path !== '/',
      'grid-cols-1 lg:grid-cols-2': route.path === '/',
    }"
  >
    <template v-if="tasks.length > 0">
      <NuxtLink
        v-for="task in tasks"
        :key="task.id"
        :to="'/tasks-page/' + task.id"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div class="flex flex-col gap-1">
          <p>{{ task.name }}</p>
          <p class="text-gray-400">
            {{ texts_c.deadline }} {{ task.deadline }}
          </p>
          <div class="flex items-center space-x-2 overflow-auto w-40">
            <UiKitsUserAvatar
              v-for="user in task.assignees.slice(0, 3)"
              :key="user.id"
              :src="user.image"
              :alt="user.name"
            />
          </div>
        </div>
        <div>
          <UButton
            class="flex items-center justify-center relative py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold progressTasksColor"
            :style="{
              backgroundImage: `linear-gradient(to right, ${getProgressColor(
                task.progress
              )} ${task.progress}%, #E5E7EB ${task.progress}%)`,
            }"
          >
            {{ task.progress }}%
          </UButton>
        </div>
      </NuxtLink>
    </template>
    <template v-else>
      <p class="text-gray-400 text-center my-20">
        {{ emptyMessage }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getProgressColor } from "@/utils/progressColor";
import { projectActivity as texts_c } from "@/texts/texts.json";
import type { Task } from "~/types/types";

const route = useRoute();

defineProps<{
  tasks: Task[];
  emptyMessage: string;
}>();
</script>
