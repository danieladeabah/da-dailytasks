// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-icon", "nuxt-snackbar", "@nuxt/ui", "@nuxtjs/color-mode"],
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: "light",
  },
});
