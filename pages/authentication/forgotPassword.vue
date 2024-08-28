<template>
  <UiKitsUiSlotsAuthWrapper>
    <template #backLink>
      <NuxtLink to="/authentication/login" class="text-2xl font-bold">
        <img src="/assets/icons/backIcon.svg" class="w-5 h-5" alt="Back Icon" />
      </NuxtLink>
    </template>
    <template #title>Reset password</template>
    <template #forgotPassword>
      Enter the email associated with your account and we'll send an email with
      instructions to reset your password.
    </template>
    <template #errors>
      <div v-if="store.error" class="text-red-600">
        {{ store.error }}
      </div>
    </template>
    <template #form>
      <UInput
        placeholder="Email address"
        v-model="email"
        maxLength="100"
        size="xl"
      />
      <UButton
        class="flex justify-center w-full font-bold hover:shadow-2xl"
        color="blue"
        label="Send Instructions"
        variant="solid"
        size="xl"
        @click="forgotPassword"
      />
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "~/store/auth";

const email = ref("");

const store = useAuthenticationStore();

const forgotPassword = () => {
  store.forgotPassword(email.value);
};
</script>
