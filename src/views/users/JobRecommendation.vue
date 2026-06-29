<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto grid grid-cols-12 gap-5">
      <!-- LEFT -->
      <div class="col-span-12 lg:col-span-9">
        <!-- Banner -->
        <div
          class="bg-indigo-50 border border-indigo-300 rounded-xl px-5 py-4 flex items-center justify-between mb-5"
        >
          <div>
            <h2 class="text-indigo-600 font-bold text-xl">
              We Found 10 job that matched your profile
            </h2>
            <p class="text-gray-600">based on your skills, experience career goals</p>
          </div>

          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            Update Resume
          </button>
        </div>

        <!-- Search -->
        <div
          class="bg-white rounded-xl border border-indigo-200 p-5 mb-5 hover:shadow-lg transition"
        >
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <svg
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.2-5.2m2.2-5.3A7 7 0 115 5a7 7 0 0113.9 5.5z"
                />
              </svg>

              <input
                placeholder="Search jobs..."
                class="w-full border border-indigo-400 rounded-full pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button class="bg-indigo-600 text-white px-8 rounded-lg flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 5h16l-6 7v6l-4-2v-4z" />
              </svg>

              Filter
            </button>
          </div>
        </div>

        <!-- Jobs -->
        <div
          v-for="job in jobs"
          :key="job.id"
          class="bg-white rounded-xl border border-indigo-200 p-5 mb-5"
        >
          <div class="flex justify-between">
            <!-- Left -->
            <div class="flex gap-5">
              <img :src="job.logo" class="w-20 h-20 rounded object-cover" />

              <div>
                <div class="flex items-center gap-3">
                  <h2 class="text-2xl font-semibold text-[#2637A4]">
                    {{ job.title }}
                  </h2>

                  <span class="text-green-600 font-semibold"> Match Score </span>

                  <span class="text-green-600 font-bold"> {{ job.match }}% </span>
                </div>

                <div class="flex gap-6 mt-2 text-gray-600">
                  <span>{{ job.company }}</span>

                  <span>{{ job.category }}</span>
                </div>

                <div class="flex gap-6 mt-2 text-gray-500">
                  <span>{{ job.location }}</span>

                  <span>{{ job.type }}</span>
                </div>

                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                    v-for="skill in job.skills"
                    :key="skill"
                    class="text-indigo-700 font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>

                <div class="mt-2 font-semibold text-gray-500">
                  Application deadline
                  {{ job.deadline }}
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col gap-3">
              <button class="bg-indigo-600 text-white rounded-lg px-6 py-2">Apply Now</button>

              <button class="bg-cyan-500 text-white rounded-lg px-6 py-2">View Details</button>

              <button class="bg-green-600 text-white rounded-lg px-6 py-2">Save</button>
            </div>
          </div>
        </div>

        <button
          class="w-full bg-white border border-indigo-300 rounded-full py-4 text-lg font-medium"
        >
          Load More Jobs
        </button>
      </div>

      <!-- RIGHT -->
      <div class="col-span-12 lg:col-span-3 space-y-5">
        <!-- Match -->
        <div class="bg-white rounded-xl shadow p-5">
          <h3 class="font-bold text-indigo-700 mb-5">Your Match Summary</h3>

          <div class="flex justify-center">
            <div
              class="w-28 h-28 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center"
            >
              <div class="text-3xl font-bold text-green-600">87%</div>

              <div class="text-xs text-gray-500">Overall Match</div>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div v-for="item in summary" :key="item.name">
              <div class="flex justify-between mb-1">
                <span>{{ item.name }}</span>

                <span>{{ item.value }}%</span>
              </div>

              <div class="h-2 rounded-full bg-gray-200">
                <div
                  class="h-2 rounded-full"
                  :style="{
                    width: item.value + '%',
                    background: item.color,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Skills -->
        <div class="bg-white rounded-xl shadow p-5">
          <h3 class="font-bold text-indigo-700 mb-5">Top Skills In Demand</h3>

          <div v-for="skill in topSkills" :key="skill.name" class="mb-4">
            <div class="flex justify-between">
              <span>{{ skill.name }}</span>

              <span>{{ skill.percent }}%</span>
            </div>

            <div class="h-2 bg-gray-200 rounded-full mt-1">
              <div
                class="h-2 rounded-full"
                :style="{
                  width: skill.percent + '%',
                  background: skill.color,
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Why -->
        <div class="bg-white rounded-xl shadow p-5">
          <h3 class="font-bold text-indigo-700 mb-4">Why These Job</h3>

          <div v-for="item in reasons" :key="item" class="flex gap-3 mb-3">
            <div class="text-green-600 font-bold">✓</div>

            <div class="text-gray-600">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jobs = ref([
  {
    id: 1,
    title: 'Frontend Engineer (React)',
    company: 'LEDA Bank',
    category: 'Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    match: 97,
    deadline: 'June 30, 2026',
    logo: 'https://placehold.co/80x80/1E3A8A/FFFFFF?text=L',
    skills: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Senior Full Stack Developer',
    company: 'ABA Bank',
    category: 'Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    match: 97,
    deadline: 'July 30, 2026',
    logo: 'https://placehold.co/80x80/1E3A8A/FFFFFF?text=A',
    skills: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
  },

  {
    id: 3,
    title: 'Software Engineer',
    company: 'Cellcard',
    category: 'Telecom',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    match: 97,
    deadline: 'July 30, 2026',
    logo: 'https://placehold.co/80x80/F59E0B/FFFFFF?text=C',
    skills: ['JavaScript', 'TypeScript', 'Node.js', 'AWS'],
  },

  {
    id: 4,
    title: 'Backend Developer (Node.js)',
    company: 'Wing Bank',
    category: 'Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Full Time',
    match: 97,
    deadline: 'June 30, 2026',
    logo: 'https://placehold.co/80x80/84CC16/FFFFFF?text=W',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'AWS'],
  },
])

const summary = ref([
  {
    name: 'Skills',
    value: 87,
    color: '#4f46e5',
  },
  {
    name: 'Experience',
    value: 87,
    color: '#16a34a',
  },
  {
    name: 'Education',
    value: 87,
    color: '#3b82f6',
  },
  {
    name: 'Keywords',
    value: 87,
    color: '#f97316',
  },
])

const topSkills = ref([
  {
    name: 'JavaScript',
    percent: 95,
    color: '#4f46e5',
  },
  {
    name: 'React',
    percent: 93,
    color: '#16a34a',
  },
  {
    name: 'Node.js',
    percent: 91,
    color: '#3b82f6',
  },
  {
    name: 'TypeScript',
    percent: 89,
    color: '#f59e0b',
  },
  {
    name: 'AWS',
    percent: 85,
    color: '#ef4444',
  },
])

const reasons = ref([
  'Based on your resume and skills',
  'Matching your experience level',
  'Companies are actively hiring',
  'High response rate jobs',
])
</script>
