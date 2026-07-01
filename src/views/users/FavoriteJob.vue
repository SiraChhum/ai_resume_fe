<script setup>
import { ref } from 'vue'

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
const jobs = [
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
    title: 'Senior Full Stack Developer',
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
    title: 'Senior Full Stack Developer',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    mode: 'Hybrid',
    salary: '$1,500 - $2,000 / Month',
    skills: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    saved: 'Saved on 15 May 2026',
  },
]

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

    <div class="mt-6 space-y-5">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex p-6">
          <!-- Logo -->

          <div
            :class="job.logoBg"
            class="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl text-4xl font-bold text-white"
          >
            {{ job.logo }}
          </div>

          <!-- Content -->

          <div class="ml-6 flex-1">
            <!-- Top -->

            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-3xl font-semibold text-gray-900">
                  {{ job.title }}
                </h2>

                <p class="mt-1 text-2xl text-gray-600">
                  {{ job.company }}
                </p>
              </div>

              <div class="flex items-center gap-5">
                <span class="text-sm text-gray-400"> 🕒 {{ job.saved }} </span>

                <button class="text-3xl text-red-500 transition hover:scale-110">❤</button>
              </div>
            </div>

            <!-- Info -->

            <div class="mt-3 flex flex-wrap items-center gap-6 text-gray-500">
              <span>📍 {{ job.location }}</span>

              <span>{{ job.type }}</span>

              <span>{{ job.mode }}</span>
            </div>

            <!-- Salary -->

            <p class="mt-4 text-2xl font-bold text-green-600">
              {{ job.salary }}
            </p>

            <!-- Skills -->

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="skill in job.skills"
                :key="skill"
                class="rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-600"
              >
                {{ skill }}
              </span>
            </div>

            <!-- Buttons -->

            <div class="mt-6 flex justify-end gap-3">
              <button
                class="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Apply Now
              </button>

              <button
                class="rounded-lg border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                View Detail
              </button>

              <button
                class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
