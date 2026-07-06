<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h1 class="text-3xl font-semibold">Employer Admin</h1>
          <p class="text-sm text-slate-500">Welcome back, Admin!</p>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div
          v-for="card in stats"
          :key="card.title"
          class="rounded-3xl p-6 shadow-lg border border-slate-200 bg-white"
        >
          <div class="flex items-center gap-4">
            <div :class="['h-14 w-14 rounded-3xl flex items-center justify-center', card.bg]">
              <i :class="card.icon" class="text-2xl text-white"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">{{ card.title }}</p>
              <p class="mt-3 text-3xl font-semibold">{{ card.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <section class="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-xl font-semibold">Applications</h2>
            </div>
            <a href="#" class="text-sm font-medium text-indigo-600 hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            <div v-for="item in applications" :key="item.name" class="flex items-center gap-3 rounded-3xl border border-slate-200 p-4">
              <img :src="item.avatar" alt="avatar" class="h-10 w-10 rounded-full object-cover" />
              <div class="flex-1">
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-sm text-slate-500">{{ item.role }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
          <div class="mb-5">
            <h2 class="text-xl font-semibold">Applications Status</h2>
          </div>

          <div class="flex flex-col items-center gap-6">
            <div class="relative h-72 w-72">
              <svg viewBox="0 0 160 160" class="h-full w-full">
                <circle cx="80" cy="80" r="60" fill="#ebeef5" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#4f46e5" stroke-width="28" stroke-dasharray="377" stroke-dashoffset="377" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#f97316" stroke-width="28" stroke-dasharray="113 377" stroke-dashoffset="264" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#22c55e" stroke-width="28" stroke-dasharray="60 377" stroke-dashoffset="201" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" stroke-width="28" stroke-dasharray="75 377" stroke-dashoffset="141" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="30" fill="white" />
              </svg>
            </div>
            <div class="w-full space-y-3">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-sm text-slate-600"><span class="h-2.5 w-2.5 rounded-full bg-slate-900"></span> New</span>
                <span class="font-semibold">60 (48%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-sm text-slate-600"><span class="h-2.5 w-2.5 rounded-full bg-orange-400"></span> Screened</span>
                <span class="font-semibold">35 (28%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-sm text-slate-600"><span class="h-2.5 w-2.5 rounded-full bg-blue-400"></span> Shortlisted</span>
                <span class="font-semibold">18 (16%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-sm text-slate-600"><span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span> Interview</span>
                <span class="font-semibold">11 (8%)</span>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-3xl bg-white shadow-lg border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h2 class="text-xl font-semibold">Upcoming Interviews</h2>
            </div>
            <a href="#" class="text-sm font-medium text-indigo-600 hover:underline">View All</a>
          </div>
          <div class="space-y-3">
            <div v-for="event in interviews" :key="event.name + event.date" class="flex items-center justify-between rounded-3xl border border-slate-200 p-4">
              <div class="flex items-center gap-3">
                <img :src="event.avatar" alt="avatar" class="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p class="font-semibold">{{ event.name }}</p>
                  <p class="text-sm text-slate-500">{{ event.role }}</p>
                </div>
              </div>
              <div class="text-right text-sm text-slate-500">
                <p>{{ event.date }}</p>
                <p>{{ event.time }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <button class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
          Shortlist Candidates
        </button>
        <button class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
          Schedule Interview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { title: 'Total Application', value: 121, bg: 'bg-violet-500', icon: 'pi pi-file' },
  { title: 'Shortlists', value: 39, bg: 'bg-orange-400', icon: 'pi pi-list' },
  { title: 'Interview', value: 20, bg: 'bg-emerald-400', icon: 'pi pi-calendar' },
  { title: 'Offer', value: 8, bg: 'bg-sky-500', icon: 'pi pi-envelope' },
  { title: 'Hired', value: 15, bg: 'bg-orange-500', icon: 'pi pi-lock' },
])

const applications = ref([
  { name: 'Heang Sovantha', role: 'Front-End Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Yi Seakly', role: 'Software Developer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Chhum Sira', role: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Norn Lyuocy', role: 'IT Support Application', avatar: 'https://i.pravatar.cc/150?img=16' },
  { name: 'Chhum Sira', role: 'HR Department', avatar: 'https://i.pravatar.cc/150?img=18' },
  { name: 'Norn Lyuocy', role: 'Sell Executive', avatar: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Chhum Sira', role: 'Back-End Developer', avatar: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Norn Lyuocy', role: 'Technical Support', avatar: 'https://i.pravatar.cc/150?img=24' },
])

const interviews = ref([
  { name: 'Heang Sovantha', role: 'Front-End Developer', date: 'Jan 29, 2026', time: '10:00 AM', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Yi Seakly', role: 'Software Developer', date: 'Feb 28, 2026', time: '11:00 AM', avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Chhum Sira', role: 'UX/UI Designer', date: 'Mar 02, 2026', time: '9:00 AM', avatar: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Norn Lyuocy', role: 'IT Support Application', date: 'May 28, 2026', time: '8:00 AM', avatar: 'https://i.pravatar.cc/150?img=16' },
])
</script>
