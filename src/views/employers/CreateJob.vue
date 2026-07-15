<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-[1400px] mx-auto space-y-6">
      <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <section class="space-y-6 rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
          <div class="rounded-[28px] border border-slate-200 p-6 space-y-6">
            <div>
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h2 class="text-xl font-semibold text-slate-900">Basic Information</h2>
                  <p class="text-sm text-slate-500 mt-1">Job title, category and location details.</p>
                </div>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">Required</span>
              </div>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Job Title *</label>
                  <input
                    v-model="form.title"
                    type="text"
                    placeholder="e.g. Senior UI/UX Designer"
                    class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Job Category *</label>
                  <select
                    v-model="form.category"
                    class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select job category</option>
                    <option value="design">Design</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Employment Type *</label>
                  <select
                    v-model="form.type"
                    class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select employment type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Work Location *</label>
                  <select
                    v-model="form.location"
                    class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select location type</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Specific Location (optional)</label>
                <input
                  v-model="form.specificLocation"
                  type="text"
                  placeholder="e.g. Phnom Penh, Cambodia or Remote"
                  class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div class="rounded-[28px] border border-slate-200 p-6 space-y-6">
              <div>
                <h2 class="text-xl font-semibold text-slate-900">Job Summary *</h2>
                <p class="text-sm text-slate-500 mt-1">Write a brief summary about the role and what you’re looking for.</p>
              </div>
              <textarea
                v-model="form.summary"
                rows="5"
                placeholder="Type a short summary..."
                class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              ></textarea>
              <div class="flex items-center justify-between text-sm text-slate-500">
                <span>Normal</span>
                <span>{{ form.summary.length }} / 300</span>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200 p-6 space-y-6">
            <div>
              <h2 class="text-xl font-semibold text-slate-900">Job Description *</h2>
              <p class="text-sm text-slate-500 mt-1">Provide detailed information about the role, responsibilities and expectations.</p>
            </div>
            <textarea
              v-model="form.description"
              rows="10"
              placeholder="Type the full job description..."
              class="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            ></textarea>
          </div>
        </section>

        <aside class="rounded-[32px] bg-slate-50 p-6 shadow-sm border border-slate-200">
          <div class="rounded-[28px] border border-slate-200 bg-white p-6 space-y-5">
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                <i class="pi pi-briefcase text-lg"></i>
              </div>
              <div>
                <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Job Preview</p>
                <p class="mt-1 text-base font-semibold text-slate-900">{{ previewTitle || 'Job Title' }}</p>
                <p class="text-sm text-slate-500">{{ previewCompany }}</p>
              </div>
            </div>

            <div class="rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
              <p class="font-semibold text-slate-900">{{ previewTitle || 'Company Name' }}</p>
              <p>{{ previewLocation }} · {{ form.type || 'Employment Type' }}</p>
            </div>

            <div class="space-y-4">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Job Summary</p>
                <div class="mt-3 min-h-[68px] rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
                  {{ previewSummary || 'This is a short job summary that highlights the role, team, and main responsibilities.' }}
                </div>
              </div>

              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Key Responsibilities</p>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">
                  <li v-for="item in previewResponsibilities" :key="item" class="flex gap-2">
                    <span class="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Requirements</p>
                <ul class="mt-3 space-y-2 text-sm text-slate-600">
                  <li v-for="item in previewRequirements" :key="item" class="flex gap-2">
                    <span class="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-4 rounded-[28px] border border-slate-200 bg-white p-5">
            <div class="flex items-center justify-between text-sm text-slate-500">
              <span>Salary</span>
              <span class="font-semibold text-slate-900">{{ form.salary }}</span>
            </div>
            <div class="flex items-center justify-between text-sm text-slate-500">
              <span>Application Deadline</span>
              <span class="font-semibold text-slate-900">{{ form.deadline }}</span>
            </div>
          </div>

          <button
            class="w-full rounded-full border border-indigo-600 bg-white px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            type="button"
          >
            Save as Draft
          </button>
          <button
            class="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            type="button"
          >
            Continue to Next Step →
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

const form = reactive({
  title: '',
  category: '',
  type: '',
  location: '',
  specificLocation: '',
  summary: '',
  description: '',
  salary: 'Competitive',
  deadline: 'Not set',
})

const previewTitle = computed(() => form.title || 'Job Title')
const previewCompany = computed(() => 'Company Name')
const previewLocation = computed(() => form.specificLocation || 'Location')
const previewSummary = computed(() => form.summary || 'Write a short summary that captures what candidates can expect from this role.')
const previewResponsibilities = computed(() => [
  'Develop and execute project deliverables.',
  'Collaborate with cross-functional teams.',
  'Maintain documentation and updates.',
])
const previewRequirements = computed(() => [
  'Strong communication skills.',
  'Experience in relevant field.',
  'Ability to meet deadlines.',
])

</script>
