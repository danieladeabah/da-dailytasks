<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="flex flex-col">
      <div class="flex justify-end">
        <button
          class="flex items-center gap-2 justify-between py-1 mb-4 rounded-xl px-3 bg-gray-200 w-fit text-[#000] font-semibold"
        >
          28 Sep 2024
          <img src="/assets/icons/arrowDownIcon.svg" class="w-5 h-5" alt="" />
        </button>
      </div>
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
            Done
          </div>
          <div class="flex items-center gap-2 truncate">
            <span
              class="bg-[#FDCA40] w-3 h-3 shadow-md border-2 border-white rounded-full"
            ></span>
            In Progress
          </div>
          <div class="flex items-center gap-2">
            <span
              class="bg-[#F17105] w-3 h-3 shadow-md border-2 border-white rounded-full"
            ></span>
            To Do
          </div>
        </div>
      </div>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>
