<template>
  <UiKitsUiSlotsAuthWrapper backLink="/authentication/login">
    <template #title>Sign up</template>
    <template #subtitle> Enter your email and password to sign up. </template>
    <template #form>
      <UInput placeholder="First name" v-model="first_name" maxLength="100" size="xl" />
      <UInput placeholder="Last name" v-model="last_name" maxLength="100" size="xl" />
      <UInput placeholder="Email address" v-model="email" maxLength="100" size="xl" />
      <UInput placeholder="Password" type="password" v-model="password" maxLength="100" size="xl" />
      <UButton class="flex justify-center w-full font-bold hover:shadow-2xl" color="blue" label="Sign up"
        variant="solid" size="xl" @click="signup" />
    </template>
    <template #info>
      By providing your email, you agree to our
      <ULink class="text-[#2563EB] underline">Terms of Service</ULink> and
      <ULink class="text-[#2563EB] underline">Privacy Policy</ULink>
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
