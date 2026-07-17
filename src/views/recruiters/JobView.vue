<template>
  <div class="min-h-0 bg-slate-100 text-slate-900">
    <div class="mx-auto max-w-[1400px] space-y-6 p-6">
      <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Recruiter Jobs</p>
            <h1 class="mt-2 text-2xl font-bold text-slate-900">Your hiring pipeline</h1>
            <p class="mt-1 text-sm text-slate-500">Track open roles, monitor applicants, and keep interviews moving.</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Export Report
            </button>
            <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              Post New Job
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{{ stat.label }}</p>
                <p class="mt-2 text-2xl font-bold text-slate-900">{{ stat.value }}</p>
              </div>
              <div class="flex h-11 w-11 items-center justify-center rounded-2xl" :class="stat.iconBg">
                <i :class="stat.icon" class="text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Active job posts</h2>
              <p class="text-sm text-slate-500">Review the latest openings and associated candidate demand.</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="activeTab = tab.value"
                class="rounded-full px-3.5 py-1.5 text-sm font-semibold transition"
                :class="activeTab === tab.value ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <div class="mt-5 space-y-4">
            <article
              v-for="job in filteredJobs"
              :key="job.id"
              class="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div class="flex gap-4">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-base font-bold text-indigo-700">
                    {{ job.logo }}
                  </div>

                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-base font-semibold text-slate-900">{{ job.title }}</h3>
                      <span
                        class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        :class="statusClass(job.status)"
                      >
                        {{ job.status }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-slate-500">{{ job.company }} · {{ job.location }}</p>
                    <div class="mt-3 flex flex-wrap gap-2">
                      <span
                        v-for="tag in job.tags"
                        :key="tag"
                        class="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Applicants</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ job.applicants }}</p>
                  </div>
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Interview</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ job.interviews }}</p>
                  </div>
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Score</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ job.score }}%</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Pipeline health</h2>
                <p class="text-sm text-slate-500">Top conversion signals for this week.</p>
              </div>
            </div>

            <div class="mt-5 space-y-4">
              <div v-for="item in pipeline" :key="item.label" class="space-y-2">
                <div class="flex items-center justify-between text-sm text-slate-600">
                  <span>{{ item.label }}</span>
                  <span class="font-semibold text-slate-900">{{ item.value }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div class="h-full rounded-full bg-indigo-600" :style="{ width: item.value + '%' }"></div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Upcoming interviews</h2>
                <p class="text-sm text-slate-500">Your next scheduled conversations.</p>
              </div>
            </div>

            <div class="mt-4 space-y-3">
              <div v-for="slot in interviewSlots" :key="slot.time" class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">{{ slot.candidate }}</p>
                    <p class="text-xs text-slate-500">{{ slot.role }} · {{ slot.type }}</p>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{{ slot.time }}</span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Candidate highlights</h2>
            <p class="text-sm text-slate-500">Strong profiles that deserve a fast follow-up.</p>
          </div>
          <button class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
            Review all candidates
          </button>
        </div>

        <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="candidate in candidates" :key="candidate.name" class="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-bold text-indigo-700">
                {{ candidate.avatar }}
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-900">{{ candidate.name }}</p>
                <p class="text-xs text-slate-500">{{ candidate.role }}</p>
              </div>
            </div>

            <div class="mt-4 space-y-2 text-sm text-slate-600">
              <div class="flex items-center justify-between">
                <span>Match score</span>
                <span class="font-semibold text-slate-900">{{ candidate.score }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Availability</span>
                <span class="font-semibold text-slate-900">{{ candidate.availability }}</span>
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

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'Open' },
  { label: 'Reviewing', value: 'Reviewing' },
  { label: 'Interviewing', value: 'Interviewing' },
]

const jobs = [
  {
    id: 1,
    logo: 'UI',
    title: 'Senior UI Designer',
    company: 'Northstar Studio',
    location: 'Remote · Full Time',
    status: 'Open',
    applicants: 38,
    interviews: 6,
    score: 92,
    tags: ['Figma', 'Design Systems', 'Remote'],
  },
  {
    id: 2,
    logo: 'FE',
    title: 'Frontend Engineer',
    company: 'Voyage Labs',
    location: 'Phnom Penh · Hybrid',
    status: 'Reviewing',
    applicants: 51,
    interviews: 12,
    score: 88,
    tags: ['Vue', 'TypeScript', 'UX'],
  },
  {
    id: 3,
    logo: 'PM',
    title: 'Product Manager',
    company: 'Astra Consulting',
    location: 'Singapore · Hybrid',
    status: 'Interviewing',
    applicants: 29,
    interviews: 4,
    score: 84,
    tags: ['Roadmap', 'Analytics', 'Leadership'],
  },
]

const stats = [
  { label: 'Total jobs', value: 18, icon: 'pi pi-briefcase', iconBg: 'bg-indigo-100 text-indigo-700' },
  { label: 'Open roles', value: 7, icon: 'pi pi-check-circle', iconBg: 'bg-emerald-100 text-emerald-700' },
  { label: 'Candidates', value: 214, icon: 'pi pi-users', iconBg: 'bg-sky-100 text-sky-700' },
  { label: 'Interviews', value: 29, icon: 'pi pi-calendar', iconBg: 'bg-amber-100 text-amber-700' },
]

const pipeline = [
  { label: 'Applications received', value: 86 },
  { label: 'Screening completed', value: 73 },
  { label: 'Interviews scheduled', value: 58 },
  { label: 'Offer readiness', value: 34 },
]

const interviewSlots = [
  { candidate: 'Sovannara Chea', role: 'Senior UI Designer', type: 'Portfolio review', time: '09:30 AM' },
  { candidate: 'Lina Sok', role: 'Frontend Engineer', type: 'Technical panel', time: '11:00 AM' },
  { candidate: 'Rady Khun', role: 'Product Manager', type: 'Culture fit', time: '02:15 PM' },
]

const candidates = [
  { name: 'Sovannara Chea', role: 'Senior UI Designer', avatar: 'SC', score: 96, availability: 'Immediate' },
  { name: 'Lina Sok', role: 'Frontend Engineer', avatar: 'LS', score: 93, availability: '2 weeks' },
  { name: 'Rady Khun', role: 'Product Manager', avatar: 'RK', score: 89, availability: '1 week' },
  { name: 'Chenda Lim', role: 'Full-stack Developer', avatar: 'CL', score: 87, availability: 'Immediate' },
]

const activeTab = ref('all')

const filteredJobs = computed(() => {
  if (activeTab.value === 'all') return jobs
  return jobs.filter((job) => job.status === activeTab.value)
})

const statusClass = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-emerald-100 text-emerald-700'
    case 'Reviewing':
      return 'bg-amber-100 text-amber-700'
    case 'Interviewing':
      return 'bg-sky-100 text-sky-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}
</script>
