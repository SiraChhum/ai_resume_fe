<script setup>
import { computed, ref } from 'vue'
// import { router } from 'vue-router'
import { ArrowLeft } from '@lucide/vue'

const activeTab = ref('overview')
// const saved = ref(false)

// const toggleSave = () => {
//   saved.value = !saved.value
// }

const progressStyle = computed(() => {
  const percent = 97
  return {
    background: `conic-gradient(#22c55e ${percent * 3.6}deg,#e5e7eb 0deg)`,
  }
})

const job = ref({
  title: 'Senior Software Engineer',
  company: 'ABA Bank',
  logo: 'ABA',
  location: 'Phnom Penh, Cambodia',
  type: 'Full Time',
  deadline: 'July 30, 2026',
  matchRate: 97,

  skills: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Node.js'],
})

const tabs = [
  {
    id: 'overview',
    label: 'Job Overview',
  },
  {
    id: 'responsibilities',
    label: 'Responsibilities',
  },
  {
    id: 'requirement',
    label: 'Requirement',
  },
]
// const backView = () => {
//   router.push(`/user/job-recommendation`)
// }
</script>

<template>
  <router-link to="/user/job-recommendation">
    <button class="flex"><ArrowLeft /> Back</button>
  </router-link>

  <div class="min-h-screen bg-slate-100 p-2">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-12 gap-6">
        <!-- LEFT -->
        <div class="col-span-12 lg:col-span-8">
          <div class="rounded-xl bg-white shadow border">
            <!-- Header -->
            <div class="p-8">
              <div class="flex justify-between">
                <!-- Left Header -->
                <div class="flex gap-5">
                  <div
                    class="flex h-24 w-24 items-center justify-center rounded bg-[#0E4D78] text-4xl font-bold text-white"
                  >
                    {{ job.logo }}
                  </div>

                  <div>
                    <h1 class="text-4xl font-bold text-gray-900">
                      {{ job.title }}
                    </h1>

                    <p class="mt-2 text-blue-700 font-medium">
                      {{ job.company }}
                    </p>

                    <div class="mt-3 flex flex-wrap gap-5 text-gray-500">
                      <span> 📍 {{ job.location }} </span>

                      <span> 💼 {{ job.type }} </span>
                    </div>

                    <p class="mt-3 text-gray-600">
                      <span class="font-medium"> Application deadline </span>

                      <strong>
                        {{ job.deadline }}
                      </strong>
                    </p>
                  </div>
                </div>

                <!-- Match -->
                <!-- Match -->
                <div class="text-center">
                  <div class="relative h-28 w-28 rounded-full p-1" :style="progressStyle">
                    <div
                      class="flex h-full w-full items-center justify-center rounded-full bg-white"
                    >
                      <span class="text-3xl font-bold text-gray-900"> {{ job.matchRate }}% </span>
                    </div>
                  </div>

                  <p class="mt-3 text-lg font-semibold text-gray-700">Match Rate</p>
                </div>
              </div>

              <!-- Skills -->
              <div class="mt-8">
                <h2 class="text-2xl font-bold">Skills Requirements</h2>

                <div class="mt-5 flex flex-wrap gap-3">
                  <span
                    v-for="skill in job.skills"
                    :key="skill"
                    class="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="border-t">
              <div class="grid grid-cols-3">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'py-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 bg-white'
                      : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100',
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>

              <!-- Tab Content -->
              <!-- Tab Content -->
              <div class="p-8">
                <!-- ============================= -->
                <!-- Job Overview -->
                <!-- ============================= -->
                <div v-if="activeTab === 'overview'" class="space-y-8">
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Job Purpose</h2>

                    <p class="mt-4 leading-8 text-gray-600">
                      To acquire and onboard large business loan clients as well as analyze and
                      process their loan applications by conducting credit investigations, scoring,
                      credit checking, and other underwriting activities in order to ensure good
                      lending quality for the Large Business Loan of the Branch.
                    </p>
                  </div>

                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Job Overview</h2>

                    <p class="mt-4 leading-8 text-gray-600">
                      We are looking for a Senior Software Engineer who is passionate about building
                      scalable web applications. You will work closely with product owners,
                      designers and developers to deliver reliable, secure and high-quality software
                      solutions.
                    </p>

                    <div class="mt-8 grid grid-cols-2 gap-6">
                      <div class="rounded-lg border bg-slate-50 p-5">
                        <h3 class="font-semibold">Experience</h3>
                        <p class="mt-2 text-gray-600">3+ Years</p>
                      </div>

                      <div class="rounded-lg border bg-slate-50 p-5">
                        <h3 class="font-semibold">Education</h3>
                        <p class="mt-2 text-gray-600">Bachelor Degree</p>
                      </div>

                      <div class="rounded-lg border bg-slate-50 p-5">
                        <h3 class="font-semibold">Employment</h3>
                        <p class="mt-2 text-gray-600">Full Time</p>
                      </div>

                      <div class="rounded-lg border bg-slate-50 p-5">
                        <h3 class="font-semibold">Work Location</h3>
                        <p class="mt-2 text-gray-600">Phnom Penh</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ============================= -->
                <!-- Responsibilities -->
                <!-- ============================= -->

                <div v-if="activeTab === 'responsibilities'" class="space-y-8">
                  <div>
                    <h2 class="text-xl font-bold">Job Responsibilities</h2>

                    <ol class="mt-5 list-decimal space-y-3 pl-6 text-gray-700">
                      <li>Design, develop, test and maintain software applications.</li>

                      <li>Write clean, efficient and well-documented code.</li>

                      <li>
                        Collaborate with cross-functional teams to deliver software solutions.
                      </li>

                      <li>
                        Analyze business requirements and transform them into technical
                        specifications.
                      </li>

                      <li>Debug, troubleshoot and optimize applications.</li>

                      <li>Participate in code reviews and maintain code quality.</li>

                      <li>Develop RESTful APIs and integrate third-party services.</li>

                      <li>Perform software testing and fix production issues.</li>

                      <li>Improve existing systems and user experience.</li>

                      <li>Participate in deployment and system maintenance.</li>

                      <li>Mentor junior developers.</li>

                      <li>Stay updated with modern technologies and best practices.</li>
                    </ol>
                  </div>
                </div>

                <!-- ============================= -->
                <!-- Requirement -->
                <!-- ============================= -->

                <div v-if="activeTab === 'requirement'" class="space-y-8">
                  <div>
                    <h2 class="text-xl font-bold">Requirement & Qualifications</h2>

                    <ul class="mt-5 list-disc space-y-3 pl-6 text-gray-700">
                      <li>Bachelor's degree in Computer Science or related field.</li>

                      <li>Minimum 3 years of software development experience.</li>

                      <li>Strong knowledge of JavaScript / TypeScript.</li>

                      <li>Experience with Vue.js or React.js.</li>

                      <li>Experience working with REST APIs.</li>

                      <li>Knowledge of HTML5, CSS3 and Tailwind CSS.</li>

                      <li>Familiar with Git and Agile development.</li>

                      <li>Experience with SQL or PostgreSQL databases.</li>

                      <li>Good problem-solving and analytical thinking.</li>

                      <li>Good English communication skills.</li>
                    </ul>
                  </div>
                </div>

                <!-- Bottom Buttons -->

                <div class="mt-12 flex justify-center gap-5 border-t pt-8">
                  <button
                    class="rounded-lg bg-fuchsia-500 px-10 py-3 font-semibold text-white transition hover:bg-fuchsia-600"
                  >
                    Apply
                  </button>

                  <button
                    class="rounded-lg bg-green-500 px-10 py-3 font-semibold text-white transition hover:bg-green-600"
                  >
                    Save
                  </button>

                  <button
                    class="rounded-lg bg-blue-500 px-10 py-3 font-semibold text-white transition hover:bg-blue-600"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-6 space-y-6">
            <!-- Match Card -->
            <div class="rounded-xl border bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">Why this job matches you</h2>

                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-green-500 text-lg font-bold"
                >
                  {{ job.matchRate }}%
                </div>
              </div>

              <div class="mt-6 space-y-5">
                <div class="flex gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"
                  >
                    ✓
                  </div>

                  <div>
                    <h3 class="font-semibold">Skills Match</h3>

                    <p class="text-sm text-gray-500">Your skills match this position very well.</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"
                  >
                    ✓
                  </div>

                  <div>
                    <h3 class="font-semibold">Experience</h3>

                    <p class="text-sm text-gray-500">Meets the required work experience.</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"
                  >
                    ✓
                  </div>

                  <div>
                    <h3 class="font-semibold">Preferred Technology</h3>

                    <p class="text-sm text-gray-500">React, Vue and Tailwind are included.</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"
                  >
                    ✓
                  </div>

                  <div>
                    <h3 class="font-semibold">Career Goal</h3>

                    <p class="text-sm text-gray-500">
                      Similar to your preferred software engineering role.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Company Overview -->
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div class="border-b px-6 py-4">
                <h2 class="font-bold text-lg">Company Overview</h2>
              </div>

              <div class="p-6">
                <div class="flex gap-4">
                  <div
                    class="flex h-16 w-16 items-center justify-center rounded-lg bg-[#0E4D78] text-2xl font-bold text-white"
                  >
                    ABA
                  </div>

                  <div>
                    <h3 class="text-2xl font-bold">ABA Bank</h3>

                    <p class="text-gray-500">Phnom Penh, Cambodia</p>
                  </div>
                </div>

                <p class="mt-5 leading-7 text-gray-600">
                  ABA Bank is one of Cambodia's leading commercial banks, providing banking,
                  financial technology, internet banking, payment services and digital financial
                  solutions.
                </p>

                <div class="mt-6 space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-500"> Industry </span>

                    <span class="font-medium"> Banking </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-gray-500"> Company Size </span>

                    <span class="font-medium"> 1000+ Employees </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-gray-500"> Founded </span>

                    <span class="font-medium"> 1996 </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-gray-500"> Website </span>

                    <a href="#" class="font-medium text-blue-600 hover:underline"> ababank.com </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Job Information -->
            <div class="rounded-xl border bg-white p-6 shadow-sm">
              <h2 class="mb-5 text-lg font-bold">Job Information</h2>

              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-500">Employment</span>
                  <span class="font-medium">Full Time</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-500">Experience</span>
                  <span class="font-medium">3+ Years</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-500">Salary</span>
                  <span class="font-medium">$1,500 - $2,500</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-500">Deadline</span>
                  <span class="font-medium">
                    {{ job.deadline }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Job Location -->
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div class="border-b px-6 py-4">
                <h2 class="font-bold text-lg">Job Location</h2>
              </div>

              <div class="p-4">
                <iframe
                  class="h-64 w-full rounded-lg"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Phnom+Penh+Cambodia&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
