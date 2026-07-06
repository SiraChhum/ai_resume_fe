<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-3xl font-semibold">Employer Admin</h1>
          <p class="text-sm text-gray-500">Welcome back, Admin!</p>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div
          v-for="card in cards"
          :key="card.title"
          class="rounded-3xl bg-white p-6 shadow-lg border border-slate-200"
        >
          <div class="flex items-start gap-4">
            <div :class="['h-14 w-14 rounded-3xl flex items-center justify-center', card.bg]">
              <i :class="card.icon" class="text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500">{{ card.title }}</p>
              <p class="mt-4 text-3xl font-semibold">{{ card.value }}</p>
              <p class="text-sm mt-2" :class="card.text">{{ card.footer }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <section class="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div class="flex flex-col items-center text-center gap-4">
            <div class="h-24 w-24 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-700 text-4xl">
              <i class="pi pi-building"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold">Tech Vision Inc.</h2>
              <p class="text-sm text-slate-500 mt-2">Technology, information and internet</p>
              <p class="text-sm text-slate-400 mt-1">Phnom Penh, Cambodia</p>
            </div>
            <button class="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
              View Company Profile
            </button>
          </div>
        </section>

        <section class="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-xl font-semibold">Recent jobs</h2>
              <p class="text-sm text-slate-500">Latest active job postings</p>
            </div>
            <a href="#" class="text-sm text-indigo-600 hover:underline">View all →</a>
          </div>

          <div class="space-y-3">
            <div
              v-for="job in recentJobs"
              :key="job.title + job.location"
              class="flex items-center justify-between rounded-3xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div>
                <h3 class="font-semibold">{{ job.title }}</h3>
                <p class="text-sm text-slate-500">{{ job.type }} · {{ job.location }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold">{{ job.applicants }}</p>
                <p class="text-xs text-slate-400">Applicants</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <section class="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-xl font-semibold">Screened Candidates</h2>
              <p class="text-sm text-slate-500">Top candidates from recent screenings</p>
            </div>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Screened</span>
          </div>

          <div class="space-y-3">
            <div
              v-for="candidate in screenedCandidates"
              :key="candidate.name"
              class="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 p-4"
            >
              <div class="flex items-center gap-4">
                <img :src="candidate.image" alt="candidate" class="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p class="font-semibold">{{ candidate.name }}</p>
                  <p class="text-sm text-slate-500">{{ candidate.role }}</p>
                </div>
              </div>
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                {{ candidate.score }}%
              </span>
            </div>
          </div>
        </section>

        <section class="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-xl font-semibold">Recruiters</h2>
              <p class="text-sm text-slate-500">Active recruiter team</p>
            </div>
            <button class="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
              Add Recruiter
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="recruiter in recruiters"
              :key="recruiter.email"
              class="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 p-4"
            >
              <div class="flex items-center gap-4">
                <img :src="recruiter.image" alt="recruiter" class="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p class="font-semibold">{{ recruiter.name }}</p>
                  <p class="text-sm text-slate-500">{{ recruiter.email }}</p>
                </div>
              </div>
              <a href="#" class="text-sm text-indigo-600 hover:underline">Manage</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    title: 'Active jobs',
    value: 24,
    footer: 'Open positions',
    bg: 'bg-violet-100 text-violet-600',
    text: 'text-violet-600',
    icon: 'pi pi-briefcase',
  },
  {
    title: 'Candidates',
    value: 24,
    footer: 'Waiting review',
    bg: 'bg-orange-100 text-orange-600',
    text: 'text-orange-600',
    icon: 'pi pi-users',
  },
  {
    title: 'Recruiters',
    value: 24,
    footer: 'Team members',
    bg: 'bg-emerald-100 text-emerald-600',
    text: 'text-emerald-600',
    icon: 'pi pi-user',
  },
  {
    title: 'Reports',
    value: 24,
    footer: 'Monthly summary',
    bg: 'bg-sky-100 text-sky-600',
    text: 'text-sky-600',
    icon: 'pi pi-file',
  },
])

const recentJobs = ref([
  { title: 'Software Engineer', type: 'Full Time', location: 'Phnom Penh', applicants: 45 },
  { title: 'Product Designer', type: 'Full Time', location: 'Phnom Penh', applicants: 32 },
  { title: 'Frontend Developer', type: 'Part Time', location: 'Phnom Penh', applicants: 18 },
  { title: 'HR Manager', type: 'Full Time', location: 'Phnom Penh', applicants: 12 },
])

const screenedCandidates = ref([
  { name: 'Heang Sovantha', role: 'Front-End Developer', score: 95, image: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Yi Seakly', role: 'Software Developer', score: 97, image: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Chhum Sira', role: 'UX/UI Designer', score: 92, image: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Norn Lyuocy', role: 'IT Support Application', score: 91, image: 'https://i.pravatar.cc/150?img=16' },
])

const recruiters = ref([
  { name: 'Heang Sovantha', email: 'sovantha@techvision.com', image: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Samnang Dara', email: 'dara@techvision.com', image: 'https://i.pravatar.cc/150?img=7' },
  { name: 'Vanna Rith', email: 'rith@techvision.com', image: 'https://i.pravatar.cc/150?img=9' },
])
</script>
