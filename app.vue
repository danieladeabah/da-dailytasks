<template>
  <NuxtPage />
  <UNotifications />
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/auth";

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

const store = useAuthenticationStore();
const toast = useToast();

watch(
  () => store.success || store.error,
  (newToastNotification) => {
    if (newToastNotification) {
      toast.add({
        title: newToastNotification,
        timeout: 2000,
        color: store.error ? "red" : "blue",
      });
      store.clearSuccessAfterDelay();
    }
  }
);
</script>
