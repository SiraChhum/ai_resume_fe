<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin workspace</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Job management</h1>
            <p class="mt-2 text-sm text-slate-500">Track job postings, review candidates, and manage hiring progress across all openings.</p>
          </div>
          <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            + Create job
          </button>
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
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in tabs"
                :key="tab"
                type="button"
                :class="[
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  selectedTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                ]"
                @click="selectedTab = tab"
              >
                {{ tab }}
              </button>
            </div>

            <div class="relative w-full max-w-sm">
              <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search jobs, company, location"
                class="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div class="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Job</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Location</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Applicants</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Deadline</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white">
                <tr v-for="job in filteredJobs" :key="job.id" class="transition hover:bg-slate-50">
                  <td class="px-4 py-4">
                    <div>
                      <p class="font-semibold text-slate-900">{{ job.title }}</p>
                      <p class="mt-1 text-sm text-slate-500">{{ job.company }}</p>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-slate-600">{{ job.location }}</td>
                  <td class="px-4 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-semibold', badgeClass(job.status)]">{{ job.status }}</span>
                  </td>
                  <td class="px-4 py-4 text-sm text-slate-600">{{ job.applicants }}</td>
                  <td class="px-4 py-4 text-sm text-slate-600">{{ job.deadline }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-6">
          <div class="rounded-[32px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Priority review</p>
                <h2 class="mt-2 text-lg font-semibold">Recruiting pipeline</h2>
              </div>
              <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">On track</span>
            </div>
            <div class="mt-5 space-y-3">
              <div v-for="item in reviewItems" :key="item.title" class="rounded-2xl bg-white/10 p-3 backdrop-blur">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold">{{ item.title }}</p>
                  <span class="text-xs text-slate-300">{{ item.count }}</span>
                </div>
                <p class="mt-2 text-sm text-slate-300">{{ item.subtitle }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-slate-400">This week</p>
                <h2 class="mt-2 text-lg font-semibold text-slate-900">Upcoming action</h2>
              </div>
            </div>
            <div class="mt-5 space-y-3">
              <div v-for="task in tasks" :key="task.title" class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold text-slate-800">{{ task.title }}</p>
                  <span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{{ task.tag }}</span>
                </div>
                <p class="mt-2 text-sm text-slate-500">{{ task.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tabs = ['All', 'Active', 'Draft', 'Closed']
const selectedTab = ref('All')
const searchQuery = ref('')

const stats = ref([
  {
    label: 'Total jobs',
    value: '48',
    subtitle: 'Open and archived postings',
    icon: 'pi pi-briefcase',
    iconBg: 'bg-indigo-600',
  },
  {
    label: 'Active now',
    value: '24',
    subtitle: 'Roles currently recruiting',
    icon: 'pi pi-check-circle',
    iconBg: 'bg-emerald-600',
  },
  {
    label: 'Interviews',
    value: '16',
    subtitle: 'Scheduled this week',
    icon: 'pi pi-calendar',
    iconBg: 'bg-sky-600',
  },
  {
    label: 'Closed',
    value: '8',
    subtitle: 'Completed or paused roles',
    icon: 'pi pi-lock',
    iconBg: 'bg-amber-500',
  },
])

const reviewItems = ref([
  { title: 'Senior Frontend Engineer', count: '12 applicants', subtitle: 'Review screening stage' },
  { title: 'Product Designer', count: '8 applicants', subtitle: 'Interview panel booked' },
  { title: 'Operations Manager', count: '4 applicants', subtitle: 'Final decision pending' },
])

const tasks = ref([
  { title: 'Finalize shortlist', tag: 'Today', time: '2:30 PM • Review 5 candidates' },
  { title: 'Post updated JD', tag: 'Tomorrow', time: '10:00 AM • Marketing team' },
  { title: 'Interview feedback', tag: 'Friday', time: '4:00 PM • Hiring panel sync' },
])

const jobs = ref([
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Northstar Labs',
    location: 'Phnom Penh',
    status: 'Active',
    applicants: '24',
    deadline: 'May 20',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Mekong Studio',
    location: 'Remote',
    status: 'Draft',
    applicants: '8',
    deadline: 'May 24',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Kampong Digital',
    location: 'Siem Reap',
    status: 'Active',
    applicants: '19',
    deadline: 'May 28',
  },
  {
    id: 4,
    title: 'Operations Manager',
    company: 'Bridge Group',
    location: 'Phnom Penh',
    status: 'Closed',
    applicants: '6',
    deadline: 'May 12',
  },
])

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return jobs.value.filter((job) => {
    const matchesTab = selectedTab.value === 'All' || job.status === selectedTab.value
    const matchesSearch =
      !query ||
      `${job.title} ${job.company} ${job.location} ${job.status}`.toLowerCase().includes(query)

    return matchesTab && matchesSearch
  })
})

function badgeClass(status) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700',
    Draft: 'bg-amber-50 text-amber-700',
    Closed: 'bg-slate-100 text-slate-700',
  }

  return styles[status] || 'bg-slate-100 text-slate-700'
}
</script>
