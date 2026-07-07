<script setup>
import { ref, computed } from 'vue'

const form = ref({
  jobTitle: '',
  company: '',
  degree: '',
  startDate: '',
  endDate: '',
  current: false,
  location: '',
  description:
    'Developed and maintained web application using react, Node.js and MongoDB.\nCollaborated with cross-functional team to deliver high quality software solutions.\nimproved system performance and optimized front-end user experience.',
})

const experiences = ref([
  {
    id: 1,
    company: 'ABA Bank',
    logo: 'https://www.acledasecurities.com.kh/as/assets/listed_company/ABA/aba-web-top-logo.png',
    position: 'Senior Full Stack Developer',
    date: 'Jan 2023 - Present',
    location: 'Phnom Penh, Cambodia',
    description:
      'Developed and maintained web application using react, Node.js and MongoDB. Collaborated with cross-functional team to deliver high quality software solutions. Improved system performance and optimized front-end user experience.',
  },
  {
    id: 2,
    company: 'Cellcard',
    logo: 'https://placehold.co/80x80',
    position: 'Software Engineer',
    date: 'Jan 2023 - Present',
    location: 'Phnom Penh, Cambodia',
    description:
      'Developed and maintained web application using react, Node.js and MongoDB. Collaborated with cross-functional team to deliver high quality software solutions. Improved system performance and optimized front-end user experience.',
  },
])

const maxLength = 500

const descriptionLength = computed(() => form.value.description.length)

const saveExperience = () => {
  console.log(form.value)
}

const cancelForm = () => {
  form.value = {
    jobTitle: '',
    company: '',
    degree: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    description: '',
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Main Card -->
    <div class="mx-auto max-w-7xl p-2">
      <!-- Header -->
      <div class="mb-2 flex items-center justify-between">
        <h1 class="text-4xl font-bold text-gray-900">Add Work Experience</h1>

        <button
          class="rounded-md bg-indigo-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Save work experience
        </button>
      </div>

      <!-- Form -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Job Title -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> Job Title </label>

          <input
            v-model="form.jobTitle"
            type="text"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- Company -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> Company </label>

          <input
            v-model="form.company"
            type="text"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- Degree -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> Degree </label>

          <input
            v-model="form.degree"
            type="text"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- Start Date -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> Start Date </label>

          <input
            v-model="form.startDate"
            type="date"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- End Date -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> End Date </label>

          <input
            v-model="form.endDate"
            type="date"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- Checkbox -->
        <div class="flex items-end pb-2">
          <label class="flex items-center gap-3 text-gray-700">
            <input
              v-model="form.current"
              type="checkbox"
              class="h-5 w-5 rounded border-gray-300 text-indigo-600"
            />

            I currently work here
          </label>
        </div>

        <!-- Location -->
        <div>
          <label class="mb-2 block text-sm text-gray-700"> Location </label>

          <input
            v-model="form.location"
            type="text"
            class="h-12 w-full rounded border border-gray-300 px-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div class="col-span-2">
          <label class="mb-2 block text-sm text-gray-700"> Description </label>

          <textarea
            v-model="form.description"
            rows="5"
            :maxlength="maxLength"
            class="w-full rounded border border-gray-300 p-4 outline-none transition focus:border-indigo-500"
          ></textarea>

          <div class="mt-2 text-right text-sm text-gray-500">
            {{ descriptionLength }}/{{ maxLength }}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-2 flex gap-4">
        <button
          @click="saveExperience"
          class="rounded-md bg-indigo-600 px-8 py-3 text-white transition hover:bg-indigo-700"
        >
          Save work experience
        </button>

        <button
          @click="cancelForm"
          class="rounded-md bg-red-400 px-8 py-3 text-white transition hover:bg-red-500"
        >
          Cancel
        </button>
      </div>

      <div class="mt-16">
        <h2 class="mb-6 text-4xl font-bold text-gray-900">Experience Lists</h2>

        <!-- Experience Card -->
        <div
          v-for="item in experiences"
          :key="item.id"
          class="mb-5 rounded-lg border border-gray-300 bg-white p-2 shadow-sm"
        >
          <div class="grid grid-cols-13 gap-2">
            <!-- Company Logo -->
            <div class="col-span-1 flex items-start justify-center">
              <img
                :src="item.logo"
                :alt="item.company"
                class="h-20 w-20 rounded object-cover border"
              />
            </div>

            <!-- Information -->
            <div class="col-span-5">
              <h3 class="text-xl font-bold text-gray-900">
                {{ item.position }}
              </h3>

              <p class="mt-2 text-gray-700">
                {{ item.company }}
              </p>

              <p class="mt-3 text-sm text-gray-500">
                {{ item.date }},
                {{ item.location }}
              </p>
            </div>

            <!-- Divider -->
            <div class="flex mr-10 justify-center">
              <div class="w-px bg-gray-300"></div>
            </div>

            <!-- Description -->
            <div class="col-span-4">
              <p class="whitespace-pre-line leading-7 text-gray-700">
                {{ item.description }}
              </p>
            </div>

            <!-- Buttons -->
            <div class="col-span-1"></div>
            <div class="col-span-1 flex flex-col items-end justify-between">
              <button
                class="w-24 rounded bg-indigo-600 py-2 text-sm text-white transition hover:bg-indigo-700"
              >
                Update
              </button>

              <button
                class="w-24 rounded bg-red-400 py-2 text-sm text-white transition hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
