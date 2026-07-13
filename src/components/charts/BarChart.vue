<template>
  <div class="h-64">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  labels: {
    type: Array,
    default: () => ['May 17', 'May 18', 'May 19', 'May 20', 'May 21', 'May 22', 'May 23'],
  },
  values: {
    type: Array,
    default: () => [1000, 1500, 1800, 1400, 2000, 1600, 2100],
  },
})

const canvas = ref(null)
let chart = null

onMounted(() => {
  const ctx = canvas.value.getContext('2d')

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'Applications',
          data: props.values,
          backgroundColor: '#6366f1',
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 30,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })
})

watch(
  () => [props.labels, props.values],
  ([labels, values]) => {
    if (chart) {
      chart.data.labels = labels
      chart.data.datasets[0].data = values
      chart.update()
    }
  },
  { deep: true },
)
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
