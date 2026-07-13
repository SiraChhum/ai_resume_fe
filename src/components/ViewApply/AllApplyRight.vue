<template>
  <div class="flex items-center justify-between gap-4">
    <div>
      <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Fits</p>
      <h2 class="mt-3 text-2xl font-semibold text-slate-900">{{ selectedProfile.name }}</h2>
      <p class="text-sm text-indigo-600">{{ selectedProfile.role }}</p>
    </div>
    <button
      class="rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
    >
      <i class="pi pi-share-alt"></i>
    </button>
  </div>

  <div class="mt-6 grid gap-2 rounded-[28px] bg-slate-50 p-4">
    <div class="flex items-center gap-3">
      <div class="h-12 w-12 rounded-3xl bg-white p-3 text-slate-700">
        <i class="pi pi-user"></i>
      </div>
      <div>
        <p class="text-sm text-slate-500">{{ selectedProfile.email }}</p>
      </div>
    </div>
    <div class="flex items-center gap-3 text-sm text-slate-500">
      <i class="pi pi-phone"></i>
      <span>{{ selectedProfile.phone }}</span>
    </div>
    <div class="flex items-center gap-3 text-sm text-slate-500">
      <i class="pi pi-map-marker"></i>
      <span>{{ selectedProfile.location }}</span>
    </div>
  </div>

  <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
    <h3 class="text-sm font-semibold text-slate-900">About Candidate</h3>
    <p class="mt-3 text-sm leading-6 text-slate-600">{{ selectedProfile.about }}</p>
  </div>

  <div class="mt-6 space-y-3">
    <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Skills</h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="skill in selectedProfile.skills"
        :key="skill"
        class="rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
      >
        {{ skill }}
      </span>
    </div>
  </div>

  <div class="mt-6 rounded-[28px] bg-white p-5 shadow-sm border border-slate-200">
    <h3 class="text-sm font-semibold text-slate-900">Resume</h3>
    <div
      class="mt-4 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"
    >
      <div>
        <p class="font-semibold text-slate-900">{{ selectedProfile.resume.name }}</p>
        <p class="text-sm text-slate-500">{{ selectedProfile.resume.size }}</p>
      </div>
      <button
        class="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
      >
        Download
      </button>
    </div>
  </div>

  <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
    <h3 class="text-sm font-semibold text-slate-900">Interview</h3>
    <p class="mt-3 text-sm text-slate-500">Choose an action for this candidate.</p>
    <div class="mt-4 flex gap-3">
      <button
        class="flex-1 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
      >
        Shortlist
      </button>
      <button
        class="flex-1 rounded-full border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
      >
        Reject
      </button>
    </div>
  </div>

  <div class="mt-6 rounded-[28px] bg-white p-5 shadow-sm border border-slate-200">
    <h3 class="text-sm font-semibold text-slate-900">Add Note (optional)</h3>
    <textarea
      v-model="note"
      rows="4"
      placeholder="Write a note about this candidate..."
      class="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    />
    <button
      class="mt-4 w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
    >
      Save Note
    </button>
  </div>

  <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
    <h3 class="text-sm font-semibold text-slate-900">Application Activity</h3>
    <div class="mt-4 space-y-4">
      <div class="flex items-start gap-3">
        <div class="mt-1 h-3 w-3 rounded-full bg-indigo-600"></div>
        <div>
          <p class="text-sm font-semibold text-slate-900">Applied for the job</p>
          <p class="mt-1 text-sm text-slate-500">May 29, 2024 at 10:30 AM</p>
          <p class="text-sm text-slate-500">
            Candidate successfully submitted their application for the UI/UX Designer role.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const note = ref('')

const selectedProfile = ref({
  name: 'Jane Doe',
  role: 'Product Designer',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  about: 'Experienced designer focused on user-centered digital products.',
  skills: ['Figma', 'Adobe XD', 'Sketch'],
  resume: {
    name: 'Jane_Doe_Resume.pdf',
    size: '1.4 MB',
  },
})
</script>
