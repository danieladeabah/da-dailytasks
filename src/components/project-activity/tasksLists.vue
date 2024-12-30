<template>
  <div
    class="grid gap-5"
    :class="{
      'grid-cols-1': route.path !== '/',
      'grid-cols-1 lg:grid-cols-2': route.path === '/'
    }"
  >
    <template v-if="props.tasks.length > 0">
      <NuxtLink
        v-for="task in props.tasks"
        :key="task.id"
        :to="'/tasks/' + task.id"
        class="flex items-center justify-between rounded-xl border p-5 hover:translate-y-[-5px] hover:transform hover:shadow-md hover:transition-all hover:duration-300"
      >
        <div class="flex flex-col gap-1">
          <p>{{ task.name }}</p>
          <p class="text-gray-400">
            {{ texts_c.deadline }} {{ formatDate(task.deadline) }}
          </p>
          <div class="flex w-40 items-center space-x-2 overflow-auto">
            <UiKitsUserAvatar
              v-for="user in task.assignees.slice(0, 3)"
              :key="user.id"
              :src="user.image"
              :alt="user.name"
            />
          </div>
        </div>
        <div>
          <UButton
            class="progressTasksColor relative flex h-[60px] w-[60px] items-center justify-center rounded-full py-1 font-semibold text-[#000]"
            :style="getProgressStyle(task.progress)"
          >
            {{ task.progress }}%
          </UButton>
        </div>
      </NuxtLink>
    </template>
    <template v-else>
      <p class="my-20 text-center text-gray-400">
        {{ props.emptyMessage }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getProgressColor } from '@/utils/progressColor'
import { projectActivity as texts_c } from '@/constants/texts.json'
import type { Task } from '@/types/types'

const route = useRoute()

const props = defineProps<{
  tasks: Task[]
  emptyMessage: string
}>()

const getProgressStyle = (progress: number) => {
  return {
    backgroundImage: `linear-gradient(to right, ${getProgressColor(progress)} ${progress}%, #E5E7EB ${progress}%)`
  }
}
</script>
