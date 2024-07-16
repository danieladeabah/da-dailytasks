<template>
  <ProjectActivitySlot>
    <div class="flex flex-col px-5 py-10">
      <div class="flex justify-end">
        <button
          class="py-1 rounded-xl bg-gray-200 w-[120px] text-[#000] font-semibold"
        >
          Sep 20
        </button>
      </div>
      <div class="flex items-center justify-center">
        <span
          class="w-[250px] h-[250px] rounded-full border-[#4E3EC8] border"
        ></span>
      </div>
      <div class="flex items-center justify-center my-5">
        <div class="flex items-center justify-between gap-10 w-fit">
          <div class="flex items-center gap-2">
            <span class="bg-[#4E3EC8] h-2 w-2 rounded-full"></span> Done
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-[#FDCA40] h-2 w-2 rounded-full"></span> In Progress
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-[#F17105] h-2 w-2 rounded-full"></span> Pending
          </div>
        </div>
      </div>
    </div>
  </ProjectActivitySlot>
</template>
