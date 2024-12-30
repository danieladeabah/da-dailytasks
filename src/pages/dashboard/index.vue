<template>
  <AppWrapper>
    <NavigationHeader />
    <ProjectActivity />
    <DashboardCreateTasks />
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '../../layouts/app-wrapper.vue'

definePageMeta({
  middleware: 'auth'
})
</script>
