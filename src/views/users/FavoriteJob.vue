<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const filteredJobs = computed(() => {
  return (jobs.value ?? []).filter((job) =>
    job.title.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const stats = ref([
  {
    title: 'Save Jobs',
    value: 15,
    subtitle: 'All time',
    icon: '♡',
    bg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    subtitleColor: 'text-gray-500',
  },
  {
    title: 'New Jobs',
    value: 4,
    subtitle: 'Add this week',
    icon: '★',
    bg: 'bg-green-100',
    iconColor: 'text-green-500',
    subtitleColor: 'text-green-500',
  },
  {
    title: 'Applied',
    value: 6,
    subtitle: 'From your save jobs',
    icon: '▣',
    bg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    subtitleColor: 'text-orange-500',
  },
])
const jobs = ref([
  {
    id: 1,
    logo: 'ABA',
    logoBg: 'bg-[#163B5C]',
    company: 'ABA Bank',
    title: 'Senior Full Stack Developer',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    mode: 'Hybrid',
    salary: '$1,500 - $2,000 / Month',
    skills: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    saved: 'Saved on 15 May 2026',
  },
  {
    id: 2,
    logo: '🦅',
    logoBg: 'bg-[#1D3557]',
    company: 'ACLEDA Bank',
    title: 'Senior Backend Developer',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    mode: 'Hybrid',
    salary: '$1,500 - $2,000 / Month',
    skills: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    saved: 'Saved on 15 May 2026',
  },
  {
    id: 3,
    logo: 'Wing',
    logoBg: 'bg-lime-500',
    company: 'Wing Bank',
    title: 'Senior Frontend Developer',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    mode: 'Hybrid',
    salary: '$1,500 - $2,000 / Month',
    skills: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    saved: 'Saved on 15 May 2026',
  },
])

const filters = ref(['All', 'Full Time', 'Part Time', 'Remote', 'Hybrid'])

const activeFilter = ref('All')
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- ================= Statistics ================= -->

    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="card in stats"
        :key="card.title"
        class="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
      >
        <div class="flex items-start gap-4">
          <div
            :class="[card.bg, card.iconColor]"
            class="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          >
            {{ card.icon }}
          </div>

          <div>
            <p class="text-sm text-gray-500">
              {{ card.title }}
            </p>

            <h2 class="mt-1 text-5xl font-light">
              {{ card.value }}
            </h2>
          </div>
        </div>

        <p :class="card.subtitleColor" class="mt-5 text-center text-sm">
          {{ card.subtitle }}
        </p>
      </div>
    </div>

    <!-- ================= Filter ================= -->

    <div class="mt-6 rounded-2xl bg-white p-5 shadow-md">
      <div class="flex items-center justify-between gap-6">
        <!-- Search -->

        <div class="relative w-72">
          <input
            v-model="search"
            type="text"
            placeholder="Search job..."
            class="w-full rounded-xl border-2 border-indigo-500 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-5-5m2-5a7 7 0 11-14 0a7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Filter -->

        <div class="flex flex-1 items-center gap-3">
          <span class="text-sm font-medium text-gray-600"> Filter By : </span>

          <button
            v-for="item in filters"
            :key="item"
            @click="activeFilter = item"
            :class="[
              activeFilter === item
                ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                : 'bg-white border-gray-300 hover:bg-gray-50',
            ]"
            class="rounded-lg border px-5 py-2 text-sm transition"
          >
            {{ item }}
          </button>
        </div>

        <!-- Sort -->

        <select class="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none">
          <option>Sort : Newest</option>
          <option>Oldest</option>
          <option>Salary</option>
          <option>Company</option>
        </select>
      </div>
    </div>

    <div class="mt-3 space-y-2">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="rounded-xl bg-white shadow hover:shadow-md"
      >
        <div class="flex items-center p-3">
          <!-- Logo -->
          <div
            :class="job.logoBg"
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
          >
            {{ job.logo }}
          </div>

          <!-- Content -->
          <div class="ml-3 flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold leading-tight">
                  {{ job.title }}
                </h2>

                <p class="text-sm text-gray-500">
                  {{ job.company }}
                </p>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400">
                  {{ job.saved }}
                </span>

                <button class="text-lg text-red-500">❤</button>
              </div>
            </div>

            <div class="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
              <span>📍 {{ job.location }}</span>
              <span>{{ job.type }}</span>
              <span>{{ job.mode }}</span>
            </div>

            <div class="mt-1 flex items-center justify-between">
              <p class="text-base font-bold text-green-600">
                {{ job.salary }}
              </p>

              <div class="flex gap-2">
                <button class="rounded-md bg-indigo-600 px-3 py-1 text-xs text-white">Apply</button>

                <button
                  class="rounded-md border border-indigo-600 px-3 py-1 text-xs text-indigo-600"
                >
                  Detail
                </button>

                <button class="flex h-7 w-7 items-center justify-center rounded-md border">
                  🗑
                </button>
              </div>
            </div>

            <!-- Skills -->
            <div class="mt-1 flex flex-wrap gap-1">
              <span
                v-for="skill in job.skills"
                :key="skill"
                class="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
