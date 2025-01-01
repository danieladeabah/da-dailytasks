<template>
  <NuxtLayout name="app-wrapper">
    <NavigationHeader />
    <Tasks />
    <DashboardCreateTasks />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
