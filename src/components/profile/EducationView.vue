<script setup>
import { ref } from 'vue'

const form = ref({
  title: '',
  company: '',
  type: 'Full-time',
  startYear: '',
  endYear: '',
  description: '',
})

const experiences = ref([
  {
    id: 1,
    title: 'Senior Product Designer',
    company: 'InnovateX Creative Agency',
    startYear: 2022,
    endYear: 'Present',
    location: 'Remote, UK',
    current: true,
    description: 'Leading the design strategy for enterprise-scale SaaS applications.',
  },
  {
    id: 2,
    title: 'Junior Web Developer',
    company: 'CoreBit Systems',
    startYear: 2019,
    endYear: 2021,
    location: 'Austin, TX',
    current: false,
    description: 'Collaborated with cross-functional teams to build responsive web portals.',
  },
])

const addExperience = () => {
  if (!form.value.title || !form.value.company) return

  experiences.value.unshift({
    id: Date.now(),
    title: form.value.title,
    company: form.value.company,
    startYear: form.value.startYear,
    endYear: form.value.endYear || 'Present',
    location: 'Not Specified',
    current: !form.value.endYear,
    description: form.value.description,
  })

  form.value = {
    title: '',
    company: '',
    type: 'Full-time',
    startYear: '',
    endYear: '',
    description: '',
  }
}

const removeExperience = (id) => {
  experiences.value = experiences.value.filter((item) => item.id !== id)
}
</script>
<template>
  <div class="mx-auto max-w-7xl p-4 lg:p-8">
    <!-- Header -->
    <div class="mb-2">
      <h1 class="mb-2 text-2xl font-bold text-slate-900">Education Information</h1>
    </div>

    <!-- Form + Sidebar -->
    <div class="mb-12 grid gap-6 xl:grid-cols-3">
      <!-- Form -->
      <div class="p-8 xl:col-span-2">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block font-medium">Degree</label>
            <input
              v-model="form.degree"
              type="text"
              placeholder="Senior Software Engineer"
              class="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium">University / Institute</label>
            <input
              v-model="form.universcity"
              type="text"
              placeholder="TechFlow Solutions"
              class="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium">Employment Type</label>
            <select
              v-model="form.type"
              class="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Internship</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-2 block font-medium">Start Year</label>
              <input
                v-model="form.startYear"
                type="number"
                class="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label class="mb-2 block font-medium">End Year</label>
              <input
                v-model="form.endYear"
                type="number"
                placeholder="Present"
                class="w-full rounded-lg border px-4 py-3"
              />
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="mb-2 block font-medium">Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full rounded-lg border p-4 focus:border-indigo-500 focus:outline-none"
              placeholder="Briefly describe your responsibilities..."
            />
          </div>
        </div>

        <div class="mt-6 flex gap-4 border-t pt-6">
          <button
            @click="addExperience"
            class="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Add Experience
          </button>

          <button class="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600">
            Cancel
          </button>
        </div>
      </div>

      <!-- Side Card -->
      <div class="flex flex-col justify-between border p-8 text-center">
        <div>
          <div class="mb-6 flex h-48 items-center justify-center rounded-2xl bg-slate-100">
            <span class="text-7xl">💼</span>
          </div>

          <h3 class="mb-2 text-xl font-semibold">Build Your Career Path</h3>

          <p class="text-slate-600">
            Detailed professional records help employers understand your expertise.
          </p>
        </div>

        <div class="mt-6 space-y-3">
          <button class="w-full rounded-lg bg-lime-200 px-4 py-3 font-semibold">
            Add Achievement Badge
          </button>

          <button class="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Experience List -->
    <section>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold">Experience History</h2>

        <span class="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
          {{ experiences.length }} Entries
        </span>
      </div>

      <div class="space-y-4">
        <div
          v-for="experience in experiences"
          :key="experience.id"
          class="flex flex-col gap-6 rounded-xl border bg-white p-6 md:flex-row"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-xl bg-indigo-100 text-3xl">
            🏢
          </div>

          <div class="flex-1">
            <div class="mb-2 flex items-center gap-3">
              <h3 class="text-xl font-bold">
                {{ experience.title }}
              </h3>

              <span
                v-if="experience.current"
                class="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700"
              >
                Current
              </span>
            </div>

            <p class="font-medium text-slate-700">
              {{ experience.company }}
            </p>

            <p class="mt-1 text-sm text-slate-500">
              {{ experience.startYear }} -
              {{ experience.endYear }}
              • {{ experience.location }}
            </p>

            <p class="mt-3 text-slate-600">
              {{ experience.description }}
            </p>
          </div>

          <div class="flex gap-2 md:flex-col">
            <button class="rounded-lg bg-indigo-600 px-4 py-2 text-white">Edit</button>

            <button
              @click="removeExperience(experience.id)"
              class="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
