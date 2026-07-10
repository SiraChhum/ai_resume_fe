<template>
  <div v-if="selected" class="w-[420px]">
    <div class="flex items-center gap-4">
      <img :src="selected.avatar" alt="avatar" class="h-16 w-16 rounded-2xl object-cover" />
      <div>
        <p class="text-lg font-semibold text-slate-900">{{ selected.name }}</p>
        <p class="text-sm text-slate-500">{{ selected.title }} • {{ selected.location }}</p>
        <p class="text-sm text-slate-500">{{ selected.email }}</p>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-4">
      <div class="rounded-lg bg-slate-50 p-4 text-center">
        <p class="text-xs text-slate-500">Technical Assessment</p>
        <p class="mt-2 font-semibold text-slate-900">94/100</p>
      </div>
      <div class="rounded-lg bg-slate-50 p-4 text-center">
        <p class="text-xs text-slate-500">Interview Performance</p>
        <p class="mt-2 font-semibold text-slate-900">4.8/5.0</p>
      </div>
      <div class="rounded-lg bg-slate-50 p-4 text-center">
        <p class="text-xs text-slate-500">Cultural Fit</p>
        <p class="mt-2 font-semibold text-slate-900">92% Match</p>
      </div>
    </div>

    <div class="mt-6 rounded-lg bg-slate-50 p-4">
      <h4 class="text-sm font-semibold text-slate-700">Recruiter Notes</h4>
      <p class="mt-2 text-sm text-slate-600">{{ selected.note }}</p>
    </div>

    <div class="mt-4 flex gap-3">
      <button class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Schedule Next Interview</button>
      <button class="rounded-2xl border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600">Move to Offer Stage</button>
    </div>
  </div>
  <div v-else class="w-[420px] text-sm text-slate-500">Select a shortlisted candidate to view details</div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const setSelected = (app) => {
  selected.value = { ...app, note: app.note || "No notes yet." }
}

defineExpose({ setSelected })
</script>
