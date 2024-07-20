<template>
  <NavigationHeaderDashboard v-if="$route.path === '/'" />
  <NavigationHeaderTasksView v-else />
</template>
