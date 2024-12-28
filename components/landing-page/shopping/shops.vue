<template>
  <div class="product-card bg-white shadow-md rounded-lg overflow-hidden">
    <div class="relative">
      <img :src="image" alt="Product" class="w-full h-40 object-cover" />
      <span
        class="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
      >
        {{ tag }}
      </span>
    </div>
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-green-500">{{ price }}</span>
        <button
          @click="addToCart"
          class="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded transition hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const addToCart = () => {
  alert("Item added to cart!");
};
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
