<template>
  <NavigationHeaderDashboard v-if="$route.path === '/dashboard'" />
  <NavigationHeaderSettings v-if="$route.path === '/settings'" />
  <NavigationHeaderTasks v-if="$route.path.startsWith('/tasks')" />
</template>
