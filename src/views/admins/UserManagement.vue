<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <section class="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 text-white shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Admin panel</p>
            <h1 class="mt-2 text-3xl font-semibold">User management</h1>
            <p class="mt-2 text-sm text-slate-300">Review account activity, access levels, and pending approvals across the platform.</p>
          </div>
          <button class="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
            + Add user
          </button>
        </div>
      </section>

      <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="stat in stats" :key="stat.label" class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
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
              <h2 class="mt-2 text-lg font-semibold">Pending approvals</h2>
            </div>
            <span class="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">6 New</span>
          </div>
          <div class="mt-4 space-y-3">
            <div v-for="item in pendingItems" :key="item.title" class="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-semibold">{{ item.title }}</p>
                <span :class="['rounded-full px-2.5 py-1 text-xs font-semibold', item.badgeClass]">{{ item.status }}</span>
              </div>
              <p class="mt-2 text-sm text-slate-300">{{ item.time }}</p>
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
                placeholder="Search by name, email, role"
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
    value: '1,248',
    subtitle: 'Registered accounts',
    icon: 'pi pi-users',
    iconBg: 'bg-indigo-600',
  },
  {
    label: 'Active today',
    value: '324',
    subtitle: 'Users logged in this day',
    icon: 'pi pi-check-circle',
    iconBg: 'bg-emerald-600',
  },
  {
    label: 'Pending approval',
    value: '18',
    subtitle: 'Awaiting admin review',
    icon: 'pi pi-clock',
    iconBg: 'bg-amber-500',
  },
])

const pendingItems = ref([
  {
    title: 'New recruiter onboarding',
    status: 'Pending',
    badgeClass: 'bg-amber-500/20 text-amber-300',
    time: '12 mins ago',
  },
  {
    title: 'Employer verification request',
    status: 'Review',
    badgeClass: 'bg-sky-500/20 text-sky-300',
    time: '35 mins ago',
  },
  {
    title: 'Account recovery follow-up',
    status: 'New',
    badgeClass: 'bg-rose-500/20 text-rose-300',
    time: '1 hour ago',
  },
])

const users = ref([
  {
    id: 1,
    name: 'Sok Dara',
    email: 'sokdara@email.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2h ago',
    department: 'Operations',
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
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 3,
    name: 'Vuthy Noun',
    email: 'vuthynoun@email.com',
    role: 'Employer',
    status: 'Active',
    lastActive: '5h ago',
    department: 'Support',
    avatar: 'https://i.pravatar.cc/150?img=18',
  },
  {
    id: 4,
    name: 'Rina Lim',
    email: 'rinalim@email.com',
    role: 'Candidate',
    status: 'Blocked',
    lastActive: '3d ago',
    department: 'Compliance',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
])

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return users.value.filter((user) => {
    const matchesTab = selectedTab.value === 'All' || user.status === selectedTab.value
    const matchesSearch =
      !query ||
      `${user.name} ${user.email} ${user.role} ${user.department}`.toLowerCase().includes(query)

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
