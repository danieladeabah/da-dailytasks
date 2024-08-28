<template #info>
  <AppWrapper>
    <div class="px-4 py-20">
      <div class="flex items-center justify-center py-5">
        <slot name="infoIcon"></slot>
      </div>

      <h1 class="text-2xl text-center font-normal pb-2">
        <slot name="infoTitle"></slot>
      </h1>

      <p class="text-center text-normal text-gray-400 pb-4">
        <slot name="infoText"></slot>
      </p>

      <div class="flex items-center justify-center py-5">
        <slot name="infoLink"></slot>
      </div>

      <p class="text-center text-normal text-gray-400 py-4">
        <slot name="infoLinkText"></slot>
      </p>

      <footer class="w-full text-center pt-40 text-sm">
        <slot name="infoFooter"></slot>
      </footer>
    </div>
  </AppWrapper>
</template>
