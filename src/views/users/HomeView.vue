<template>
  <div
    class="bg-[#F8F9FD] text-[#1E293B] min-h-0 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
  >
    <main class="max-w-[1400px] mx-auto p-6 flex flex-col gap-6">
      <!-- Top Action & Stats Bar -->
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div class="flex gap-4 flex-grow flex-wrap md:flex-nowrap">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white px-5 py-3 rounded-xl flex items-center gap-4 flex-1 min-w-[180px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              :class="iconBoxClass(stat.color)"
            >
              <component :is="stat.icon" class="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span class="text-xs text-[#64748B] block">{{ stat.label }}</span>
              <strong class="text-lg">{{ stat.value }}</strong>
            </div>
          </div>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          class="hidden"
          @change="handleFile"
        />

        <button
          @click="openFilePicker"
          class="bg-[#4452FE] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-[0_4px_10px_rgba(68,82,254,0.2)]"
        >
          <i class="fa-solid fa-cloud-arrow-up"></i>
          Upload New Resume
        </button>
      </div>

      <!-- Main Content Split Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <!-- Left Side: Recommended Jobs -->
        <section class="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-base font-semibold">Recommended Jobs for You</h2>
            <a href="#" class="text-[#4452FE] no-underline text-[13px] font-semibold">View All</a>
          </div>

          <div class="flex flex-col gap-4">
            <div
              v-for="job in jobs"
              :key="job.id"
              class="bg-[#EFF3FE] rounded-xl p-[18px] flex justify-between items-center border border-[rgba(68,82,254,0.1)]"
            >
              <div class="flex gap-4">
                <div
                  class="w-12 h-12 text-white font-bold text-xs rounded-lg flex items-center justify-center"
                  :class="job.logoBg"
                >
                  {{ job.logo }}
                </div>
                <div>
                  <h3 class="text-base text-[#273472] mb-1">{{ job.title }}</h3>
                  <p class="text-xs text-[#64748B]">{{ job.company }}</p>
                  <p class="text-xs text-[#64748B]">{{ job.location }}</p>
                  <div class="flex gap-1.5 my-2 flex-wrap">
                    <span
                      v-for="tag in job.tags"
                      :key="tag"
                      class="bg-white text-[#4452FE] text-[11px] px-2.5 py-[3px] rounded-xl border border-[#E2E8F0]"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <p class="font-semibold text-[#475569] text-[13px]">{{ job.salary }}</p>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3">
                <i
                  class="fa-regular fa-heart text-[#64748B] cursor-pointer text-lg"
                  :class="{ 'fa-solid text-red-500': job.favorited }"
                  @click="toggleFavorite(job)"
                ></i>
                <div
                  class="w-[45px] h-[45px] border-[3px] border-[#16A34A] rounded-full flex items-center justify-center text-xs font-bold text-[#16A34A]"
                >
                  {{ job.match }}%
                </div>
                <button
                  class="bg-[#4452FE] text-white border-none px-4 py-2 rounded-md cursor-pointer text-xs"
                >
                  Apply Now
                </button>
                <!-- <div
                  :class="isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'"
                  class="p-8 min-h-screen transition-all duration-300"
                >
                  <button
                    @click="toggleBackground($event)"
                    class="px-4 py-2 font-bold bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Save
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </section>

        <!-- Right Side: Analytics -->
        <section class="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col">
              <h3 class="text-sm text-[#4452FE] mb-4">Resume Analysis</h3>

              <div
                class="w-[100px] h-[100px] border-[6px] border-[#16A34A] rounded-full flex flex-col items-center justify-center my-2.5 mb-5"
              >
                <span class="text-xl font-bold">90%</span>
                <span class="text-[9px] text-[#64748B]">Resume Score</span>
              </div>

              <div>
                <h4 class="text-xs my-3 mb-1.5">Skills Found</h4>
                <ul class="list-none text-sm flex flex-col gap-1.5">
                  <li v-for="skill in skillsFound" :key="skill">
                    <i :class="skill.icon" class="text-green-500"></i>
                    <i class="fa-solid fa-circle-check text-[#16A34A] mr-1.5"></i>{{ skill.name }}
                  </li>
                </ul>

                <h4 class="text-xs my-3 mb-1.5">Skills to improve</h4>
                <ul class="list-none text-sm flex flex-col gap-1.5">
                  <li v-for="skill in skillsToImprove" :key="skill">
                    <i :class="skill.icon"></i>
                    <i class="fa-solid fa-circle-dot text-[#EAB308] mr-1.5"></i>{{ skill.name }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col">
              <h3 class="text-sm text-[#4452FE] mb-4">Match Analytics</h3>

              <div v-for="bar in matchBars" :key="bar.label" class="mb-3.5">
                <div class="flex justify-between text-[11px] text-[#64748B] mb-1">
                  <span>{{ bar.label }}</span>
                  <span>{{ bar.value }}%</span>
                </div>
                <div class="bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#4452FE] h-full" :style="{ width: bar.value + '%' }"></div>
                </div>
              </div>

              <button
                class="bg-transparent text-[#4452FE] border border-[#4452FE] py-2.5 rounded-md cursor-pointer font-semibold mt-auto"
              >
                Improve Resume
              </button>
              <p class="text-xs text-center text-[#64748B] mt-3">Great Match! Keep applying</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Bottom Section: Tracker -->
      <section class="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div class="flex justify-between items-center mb-5">
          <h2 class="text-base font-semibold">Application Status Tracker</h2>
          <a href="#" class="text-[#4452FE] no-underline text-[13px] font-semibold">View Details</a>
        </div>

        <div class="relative flex justify-between my-[30px]">
          <!-- background line -->
          <div class="absolute top-[15px] left-0 right-0 h-0.5 bg-[#E2E8F0] z-[1]"></div>
          <!-- progress line -->
          <div
            class="absolute top-[15px] left-0 h-0.5 bg-[#16A34A] z-[2]"
            :style="{ width: trackerProgress + '%' }"
          ></div>

          <div
            v-for="step in trackerSteps"
            :key="step.label"
            class="relative z-[3] flex flex-col items-center w-[60px]"
          >
            <div
              class="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-xs"
              :class="stepIconClass(step.status)"
            >
              <i :class="step.icon"></i>
            </div>
            <span class="mt-2 text-xs font-medium text-[#475569]">{{ step.label }}</span>
          </div>
        </div>

        <div>
          <h3 class="text-[13px] text-[#4452FE] mb-3">Recent Applications</h3>
          <table class="w-full border-collapse text-left">
            <thead>
              <tr>
                <th class="text-xs text-[#475569] pb-2 font-medium">Job title</th>
                <th class="text-xs text-[#475569] pb-2 font-medium">Company</th>
                <th class="text-xs text-[#475569] pb-2 font-medium">Status</th>
                <th class="text-xs text-[#475569] pb-2 font-medium">Applied On</th>
                <th class="text-xs text-[#475569] pb-2 font-medium">Match</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="recentApplications.length === 0">
                <td colspan="5" class="text-center text-[#64748B] py-4 text-[13px] tracking-[2px]">
                  ---------
                </td>
              </tr>
              <tr v-for="app in recentApplications" :key="app.id">
                <td class="text-sm py-2">{{ app.title }}</td>
                <td class="text-sm py-2">{{ app.company }}</td>
                <td class="text-sm py-2">{{ app.status }}</td>
                <td class="text-sm py-2">{{ app.appliedOn }}</td>
                <td class="text-sm py-2">{{ app.match }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
    <Dialog v-model:open="loadingDialog">
      <DialogContent class="sm:max-w-md">
        <div class="flex flex-col items-center py-8">
          <!-- Spinner -->
          <div
            class="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
          ></div>

          <h2 class="mt-6 text-xl font-semibold">Matching Your Resume</h2>

          <p class="mt-2 text-center text-gray-500">
            Please wait while we analyze your resume and find the best job matches...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, Briefcase, Target, Clock3 } from 'lucide-vue-next'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const file = ref(null)
const loadingDialog = ref(false)

const fileInput = ref(null)

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleFile = (e) => {
  const selectedFile = e.target.files?.[0]
  if (!selectedFile) return

  file.value = selectedFile

  loadingDialog.value = true

  setTimeout(() => {
    loadingDialog.value = false

    // Reset so the same file can be selected again
    e.target.value = ''
  }, 3000)
}
const stats = ref([
  {
    label: 'Total Applications',
    value: 0,
    icon: FileText,
    color: 'purple',
  },
  {
    label: 'Active Jobs',
    value: 0,
    icon: Briefcase,
    color: 'blue',
  },
  {
    label: 'Match Rate',
    value: 0,
    icon: Target,
    color: 'green',
  },
  {
    label: 'Avg. Response Time',
    value: 0,
    icon: Clock3,
    color: 'orange',
  },
])
const iconBoxClass = (color) => {
  const map = {
    purple: 'bg-[#F3E8FF] text-[#9333EA]',
    blue: 'bg-[#DBEAFE] text-[#2563EB]',
    green: 'bg-[#DCFCE7] text-[#16A34A]',
    orange: 'bg-[#FFEDD5] text-[#EA580C]',
  }
  return map[color] || ''
}

const jobs = ref([
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'ABA Bank',
    location: 'Phnom Penh, Cambodia',
    tags: ['Full-time', 'Remote', 'React', 'Node.js'],
    salary: '$120 - $150',
    logo: 'ABA',
    logoBg: 'bg-[#0F2942]',
    match: 87,
    favorited: false,
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'ACLEDA Bank',
    location: 'Phnom Penh, Cambodia',
    tags: ['Full-time', 'Hybrid', 'Vue.js', 'TypeScript'],
    salary: '$100k - $130k',
    logo: 'Y',
    logoBg: 'bg-[#113E6B]',
    match: 97,
    favorited: false,
  },
])

const toggleFavorite = (job) => {
  job.favorited = !job.favorited
}

const skillsFound = ref([
  { name: 'Vue.js', icon: 'pi pi-check-circle' },
  { name: 'Node.js', icon: 'pi pi-check-circle' },
  { name: 'SQL', icon: 'pi pi-check-circle' },
  { name: 'JavaScript', icon: 'pi pi-check-circle' },
])
const skillsToImprove = ref([
  { name: 'AWS', icon: 'pi pi-check-square' },
  { name: 'Docker', icon: 'pi pi-check-square' },
  { name: 'Flutter', icon: 'pi pi-check-square' },
])

const matchBars = ref([
  { label: 'Technical Skills', value: 95 },
  { label: 'Experience', value: 90 },
  { label: 'Education', value: 97 },
  { label: 'Keywords', value: 88 },
])

const trackerSteps = ref([
  { label: 'Applied', icon: 'fa-solid fa-check', status: 'completed' },
  { label: 'Screening', icon: 'fa-solid fa-check', status: 'completed' },
  { label: 'Interview', icon: 'fa-solid fa-handshake', status: 'active' },
  { label: 'Offer', icon: 'fa-solid fa-spinner', status: 'pending' },
  { label: 'Hired', icon: 'fa-solid fa-user-tie', status: 'pending' },
])

const trackerProgress = ref(50)

const stepIconClass = (status) => {
  if (status === 'completed') return 'bg-[#16A34A] border-[#16A34A] text-white'
  if (status === 'active') return 'bg-[#EA580C] border-[#EA580C] text-white'
  return 'border-[#CBD5E1] text-[#94A3B8]'
}

const recentApplications = ref([])

// // 2. Create a reactive boolean state
// const isChanged = ref(false)

// const toggleBackground = (event) => {
//   console.log('Clicked element:', event.target)

//   // 3. Toggle the boolean value (true/false)
//   isChanged.value = !isChanged.value
// }
</script>
