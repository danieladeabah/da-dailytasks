<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="container my-5 text-center">
      <h2 class="mb-6 text-3xl font-bold text-gray-800">User Reviews</h2>
      <p class="mb-2 text-gray-600">
        What our users have to say about our task management solution.
      </p>
    </div>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <UAlert
        v-for="(user, index) in user_reviews"
        :key="index"
        :title="user.name"
        :description="user.description"
        :avatar="{ src: user.userImage, alt: user.name }"
      >
        <template #avatar="{ avatar }">
          <UAvatar
            v-bind="avatar"
            :chip-color="index % 2 === 0 ? 'green' : 'orange'"
            chip-position="top-left"
          />
        </template>
      </UAlert>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { user_reviews } from '~/constants/landing-page/user_reviews'
</script>
