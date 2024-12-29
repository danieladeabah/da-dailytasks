<template>
  <NuxtPage />
  <UNotifications />
</template>

<script setup lang="ts">
import { useNotificationWatcher } from "@/composables/useNotificationWatcher";
import { metaConfig } from "~~/metaConfig";

useHead(metaConfig);
useNotificationWatcher();
</script>
