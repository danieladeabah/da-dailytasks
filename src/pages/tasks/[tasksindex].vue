<template>
  <AppWrapper>
    <NavigationHeader />
    <DashboardTasksDetails />
    <DashboardAssignedTo />
    <DashboardTasksProgress />
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '../../layouts/app-wrapper.vue'

definePageMeta({
  middleware: 'auth'
})
</script>
