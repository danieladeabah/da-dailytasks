<template>
  <div class="flex flex-col mx-5 my-2 gap-5">
    <div class="flex items-center justify-between">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>
