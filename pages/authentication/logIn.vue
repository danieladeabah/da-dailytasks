<template>
  <UiKitsUiSlotsAuthWrapper backLink="/">
    <template #greet> Welcome back </template>
    <template #title>Sign in to DailyTasks</template>
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
      <UInput
        placeholder="Password"
        type="password"
        v-model="password"
        maxLength="100"
        size="xl"
      />
    </template>
    <template #info>
      New here?
      <ULink to="/authentication/signup" class="underline"> Sign up </ULink>
      or <ULink class="underline">Forgot Password</ULink>

      <div class="py-2">
        <UButton
          class="flex justify-center w-full font-bold hover:shadow-2xl"
          color="blue"
          label="Sign In"
          variant="solid"
          size="xl"
          @click="login"
        />
      </div>
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "~/store/auth";

const email = ref("");
const password = ref("");

const store = useAuthenticationStore();

const login = () => {
  store.login(email.value, password.value);
};
</script>
