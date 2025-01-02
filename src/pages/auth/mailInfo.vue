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
    <template #infoLinkText>
      <ULink @click="goBack">{{ text.mailInfo.infoLinkText }}</ULink>
    </template>
    <template #infoFooter>
      <p>
        {{ text.mailInfo.infoFooterText }} <br />
        {{ text.mailInfo.or }}
        <ULink @click="goBack" class="underline">{{
          text.mailInfo.infoFooterTextTwo
        }}</ULink>
      </p>
    </template>
  </UiKitsUiSlotsSuccessInfo>
</template>

<script setup lang="ts">
import { authentication as text } from '@/constants/texts.json'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>
