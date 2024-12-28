<template #default>
  <AppWrapper>
    <div class="px-4 py-5 flex flex-row-reverse items-center justify-between">
      <slot name="backLinkHome">
        <button @click="navigateHome" class="text-blue-500 hover:underline">
          Home
        </button>
      </slot>

      <slot name="backLinkHistory">
        <button @click="navigateBack" class="text-blue-500 hover:underline">
          <img
            src="/assets/icons/backIcon.svg"
            class="w-5 h-5"
            alt="Back Icon"
          />
        </button>
      </slot>
    </div>

    <div class="px-4 py-2">
      <h1 class="text-left text-2xl font-bold py-2">
        <slot name="greet"></slot>
      </h1>

      <p class="text-left text-normal text-gray-400 py-2">
        <slot name="forgotPassword"></slot>
      </p>

      <p class="text-left text-sm py-4">
        <slot name="errors"></slot>
      </p>

      <div class="flex flex-col gap-5 py-4">
        <slot name="form"></slot>
      </div>

      <div>
        <p class="text-left py-6 text-sm">
          <slot name="info"></slot>
        </p>
      </div>
    </div>

    <UiKitsHorizontalLine />

    <footer class="w-full text-center py-5 text-sm">
      <span>© {{ currentYear }}</span>
    </footer>
  </AppWrapper>
</template>

<script setup lang="ts">
import AppWrapper from "~/layouts/app-wrapper.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentYear = ref(new Date().getFullYear());

const navigateHome = () => {
  router.push("/");
};

const navigateBack = () => {
  router.go(-1);
};
</script>
