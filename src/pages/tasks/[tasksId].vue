<template>
  <NuxtLayout name="app-wrapper">
    <NavigationHeader />
    <TasksDetails />
    <TasksAssignedTo />
    <TasksProgress />
  </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth'
// })
</script>
