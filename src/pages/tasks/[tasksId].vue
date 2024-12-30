<template>
  <NuxtLayout name="app-wrapper">
    <NavigationHeader />
    <DashboardTasksDetails />
    <DashboardAssignedTo />
    <DashboardTasksProgress />
  </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth'
// })
</script>
