<template>
  <section class="bg-gradient-to-r from-gray-800 py-16 md:p-16">
    <div
      class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between"
    >
      <div class="text-center md:text-left md:pr-8">
        <h1 class="text-white text-4xl md:text-5xl font-bold leading-snug">
          Simplify Your Day; <br />
          <br />
          <span class="border-b-4 border-yellow-400">
            Create Tasks <br /><br />Shop Effortlessly
          </span>
        </h1>
        <ul class="mt-6 space-y-3 text-white">
          <li>Plan your day by creating tasks in just a few clicks.</li>
          <li>
            Shop for essentials while managing your to-do list seamlessly.
          </li>
        </ul>
        <NuxtLink
          to="/auth/signup"
          class="bg-yellow-300 text-black font-semibold px-6 py-3 mt-8 inline-block rounded-md hover:bg-yellow-400 transition"
        >
          Get Started Now
        </NuxtLink>
      </div>
      <div class="mt-8 md:mt-0 md:ml-8">
        <img
          src="/assets/projects-ui/daily-tasks.png"
          alt="Task and shopping management"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>
