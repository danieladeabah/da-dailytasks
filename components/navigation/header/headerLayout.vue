<template>
    <HeaderDashboard v-if="$route.path === '/'"/>
    <headerTasksView v-else />
</template>

<script setup lang="ts">
import HeaderDashboard from "./headerDashboard.vue";
import headerTasksView from "./headerTasksView.vue";
</script>
