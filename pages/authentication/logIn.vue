<template>
  <UiKitsUiSlotsAuthWrapper backLink="/">
    <template #title>Login</template>
    <template #subtitle> Enter your email and password to sign in. </template>
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
      <UButton
        class="flex justify-center w-full font-bold hover:shadow-2xl"
        color="blue"
        label="Login"
        variant="solid"
        size="xl"
        @click="login"
      />
    </template>
    <template #info>
      New here?
      <ULink to="/authentication/signup" class="text-[#2563EB] underline">
        Sign up
      </ULink>
      or <ULink class="text-[#2563EB] underline">Forgot Password</ULink>
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
