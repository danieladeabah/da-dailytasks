<template>
  <UiKitsUiSlotsAuthWrapper backLink="/">
    <template #title>Login</template>
    <template #subtitle>
      Welcome back. Add your email and password to sign in.
    </template>
    <template #form>
      <UInput
        placeholder="Email address"
        v-model="email_address"
        maxLength="100"
      />
      <UInput
        placeholder="Password"
        type="password"
        v-model="password"
        maxLength="100"
      />
      <UButton
        class="flex justify-center w-full font-bold hover:shadow-2xl"
        color="blue"
        label="Login"
        variant="solid"
        @click="loginNow"
      />
    </template>
    <template #info>
      Have you not registered yet?
      <ULink to="/authentication/signup" class="text-[#2563EB] underline">
        Sign up
      </ULink>
      or <ULink class="text-[#2563EB] underline">Forgot Password</ULink>
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
const email_address = ref("");
const password = ref("");

const loginNow = () => {
  console.log(email_address.value, password.value);
};
</script>
