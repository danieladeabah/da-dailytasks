// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Specify the source directory
  srcDir: 'src/',

  // Enable devtools
  devtools: { enabled: true },

  // Global CSS
  css: ['@/assets/css/main.css'],

  // Modules
  modules: ['nuxt-icon', '@nuxt/ui', '@nuxtjs/color-mode'],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // Color mode preferences
  colorMode: {
    preference: 'light'
  }
})
