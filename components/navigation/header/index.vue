<template>
  <NavigationHeaderDashboard v-if="$route.path === '/dashboard'" />
  <NavigationHeaderTasksView v-else />
</template>
