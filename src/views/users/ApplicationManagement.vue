<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- ===========================
TOP CARDS
=========================== -->

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div v-for="card in cards" :key="card.title" class="bg-white rounded-xl shadow-md p-5">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              :class="card.bg"
            >
              <component :is="card.icon" class="w-6 h-6" />
            </div>

            <div>
              <p class="text-sm text-gray-600">
                {{ card.title }}
              </p>

              <h1 class="text-5xl font-light mt-2">
                {{ card.value }}
              </h1>

              <p class="text-sm mt-3" :class="card.text">
                {{ card.footer }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== -->

      <div class="bg-white rounded-2xl shadow-lg mt-6">
        <!-- Tabs -->

        <div class="flex flex-wrap items-center justify-between border-b px-5 py-4">
          <div class="flex gap-6">
            <button v-for="tab in tabs" :key="tab" class="text-gray-700 hover:text-indigo-600">
              {{ tab }}
            </button>
          </div>

          <div class="flex gap-3">
            <div class="relative">
              <input
                class="border border-indigo-500 rounded-full pl-10 pr-4 py-2 w-72 outline-none"
                placeholder="Search Application"
              />

              <svg
                class="absolute left-3 top-3 w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              class="border border-indigo-500 text-indigo-700 rounded-full px-5 flex items-center gap-2"
            >
              Filter
            </button>
          </div>
        </div>

        <!-- ===================== -->

        <div class="p-4">
          <div class="border rounded-xl overflow-hidden">
            <table class="w-full">
              <thead class="bg-white">
                <tr class="border-b text-left text-gray-600 text-sm">
                  <th class="p-4">Job/Company</th>

                  <th>Applied On</th>

                  <th>Status</th>

                  <th>Next Step</th>

                  <th class="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="job in jobs" :key="job.id" class="border-b hover:bg-gray-50">
                  <td class="p-4">
                    <div class="flex gap-4">
                      <img :src="job.logo" class="w-20 h-16 rounded" />

                      <div>
                        <h2 class="text-xl">
                          {{ job.title }}
                        </h2>

                        <p class="text-sm text-gray-500">
                          {{ job.company }}
                        </p>

                        <div class="text-xs text-gray-400 mt-2">
                          {{ job.location }}

                          •

                          {{ job.type }}

                          • Hybrid
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {{ job.date }}
                  </td>

                  <td>
                    <span class="px-4 py-2 rounded-md text-sm" :class="job.statusClass">
                      {{ job.status }}
                    </span>
                  </td>

                  <td>
                    <div class="text-sm">expected feedback</div>

                    <div>30 May 2025</div>
                  </td>

                  <td>
                    <div class="flex justify-center gap-3">
                      <button class="border border-indigo-600 rounded-lg px-5 py-2 text-indigo-600">
                        View Details
                      </button>

                      <button class="bg-indigo-600 text-white rounded px-3">⋮</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- pagination -->

        <div class="flex justify-between items-center px-6 py-6">
          <div class="flex gap-3 items-center">
            <span> row per page : </span>

            <select class="border rounded px-3 py-1">
              <option>5</option>

              <option>10</option>
            </select>
          </div>

          <div class="flex gap-3">
            <button class="w-10 h-10 bg-gray-200 rounded-lg">«</button>

            <button class="w-10 h-10 bg-gray-300 rounded-lg">1</button>

            <button class="w-10 h-10 bg-gray-200 rounded-lg">2</button>

            <button class="w-10 h-10 bg-gray-200 rounded-lg">3</button>

            <button class="w-10 h-10 bg-gray-200 rounded-lg">»</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { Briefcase, Send, Eye, FileText, BadgeCheck } from 'lucide-vue-next'

const tabs = ['All applications', 'Applied', 'Underview', 'Interview', 'Offer', 'Rejected']

const cards = ref([
  {
    title: 'total Applications',
    value: 18,
    footer: 'All times',
    bg: 'bg-blue-500',
    text: 'text-gray-500',
    icon: Briefcase,
  },

  {
    title: 'total Applications',
    value: 18,
    footer: '12% this month',
    bg: 'bg-green-300',
    text: 'text-green-500',
    icon: Send,
  },

  {
    title: 'total Applications',
    value: 18,
    footer: '40% of total',
    bg: 'bg-orange-300',
    text: 'text-orange-500',
    icon: Eye,
  },

  {
    title: 'total Applications',
    value: 18,
    footer: '20% of total',
    bg: 'bg-pink-300',
    text: 'text-pink-500',
    icon: FileText,
  },

  {
    title: 'total Applications',
    value: 18,
    footer: '30% of total',
    bg: 'bg-green-300',
    text: 'text-green-500',
    icon: BadgeCheck,
  },
])

const jobs = ref([
  {
    id: 1,
    title: 'IT Support Application',
    company: 'ABA Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    date: '25 May 2025',
    status: 'Under review',
    statusClass: 'bg-orange-100 text-orange-600',
    logo: 'https://cambodia-is-happiness.com/wp-content/uploads/2025/06/ABA-bank-logo-768x768.jpg.webp',
  },
  {
    id: 2,
    title: 'Senior Full Stack Developer',
    company: 'ABA Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    date: '25 May 2025',
    status: 'Interview',
    statusClass: 'bg-indigo-100 text-indigo-600',
    logo: 'https://cambodia-is-happiness.com/wp-content/uploads/2025/06/ABA-bank-logo-768x768.jpg.webp',
  },
  {
    id: 3,
    title: 'Frontend Engineer (React.js)',
    company: 'ACLEDA Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    date: '25 May 2025',
    status: 'Offered',
    statusClass: 'bg-green-100 text-green-600',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjtoPHu4Wj8CiQMaPgy-HJyEDZAhzVgIyNG9QgTLSqiDrtbMG_sxM12TCj&s=10',
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'Cellcard',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    date: '25 May 2025',
    status: 'Applied',
    statusClass: 'bg-blue-100 text-blue-600',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TAhifBRjglx8Q67MYpdYQ3o6scHfa0lwoKtYlRvsF_k0Uu7AWC6uf6dH&s=10',
  },
  {
    id: 5,
    title: 'Backend Developer (Node.js)',
    company: 'Wing Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    date: '25 May 2025',
    status: 'Rejected',
    statusClass: 'bg-red-100 text-red-600',
    logo: 'https://www.vivathgolden-financeplc.com.kh/uploads/partner_photo_1709190768.png',
  },
])
</script>
