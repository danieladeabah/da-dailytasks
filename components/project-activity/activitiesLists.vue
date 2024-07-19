<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsProjectActivitySlot>
    <h1 class="text-2xl font-bold">{{ texts_c.projectActivity }}</h1>
    <div class="flex items-center gap-10 py-3">
      <UButton
        class="flex items-center justify-center py-1 rounded-2xl bg-[#4E3EC8] w-[120px] text-[#fff] font-semibold hover:bg-[#6e5ee4]"
      >
        {{ texts_c.browse }}
      </UButton>
      <UButton
        class="flex items-center justify-center py-1 rounded-2xl bg-[#fff] w-[120px] text-[#000] font-semibold hover:bg-[#f1f0fa] shadow-none"
      >
        {{ texts_c.completed }}
      </UButton>
    </div>
    <div class="flex flex-col gap-5">
      <NuxtLink
        v-for="(task, index) in tasks"
        :key="task.id"
        :to="'/tasks-page/' + task.id"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>{{ task.name }}</p>
          <p class="text-gray-400">
            {{ texts_c.deadline }} {{ task.deadline }}
          </p>
          <div class="flex items-center my-2 overflow-auto w-40">
            <UiKitsUserAvatar
              v-for="(member, index) in task.assignees"
              :key="member.id"
              :src="member.image"
              :alt="'User avatar ' + (index + 1)"
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
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from "@/store/tasks";
import { projectActivity as texts_c } from "~~/texts/texts.json";
import { getProgressColor } from "@/utils/progressColor";

const tasksStore = useTasksStore();

const tasks = computed(() => tasksStore.tasks);

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();
});
</script>
