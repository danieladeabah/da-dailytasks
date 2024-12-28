<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <p class="text-gray-600 text-center mb-10">
      See what our users are working on.
    </p>
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
