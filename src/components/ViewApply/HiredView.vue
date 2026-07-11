<template>
  <div class="space-y-4">
    <div
      v-for="application in hiredApplications"
      :key="application.email"
      @click="select(application)"
      class="flex cursor-pointer flex-col gap-4 rounded-[28px] border border-emerald-200 bg-emerald-50/70 p-4 transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-4">
        <img :src="application.avatar" alt="candidate" class="h-14 w-14 rounded-2xl object-cover" />
        <div>
          <div class="flex items-center gap-2">
            <p class="text-base font-semibold text-slate-900">{{ application.name }}</p>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Hired</span>
          </div>
          <p class="text-sm text-slate-500">{{ application.email }}</p>
          <p class="text-sm text-slate-500">{{ application.location }}</p>
        </div>
      </div>

      <div class="flex flex-col items-start gap-2 text-sm text-slate-500 sm:items-end">
        <span class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Joined</span>
        <p class="font-medium text-slate-900">Accepted {{ application.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const hiredApplications = [
  {
    name: 'Nika Heng',
    email: 'nika.heng@example.com',
    location: 'Phnom Penh, Cambodia',
    date: 'Jun 12, 2024',
    avatar: 'https://i.pravatar.cc/150?img=24',
    title: 'Product Designer',
    summary:
      'Experienced product designer who blends user research, visual craft, and cross-functional collaboration to deliver polished digital products.',
    skills: ['UX Strategy', 'Figma', 'Design Systems', 'Leadership'],
  },
  {
    name: 'Lina Vuth',
    email: 'lina.vuth@example.com',
    location: 'Siem Reap, Cambodia',
    date: 'Jun 10, 2024',
    avatar: 'https://i.pravatar.cc/150?img=25',
    title: 'Frontend Developer',
    summary:
      'Frontend engineer focused on scalable Vue and modern web experiences with a strong eye for usability.',
    skills: ['Vue', 'Tailwind CSS', 'JavaScript', 'Accessibility'],
  },
]

const emit = defineEmits(['select'])

function select(application) {
  emit('select', application)
}
</script>
