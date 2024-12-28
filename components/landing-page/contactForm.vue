<template>
    <section class="contact bg-gray-100 py-16">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Get in Touch</h2>
        <p class="text-center text-gray-600 mb-10">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <form @submit.prevent="handleSubmit" class="bg-white p-8 shadow-md rounded-lg">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              placeholder="Enter your name"
              class="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              placeholder="Enter your email"
              class="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
            <input
              id="subject"
              type="text"
              v-model="form.subject"
              placeholder="Enter the subject"
              class="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              placeholder="Enter your message"
              class="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const handleSubmit = () => {
    console.log('Form submitted:', form.value);
    // Add your form submission logic here (e.g., API call)
    alert('Your message has been sent!');
    form.value = { name: '', email: '', subject: '', message: '' };
  };
  </script>
  
  <style scoped>
  .contact {
    background-color: #f9fafb;
  }
  </style>
  