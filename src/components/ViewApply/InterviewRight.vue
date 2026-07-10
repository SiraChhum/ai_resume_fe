<template>
  <div v-if="selected" class="w-[520px]">
    <div class="flex items-start gap-4">
      <div>
        <p class="text-sm text-slate-500">{{ selected.time }} Session</p>
        <p class="mt-1 text-lg font-semibold text-slate-900">{{ selected.name }}</p>
        <p class="text-sm text-slate-500">{{ selected.title }}</p>
      </div>
      <div class="ml-auto text-sm text-slate-500">Meeting ID: <span class="font-semibold text-slate-700">TS-882-J</span></div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <div class="rounded-lg bg-slate-50 p-4">
        <h4 class="text-sm font-semibold text-slate-700">Interview Preparation</h4>
        <ul class="mt-3 space-y-2">
          <li class="flex items-center justify-between rounded-md bg-white p-2 border border-slate-100">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center text-xs">PDF</div>
              <div>
                <p class="text-sm font-semibold">Sarah_Resume_2024.pdf</p>
                <p class="text-xs text-slate-500">Updated 2 days ago</p>
              </div>
            </div>
            <button class="text-indigo-600 text-sm">Open</button>
          </li>
          <li class="flex items-center justify-between rounded-md bg-white p-2 border border-slate-100">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center text-xs">DOC</div>
              <div>
                <p class="text-sm font-semibold">Design_Assignment.doc</p>
                <p class="text-xs text-slate-500">Portfolio Review Prep</p>
              </div>
            </div>
            <button class="text-indigo-600 text-sm">Open</button>
          </li>
        </ul>
      </div>

      <div class="rounded-lg bg-slate-50 p-4">
        <h4 class="text-sm font-semibold text-slate-700">Interview Script</h4>
        <ol class="mt-3 space-y-3 list-decimal list-inside text-sm text-slate-600">
          <li>
            <p class="font-semibold">Can you walk us through a recent project where you had to balance user needs with strict technical constraints?</p>
            <div class="mt-1 text-xs text-slate-500">Core: Product Thinking • Recommended: 8 mins</div>
          </li>
          <li>
            <p class="font-semibold">How do you handle disagreements within the design and engineering hand-off process?</p>
            <div class="mt-1 text-xs text-slate-500">Core: Collaboration</div>
          </li>
        </ol>
      </div>
    </div>

    <div class="mt-6 rounded-lg bg-slate-50 p-4">
      <h4 class="text-sm font-semibold text-slate-700">Real-time Assessment</h4>
      <div class="mt-4 space-y-4">
        <div>
          <div class="flex justify-between text-sm text-slate-600"><span>Technical Proficiency</span><span class="font-semibold">7.5</span></div>
          <input type="range" min="0" max="10" step="0.1" v-model="scores.technical" class="w-full" />
        </div>
        <div>
          <div class="flex justify-between text-sm text-slate-600"><span>Problem-Solving</span><span class="font-semibold">8.0</span></div>
          <input type="range" min="0" max="10" step="0.1" v-model="scores.problem" class="w-full" />
        </div>
        <div>
          <div class="flex justify-between text-sm text-slate-600"><span>Communication</span><span class="font-semibold">9.0</span></div>
          <input type="range" min="0" max="10" step="0.1" v-model="scores.communication" class="w-full" />
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-3">
      <button class="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold">Save Progress</button>
      <button class="rounded-2xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">Reject</button>
      <button class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Shortlist</button>
    </div>
  </div>
  <div v-else class="w-[520px] text-sm text-slate-500">Select an interview to view details</div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref(null)

const scores = ref({ technical: 7.5, problem: 8.0, communication: 9.0 })

const setSelected = (app) => {
  selected.value = { ...app }
}

defineExpose({ setSelected })
</script>

<style scoped></style>

