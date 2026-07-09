<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  labels: { type: Array, default: () => ['May 17','May 18','May 19','May 20','May 21','May 22','May 23'] },
  values: { type: Array, default: () => [1000,1500,1800,1400,2000,1600,2100] }
})

const canvas = ref(null)
let chart = null

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'Applications',
          data: props.values,
          fill: true,
          backgroundColor: 'rgba(99,102,241,0.12)',
          borderColor: '#6366f1',
          tension: 0.35,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
        x: { grid: { display: false } },
      },
      plugins: {
        legend: { display: false },
      },
    },
  })
})

watch(() => props.values, (nv) => {
  if (chart) {
    chart.data.datasets[0].data = nv
    chart.update()
  }
})
</script>

<style scoped>
canvas { width: 100%; height: 200px; }
</style>
