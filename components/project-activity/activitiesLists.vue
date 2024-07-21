<template>
  <UiKitsHorizontalLine />
  <UiKitsUiSlotsProjectActivitySlot>
    <h1 class="text-2xl font-bold">{{ texts_c.projectActivity }}</h1>
    <div class="my-5">
      <UTabs :items="tabItems" class="w-full">
        <template #browse>
          <div class="flex flex-col gap-5">
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
                {{ texts_c.noTasks }}
              </p>
            </template>
          </div>
        </template>
        <template #completed>
          <div class="flex flex-col gap-5">
            <template v-if="completedTasks.length > 0">
              <NuxtLink
                v-for="task in completedTasks"
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
                {{ texts_c.noCompletedTasks }}
              </p>
            </template>
          </div>
        </template>
      </UTabs>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from "@/store/tasks";
import { projectActivity as texts_c } from "~~/texts/texts.json";
import { getProgressColor } from "@/utils/progressColor";

const tasksStore = useTasksStore();

const tasks = computed(() =>
  tasksStore.tasks.filter((task) => task.progress !== 100)
);
const completedTasks = computed(() =>
  tasksStore.tasks.filter((task) => task.progress === 100)
);

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();
});

const tabItems = computed(() => [
  { slot: "browse", label: `Browse (${tasks.value.length})` },
  { slot: "completed", label: `Completed (${completedTasks.value.length})` },
]);
</script>
