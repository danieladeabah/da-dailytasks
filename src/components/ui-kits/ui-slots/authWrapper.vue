<template #default>
  <AppWrapper>
    <div class="flex flex-row-reverse items-center justify-between px-4 py-5">
      <slot name="backLinkHome">
        <button @click="navigateHome" class="text-blue-500 hover:underline">
          Home
        </button>
      </slot>

      <slot name="backLinkHistory">
        <button
          @click="navigateBack"
          class="flex items-center gap-4 text-xl font-bold"
        >
          <img
            src="/assets/icons/back-icon.svg"
            class="h-5 w-5"
            alt="Back Icon"
          />
          <slot name="greet"></slot>
        </button>
      </slot>
    </div>

    <div class="px-4 py-2">
      <p class="text-normal py-2 text-left text-gray-500">
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

    <CommonHorizontalLine />

    <NavigationFooter />
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from '~/layouts/app-wrapper.vue'

const router = useRouter()
const navigateHome = () => {
  router.push('/')
}

const navigateBack = () => {
  router.go(-1)
}
</script>
