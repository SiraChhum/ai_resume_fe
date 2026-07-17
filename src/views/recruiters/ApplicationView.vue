<template>
  <div class="min-h-0 bg-slate-100 text-slate-900">
    <div class="mx-auto max-w-[1400px] space-y-6 p-6">
      <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Applications</p>
            <h1 class="mt-2 text-2xl font-bold text-slate-900">Candidate application board</h1>
            <p class="mt-1 text-sm text-slate-500">Review incoming applicants, shortlist strong profiles, and move them into interviews.</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Export List
            </button>
            <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              Schedule Review
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div class="flex items-center justify-between gap-3">
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

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Recent applications</h2>
              <p class="text-sm text-slate-500">Fast review queue for the current hiring round.</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                class="rounded-full px-3.5 py-1.5 text-sm font-semibold transition"
                :class="activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <div class="mt-5 space-y-4">
            <article
              v-for="application in filteredApplications"
              :key="application.id"
              class="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex gap-4">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-base font-bold text-indigo-700">
                    {{ application.avatar }}
                  </div>

                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-base font-semibold text-slate-900">{{ application.name }}</h3>
                      <span
                        class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        :class="statusClass(application.status)"
                      >
                        {{ application.status }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-slate-500">{{ application.role }} · {{ application.location }}</p>
                    <p class="mt-2 text-sm text-slate-600">{{ application.summary }}</p>
                  </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Match</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ application.match }}%</p>
                  </div>
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Applied</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ application.applied }}</p>
                  </div>
                  <div class="rounded-2xl bg-white p-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Score</p>
                    <p class="mt-1 text-lg font-bold text-slate-900">{{ application.score }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Queue health</h2>
              <p class="text-sm text-slate-500">Current candidate funnel for the week.</p>
            </div>

            <div class="mt-5 space-y-4">
              <div v-for="item in queueHealth" :key="item.label" class="space-y-2">
                <div class="flex items-center justify-between text-sm text-slate-600">
                  <span>{{ item.label }}</span>
                  <span class="font-semibold text-slate-900">{{ item.value }}</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div class="h-full rounded-full bg-indigo-600" :style="{ width: item.value }"></div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Review checklist</h2>
              <p class="text-sm text-slate-500">Keep the hiring process aligned and fast.</p>
            </div>

            <div class="mt-4 space-y-3">
              <div v-for="check in checklist" :key="check.title" class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">{{ check.title }}</p>
                    <p class="text-xs text-slate-500">{{ check.detail }}</p>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{{ check.state }}</span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Interview ready</h2>
            <p class="text-sm text-slate-500">Candidates prepared for the next selection step.</p>
          </div>
          <button class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
            View all interviewers
          </button>
        </div>

        <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="candidate in interviewReady" :key="candidate.name" class="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
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
                <span>Panel</span>
                <span class="font-semibold text-slate-900">{{ candidate.panel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Time</span>
                <span class="font-semibold text-slate-900">{{ candidate.time }}</span>
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

const tabs = ['All', 'New', 'Shortlisted', 'Interview']
const activeTab = ref('All')

const stats = [
  { label: 'Total applicants', value: '214', icon: 'pi pi-users', iconBg: 'bg-indigo-100 text-indigo-700' },
  { label: 'New today', value: '36', icon: 'pi pi-clock', iconBg: 'bg-emerald-100 text-emerald-700' },
  { label: 'Shortlisted', value: '48', icon: 'pi pi-check-circle', iconBg: 'bg-sky-100 text-sky-700' },
  { label: 'Interviews', value: '12', icon: 'pi pi-calendar', iconBg: 'bg-amber-100 text-amber-700' },
]

const applications = [
  {
    id: 1,
    avatar: 'SC',
    name: 'Sovannara Chea',
    role: 'Senior UI Designer',
    location: 'Remote · Cambodia',
    status: 'New',
    summary: 'Strong portfolio with an excellent eye for systems thinking and modern UX patterns.',
    match: 96,
    applied: 'Today',
    score: 'A+',
  },
  {
    id: 2,
    avatar: 'LS',
    name: 'Lina Sok',
    role: 'Frontend Engineer',
    location: 'Phnom Penh · Hybrid',
    status: 'Shortlisted',
    summary: 'Highly relevant Vue and TypeScript experience with a strong engineering background.',
    match: 92,
    applied: 'Yesterday',
    score: 'A',
  },
  {
    id: 3,
    avatar: 'RK',
    name: 'Rady Khun',
    role: 'Product Manager',
    location: 'Singapore · Hybrid',
    status: 'Interview',
    summary: 'Leadership-driven profile with measurable outcomes and clear roadmap ownership.',
    match: 89,
    applied: '2 days ago',
    score: 'B+',
  },
]

const filteredApplications = computed(() => {
  if (activeTab.value === 'All') return applications
  return applications.filter((app) => app.status === activeTab.value)
})

const queueHealth = [
  { label: 'Application intake', value: '88%' },
  { label: 'Resume screening', value: '74%' },
  { label: 'Interview scheduling', value: '59%' },
  { label: 'Offer readiness', value: '31%' },
]

const checklist = [
  { title: 'Portfolio review', detail: 'Ensure the design system examples are attached.', state: 'Ready' },
  { title: 'Technical screening', detail: 'Confirm the panel request is sent to the engineering team.', state: 'In progress' },
  { title: 'Candidate notes', detail: 'Document strengths, risk flags, and follow-up actions.', state: 'Ready' },
]

const interviewReady = [
  { name: 'Sovannara Chea', role: 'Senior UI Designer', avatar: 'SC', panel: 'Design + Hiring Manager', time: '09:30 AM' },
  { name: 'Lina Sok', role: 'Frontend Engineer', avatar: 'LS', panel: 'Engineering Panel', time: '11:00 AM' },
  { name: 'Rady Khun', role: 'Product Manager', avatar: 'RK', panel: 'Leadership Panel', time: '02:15 PM' },
  { name: 'Chenda Lim', role: 'Full-stack Developer', avatar: 'CL', panel: 'Engineering Lead', time: '04:00 PM' },
]

const statusClass = (status) => {
  switch (status) {
    case 'New':
      return 'bg-emerald-100 text-emerald-700'
    case 'Shortlisted':
      return 'bg-sky-100 text-sky-700'
    case 'Interview':
      return 'bg-amber-100 text-amber-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}
</script>
