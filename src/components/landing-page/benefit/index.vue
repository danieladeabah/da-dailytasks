<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="container my-5 text-center">
      <h2 class="mb-6 text-3xl font-bold text-gray-800">
        Why Choose Our Task Management Solution?
      </h2>
      <p class="mb-10 text-gray-600">
        Explore the unique advantages that make managing tasks seamless with
        AI-powered features.
      </p>
    </div>
    <div class="grid gap-8 md:grid-cols-4">
      <LandingPageBenefitCard
        v-for="(benefit, index) in benefits"
        :key="index"
        :icon="benefit.icon"
        :title="benefit.title"
        :description="benefit.description"
      />
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup>
import { benefits } from '~/constants/landing-page/tasks_benefits'
</script>
