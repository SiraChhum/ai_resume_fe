<template>
  <div v-if="selected" class="w-[320px]">
    <div class="flex items-center gap-4">
      <img :src="selected.avatar" alt="avatar" class="h-16 w-16 rounded-2xl object-cover" />
      <div>
        <p class="text-lg font-semibold text-slate-900">{{ selected.name }}</p>
        <p class="text-sm text-slate-500">{{ selected.title }}</p>
        <p class="text-sm text-slate-500">{{ selected.email }}</p>
      </div>
    </div>

    <div class="mt-4">
      <h3 class="text-sm font-semibold text-slate-700">Professional Summary</h3>
      <p class="mt-2 text-sm text-slate-600">{{ selected.summary }}</p>
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-semibold text-slate-700">Core Expertise</h4>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="skill in selected.skills"
          :key="skill"
          class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >{{ skill }}</span
        >
      </div>
    </div>

    <div class="mt-6 flex gap-3">
      <button class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
        Invite to Interview
      </button>
      <button
        class="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Reject
      </button>
    </div>
  </div>
  <div v-else class="w-[320px] text-sm text-slate-500">Short list</div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const setSelected = (app) => {
  selected.value = app
}

defineExpose({ setSelected })
</script>
