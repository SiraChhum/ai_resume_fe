<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-[1400px] mx-auto grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">View Applying</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Manage and review candidates who applied for your job.</h1>
          </div>
          <div class="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            Select Job
          </div>
        </div>

        <div class="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <label class="text-sm font-semibold text-slate-700">Select Job</label>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              v-model="selectedJob"
              class="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option v-for="job in jobs" :key="job.title" :value="job.title">{{ job.title }} <span>({{ job.status }})</span></option>
            </select>
            <span class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Open
            </span>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-4">
          <button class="rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">All Applicants {{ applications.length }}</button>
          <button class="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">New {{ statusCounts.new }}</button>
          <button class="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">Shortlisted {{ statusCounts.shortlisted }}</button>
          <button class="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">Interview {{ statusCounts.interview }}</button>
        </div>

        <div class="mt-6 flex flex-col gap-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative flex-1">
              <input
                v-model="search"
                type="text"
                placeholder="Search by name, email or skills..."
                class="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div class="flex items-center gap-3">
              <button class="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">Filter</button>
              <button class="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">Sort by: Newest</button>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="application in filteredApplications"
              :key="application.email"
              class="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex items-center gap-4">
                <input type="radio" name="selectedCandidate" :value="application.email" v-model="selectedApplication" class="h-5 w-5 text-indigo-600" />
                <img :src="application.avatar" alt="candidate" class="h-14 w-14 rounded-2xl object-cover" />
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-base font-semibold text-slate-900">{{ application.name }}</p>
                    <span v-if="application.tag" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{{ application.tag }}</span>
                  </div>
                  <p class="text-sm text-slate-500">{{ application.email }}</p>
                  <p class="text-sm text-slate-500">{{ application.location }}</p>
                </div>
              </div>

              <div class="flex flex-col items-start gap-2 text-sm text-slate-500 sm:items-end">
                <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">New</span>
                <p class="font-medium text-slate-900">Applied {{ application.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Fits</p>
            <h2 class="mt-3 text-2xl font-semibold text-slate-900">{{ selectedProfile.name }}</h2>
            <p class="text-sm text-indigo-600">{{ selectedProfile.role }}</p>
          </div>
          <button class="rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition">
            <i class="pi pi-share-alt"></i>
          </button>
        </div>

        <div class="mt-6 grid gap-2 rounded-[28px] bg-slate-50 p-4">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-3xl bg-white p-3 text-slate-700">
              <i class="pi pi-user"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">{{ selectedProfile.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm text-slate-500">
            <i class="pi pi-phone"></i>
            <span>{{ selectedProfile.phone }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-slate-500">
            <i class="pi pi-map-marker"></i>
            <span>{{ selectedProfile.location }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
          <h3 class="text-sm font-semibold text-slate-900">About Candidate</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">{{ selectedProfile.about }}</p>
        </div>

        <div class="mt-6 space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Skills</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in selectedProfile.skills" :key="skill" class="rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="mt-6 rounded-[28px] bg-white p-5 shadow-sm border border-slate-200">
          <h3 class="text-sm font-semibold text-slate-900">Resume</h3>
          <div class="mt-4 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p class="font-semibold text-slate-900">{{ selectedProfile.resume.name }}</p>
              <p class="text-sm text-slate-500">{{ selectedProfile.resume.size }}</p>
            </div>
            <button class="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">Download</button>
          </div>
        </div>

        <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
          <h3 class="text-sm font-semibold text-slate-900">Interview</h3>
          <p class="mt-3 text-sm text-slate-500">Choose an action for this candidate.</p>
          <div class="mt-4 flex gap-3">
            <button class="flex-1 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">Shortlist</button>
            <button class="flex-1 rounded-full border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition">Reject</button>
          </div>
        </div>

        <div class="mt-6 rounded-[28px] bg-white p-5 shadow-sm border border-slate-200">
          <h3 class="text-sm font-semibold text-slate-900">Add Note (optional)</h3>
          <textarea
            v-model="note"
            rows="4"
            placeholder="Write a note about this candidate..."
            class="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button class="mt-4 w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">Save Note</button>
        </div>

        <div class="mt-6 rounded-[28px] bg-slate-50 p-5">
          <h3 class="text-sm font-semibold text-slate-900">Application Activity</h3>
          <div class="mt-4 space-y-4">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-3 w-3 rounded-full bg-indigo-600"></div>
              <div>
                <p class="text-sm font-semibold text-slate-900">Applied for the job</p>
                <p class="mt-1 text-sm text-slate-500">May 29, 2024 at 10:30 AM</p>
                <p class="text-sm text-slate-500">Candidate successfully submitted their application for the UI/UX Designer role.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const jobs = [
  { title: 'UI/UX Designer', status: 'Open' },
  { title: 'Frontend Developer', status: 'Closed' },
  { title: 'Backend Developer', status: 'Open' },
]

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

const selectedJob = ref(jobs[0].title)
const search = ref('')
const note = ref('')
const selectedApplication = ref(applications[0].email)

const selectedProfile = computed(() => {
  const application = applications.find((item) => item.email === selectedApplication.value) || applications[0]
  return {
    name: application.name,
    role: application.tag === 'New' ? 'UI/UX Designer' : application.tag === 'Shortlisted' ? 'Marketing Specialist' : 'Backend Developer',
    email: application.email,
    phone: '+855 12 345 678',
    location: application.location,
    about: 'Creative UI/UX Designer with 3+ years of experience in designing user-centered digital products. Passionate about creating intuitive and visually appealing interfaces.',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Adobe XD'],
    resume: {
      name: 'Sophie_Nguyen_Resume.pdf',
      size: '1.2 MB',
    },
  }
})

const filteredApplications = computed(() => {
  const filterValue = search.value.toLowerCase()
  return applications.filter(
    (app) =>
      app.name.toLowerCase().includes(filterValue) ||
      app.email.toLowerCase().includes(filterValue) ||
      app.location.toLowerCase().includes(filterValue)
  )
})

const statusCounts = computed(() => ({
  new: applications.filter((app) => app.tag === 'New').length,
  shortlisted: applications.filter((app) => app.tag === 'Shortlisted').length,
  interview: applications.filter((app) => app.tag === 'Interview').length,
}))
</script>
