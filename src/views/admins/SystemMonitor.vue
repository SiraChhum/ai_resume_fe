<template>
  <div
    class="bg-[#F8F9FD] text-[#1E293B] min-h-0 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
  >
    <div class="flex p-4 gap-4 justify-end">
      <button
        class="bg-[#4452FE] text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer shadow-[0_4px_10px_rgba(68,82,254,0.2)] flex items-center gap-2"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i> Export PDF
      </button>
      <button
        class="bg-[#4452FE] text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer shadow-[0_4px_10px_rgba(68,82,254,0.2)] flex items-center gap-2"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i> New Job Post
      </button>
    </div>
    <main class="max-w-[1400px] mx-auto p-6 flex flex-col gap-6">
      <!-- Top Action & Stats Bar -->
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div class="flex gap-4 flex-grow flex-wrap md:flex-nowrap">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white px-5 py-3 rounded-xl flex items-center gap-4 flex-1 min-w-[180px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg">
              <component :is="stat.icon" class="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span class="text-xs text-[#64748B] block">{{ stat.label }}</span>
              <strong class="text-lg">{{ stat.value }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Split Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <!-- Left Side: Recommended Jobs -->
        <section class="bg-white rounded-xl p-5 pt-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div class="">
            <p class="font-bold p-4">System Activity Report</p>
            <BarChart />
          </div>

          <div class="">
            <p class="font-bold p-4">System Activity Report</p>
            <LineChart />
          </div>
        </section>

        <!-- Right Side: Analytics -->
        <section class="shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <!-- Header -->
            <div class="px-8 py-7 border-b border-slate-200">
              <h2 class="text-4xl font-serif font-semibold text-slate-900">Recent Activity</h2>
            </div>

            <!-- Activity List -->
            <div>
              <div
                v-for="(activity, index) in activities"
                :key="index"
                class="flex items-start gap-6 px-8 py-10 border-b border-slate-200 last:border-b-0"
              >
                <!-- Icon -->
                <div
                  :class="activity.bg"
                  class="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                >
                  <component :is="activity.icon" :class="activity.color" class="w-7 h-7" />
                </div>

                <!-- Content -->
                <div>
                  <h3 class="text-2xl font-semibold text-slate-900">
                    {{ activity.title }}
                  </h3>

                  <p class="mt-1 text-xl text-slate-600 leading-relaxed">
                    {{ activity.description }}
                  </p>

                  <p class="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400 font-medium">
                    {{ activity.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Bottom Section: Tracker -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Briefcase, StickyNote, ArrowLeftRight } from 'lucide-vue-next'
import BarChart from '@/components/charts/BarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { UserPlus, BadgeCheck, TriangleAlert } from 'lucide-vue-next'

const activities = [
  {
    title: 'New User Registration',
    description: 'Sarah Jenkins registered from London, UK.',
    time: '2 MINUTES AGO',
    icon: UserPlus,
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    title: 'Job Post Approved',
    description: 'Senior Cloud Architect for Global Systems Inc.',
    time: '15 MINUTES AGO',
    icon: BadgeCheck,
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    title: 'Flagged Applicant',
    description: 'Duplicate profile detected for ID #49281.',
    time: '1 HOUR AGO',
    icon: TriangleAlert,
    bg: 'bg-yellow-100',
    color: 'text-yellow-600',
  },
]

const stats = ref([
  {
    label: 'Total User',
    value: '20,055',
    icon: User,
    color: 'purple',
  },
  {
    label: 'Active Jobs',
    value: '10,055',
    icon: Briefcase,
    color: 'blue',
  },
  {
    label: 'Pending',
    value: 0,
    icon: StickyNote,
    color: 'green',
  },
  {
    label: 'Avg. Match Time',
    value: 0,
    icon: ArrowLeftRight,
    color: 'orange',
  },
])
</script>
