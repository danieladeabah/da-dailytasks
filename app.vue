<template>
  <NuxtPage />
  <UNotifications />
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/auth";
import { useTasksStore } from "@/store/tasks";

useHead({
  title: "DailyTasks App",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
  meta: [
    { name: "description", content: "DailyTasks App | Daniel Adeabah" },
    {
      name: "keywords",
      content:
        "Daniel Adeabah, Todos, Todo lists, Todo, Todo App, Web Developer, Web Designer, Software Engineer, Software Developer, Bamiankor, Nzema, Accra Developers, Ghana Developers, Front-End Developer",
    },
    { name: "author", content: "Daniel Adeabah" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

const AuthStore = useAuthenticationStore();
const TaskStore = useTasksStore();
const toast = useToast();

// Watch AuthStore notifications
watch(
  () => AuthStore.success || AuthStore.error,
  (newToastNotification) => {
    if (newToastNotification) {
      toast.add({
        title: newToastNotification,
        timeout: 2000,
        color: AuthStore.error ? "red" : "blue",
      });
      AuthStore.clearSuccessAfterDelay();
    }
  }
);

// Watch TaskStore notifications
watch(
  () => TaskStore.success || TaskStore.error,
  (newToastNotification) => {
    if (newToastNotification) {
      toast.add({
        title: newToastNotification,
        timeout: 2000,
        color: TaskStore.error ? "red" : "green",
      });
      TaskStore.clearSuccessAfterDelay();
    }
  }
);
</script>

