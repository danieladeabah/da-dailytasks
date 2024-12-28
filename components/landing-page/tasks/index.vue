<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="container my-10 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Popular Tasks</h2>
      <p class="text-gray-600">See what our users are doing.</p>
    </div>
    <div class="my-5">
      <TaskList :tasks="tasks" :emptyMessage="texts_c.noTasks" />
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { useTasksStore } from "@/store/tasks";
import TaskList from "@/components/project-activity/tasksLists.vue";
import { projectActivity as texts_c } from "@/texts/texts.json";

const tasksStore = useTasksStore();

const tasks = computed(() =>
  tasksStore.tasks.filter((task) => task.progress !== 100)
);

onMounted(() => {
  tasksStore.loadTasksFromLocalStorage();
});
</script>
