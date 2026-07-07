<script setup>
import { ref } from 'vue'

const form = ref({
  jobTitle: '',
  industry: '',
  location: '',
  salaryFrom: '',
  salaryTo: '',
  workMode: [],
})

const toggleWorkMode = (mode) => {
  if (form.value.workMode.includes(mode)) {
    form.value.workMode = form.value.workMode.filter((item) => item !== mode)
  } else {
    form.value.workMode.push(mode)
  }
}
const employmentTypes = ['Full Time', 'Part Time', 'Contract', 'Internship']

const experienceOptions = ['Entry Level 0-2 Years', 'Mid Level 2-5 Years', 'Senior Level 5+ Years']

form.value.employmentType = []
form.value.experience = []

const skills = ref(['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'])

const removeSkill = (index) => {
  skills.value.splice(index, 1)
}

const toggleEmployment = (item) => {
  if (form.value.employmentType.includes(item)) {
    form.value.employmentType = form.value.employmentType.filter((i) => i !== item)
  } else {
    form.value.employmentType.push(item)
  }
}

const toggleExperience = (item) => {
  if (form.value.experience.includes(item)) {
    form.value.experience = form.value.experience.filter((i) => i !== item)
  } else {
    form.value.experience.push(item)
  }
}
const notificationOptions = [
  {
    title: 'Email Notifications',
    description: 'Receive emails about new job matches',
  },
  {
    title: 'New Matching Jobs',
    description: 'Get notified when new jobs match your profile',
  },
  {
    title: 'Weekly Job Updates',
    description: 'Receive a weekly summary of matching jobs',
  },
]

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
]

form.value.notifications = []
form.value.companySizes = []

form.value.additionalPreference = ''

const toggleNotification = (item) => {
  if (form.value.notifications.includes(item)) {
    form.value.notifications = form.value.notifications.filter((i) => i !== item)
  } else {
    form.value.notifications.push(item)
  }
}

const toggleCompanySize = (item) => {
  if (form.value.companySizes.includes(item)) {
    form.value.companySizes = form.value.companySizes.filter((i) => i !== item)
  } else {
    form.value.companySizes.push(item)
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Heading -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Job Preferences</h1>

        <p class="text-gray-500 text-sm mt-2">
          Tell us what kind of job you are looking for so we can recommend the best opportunity for
          you.
        </p>
      </div>

      <!-- Top Select -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Job Title -->
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">
            Preferred Job Title
          </label>

          <select
            v-model="form.jobTitle"
            class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select job title</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>UI/UX Designer</option>
          </select>
        </div>

        <!-- Industry -->
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2"> Preferred Industry </label>

          <select
            v-model="form.industry"
            class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select industry</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Education</option>
            <option>Healthcare</option>
          </select>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2"> Preferred Location </label>

          <select
            v-model="form.location"
            class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select location</option>
            <option>Phnom Penh</option>
            <option>Siem Reap</option>
            <option>Battambang</option>
            <option>Remote</option>
          </select>
        </div>
      </div>

      <!-- Salary + Work Mode -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <!-- Salary -->
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-2">
            Expected Salary Range
          </label>

          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <span class="absolute left-3 top-3 text-gray-500">$</span>

              <input
                v-model="form.salaryFrom"
                type="number"
                placeholder="0"
                class="w-full rounded-md border border-gray-300 py-3 pl-7 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>

            <span class="text-gray-500 text-sm"> to </span>

            <div class="relative flex-1">
              <span class="absolute left-3 top-3 text-gray-500">$</span>

              <input
                v-model="form.salaryTo"
                type="number"
                placeholder="0"
                class="w-full rounded-md border border-gray-300 py-3 pl-7 pr-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Work Mode -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-semibold text-gray-800 mb-2"> Work Mode </label>

          <div class="border border-gray-300 rounded-lg p-5 flex flex-wrap gap-8">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="form.workMode.includes('On Site')"
                @change="toggleWorkMode('On Site')"
                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span class="text-sm text-gray-700"> 🏢 On-Site </span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="form.workMode.includes('Hybrid')"
                @change="toggleWorkMode('Hybrid')"
                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span class="text-sm text-gray-700"> 🖥️ Hybrid </span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="form.workMode.includes('Remote')"
                @change="toggleWorkMode('Remote')"
                class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span class="text-sm text-gray-700"> 🏠 Remote </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Employment + Experience -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <!-- Employment Type -->
        <div>
          <div class="border rounded-lg border-gray-300 p-5">
            <h3 class="font-semibold text-gray-900 mb-4">Employment Type</h3>

            <div class="grid grid-cols-2 gap-4">
              <label
                v-for="item in employmentTypes"
                :key="item"
                class="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  :checked="form.employmentType.includes(item)"
                  @change="toggleEmployment(item)"
                  class="w-5 h-5 rounded border-gray-300 text-indigo-600"
                />

                {{ item }}
              </label>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="lg:col-span-2">
          <div class="border rounded-lg border-gray-300 p-5">
            <h3 class="font-semibold text-gray-900 mb-4">Experience Level</h3>

            <div class="grid md:grid-cols-3 gap-5">
              <label
                v-for="item in experienceOptions"
                :key="item"
                class="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-indigo-500 transition"
              >
                <input
                  type="checkbox"
                  :checked="form.experience.includes(item)"
                  @change="toggleExperience(item)"
                  class="w-5 h-5 rounded border-gray-300 text-indigo-600"
                />

                <span class="text-sm text-gray-700">
                  {{ item }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferred Skills -->
      <div class="border rounded-lg border-gray-300 p-5 mt-6">
        <h3 class="font-semibold text-gray-900">Preferred Technologies / Skills</h3>

        <div class="flex flex-wrap gap-3 mt-4">
          <div
            v-for="(skill, index) in skills"
            :key="skill"
            class="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm"
          >
            {{ skill }}

            <button @click="removeSkill(index)" class="text-gray-600 hover:text-red-500">✕</button>
          </div>

          <button
            class="rounded-md border border-dashed border-indigo-500 px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            + Add Skill
          </button>
        </div>

        <p class="text-xs text-gray-500 mt-4">
          Add the technologies and tools you are the most comfortable with.
        </p>
      </div>
      <!-- Job Alert + Company Size -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <!-- Job Alert -->
        <div>
          <div class="border border-gray-300 rounded-lg p-5 h-full">
            <h3 class="font-semibold text-gray-900 mb-4">Job Alert & Notifications</h3>

            <div class="space-y-5">
              <label
                v-for="item in notificationOptions"
                :key="item.title"
                class="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="form.notifications.includes(item.title)"
                  @change="toggleNotification(item.title)"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                <div>
                  <p class="text-sm font-medium text-gray-800">
                    {{ item.title }}
                  </p>

                  <p class="text-xs text-gray-500">
                    {{ item.description }}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Company Size -->
        <div class="lg:col-span-2">
          <div class="border border-gray-300 rounded-lg p-5">
            <h3 class="font-semibold text-gray-900 mb-5">Preferred Company Size</h3>

            <div class="grid md:grid-cols-2 gap-x-12 gap-y-5">
              <label
                v-for="item in companySizeOptions"
                :key="item"
                class="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="form.companySizes.includes(item)"
                  @change="toggleCompanySize(item)"
                  class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span class="text-sm text-gray-700">
                  {{ item }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <!-- Additional Preferences -->
        <div>
          <div class="border border-gray-300 rounded-lg p-5 h-full">
            <h3 class="font-semibold text-gray-900 mb-3">Additional Preferences (Optional)</h3>

            <textarea
              v-model="form.additionalPreference"
              rows="3"
              placeholder="Tell us more about the work environment, culture, or benefits you value..."
              class="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
          </div>
        </div>

        <!-- Why -->
        <div>
          <div class="border border-gray-300 rounded-lg p-5 h-full">
            <h3 class="font-semibold text-gray-900 mb-3">Why we need preference?</h3>

            <p class="text-sm leading-6 text-gray-500">
              Your preferences help our AI algorithm recommend the most relevant job opportunities
              that match your career goals, salary expectations, preferred working style,
              technologies, and company culture.
            </p>
          </div>
        </div>

        <!-- Save -->
        <div class="flex items-end justify-end">
          <button
            class="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
