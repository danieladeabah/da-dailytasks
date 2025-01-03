<template>
  <UiKitsUiSlotsFormModelSlot
    :form-title="formTitle"
    @close-modal="closeModal"
    v-if="isOpen"
    v-model="isOpen"
    @closeDialog="closeModal"
  >
    <h5 class="text-sm">Hi, {{ userInfo?.first_name }}</h5>
    <div class="flex items-center justify-between gap-5">
      <div
        class="my-4 flex w-1/2 items-center justify-between rounded-xl border border-gray-100 bg-slate-100 p-4"
        title="Based on how many times your content is viewed"
      >
        Views <strong>20</strong>
      </div>
      <div
        class="my-4 flex w-1/2 items-center justify-between rounded-xl border border-gray-100 bg-slate-100 p-4"
        title="Minimum withdrawal amount is $10."
      >
        Earnings <strong>$0.02</strong>
      </div>
    </div>

    <div>
      <canvas id="radar" width="400" height="400"></canvas>
    </div>
    <div class="flex items-center justify-between gap-5">
      <div
        class="my-4 flex w-5/6 cursor-wait items-center justify-between rounded-xl border border-gray-100 bg-gradient-to-r from-red-200 to-green-100 p-4"
        title="Coming soon"
      >
        Celebrate Yourself <heartIcon />
      </div>
      <div
        class="w-2/2 my-4 flex -skew-y-6 cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gradient-to-r from-red-50 to-blue-50 p-4 font-extrabold hover:-skew-y-0 hover:transform"
        title="Coming soon"
      >
        +Premium
      </div>
    </div>
    <footer class="text-center text-xs text-gray-400">
      Powered by
      <a href="https://danieladeabah.vercel.app/" target="_blank">./adeabah</a>
    </footer>
  </UiKitsUiSlotsFormModelSlot>
</template>

<script setup lang="ts">
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js/auto'
import heartIcon from '~/assets/icons/heart-icon.vue'
import { useUser } from '@/composables/useUser'

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
)

const isOpen = ref(false)
const formTitle = ref('Analytics')
const radarChart = ref<Chart | null>(null)
const { userInfo } = useUser()

const initializeRadarChart = () => {
  const radarCtx = document.getElementById('radar') as HTMLCanvasElement
  if (radarCtx && !radarChart.value) {
    radarChart.value = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Views', 'Likes', 'Shares', 'Engagement'],
        datasets: [
          {
            label: 'Performance',
            data: [20, 15, 10, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          r: {
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    })
  }
}

watch(isOpen, newValue => {
  if (newValue) {
    nextTick(() => {
      initializeRadarChart()
    })
  }
})

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  if (radarChart.value) {
    radarChart.value.destroy()
    radarChart.value = null
  }
}

defineExpose({ openModal, closeModal })
</script>
