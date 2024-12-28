<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="container my-5 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">
        Why Choose Our Task Management Solution?
      </h2>
      <p class="text-gray-600 mb-10">
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
const benefits = [
  {
    icon: "📝",
    title: "Effortless Task Management",
    description:
      "Easily create, track, and manage your tasks with AI-generated suggestions for better task prioritization.",
  },
  {
    icon: "⏰",
    title: "Real-Time Notifications",
    description:
      "Get timely reminders for tasks, powered by AI to predict when you're most likely to complete them.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Smart Assistant",
    description:
      "Leverage our smart AI assistant to automate task management, making suggestions based on your preferences and history.",
  },
  {
    icon: "📋",
    title: "Dashboard for Effortless Management",
    description:
      "Access an intuitive dashboard where you can manage all tasks in one place, view AI-driven insights, and monitor progress in real time.",
  },
];
</script>
