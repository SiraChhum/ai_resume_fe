<template>
  <div v-if="selected" class="w-[340px] rounded-[28px] border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-5 shadow-sm">
    <div class="flex items-start gap-4">
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
        <img :src="selected.avatar" alt="avatar" class="h-14 w-14 rounded-2xl object-cover" />
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <p class="text-lg font-semibold text-slate-900">{{ selected.name }}</p>
          <span class="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">
            Rejected
          </span>
        </div>
        <p class="mt-1 text-sm text-slate-500">{{ selected.title }}</p>
        <p class="text-sm text-slate-500">{{ selected.email }}</p>
      </div>
    </div>

    <div class="mt-5 rounded-[20px] border border-rose-100 bg-white/80 p-4">
      <h3 class="text-sm font-semibold text-slate-700">Professional Summary</h3>
      <p class="mt-2 text-sm leading-6 text-slate-600">{{ selected.summary }}</p>
    </div>

    <div class="mt-4 rounded-[20px] border border-rose-100 bg-white/80 p-4">
      <h4 class="text-sm font-semibold text-slate-700">Core Expertise</h4>
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="skill in selected.skills"
          :key="skill"
          class="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
        Reopen Review
      </button>
      <button class="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        Archive
      </button>
    </div>
  </div>
  <div v-else class="w-[340px] rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
    Select a rejected applicant to review details.
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const setSelected = (app) => {
  selected.value = app
}

defineExpose({ setSelected })
</script>
