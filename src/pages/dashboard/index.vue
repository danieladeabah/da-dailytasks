<template>
  <NuxtLayout name="app-wrapper">
    <NavigationHeader />
    <Dashboard />
    <DashboardCreate />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
