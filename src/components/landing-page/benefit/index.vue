<template>
  <div class="container my-5 text-center">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">
      Why Choose Our Task Management Solution?
    </h2>
    <p class="mb-10 text-gray-600">
      Explore the unique advantages that make managing tasks seamless with
      AI-powered features.
    </p>
    <div class="mx-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(benefit, index) in benefits"
        :key="index"
        class="rounded-lg border bg-white p-6 text-center"
        ref="benefitRefs"
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
import anime from 'animejs'
import { benefits } from '~/constants/landing-page/tasks_benefits'

const benefitRefs = ref([])

onMounted(() => {
  anime({
    targets: benefitRefs.value,
    opacity: [0, 1],
    translateY: [30, 0],
    easing: 'easeOutQuad',
    duration: 1000,
    delay: anime.stagger(200)
  })
})
</script>
