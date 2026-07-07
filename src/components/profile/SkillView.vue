<script setup>
import { ref, computed } from 'vue'

const skills = ref([
  {
    id: 1,
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    level: 'Expert',
    percentage: 90,
    experience: '4 Years',
  },
  {
    id: 2,
    name: 'React.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    level: 'Advanced',
    percentage: 85,
    experience: '3 Years',
  },
  {
    id: 3,
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    level: 'Advanced',
    percentage: 85,
    experience: '3 Years',
  },
  {
    id: 4,
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    level: 'Advanced',
    percentage: 85,
    experience: '3 Years',
  },
  {
    id: 5,
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    level: 'Expert',
    percentage: 90,
    experience: '4 Years',
  },
  {
    id: 6,
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    level: 'Intermediate',
    percentage: 60,
    experience: '2 Years',
  },
  {
    id: 7,
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    level: 'Intermediate',
    percentage: 60,
    experience: '1 Year',
  },
  {
    id: 8,
    name: 'Bootstrap',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    level: 'Intermediate',
    percentage: 60,
    experience: '2 Years',
  },
])

const totalSkills = computed(() => skills.value.length)

const expertCount = computed(() => skills.value.filter((item) => item.level === 'Expert').length)

const advancedCount = computed(
  () => skills.value.filter((item) => item.level === 'Advanced').length,
)

const intermediateCount = computed(
  () => skills.value.filter((item) => item.level === 'Intermediate').length,
)

const addSkill = () => {
  console.log('Add Skill')
}

const editSkill = (item) => {
  console.log(item)
}

const deleteSkill = (id) => {
  console.log(id)
}
</script>

<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="border-b p-8">
        <div class="flex items-start justify-between">
          <!-- Left -->
          <div>
            <h1 class="text-3xl text-gray-900">Skills Overview</h1>

            <p class="mt-2 text-lg text-gray-500">
              add your skills and manage your proficiency level
            </p>
          </div>

          <!-- Statistics -->
          <div class="flex items-center gap-16">
            <!-- Total -->
            <div class="text-center">
              <p class="text-gray-500">total skills</p>

              <div class="mt-3 flex items-center justify-center gap-2">
                <svg
                  class="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                </svg>

                <span class="text-3xl font-bold">
                  {{ totalSkills }}
                </span>
              </div>
            </div>

            <!-- Expert -->
            <div class="text-center">
              <p class="text-gray-500">Expert</p>

              <div class="mt-3 flex items-center justify-center gap-2">
                <svg
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3 2-5 6-5s6 2 6 5" />
                </svg>

                <span class="text-3xl font-bold">
                  {{ expertCount }}
                </span>
              </div>
            </div>

            <!-- Advanced -->
            <div class="text-center">
              <p class="text-gray-500">Advanced</p>

              <div class="mt-3 flex items-center justify-center gap-2">
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l5-5 4 4 7-8" />
                </svg>

                <span class="text-3xl font-bold">
                  {{ advancedCount }}
                </span>
              </div>
            </div>

            <!-- Intermediate -->
            <div class="text-center">
              <p class="text-gray-500">Intermediate</p>

              <div class="mt-3 flex items-center justify-center gap-2">
                <svg
                  class="h-6 w-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18V9" />
                  <path d="M12 18V5" />
                  <path d="M18 18v-7" />
                </svg>

                <span class="text-3xl font-bold">
                  {{ intermediateCount }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Button -->
        <div class="mt-8">
          <button
            @click="addSkill"
            class="flex items-center gap-2 rounded-md border border-indigo-600 px-5 py-2 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            <span class="text-lg font-bold">+</span>

            Add New Skill
          </button>
        </div>
      </div>
      <div class="p-8">
        <!-- Section Title -->
        <h2 class="mb-6 text-3xl font-bold text-gray-900">Skills List</h2>

        <!-- Table Header -->
        <div class="mb-4 grid grid-cols-12 gap-4 px-4 text-lg font-semibold text-gray-700">
          <div class="col-span-3">Skill</div>

          <div class="col-span-5">Proficiency Level</div>

          <div class="col-span-2">Years of Experience</div>

          <div class="col-span-2 text-center">Action</div>
        </div>

        <!-- Skill Item -->
        <div
          v-for="item in skills"
          :key="item.id"
          class="mb-5 rounded-lg bg-indigo-100 p-4 transition hover:shadow-md"
        >
          <div class="grid grid-cols-12 items-center gap-4">
            <!-- Skill -->
            <div class="col-span-3 flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded bg-white shadow-sm">
                <img :src="item.icon" :alt="item.name" class="h-8 w-8 object-contain" />
              </div>

              <span class="text-lg font-semibold text-gray-800">
                {{ item.name }}
              </span>
            </div>

            <!-- Level -->
            <div class="col-span-5">
              <div class="flex items-center gap-4">
                <span class="w-28 text-lg font-medium text-gray-800">
                  {{ item.level }}
                </span>

                <!-- Arrow -->
                <svg
                  class="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>

                <!-- Progress -->
                <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-300">
                  <div
                    class="h-full rounded-full bg-green-500 transition-all"
                    :style="{ width: item.percentage + '%' }"
                  ></div>
                </div>

                <span class="w-12 text-right font-semibold text-gray-700">
                  {{ item.percentage }}%
                </span>
              </div>
            </div>

            <!-- Experience -->
            <div class="col-span-2">
              <span class="text-lg text-gray-800">
                {{ item.experience }}
              </span>
            </div>

            <!-- Action -->
            <div class="col-span-2 flex justify-center gap-3">
              <!-- Edit -->
              <button
                @click="editSkill(item)"
                class="flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-700 shadow transition hover:bg-indigo-600 hover:text-white"
              >
                ✎
              </button>

              <!-- Delete -->
              <button
                @click="deleteSkill(item.id)"
                class="flex h-10 w-10 items-center justify-center rounded-md bg-white text-red-500 shadow transition hover:bg-red-500 hover:text-white"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
