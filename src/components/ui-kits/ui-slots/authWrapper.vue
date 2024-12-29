<template #default>
  <AppWrapper>
    <div class="flex flex-row-reverse items-center justify-between px-4 py-5">
      <slot name="backLinkHome">
        <button @click="navigateHome" class="text-blue-500 hover:underline">
          Home
        </button>
      </slot>

      <slot name="backLinkHistory">
        <button @click="navigateBack" class="text-blue-500 hover:underline">
          <img
            src="/assets/icons/backIcon.svg"
            class="h-5 w-5"
            alt="Back Icon"
          />
        </button>
      </slot>
    </div>

    <div class="px-4 py-2">
      <h1 class="py-2 text-left text-2xl font-bold">
        <slot name="greet"></slot>
      </h1>

      <p class="text-normal py-2 text-left text-gray-400">
        <slot name="forgotPassword"></slot>
      </p>

      <p class="py-4 text-left text-sm">
        <slot name="errors"></slot>
      </p>

      <div class="flex flex-col gap-5 py-4">
        <slot name="form"></slot>
      </div>

      <div>
        <p class="py-6 text-left text-sm">
          <slot name="info"></slot>
        </p>
      </div>
    </div>

    <UiKitsHorizontalLine />

    <footer class="w-full py-5 text-center text-sm">
      <span>© {{ currentYear }}</span>
    </footer>
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '~/layouts/app-wrapper.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentYear = ref(new Date().getFullYear())

const navigateHome = () => {
  router.push('/')
}

const navigateBack = () => {
  router.go(-1)
}
</script>
