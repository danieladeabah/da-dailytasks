<template>
  <div class="container my-5 text-center">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">
      Why Choose Our Task Management Solution?
    </h2>
    <p class="mb-10 text-gray-600">
      Explore the unique advantages that make managing tasks seamless with
      AI-powered features.
    </p>
    <div class="grid gap-8 md:grid-cols-4">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="rounded-lg border bg-white p-6 text-center hover:translate-y-[-5px] hover:transform hover:shadow-xl hover:transition-all hover:duration-300"
      >
        <div class="mb-4 text-5xl">{{ benefit.icon }}</div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">
          {{ benefit.title }}
        </h3>
        <p class="text-gray-600">{{ benefit.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { benefits } from '~/constants/landing-page/tasks_benefits'
</script>
