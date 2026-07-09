<template>
  <div class="flex items-center justify-center">
    <canvas ref="canvas" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  values: { type: Array, default: () => [4200,3150,2190,1430,685] },
  colors: { type: Array, default: () => ['#2563eb','#10b981','#f59e0b','#7c3aed','#ef4444'] }
})

const canvas = ref(null)
let chart = null

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Applied','In Review','Shortlisted','Interview','Rejected'],
      datasets: [{ data: props.values, backgroundColor: props.colors, hoverOffset: 6 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%'
    }
  })
})

watch(() => props.values, (nv) => {
  if (chart) { chart.data.datasets[0].data = nv; chart.update() }
})
</script>

<style scoped>
canvas { width: 180px; height: 180px; }
</style>
