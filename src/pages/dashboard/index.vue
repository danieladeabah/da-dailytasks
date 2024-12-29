<template>
  <AppWrapper>
    <NavigationHeader />
    <ProjectActivityLayout />
    <DashboardCreateTasks />
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '../../layouts/app-wrapper.vue'

definePageMeta({
  middleware: 'auth'
})
</script>
