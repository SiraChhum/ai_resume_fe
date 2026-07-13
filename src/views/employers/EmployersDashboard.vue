<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-[1400px] mx-auto space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm text-slate-500">Welcome back, John! 👋</p>
          <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Here’s what’s happening with your job posts and applications.
          </h1>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-slate-500">This Month</span>
          <button
            class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            This Month
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Jobs Overview</p>
              <h2 class="mt-3 text-2xl font-semibold text-slate-900">Recent jobs</h2>
            </div>
            <button class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
              Create New Job
            </button>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6 mt-8">
            <div class="space-y-6 rounded-[28px] bg-slate-50 p-5 border border-slate-200">
              <div>
                <p class="text-sm text-slate-500">Total jobs</p>
                <p class="mt-3 text-5xl font-semibold text-slate-900">12</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-3xl bg-white p-4 border border-slate-200">
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Active</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900">7</p>
                  <p class="mt-2 text-sm text-slate-400">58%</p>
                </div>
                <div class="rounded-3xl bg-white p-4 border border-slate-200">
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">In Review</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900">2</p>
                  <p class="mt-2 text-sm text-slate-400">17%</p>
                </div>
                <div class="rounded-3xl bg-white p-4 border border-slate-200">
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Draft</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900">2</p>
                  <p class="mt-2 text-sm text-slate-400">17%</p>
                </div>
                <div class="rounded-3xl bg-white p-4 border border-slate-200">
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Closed</p>
                  <p class="mt-3 text-2xl font-semibold text-slate-900">1</p>
                  <p class="mt-2 text-sm text-slate-400">8%</p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="job in recentJobs" :key="job.title + job.location" class="rounded-[28px] border border-slate-200 p-5 hover:shadow-lg transition">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <h3 class="text-lg font-semibold text-slate-900">{{ job.title }}</h3>
                    <p class="text-sm text-slate-500">{{ job.type }} · {{ job.location }}</p>
                  </div>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {{ job.status }}
                  </span>
                </div>
                <div class="mt-4 flex items-center justify-between gap-4 text-sm text-slate-500">
                  <p>{{ job.posted }}</p>
                  <p class="font-semibold text-slate-900">{{ job.applicants }} applicants</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold text-slate-900">Recent applications</h2>
              <p class="mt-2 text-sm text-slate-500">Most recent applicants to your active jobs</p>
            </div>
            <a href="#" class="text-sm font-semibold text-indigo-600 hover:underline">View All</a>
          </div>

          <div class="mt-6 space-y-4">
            <div v-for="application in recentApplications" :key="application.name + application.role" class="flex items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div class="flex items-center gap-4">
                <img :src="application.image" alt="candidate" class="h-12 w-12 rounded-2xl object-cover" />
                <div>
                  <p class="font-semibold text-slate-900">{{ application.name }}</p>
                  <p class="text-sm text-slate-500">{{ application.role }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-slate-900">{{ application.status }}</p>
                <p class="text-xs text-slate-400">{{ application.time }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div
          v-for="summary in summaries"
          :key="summary.label"
          class="col-span-1 rounded-[28px] bg-white p-5 shadow-sm border border-slate-200"
        >
          <div class="flex items-center gap-4">
            <div :class="['h-12 w-12 rounded-2xl flex items-center justify-center text-xl text-white', summary.iconBg]">
              <i :class="summary.icon"></i>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ summary.label }}</p>
              <p class="mt-3 text-2xl font-semibold text-slate-900">{{ summary.value }}</p>
            </div>
          </div>
          <p class="mt-4 text-sm text-slate-500">{{ summary.subtitle }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold text-slate-900">Applications analytics</h2>
              <p class="mt-2 text-sm text-slate-500">Monthly performance overview</p>
            </div>
            <a href="#" class="text-sm font-semibold text-indigo-600 hover:underline">View all</a>
          </div>

          <div class="mt-8 overflow-hidden rounded-[28px] bg-slate-50 p-6">
            <div class="mb-6 flex items-center justify-between gap-4">
              <div>
                <p class="text-sm text-slate-500">Total applications</p>
                <p class="text-3xl font-semibold text-slate-900">245</p>
              </div>
              <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                +18% from last month
              </div>
            </div>

            <div class="relative h-72">
              <svg viewBox="0 0 700 300" class="h-full w-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4f46e5" />
                    <stop offset="100%" stop-color="#818cf8" stop-opacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M40 220 C120 180 200 160 280 130 C360 105 440 120 520 90 C600 70 660 85 700 60" fill="none" stroke="#4f46e5" stroke-width="5" stroke-linecap="round" />
                <path d="M40 220 C120 180 200 160 280 130 C360 105 440 120 520 90 C600 70 660 85 700 60 L700 300 L40 300 Z" fill="url(#lineGradient)" opacity="0.7" />
                <circle cx="40" cy="220" r="8" fill="#4f46e5" />
                <circle cx="280" cy="130" r="8" fill="#4f46e5" />
                <circle cx="520" cy="90" r="8" fill="#4f46e5" />
                <circle cx="700" cy="60" r="8" fill="#4f46e5" />
              </svg>
            </div>
          </div>
        </section>

        <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold text-slate-900">Upcoming interviews</h2>
              <p class="mt-2 text-sm text-slate-500">View calendar for all meetings</p>
            </div>
            <a href="#" class="text-sm font-semibold text-indigo-600 hover:underline">View Calendar</a>
          </div>

          <div class="mt-6 space-y-4">
            <div v-for="interview in interviews" :key="interview.title + interview.date" class="rounded-[28px] border border-slate-200 p-4 hover:shadow-lg transition">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-base font-semibold text-slate-900">{{ interview.title }}</p>
                  <p class="text-sm text-slate-500">{{ interview.company }}</p>
                </div>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {{ interview.time }}
                </span>
              </div>
              <div class="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{{ interview.date }}</span>
                <span :class="['rounded-full px-3 py-1 text-xs font-semibold', interview.statusBg]">{{ interview.status }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentJobs = ref([
  {
    title: 'UI/UX Designer',
    type: 'Full Time',
    location: 'Remote',
    applicants: 32,
    status: 'Active',
    posted: 'Posted May 28, 2024',
  },
  {
    title: 'Backend Developer (Node.js)',
    type: 'Full Time',
    location: 'Phnom Penh',
    applicants: 18,
    status: 'Active',
    posted: 'Posted May 25, 2024',
  },
  {
    title: 'Marketing Specialist',
    type: 'Full Time',
    location: 'Phnom Penh',
    applicants: 24,
    status: 'In Review',
    posted: 'Posted May 20, 2024',
  },
  {
    title: 'Product Manager',
    type: 'Full Time',
    location: 'Remote',
    applicants: 12,
    status: 'Draft',
    posted: 'Posted May 18, 2024',
  },
])

const recentApplications = ref([
  {
    name: 'Sophie Nguyen',
    role: 'UI/UX Designer',
    status: 'New',
    time: '21 ago',
    image: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Dara Sok',
    role: 'UI/UX Designer',
    status: 'New',
    time: '5h ago',
    image: 'https://i.pravatar.cc/150?img=31',
  },
  {
    name: 'Pich Chenda',
    role: 'Marketing Specialist',
    status: 'Shortlisted',
    time: '1d ago',
    image: 'https://i.pravatar.cc/150?img=30',
  },
  {
    name: 'Vannak Long',
    role: 'Backend Developer',
    status: 'In Review',
    time: '1d ago',
    image: 'https://i.pravatar.cc/150?img=29',
  },
])

const summaries = ref([
  {
    label: 'Total Jobs',
    value: 12,
    subtitle: '2 from last month',
    icon: 'pi pi-briefcase',
    iconBg: 'bg-indigo-600',
  },
  {
    label: 'Total Applications',
    value: 245,
    subtitle: '18% from last month',
    icon: 'pi pi-file',
    iconBg: 'bg-purple-600',
  },
  {
    label: 'In Review',
    value: 68,
    subtitle: '12% from last month',
    icon: 'pi pi-search',
    iconBg: 'bg-emerald-600',
  },
  {
    label: 'Interviews Scheduled',
    value: 24,
    subtitle: '9% from last month',
    icon: 'pi pi-calendar',
    iconBg: 'bg-orange-500',
  },
  {
    label: 'Hired',
    value: 7,
    subtitle: '6% from last month',
    icon: 'pi pi-user-check',
    iconBg: 'bg-sky-600',
  },
])

const interviews = ref([
  {
    title: 'UI/UX Designer Interview',
    company: 'Sophie Nguyen',
    date: 'May 31, 2024',
    time: '10:00 AM',
    status: 'Upcoming',
    statusBg: 'bg-slate-100 text-slate-700',
  },
  {
    title: 'Backend Developer Interview',
    company: 'Vannak Long',
    date: 'Jun 1, 2024',
    time: '02:00 PM',
    status: 'Upcoming',
    statusBg: 'bg-slate-100 text-slate-700',
  },
  {
    title: 'Product Manager Interview',
    company: 'Rathna Kim',
    date: 'Jun 3, 2024',
    time: '11:00 AM',
    status: 'Upcoming',
    statusBg: 'bg-slate-100 text-slate-700',
  },
])
</script>
