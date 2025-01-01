<template>
  <NuxtLayout name="app-wrapper">
    <NavigationHeader />
    <ProjectActivity />
    <DashboardCreateTasks />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
