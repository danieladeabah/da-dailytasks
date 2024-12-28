<template>
  <section class="py-16">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">
        Why Choose Our Task & Shopping Solution?
      </h2>
      <p class="text-gray-600 mb-10">
        Explore the unique advantages that make managing tasks and shopping
        seamless with AI-powered features.
      </p>
      <div class="grid gap-8 md:grid-cols-3">
        <LandingPageBenefitCard
          v-for="(benefit, index) in benefits"
          :key="index"
          :icon="benefit.icon"
          :title="benefit.title"
          :description="benefit.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    icon: "📝",
    title: "Effortless Task Management",
    description:
      "Easily create, track, and manage your tasks while you shop, with AI-generated suggestions for better task prioritization.",
  },
  {
    icon: "🛍️",
    title: "Integrated Shopping Experience",
    description:
      "Shop for what you need, all while staying on top of your to-do list, with personalized AI-driven recommendations based on your habits.",
  },
  {
    icon: "⏰",
    title: "Real-Time Notifications",
    description:
      "Get timely reminders for tasks and shopping items, powered by AI to predict when you're most likely to complete them.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Smart Assistant",
    description:
      "Leverage our smart AI assistant to automate task management and shopping lists, making suggestions based on your preferences and history.",
  },
  {
    icon: "📊",
    title: "AI Analytics & Insights",
    description:
      "Analyze your task and shopping patterns with AI to improve efficiency and make smarter decisions for future shopping and planning.",
  },
  {
    icon: "📋",
    title: "Dashboard for Effortless Management",
    description:
      "Access an intuitive dashboard where you can manage all tasks and shopping lists in one place, view AI-driven insights, and monitor progress in real time.",
  },
];
</script>
