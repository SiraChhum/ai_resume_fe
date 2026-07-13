<template>
  <div class="space-y-3">
    <div
      v-for="item in interviews"
      :key="item.email"
      @click="select(item)"
      class="cursor-pointer flex items-center gap-4 rounded-[18px] border border-slate-200 bg-white p-4 transition hover:shadow-lg"
    >
      <div class="flex-1">
        <p class="text-base font-semibold text-slate-900">{{ item.name }}</p>
        <p class="text-sm text-slate-500">{{ item.title }}</p>
      </div>
      <div class="text-right">
        <div class="mb-2">
          <span class="text-xs font-semibold rounded-full px-3 py-1 bg-indigo-50 text-indigo-700">{{ item.status }}</span>
        </div>
        <p class="text-sm font-semibold text-slate-700">{{ item.time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const interviews = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    title: 'Senior Product Designer',
    time: '10:00 AM',
    status: 'INTERVIEWING',
  },
  {
    name: 'Marcus Kroll',
    email: 'marcus.kroll@example.com',
    title: 'Lead Frontend Engineer',
    time: '11:30 AM',
    status: 'SCHEDULED',
  },
  {
    name: 'David Chen',
    email: 'david.chen@example.com',
    title: 'Backend Architect',
    time: '02:00 PM',
    status: 'SCHEDULED',
  },
  {
    name: 'Elena Lora',
    email: 'elena.lora@example.com',
    title: 'UX Researcher',
    time: 'Completed',
    status: 'COMPLETED',
  },
]

const emit = defineEmits(['select'])

function select(item) {
  emit('select', item)
}
</script>

<style scoped></style>
