<template>
  <UiKitsUiSlotsAuthWrapper backLink="/authentication/login">
    <template #greet> Welcome to DailyTasks </template>
    <template #title>Create an account</template>
    <template #errors>
      <div v-if="store.error" class="text-red-600">
        {{ store.error }}
      </div>
    </template>
    <template #form>
      <UInput
        placeholder="First name"
        v-model="first_name"
        maxLength="100"
        size="xl"
      />
      <UInput
        placeholder="Last name"
        v-model="last_name"
        maxLength="100"
        size="xl"
      />
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
      <div class="flex items-start gap-2">
        <span>
          <UCheckbox color="blue" />
        </span>
        <span>
          By providing your email, you agree to our
          <ULink class="underline">Terms of Service</ULink> and
          <ULink class="underline">Privacy Policy</ULink>
        </span>
      </div>

      <div class="py-2">
        <UButton
          class="flex justify-center w-full font-bold hover:shadow-2xl"
          color="blue"
          label="Sign Up"
          variant="solid"
          size="xl"
          @click="signup"
        />
      </div>
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "~/store/auth";

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");

const store = useAuthenticationStore();

const signup = () => {
  store.signup(email.value, password.value, first_name.value, last_name.value);
};
</script>
