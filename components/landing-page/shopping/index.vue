<template>
  <section class="py-16">
    <UiKitsHorizontalLine />
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
          :price="feature.price"
          :tag="feature.tag"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    image: "https://via.placeholder.com/150",
    title: "Premium Task Management",
    description: "Create, track, and manage tasks effortlessly as you shop.",
    price: "$19.99",
    tag: "Best Seller",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Seamless Shopping",
    description: "Shop for your essentials while managing your to-do list.",
    price: "$14.99",
    tag: "Limited Offer",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Stay on Track",
    description: "Get reminders and notifications for tasks and shopping items.",
    price: "$9.99",
    tag: "New",
  },
];
</script>
