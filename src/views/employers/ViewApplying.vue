<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-[1400px] mx-auto grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <section class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">View Applying</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">
              Manage and review candidates who applied for your job.
            </h1>
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
              <option v-for="job in jobs" :key="job.title" :value="job.title">
                {{ job.title }}
              </option>
            </select>
            <span
              class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
            >
              Open
            </span>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center border-slate-200 bg-white p-4">
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'AllApply' }"
            @click="selectedTab = 'AllApply'"
            class="px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition"
          >
            All Applicants
          </button>
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'NewTwo' }"
            @click="selectedTab = 'NewTwo'"
            class="bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            New
          </button>
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'ShortList' }"
            @click="selectedTab = 'ShortList'"
            class="bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Shortlisted
          </button>
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Interview' }"
            @click="selectedTab = 'Interview'"
            class="bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Interview
          </button>
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Hired' }"
            @click="selectedTab = 'Hired'"
            class="bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Interview
          </button>
          <button
            :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Reject' }"
            @click="selectedTab = 'Reject'"
            class="bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Interview
          </button>
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
              <button
                class="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Filter
              </button>
              <button
                class="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Sort by: Newest
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <section v-if="selectedTab === 'AllApply'">
              <p>
                <AllApply />
              </p>
            </section>
            <section v-else-if="selectedTab === 'NewTwo'">
              <NewTwo @select="onSelect" />
            </section>
            <section v-else-if="selectedTab === 'ShortList'">
              <ShortList @select="onShortSelect" />
            </section>
            <section v-else-if="selectedTab === 'Interview'">
              <Interview @select="onInterviewSelect" />
            </section>
            <section v-else-if="selectedTab === 'Hired'">
              <HiredView @select="onHiredSelect" />
            </section>
            <section v-else-if="selectedTab === 'Reject'">
              <RejectView @select="onRejectSelect" />
            </section>
          </div>
        </div>
      </section>
      <!-- //rightsidebar -->
      <aside class="rounded-[32px] bg-white p-6 shadow-sm border border-slate-200">
        <section v-if="selectedTab === 'AllApply'">
          <p>
            <AllApplyRight />
          </p>
        </section>
        <section v-if="selectedTab === 'NewTwo'">
          <p>
            <NewRight ref="newRightRef" />
          </p>
        </section>
        <section v-if="selectedTab === 'ShortList'">
          <p>
            <ShortlistRight ref="shortlistRightRef" />
          </p>
        </section>
        <section v-if="selectedTab === 'Interview'">
          <p>
            <InterviewRight ref="interviewRightRef" />
          </p>
        </section>
        <section v-if="selectedTab === 'Hired'">
          <p>
            <HiredRight ref="hiredRightRef" />
          </p>
        </section>
        <section v-if="selectedTab === 'Reject'">
          <p>
            <RejectRight ref="rejectRightRef" />
          </p>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AllApply from '@/components/ViewApply/AllApply.vue'
import AllApplyRight from '@/components/ViewApply/AllApplyRight.vue'
import InterviewRight from '@/components/ViewApply/InterviewRight.vue'
import Interview from '@/components/ViewApply/InterView.vue'
import NewRight from '@/components/ViewApply/NewRight.vue'
import ShortlistRight from '@/components/ViewApply/ShortlistRight.vue'
import NewTwo from '@/components/ViewApply/NewTwo.vue'
import ShortList from '@/components/ViewApply/ShortList.vue'
import HiredRight from '@/components/ViewApply/HiredRight.vue'
import RejectRight from '@/components/ViewApply/RejectRight.vue'
import HiredView from '@/components/ViewApply/HiredView.vue'
import RejectView from '@/components/ViewApply/RejectView.vue'

const jobs = ref([
  { title: 'UI/UX Designer', status: 'Open' },
  { title: 'Frontend Developer', status: 'Open' },
  { title: 'Product Designer', status: 'Open' },
])

const selectedJob = ref(jobs.value[0].title)
const search = ref('')
const selectedTab = ref('AllApply')

const newRightRef = ref(null)
const shortlistRightRef = ref(null)

function onSelect(app) {
  if (newRightRef.value && typeof newRightRef.value.setSelected === 'function') {
    newRightRef.value.setSelected(app)
  }
}

function onShortSelect(app) {
  if (shortlistRightRef.value && typeof shortlistRightRef.value.setSelected === 'function') {
    shortlistRightRef.value.setSelected(app)
  }
}

const interviewRightRef = ref(null)

function onInterviewSelect(app) {
  if (interviewRightRef.value && typeof interviewRightRef.value.setSelected === 'function') {
    interviewRightRef.value.setSelected(app)
  }
}
</script>
