<template>
  <UiKitsUiSlotsAuthWrapper>
    <template #backLink>
      <NuxtLink to="/" class="text-2xl font-bold">
        <img src="/assets/icons/backIcon.svg" class="w-5 h-5" alt="Back Icon" />
      </NuxtLink>
    </template>
    <template #greet> {{ text.login.loginGreet }} </template>
    <template #title>{{ text.login.login }}</template>
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
      <div class="relative">
        <UInput
          :type="isPasswordVisible ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
          maxLength="100"
          size="xl"
        />
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          @click="togglePasswordVisibility"
        >
          <i
            :class="
              isPasswordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
            "
          ></i>
        </span>
      </div>
    </template>
    <template #info>
      {{ text.login.newHere }}
      <ULink to="/authentication/signup" class="underline">
        {{ text.login.signup }}
      </ULink>
      {{ text.login.or }}
      <ULink to="/authentication/forgotPassword" class="underline">{{
        text.forgotPassword
      }}</ULink>

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
import { authentication as text } from "@/texts/texts.json";

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);

const store = useAuthenticationStore();

const login = () => {
  store.login(email.value, password.value);
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
