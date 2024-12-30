<template>
  <NavigationHeaderDashboard v-if="$route.path === '/dashboard'" />
  <NavigationHeaderTasks v-else />
</template>
