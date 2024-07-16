<template>
  <ProjectActivitySlot>
    <h1 class="text-2xl font-bold">Project Activity</h1>
    <div class="flex items-center gap-10 py-3">
      <button
        class="py-1 rounded-2xl bg-[#4E3EC8] w-[120px] text-[#fff] font-semibold"
      >
        Pending
      </button>
      <button>In Progress</button>
      <button>Done</button>
    </div>
    <div class="flex flex-col gap-5">
      <NuxtLink
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>Job Search Platform UI</p>
          <p class="text-gray-400">Deadline: 28 Sep 2024</p>
          <div class="flex items-center my-2">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4"
          >
            0%
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>Job Search Platform UI</p>
          <p class="text-gray-400">Deadline: 28 Sep 2024</p>
          <div class="flex items-center my-2">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4"
          >
            0%
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>Job Search Platform UI</p>
          <p class="text-gray-400">Deadline: 28 Sep 2024</p>
          <div class="flex items-center my-2">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4"
          >
            0%
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>Job Search Platform UI</p>
          <p class="text-gray-400">Deadline: 28 Sep 2024</p>
          <div class="flex items-center my-2">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4"
          >
            0%
          </button>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="'/tasksview'"
        class="flex items-center justify-between border p-5 rounded-xl"
      >
        <div>
          <p>Job Search Platform UI</p>
          <p class="text-gray-400">Deadline: 28 Sep 2024</p>
          <div class="flex items-center my-2">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            /><img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-7 h-7 object-cover rounded-full"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="py-1 rounded-full w-[60px] h-[60px] text-[#000] font-semibold border-4"
          >
            0%
          </button>
        </div>
      </NuxtLink>
    </div>
  </ProjectActivitySlot>
</template>
