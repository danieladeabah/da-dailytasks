<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="flex flex-col">
      <div class="flex items-center justify-center">
        <UiKitsChartsLayout />
      </div>
      <div class="flex items-center justify-center my-4">
        <div
          class="flex flex-row-reverse items-center justify-between gap-10 w-fit"
        >
          <div class="flex items-center gap-2">
            <span
              class="bg-[#4E3EC8] w-3 h-3 shadow-md border-2 border-white rounded-full"
            ></span>
            {{ texts_c.statsView.done }}
          </div>
          <div class="flex items-center gap-2 truncate">
            <span
              class="bg-[#FDCA40] w-3 h-3 shadow-md border-2 border-white rounded-full"
            ></span>
            {{ texts_c.statsView.inProgress }}
          </div>
          <div class="flex items-center gap-2">
            <span
              class="bg-[#F17105] w-3 h-3 shadow-md border-2 border-white rounded-full"
            ></span>
            {{ texts_c.statsView.todo }}
          </div>
        </div>
      </div>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>

<script setup lang="ts">
import { projectActivity as texts_c } from "~~/texts/texts.json";
</script>
