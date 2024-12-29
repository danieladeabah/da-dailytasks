<template>
  <div>
    <img
      v-if="imgSrc && imgSrc !== 'null'"
      :style="{ width: widthSize, height: heightSize, border }"
      :class="[scale ? 'hover:scale-105' : '', rounded]"
      data-cy="roundedFull"
      :src="imgSrc"
      :alt="name"
    />

    <div
      v-else
      :style="{ width: widthSize, height: heightSize }"
      class="inline-flex items-center justify-center overflow-hidden rounded-full border border-slate-300 shadow-sm after:relative"
      :class="scale ? 'hover:scale-105' : ''"
    >
      <span
        :class="textSize"
        class="text-primary-text-color dark:text-primary-text-color font-medium uppercase"
      >
        {{ usernameToInitials(name) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usernameToInitials } from '@/utils'

defineProps({
  imgSrc: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'Profile Image'
  },
  widthSize: {
    type: String,
    default: '3rem'
  },
  heightSize: {
    type: String,
    default: '3rem'
  },
  textSize: {
    type: String,
    default: 'text-xl'
  },
  border: {
    type: String,
    default: '4px solid white'
  },
  rounded: {
    type: String,
    default: 'rounded-full'
  },
  scale: {
    type: Boolean,
    default: false
  }
})
</script>
