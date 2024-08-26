<template>
  <UiKitsUiSlotsAuthWrapper backLink="/authentication/login">
    <template #title>Sign up</template>
    <template #subtitle> Add your email and password to sign up. </template>
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
        label="Sign up"
        variant="solid"
        @click="signUpNow"
      />
    </template>
    <template #info>
      By providing your email, you agree to our
      <ULink class="text-[#2563EB] underline">Terms of Service</ULink> and
      <ULink class="text-[#2563EB] underline">Privacy Policy</ULink> in use of
      Daily Tasks app.
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
const email_address = ref("");
const password = ref("");

const signUpNow = () => {
  console.log(email_address.value, password.value);
};
</script>
