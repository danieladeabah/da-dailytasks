<template>
  <UiKitsUiSlotsProjectActivitySlot>
    <div class="flex flex-col px-5 pb-5">
      <div class="flex justify-end">
        <button
          class="py-1 mb-4 rounded-xl bg-gray-200 w-[120px] text-[#000] font-semibold"
        >
          28 Sep 20
        </button>
      </div>
      <div class="flex items-center justify-center">
        <UiKitsChartsLayout />
      </div>
      <div class="flex items-center justify-center my-2">
        <div class="flex items-center justify-between gap-10 w-fit">
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
            Pending
          </div>
        </div>
      </div>
    </div>
  </UiKitsUiSlotsProjectActivitySlot>
</template>
