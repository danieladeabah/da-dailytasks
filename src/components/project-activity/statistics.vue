<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="flex flex-col">
      <div class="flex items-center justify-center">
        <UiKitsChartsLayout />
      </div>
      <div class="my-4 flex items-center justify-center">
        <div
          class="flex w-fit flex-row-reverse items-center justify-between gap-10"
        >
          <div class="flex items-center gap-2">
            <span
              class="h-3 w-3 rounded-full border-2 border-white bg-[#4E3EC8] shadow-md"
            ></span>
            {{ texts_c.statsView.done }}
          </div>
          <div class="flex items-center gap-2 truncate">
            <span
              class="h-3 w-3 rounded-full border-2 border-white bg-[#FDCA40] shadow-md"
            ></span>
            {{ texts_c.statsView.inProgress }}
          </div>
          <div class="flex items-center gap-2 truncate">
            <span
              class="h-3 w-3 rounded-full border-2 border-white bg-[#F17105] shadow-md"
            ></span>
            {{ texts_c.statsView.todo }}
          </div>
        </div>
      </div>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { projectActivity as texts_c } from '@/constants/texts.json'
</script>
