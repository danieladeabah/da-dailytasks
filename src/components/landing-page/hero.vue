<template>
  <section class="bg-gradient-to-r from-red-500 to-blue-300 py-16 md:p-16">
    <div
      class="container mx-auto flex flex-col items-center justify-between md:flex-row"
    >
      <div class="text-center md:pr-8 md:text-left">
        <h1 class="text-4xl font-bold leading-snug text-white md:text-5xl">
          Simplify Your Day
          <p class="my-4 text-yellow-200">
            Create ./dailyTasks
            <span class="sm:block md:hidden lg:block">Effortlessly</span>
          </p>
        </h1>
        <ul class="mx-12 mt-6 space-y-3 text-left text-white md:mx-0 lg:mx-0">
          <li>Plan your day by creating tasks in just a few clicks.</li>
          <li>Stay organized and boost your productivity with ease.</li>
        </ul>
        <NuxtLink
          :to="isLoggedIn ? '/dashboard' : '/auth/login'"
          class="mt-8 inline-block rounded-md bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          {{ isLoggedIn ? 'Go to Dashboard' : 'Get Started Now' }}
        </NuxtLink>
      </div>
      <div class="mt-8 flex gap-4 md:ml-8 md:mt-0">
        <img
          src="/assets/icons/mobile-dashboard.png"
          alt="Task management"
          class="h-[20rem] w-[10rem] rounded-md object-cover"
        />
        <img
          src="/assets/icons/mobile-viewed-tasks.png"
          alt="Task management"
          class="h-[20rem] w-[10rem] rounded-md object-cover sm:block md:hidden lg:block"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn } = useAuth()
</script>
