<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin workflow</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Application management</h1>
            <p class="mt-2 text-sm text-slate-500">Monitor applications, track hiring stages, and review candidate progress across all roles.</p>
          </div>
          <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            + Export report
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

      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
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
              placeholder="Search candidate or job"
              class="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Candidate</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Role</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stage</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Applied</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Score</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr v-for="application in filteredApplications" :key="application.id" class="transition hover:bg-slate-50">
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
                      {{ application.initials }}
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900">{{ application.name }}</p>
                      <p class="text-sm text-slate-500">{{ application.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ application.role }}</td>
                <td class="px-4 py-4">
                  <span :class="['rounded-full px-3 py-1 text-xs font-semibold', badgeClass(application.stage)]">{{ application.stage }}</span>
                </td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ application.applied }}</td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ application.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const tabs = ['All', 'Screening', 'Interview', 'Offer', 'Rejected']
const selectedTab = ref('All')
const searchQuery = ref('')

const stats = ref([
  {
    label: 'Applications',
    value: '1,284',
    subtitle: 'Submitted this month',
    icon: 'pi pi-file',
    iconBg: 'bg-indigo-600',
  },
  {
    label: 'Shortlisted',
    value: '218',
    subtitle: 'Qualified for next steps',
    icon: 'pi pi-check-circle',
    iconBg: 'bg-emerald-600',
  },
  {
    label: 'Interviewing',
    value: '54',
    subtitle: 'Scheduled this week',
    icon: 'pi pi-users',
    iconBg: 'bg-sky-600',
  },
  {
    label: 'Offers',
    value: '12',
    subtitle: 'Awaiting response',
    icon: 'pi pi-gift',
    iconBg: 'bg-amber-500',
  },
])

const applications = ref([
  {
    id: 1,
    name: 'Sok Dara',
    email: 'sokdara@email.com',
    initials: 'SD',
    role: 'Senior Frontend Engineer',
    stage: 'Screening',
    applied: '2h ago',
    score: '92%',
  },
  {
    id: 2,
    name: 'Mina Chen',
    email: 'minachen@email.com',
    initials: 'MC',
    role: 'Product Designer',
    stage: 'Interview',
    applied: '5h ago',
    score: '88%',
  },
  {
    id: 3,
    name: 'Vuthy Noun',
    email: 'vuthynoun@email.com',
    initials: 'VN',
    role: 'Data Analyst',
    stage: 'Offer',
    applied: '1d ago',
    score: '95%',
  },
  {
    id: 4,
    name: 'Rina Lim',
    email: 'rinalim@email.com',
    initials: 'RL',
    role: 'Operations Manager',
    stage: 'Rejected',
    applied: '2d ago',
    score: '74%',
  },
])

const filteredApplications = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return applications.value.filter((application) => {
    const matchesTab = selectedTab.value === 'All' || application.stage === selectedTab.value
    const matchesSearch =
      !query ||
      `${application.name} ${application.email} ${application.role} ${application.stage}`.toLowerCase().includes(query)

    return matchesTab && matchesSearch
  })
})

function badgeClass(stage) {
  const styles = {
    Screening: 'bg-sky-50 text-sky-700',
    Interview: 'bg-amber-50 text-amber-700',
    Offer: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-rose-50 text-rose-700',
  }

  return styles[stage] || 'bg-slate-100 text-slate-700'
}
</script>
