<template>
  <div class="mx-5 my-2 flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>
