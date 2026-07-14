<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Analytics</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">System Overview</h1>
            <p class="mt-2 text-sm text-slate-500">Review platform performance, hiring activity, and growth trends at a glance.</p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              <span class="inline-flex items-center gap-2">
                <i class="pi pi-download"></i>
                Export PDF
              </span>
            </button>
            <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              <span class="inline-flex items-center gap-2">
                <i class="pi pi-plus"></i>
                New Job Post
              </span>
            </button>
          </div>
        </div>

        <div class="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ stat.label }}</p>
                <p class="mt-2 text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
              </div>
              <div :class="['flex h-11 w-11 items-center justify-center rounded-2xl text-lg text-white', stat.iconBg]">
                <i :class="stat.icon"></i>
              </div>
            </div>
            <p class="mt-3 text-sm text-slate-500">{{ stat.subtitle }}</p>
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">System Activity Report</p>
              <h2 class="mt-2 text-lg font-semibold text-slate-900">Activity overview</h2>
            </div>
            <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 p-1">
              <button class="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">7D</button>
              <button class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">30D</button>
              <button class="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">90D</button>
            </div>
          </div>

          <div class="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
            <div class="flex items-end justify-between gap-3 h-52">
              <div class="flex w-full items-end gap-3">
                <div class="h-24 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-28 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-32 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-20 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-28 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-24 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
                <div class="h-34 w-full max-w-[38px] rounded-t-3xl bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[32px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Recent activity</p>
              <h2 class="mt-2 text-lg font-semibold">Latest updates</h2>
            </div>
          </div>
          <div class="mt-5 space-y-3">
            <div v-for="item in highlights" :key="item.title" class="flex items-start gap-3 rounded-2xl border border-slate-700 bg-white/5 p-4 backdrop-blur">
              <div :class="['mt-1 flex h-10 w-10 items-center justify-center rounded-full text-white', item.iconBg]">
                <i :class="item.icon"></i>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-white">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-300">{{ item.subtitle }}</p>
                <p class="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{{ item.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Conversion</p>
              <h2 class="mt-2 text-lg font-semibold text-slate-900">Recruitment funnel</h2>
            </div>
          </div>
          <div class="mt-5 space-y-4">
            <div v-for="item in funnel" :key="item.label">
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="text-slate-600">{{ item.label }}</span>
                <span class="font-semibold text-slate-900">{{ item.value }}</span>
              </div>
              <div class="h-2 rounded-full bg-slate-200">
                <div :class="['h-2 rounded-full', item.barClass]" :style="{ width: item.progress }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Activity</p>
              <h2 class="mt-2 text-lg font-semibold text-slate-900">Recent updates</h2>
            </div>
          </div>
          <div class="mt-5 space-y-3">
            <div v-for="update in updates" :key="update.title" class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div class="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {{ update.icon }}
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ update.title }}</p>
                <p class="mt-1 text-sm text-slate-500">{{ update.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Active users', value: '12.8K', subtitle: 'Logged in this month', icon: 'pi pi-users', iconBg: 'bg-indigo-600' },
  { label: 'Applications', value: '3.2K', subtitle: 'Submitted this week', icon: 'pi pi-file', iconBg: 'bg-emerald-600' },
  { label: 'Offer rate', value: '18.6%', subtitle: 'Conversion from screening', icon: 'pi pi-gift', iconBg: 'bg-sky-600' },
  { label: 'Retention', value: '92%', subtitle: 'Returning employers', icon: 'pi pi-chart-bar', iconBg: 'bg-amber-500' },
])

const highlights = ref([
  { title: 'New User Registration', subtitle: 'Sarah Jenkins registered from London, UK.', time: '2 minutes ago', icon: 'pi pi-user-plus', iconBg: 'bg-emerald-500' },
  { title: 'Job Post Approved', subtitle: 'Senior Cloud Architect for Global Systems Inc.', time: '15 minutes ago', icon: 'pi pi-check-circle', iconBg: 'bg-sky-500' },
  { title: 'Flagged Applicant', subtitle: 'Duplicate profile detected for ID #49281.', time: '1 hour ago', icon: 'pi pi-exclamation-triangle', iconBg: 'bg-amber-500' },
])

const funnel = ref([
  { label: 'Applied', value: '3,200', progress: '100%', barClass: 'bg-indigo-600' },
  { label: 'Screened', value: '1,560', progress: '78%', barClass: 'bg-sky-600' },
  { label: 'Interviewed', value: '540', progress: '56%', barClass: 'bg-amber-500' },
  { label: 'Offered', value: '128', progress: '32%', barClass: 'bg-emerald-600' },
])

const updates = ref([
  { title: 'New hiring report published', time: '10:15 AM • Weekly summary ready', icon: '↗' },
  { title: 'Employer dashboard refreshed', time: '09:40 AM • Metrics synced', icon: '✓' },
  { title: 'Candidate matching updated', time: '08:20 AM • 14 new rules applied', icon: '✦' },
])
</script>
