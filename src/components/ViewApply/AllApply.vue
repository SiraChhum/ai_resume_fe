<template>
  <div
    v-for="application in filteredApplications"
    :key="application.email"
    class="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex items-center gap-4">
      <input
        type="radio"
        name="selectedCandidate"
        :value="application.email"
        v-model="selectedApplication"
        class="h-5 w-5 text-indigo-600"
      />
      <img :src="application.avatar" alt="candidate" class="h-14 w-14 rounded-2xl object-cover" />
      <div>
        <div class="flex items-center gap-2">
          <p class="text-base font-semibold text-slate-900">{{ application.name }}</p>
          <span
            v-if="application.tag"
            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >{{ application.tag }}</span
          >
        </div>
        <p class="text-sm text-slate-500">{{ application.email }}</p>
        <p class="text-sm text-slate-500">{{ application.location }}</p>
      </div>
    </div>

    <div class="flex flex-col items-start gap-2 text-sm text-slate-500 sm:items-end">
      <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
        >New</span
      >
      <p class="font-medium text-slate-900">Applied {{ application.date }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const applications = [
  {
    name: 'Sophie Nguyen',
    email: 'sophie.nguyen@example.com',
    location: 'Phnom Penh, Cambodia',
    date: 'May 29, 2024',
    tag: 'New',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    name: 'Dara Sok',
    email: 'dara.sok@example.com',
    location: 'Siem Reap, Cambodia',
    date: 'May 29, 2024',
    tag: 'New',
    avatar: 'https://i.pravatar.cc/150?img=31',
  },
  {
    name: 'Pich Chenda',
    email: 'chenda.pich@example.com',
    location: 'Battambang, Cambodia',
    date: 'May 28, 2024',
    tag: 'Shortlisted',
    avatar: 'https://i.pravatar.cc/150?img=30',
  },
  {
    name: 'Vannak Long',
    email: 'vannak.long@example.com',
    location: 'Phnom Penh, Cambodia',
    date: 'May 27, 2024',
    tag: 'Interview',
    avatar: 'https://i.pravatar.cc/150?img=29',
  },
]

const search = ref('')
const selectedApplication = ref(applications[0].email)

const filteredApplications = computed(() => {
  const keyword = search.value.toLowerCase()

  return applications.filter(
    (app) =>
      app.name.toLowerCase().includes(keyword) ||
      app.email.toLowerCase().includes(keyword) ||
      app.location.toLowerCase().includes(keyword),
  )
})
</script>
