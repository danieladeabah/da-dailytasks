<template>
  <AppWrapper>
    <HeaderLayout />
    <TasksDetails />
    <AssignedTo />
    <TasksProgress />
  </AppWrapper>
</template>

<script setup lang="ts">
import AssignedTo from "~/components/dashboard/assignedTo.vue";
import TasksDetails from "~/components/dashboard/tasksDetails.vue";
import TasksProgress from "~/components/dashboard/tasksProgress.vue";
import HeaderLayout from "~/components/navigation/header/headerLayout.vue";
</script>
