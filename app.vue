<template>
  <NuxtPage />
</template>

<script setup lang="ts">
useHead({
  title: "DailyTasks App",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
      rel: "stylesheet",
    },
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
</script>
