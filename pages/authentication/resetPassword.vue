<template>
  <UiKitsUiSlotsAuthWrapper>
    <template #title>{{ text.resetPassword }}</template>
    <template #forgotPassword>
      {{ text.resetPasswordNewEmail }}
    </template>
    <template #errors>
      <div v-if="store.error" class="text-red-600">
        {{ store.error }}
      </div>
    </template>
    <template #form>
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
      <UInput
        :type="isPasswordVisible ? 'text' : 'password'"
        placeholder="Repeat Password"
        v-model="newUserPassword"
        maxLength="100"
        size="xl"
      />
      <UButton
        class="flex justify-center w-full font-bold hover:shadow-2xl"
        color="blue"
        label="Reset Password"
        variant="solid"
        size="xl"
        @click="newPassword"
      />
    </template>
  </UiKitsUiSlotsAuthWrapper>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "~/store/auth";
import { authentication as text } from "@/texts/texts.json";

const password = ref("");
const newUserPassword = ref("");
const isPasswordVisible = ref(false);

const store = useAuthenticationStore();

const newPassword = () => {
  store.newPassword(password.value, newUserPassword.value);
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
