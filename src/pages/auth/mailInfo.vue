<template>
  <UiKitsUiSlotsSuccessInfo backLink="/">
    <template #infoIcon>
      <UIcon
        name="i-heroicons-envelope-open"
        class="size-20 text-[#6d94e8]"
      ></UIcon>
    </template>
    <template #infoTitle>{{ text.resetPassword }}</template>
    <template #infoText>
      {{ text.mailInfo.infoText }}
    </template>
    <template #infoLink>
      <UButton
        class="flex w-[150px] justify-center font-bold hover:shadow-2xl"
        color="blue"
        label="Open email app"
        variant="solid"
        size="xl"
      />
    </template>
    <template #infoLinkText>
      <ULink to="/auth/logIn">{{ text.mailInfo.infoLinkText }}</ULink>
    </template>
    <template #infoFooter>
      <p>
        {{ text.mailInfo.infoFooterText }} <br />
        {{ text.mailInfo.or }}
        <ULink to="/auth/forgotPassword" class="underline">{{
          text.mailInfo.infoFooterTextTwo
        }}</ULink
        >.
      </p>
    </template>
  </UiKitsUiSlotsSuccessInfo>
</template>

<script setup lang="ts">
import { authentication as text } from '@/constants/texts.json'
</script>
