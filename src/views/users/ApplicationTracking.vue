<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'

const stats = ref([
  {
    title: 'Total Applications',
    value: 18,
    color: 'bg-blue-500',
    icon: 'pi pi-file',
    footer: 'All times',
    footerColor: 'text-gray-400',
  },
  {
    title: 'Under Review',
    value: 18,
    color: 'bg-orange-400',
    icon: 'pi pi-eye',
    footer: '12% this month',
    footerColor: 'text-green-500',
  },
  {
    title: 'Interviews',
    value: 18,
    color: 'bg-indigo-500',
    icon: 'pi pi-download',
    footer: '40% of total',
    footerColor: 'text-orange-500',
  },
  {
    title: 'Offers',
    value: 18,
    color: 'bg-green-400',
    icon: 'pi pi-check',
    footer: '20% of total',
    footerColor: 'text-pink-500',
  },
  {
    title: 'Rejected',
    value: 18,
    color: 'bg-red-400',
    icon: 'pi pi-times',
    footer: '30% of total',
    footerColor: 'text-green-500',
  },
])

const applications = ref([
  {
    id: 1,
    company: 'ABA Bank',
    logo: 'ABA',
    position: 'Senior Full-Stack Developer',
    status: 'Under Review',
    date: 'Applied on 12 May 2025',
  },
  {
    id: 2,
    company: 'ACLEDA Bank',
    logo: '🦅',
    position: 'Front-End Engineer(React.Js)',
    status: 'Offered',
    date: 'Applied on 12 May 2025',
  },
  {
    id: 3,
    company: 'Cellcard',
    logo: '◜◝',
    position: 'Software Engineer',
    status: 'Rejected',
    date: 'Applied on 12 May 2025',
  },
  {
    id: 4,
    company: 'Wing Bank',
    logo: 'Wing',
    position: 'Back-End Developer(Node.js)',
    status: 'Interview',
    date: 'Applied on 12 May 2025',
  },
])

const badgeClass = (status) => {
  switch (status) {
    case 'Under Review':
      return 'bg-orange-100 text-orange-500'
    case 'Offered':
      return 'bg-green-100 text-green-600'
    case 'Rejected':
      return 'bg-red-100 text-red-500'
    case 'Interview':
      return 'bg-purple-100 text-purple-600'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- ================= Stats ================= -->

    <div class="grid grid-cols-5 gap-6">
      <div v-for="card in stats" :key="card.title" class="rounded-2xl bg-white p-5 shadow-md">
        <div class="flex items-start gap-3">
          <div
            :class="card.color"
            class="flex h-11 w-11 items-center justify-center rounded-xl text-white text-lg"
          >
            <i :class="card.icon" class="text-3xl" :style="{ color: card.color }"></i>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              {{ card.title }}
            </p>

            <h2 class="mt-2 text-5xl font-light">
              {{ card.value }}
            </h2>
          </div>
        </div>

        <p :class="card.footerColor" class="mt-6 text-center text-xs">
          {{ card.footer }}
        </p>
      </div>
    </div>

    <!-- ================= Main ================= -->

    <div class="mt-6 grid grid-cols-12 gap-6">
      <!-- LEFT PANEL -->

      <div class="col-span-4 rounded-2xl bg-white shadow-md">
        <!-- Title -->

        <div class="border-b p-6">
          <h2 class="text-xl font-semibold">My Applications</h2>

          <!-- Tabs -->

          <div class="mt-5 flex gap-5 text-sm">
            <button class="border-b-2 border-blue-600 pb-1 font-medium">All(18)</button>

            <button class="text-gray-500">Under review(18)</button>

            <button class="text-gray-500">Interviews(18)</button>

            <button class="text-gray-500">Offers(18)</button>

            <button class="text-gray-500">Rejected(18)</button>
          </div>

          <!-- Search -->

          <div class="mt-5 flex gap-3">
            <input
              type="text"
              placeholder="Search Application"
              class="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-blue-500"
            />

            <button class="rounded-full border px-5 py-2 text-sm hover:bg-gray-50">Filter</button>
          </div>
        </div>

        <!-- Application List -->

        <div>
          <div
            v-for="item in applications"
            :key="item.id"
            class="flex items-center justify-between border-b p-5 hover:bg-gray-50"
          >
            <div class="flex items-center gap-4">
              <!-- Logo -->

              <div
                class="flex h-14 w-14 items-center justify-center rounded bg-blue-900 font-bold text-white"
              >
                {{ item.logo }}
              </div>

              <!-- Info -->

              <div>
                <h3 class="font-medium text-gray-800">
                  {{ item.position }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  {{ item.company }}
                </p>

                <p class="text-xs text-gray-400">
                  {{ item.date }}
                </p>
              </div>
            </div>

            <!-- Right -->

            <div class="flex items-center gap-3">
              <span
                :class="badgeClass(item.status)"
                class="rounded-full px-3 py-1 text-xs font-medium"
              >
                {{ item.status }}
              </span>

              <button
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                >
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->

        <div class="flex items-center justify-center gap-2 p-6">
          <button class="h-8 w-8 rounded bg-gray-200">‹</button>

          <button class="h-8 w-8 rounded bg-blue-600 text-white">1</button>

          <button class="h-8 w-8 rounded bg-gray-200">2</button>

          <button class="h-8 w-8 rounded bg-gray-200">3</button>

          <button class="h-8 w-8 rounded bg-gray-200">4</button>

          <button class="h-8 w-8 rounded bg-gray-200">5</button>

          <button class="h-8 w-8 rounded bg-gray-200">›</button>
        </div>
      </div>

      <!-- PART 2 -->

      <!-- ================= CENTER PANEL ================= -->

      <div class="col-span-5 overflow-hidden rounded-2xl bg-white shadow-md">
        <!-- Header -->

        <div class="border-b p-6">
          <button class="mb-5 text-sm text-gray-500 hover:text-blue-600">← Back to list</button>

          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-semibold">Senior Full-Stack Developer</h2>

              <p class="mt-1 text-sm text-gray-500">ABA Bank</p>

              <div class="mt-4 flex items-center gap-3">
                <span class="text-sm text-gray-400"> Applied on 12 May 2026 </span>

                <span
                  class="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-500"
                >
                  Under Review
                </span>
              </div>
            </div>

            <button
              class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              View Job Details
            </button>
          </div>
        </div>

        <!-- Progress -->

        <div class="border-b p-6">
          <h3 class="mb-8 font-semibold text-gray-700">Applications Progress</h3>

          <div class="relative flex justify-between">
            <!-- line -->

            <div class="absolute left-0 right-0 top-5 h-1 bg-gray-200"></div>

            <div class="absolute left-0 top-5 h-1 w-1/4 bg-blue-500"></div>

            <!-- Step -->

            <div
              v-for="(step, index) in [
                { title: 'Applied', color: 'bg-blue-500', active: true },
                { title: 'Under Review', color: 'bg-orange-400', active: true },
                { title: 'Interview', color: 'bg-gray-300' },
                { title: 'Offered', color: 'bg-gray-300' },
                { title: 'Hired', color: 'bg-gray-300' },
              ]"
              :key="index"
              class="relative z-10 flex flex-col items-center"
            >
              <div
                :class="[
                  'flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow',
                  step.color,
                  step.active ? 'text-white' : 'text-gray-500',
                ]"
              >
                {{ index + 1 }}
              </div>

              <p class="mt-3 text-xs text-center">
                {{ step.title }}
              </p>
            </div>
          </div>
        </div>

        <!-- Timeline -->

        <div class="p-6">
          <h3 class="mb-8 font-semibold text-gray-700">Progress Timeline</h3>

          <div class="relative ml-4">
            <!-- Vertical line -->

            <div class="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

            <!-- Item -->

            <div
              v-for="(item, index) in [
                {
                  title: 'Application under review',
                  desc: 'Your application is being reviewed by hiring team.',
                  color: 'bg-orange-400',
                  date: '30 May 2026',
                  time: '10:30 AM',
                },
                {
                  title: 'Application submitted',
                  desc: 'You have successfully submitted your application.',
                  color: 'bg-indigo-500',
                  date: '31 May 2026',
                  time: '10:30 AM',
                },
                {
                  title: 'Application Received',
                  desc: 'ABA Bank has received your application.',
                  color: 'bg-gray-400',
                  date: '31 May 2026',
                  time: '7:30 PM',
                },
              ]"
              :key="index"
              class="relative mb-10 flex gap-5"
            >
              <!-- Circle -->

              <div
                :class="item.color"
                class="relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              >
                •
              </div>

              <!-- Content -->

              <div class="flex-1">
                <div class="flex justify-between">
                  <div>
                    <h4 class="font-medium">
                      {{ item.title }}
                    </h4>

                    <p class="mt-1 text-sm text-gray-500">
                      {{ item.desc }}
                    </p>
                  </div>

                  <div class="text-right text-xs text-gray-400">
                    <p>{{ item.date }}</p>

                    <p>{{ item.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="rounded-full border border-indigo-500 px-5 py-2 text-sm text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            View Full History
          </button>
        </div>
      </div>

      <!-- PART 3 -->

      <!-- ================= RIGHT PANEL ================= -->

      <div class="col-span-3 space-y-5">
        <!-- ================= Job Summary ================= -->

        <div class="rounded-2xl bg-white p-6 shadow-md">
          <h2 class="mb-6 text-xl font-semibold">Job Summary</h2>

          <div class="space-y-5">
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Job Title</p>
              <p class="mt-1 font-medium">Senior Full-Stack Developer</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Department</p>
              <p class="mt-1 font-medium">IT Department</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Experience Level</p>
              <p class="mt-1 font-medium">5+ Years</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Employee Type</p>
              <p class="mt-1 font-medium">Full Time</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Work Mode</p>
              <p class="mt-1 font-medium">Hybrid</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Salary Range</p>
              <p class="mt-1 font-medium">$2,000 - $3,500 / Month</p>
            </div>
          </div>
        </div>

        <!-- ================= Company ================= -->

        <div class="rounded-2xl bg-white p-6 shadow-md">
          <h2 class="mb-5 text-xl font-semibold">Company</h2>

          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-900 font-bold text-white"
            >
              ABA
            </div>

            <div>
              <h3 class="font-semibold">ABA Bank</h3>

              <button class="mt-2 text-sm text-indigo-600 hover:underline">
                View Bank Details →
              </button>
            </div>
          </div>

          <p class="mt-6 text-sm leading-7 text-gray-600">
            ABA Bank is one of the leading commercial banks in Cambodia, providing modern financial
            solutions to individuals and businesses.
          </p>

          <div class="mt-6 flex items-center gap-3 border-t pt-5">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              🌐
            </div>

            <div>
              <p class="text-xs text-gray-400">Website</p>

              <a href="#" class="text-sm text-indigo-600 hover:underline"> www.ababank.com.kh </a>
            </div>
          </div>
        </div>

        <!-- ================= Need Help ================= -->

        <div class="rounded-2xl bg-white p-6 shadow-md">
          <h2 class="mb-5 text-xl font-semibold">Need Help?</h2>

          <p class="mb-6 text-sm leading-6 text-gray-500">
            Tips to improve your application tracking experience and prepare for your next
            recruitment stage.
          </p>

          <button
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            View Application Tip
            <span>▼</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
