<template>
  <div class="space-y-3">
    <div
      v-for="application in rejectedApplications"
      :key="application.email"
      @click="select(application)"
      class="flex cursor-pointer flex-col gap-4 rounded-[24px] border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100">
          <img :src="application.avatar" alt="candidate" class="h-12 w-12 rounded-2xl object-cover" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <p class="text-base font-semibold text-slate-900">{{ application.name }}</p>
            <span class="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-700">
              Rejected
            </span>
          </div>
          <p class="text-sm text-slate-500">{{ application.email }}</p>
          <p class="text-sm text-slate-500">{{ application.location }}</p>
        </div>
      </div>

      <div class="flex flex-col items-start gap-2 text-sm text-slate-500 sm:items-end">
        <span class="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Closed
        </span>
        <p class="font-medium text-slate-900">Rejected {{ application.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const rejectedApplications = [
  {
    name: 'Sok Lim',
    email: 'sok.lim@example.com',
    location: 'Phnom Penh, Cambodia',
    date: 'Jun 9, 2024',
    avatar: 'https://i.pravatar.cc/150?img=22',
    title: 'Visual Designer',
    summary:
      'Designer with a strong portfolio, but the role requirements were more aligned with motion and brand experience work.',
    skills: ['Illustration', 'Branding', 'UI'],
  },
  {
    name: 'Channy Keo',
    email: 'channy.keo@example.com',
    location: 'Battambang, Cambodia',
    date: 'Jun 8, 2024',
    avatar: 'https://i.pravatar.cc/150?img=23',
    title: 'Marketing Specialist',
    summary:
      'Candidate had strong communication skills but did not meet the minimum technical requirements for the position.',
    skills: ['Marketing', 'Content', 'Communication'],
  },
]

const emit = defineEmits(['select'])

function select(application) {
  emit('select', application)
}
</script>
