<template>
  <section class="py-16">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Shopping For You</h2>
      <p class="text-gray-600 mb-10">
        See what our users are shopping.
      </p>
      <div class="grid gap-8 md:grid-cols-3">
        <LandingPageShoppingShops
          v-for="(feature, index) in features"
          :key="index"
          :image="feature.image"
          :title="feature.title"
          :description="feature.description"
          :duration="feature.duration"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    image: "https://via.placeholder.com/150",
    title: "Task Management Made Easy",
    description: "Create, track, and manage tasks effortlessly as you shop.",
    duration: "Ongoing",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Seamless Shopping Integration",
    description: "Shop for your essentials while managing your to-do list.",
    duration: "Ongoing",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Stay on Track with Alerts",
    description: "Get reminders and notifications for tasks and shopping items.",
    duration: "Ongoing",
  },
];
</script>
