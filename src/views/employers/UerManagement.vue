<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">User management</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Manage your team members</h1>
            <p class="mt-2 text-sm text-slate-500">Review roles, activity, and pending approvals in one place.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              + Add User
            </button>
          </div>
        </div>
      </section>

      <section class="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div :class="['flex h-12 w-12 items-center justify-center rounded-2xl text-lg text-white', stat.iconBg]">
                <i :class="stat.icon"></i>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ stat.label }}</p>
                <p class="mt-2 text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
              </div>
            </div>
            <p class="mt-4 text-sm text-slate-500">{{ stat.subtitle }}</p>
          </div>
        </div>

        <div class="rounded-[28px] border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.24em] text-slate-400">Quick access</p>
              <h2 class="mt-2 text-lg font-semibold">Recent actions</h2>
            </div>
            <button class="text-sm font-semibold text-indigo-300">View All</button>
          </div>
          <div class="mt-4 space-y-3">
            <div v-for="action in quickActions" :key="action.title" class="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-semibold">{{ action.title }}</p>
                <span :class="['rounded-full px-2.5 py-1 text-xs font-semibold', action.badgeClass]">{{ action.status }}</span>
              </div>
              <p class="mt-2 text-sm text-slate-300">{{ action.time }}</p>
            </div>
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
                selectedTab === tab
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              ]"
              @click="selectedTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <div class="relative">
              <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, role, or location"
                class="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none ring-0 focus:border-indigo-400"
              />
            </div>
            <button class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Filter
            </button>
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">User</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Role</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Last Active</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Department</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Location</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr v-for="user in filteredUsers" :key="user.id" class="transition hover:bg-slate-50">
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                      <img :src="user.avatar" :alt="user.name" class="h-9 w-9 rounded-xl object-cover" />
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900">{{ user.name }}</p>
                      <p class="text-sm text-slate-500">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ user.role }}</td>
                <td class="px-4 py-4">
                  <span :class="['rounded-full px-3 py-1 text-xs font-semibold', badgeClass(user.status)]">{{ user.status }}</span>
                </td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ user.lastActive }}</td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ user.department }}</td>
                <td class="px-4 py-4 text-sm text-slate-600">{{ user.location }}</td>
                <td class="px-4 py-4">
                  <button class="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Manage
                  </button>
                </td>
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

const tabs = ['All', 'Active', 'Pending', 'Blocked']
const selectedTab = ref('All')
const searchQuery = ref('')

const stats = ref([
  {
    label: 'Total users',
    value: '248',
    subtitle: 'Across all departments',
    icon: 'pi pi-users',
    iconBg: 'bg-indigo-600',
  },
  {
    label: 'Active now',
    value: '89',
    subtitle: 'Users online in the last 24h',
    icon: 'pi pi-check-circle',
    iconBg: 'bg-emerald-600',
  },
  {
    label: 'Pending review',
    value: '17',
    subtitle: 'Accounts awaiting approval',
    icon: 'pi pi-clock',
    iconBg: 'bg-amber-500',
  },
])

const quickActions = ref([
  {
    title: 'Approved onboarding',
    status: 'Completed',
    badgeClass: 'bg-emerald-500/20 text-emerald-300',
    time: '2 mins ago',
  },
  {
    title: 'Role updated',
    status: 'Pending',
    badgeClass: 'bg-amber-500/20 text-amber-300',
    time: '15 mins ago',
  },
  {
    title: 'Access request',
    status: 'New',
    badgeClass: 'bg-sky-500/20 text-sky-300',
    time: '1 hour ago',
  },
])

const users = ref([
  {
    id: 1,
    name: 'Sok Dara',
    email: 'sokdara@email.com',
    role: 'HR Manager',
    status: 'Active',
    lastActive: '2h ago',
    department: 'People Ops',
    location: 'Phnom Penh',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    name: 'Mina Chen',
    email: 'minachen@email.com',
    role: 'Recruiter',
    status: 'Pending',
    lastActive: '1d ago',
    department: 'Talent',
    location: 'Siem Reap',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 3,
    name: 'Vuthy Noun',
    email: 'vuthynoun@email.com',
    role: 'Employer',
    status: 'Active',
    lastActive: '5h ago',
    department: 'Operations',
    location: 'Remote',
    avatar: 'https://i.pravatar.cc/150?img=18',
  },
  {
    id: 4,
    name: 'Rina Lim',
    email: 'rinalim@email.com',
    role: 'Candidate',
    status: 'Blocked',
    lastActive: '3d ago',
    department: 'Support',
    location: 'Kampong Cham',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
])

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return users.value.filter((user) => {
    const matchesTab = selectedTab.value === 'All' || user.status === selectedTab.value
    const matchesSearch =
      !query ||
      `${user.name} ${user.email} ${user.role} ${user.department} ${user.location}`.toLowerCase().includes(query)

    return matchesTab && matchesSearch
  })
})

function badgeClass(status) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Blocked: 'bg-rose-50 text-rose-700',
  }

  return styles[status] || 'bg-slate-100 text-slate-700'
}
</script>
