<template>
  <UiKitsUiSlotsSuccessInfo backLink="/">
    <template #infoIcon>
      <UIcon
        name="i-heroicons-envelope-open"
        class="size-20 text-[#6d94e8]"
      ></UIcon>
    </template>
    <template #infoTitle>Reset password</template>
    <template #infoText>
      We have sent a password recover <br />
      instructions to your email
    </template>
    <template #infoLink>
      <UButton
        class="flex justify-center w-[150px] font-bold hover:shadow-2xl"
        color="blue"
        label="Open email app"
        variant="solid"
        size="xl"
      />
    </template>
    <template #infoLinkText>
      <ULink to="/authentication/logIn">Skip, I'll do it later</ULink>
    </template>
    <template #infoFooter>
      <p>
        Did not receive the email? Check your spam folder <br />
        or
        <ULink to="/authentication/forgotPassword" class="underline"
          >try another email address</ULink
        >.
      </p>
    </template>
  </UiKitsUiSlotsSuccessInfo>
</template>
