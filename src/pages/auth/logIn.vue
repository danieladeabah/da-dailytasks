<template>
  <UiKitsUiSlotsAuthWrapper>
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
          class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
          @click="togglePasswordVisibility"
        >
          <UIcon
            :name="
              isPasswordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
            "
          ></UIcon>
        </span>
      </div>
    </template>
    <template #info>
      {{ text.login.newHere }}
      <ULink to="/auth/signup" class="underline">
        {{ text.login.signup }}
      </ULink>
      {{ text.login.or }}
      <ULink to="/auth/forgotPassword" class="underline">{{
        text.forgotPassword
      }}</ULink>

      <div class="py-8">
        <UButton
          class="flex w-full justify-center font-bold hover:shadow-2xl"
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
import { useAuthenticationStore } from '~/store/auth'
import { authentication as text } from '@/constants/texts.json'

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const store = useAuthenticationStore()

const login = () => {
  store.login(email.value, password.value)
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>
