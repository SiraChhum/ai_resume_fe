<script setup>
import 'primeicons/primeicons.css'
const stats = [
  {
    title: 'Total Resume',
    value: 0,
    icon: 'pi pi-file',
    bg: 'bg-purple-100',
    color: '#7C3AED',
  },
  {
    title: 'Profile Views',
    value: 0,
    icon: 'pi pi-eye',
    bg: 'bg-blue-100',
    color: '#2563EB',
  },
  {
    title: 'Downloads',
    value: 0,
    icon: 'pi pi-download',
    bg: 'bg-green-100',
    color: '#16A34A',
  },
  {
    title: 'Best Match Score',
    value: '0%',
    icon: 'pi pi-star-fill',
    bg: 'bg-orange-100',
    color: '#FB923C',
  },
]

const resumes = [
  {
    id: 1,
    title: 'Software Engineer Resume',
    update: '2 days ago',
    size: '245 KB',
    score: 92,
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300',
    tags: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Frontend Developer Resume',
    update: '1 day ago',
    size: '205 KB',
    score: 85,
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300',
    tags: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Full Stack Developer Resume',
    update: '4 days ago',
    size: '295 KB',
    score: 85,
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'AWS'],
  },
]

const analysis = ['Experience', 'Education', 'Skills', 'Keywords']

const activities = [
  {
    title: 'Software engineer resume uploaded',
    time: '2 days ago',
    icon: 'pi pi-download',
    color: '#22C55E',
  },
  {
    title: 'Profile viewed 5 times',
    time: '2 days ago',
    icon: 'pi pi-eye',
    color: '#3B82F6',
  },
  {
    title: 'Resume downloaded',
    time: '2 days ago',
    icon: 'pi pi-arrow-down',
    color: '#F97316',
  },
  {
    title: 'Match score improved to 92%',
    time: '2 days ago',
    icon: 'pi pi-star-fill',
    color: '#A855F7',
  },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <!-- Top Statistics -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="card in stats"
        :key="card.title"
        class="rounded-2xl bg-white shadow-md px-6 py-5 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl flex items-center justify-center" :class="card.bg">
            <i :class="card.icon" class="text-3xl" :style="{ color: card.color }"></i>
          </div>

          <div>
            <p class="text-indigo-700 font-medium">
              {{ card.title }}
            </p>

            <h2 class="text-2xl font-bold mt-1">
              {{ card.value }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">
      <!-- LEFT -->
      <div class="xl:col-span-8">
        <div class="bg-white rounded-2xl shadow-md p-6">
          <h2 class="text-3xl font-semibold text-indigo-600 mb-6">Your Resume</h2>

          <!-- Resume List -->
          <div v-for="resume in resumes" :key="resume.id" class="border-b last:border-none py-6">
            <div class="flex flex-col lg:flex-row gap-6">
              <!-- Thumbnail -->
              <div class="flex-shrink-0">
                <img :src="resume.image" class="w-24 rounded border" />
              </div>

              <!-- Info -->
              <div class="flex-1">
                <h3 class="text-3xl font-semibold text-gray-800">
                  {{ resume.title }}
                </h3>

                <p class="text-gray-500 mt-2">
                  Update:
                  {{ resume.update }}
                  •
                  {{ resume.size }}
                  • PDF
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in resume.tags"
                    :key="tag"
                    class="text-sm px-3 py-1 rounded-full bg-indigo-50 text-indigo-600"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Match Score -->
                <div class="mt-6">
                  <div class="flex items-center gap-4">
                    <span class="text-green-600 font-semibold"> Match Score </span>

                    <span class="font-bold text-green-600"> {{ resume.score }}% </span>
                  </div>

                  <div class="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden shadow-inner">
                    <div
                      class="h-full bg-green-500 rounded-full"
                      :style="{ width: resume.score + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex lg:flex-col gap-3 justify-center">
                <button
                  class="border-2 border-indigo-600 text-indigo-600 font-medium rounded-xl px-8 py-3 hover:bg-indigo-50 transition"
                >
                  Preview
                </button>

                <button
                  class="bg-indigo-600 text-white rounded-xl px-8 py-3 hover:bg-indigo-700 transition"
                >
                  Set As Default
                </button>
              </div>
            </div>
          </div>

          <!-- Upload -->
          <div class="mt-8 border-2 border-dashed border-indigo-400 rounded-2xl p-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-5">
                <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i class="pi pi-cloud-upload text-3xl text-indigo-600"></i>
                </div>

                <div>
                  <h3 class="text-xl font-semibold">Click or drag your resume here</h3>

                  <p class="text-gray-500 mt-1">Supports PDF, DOC, DOCX (Max 20MB)</p>
                </div>
              </div>

              <button
                class="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="xl:col-span-4 space-y-6">
        <!-- Analysis -->
        <div class="bg-white rounded-2xl shadow-md p-6">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-6">Resume Analysis</h2>

          <div class="flex items-center gap-6">
            <!-- Circle -->
            <div
              class="relative w-36 h-36 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center"
            >
              <h2 class="text-3xl font-bold">92%</h2>

              <p class="text-sm text-gray-500">Excellent</p>
            </div>

            <!-- Checklist -->
            <div class="space-y-3">
              <div v-for="item in analysis" :key="item" class="flex items-center gap-3">
                <i class="pi pi-check-circle text-green-500"></i>

                <span>
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <button
            class="mt-8 w-full border-2 border-indigo-500 rounded-xl py-3 text-indigo-600 hover:bg-indigo-50"
          >
            View Full Analysis →
          </button>
        </div>

        <!-- Activity -->
        <div class="bg-white rounded-2xl shadow-md p-6">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-6">Recent Resume Activity</h2>

          <div
            v-for="item in activities"
            :key="item.title"
            class="flex gap-4 py-4 border-b last:border-none"
          >
            <div class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <i :class="item.icon" class="text-2xl" :style="{ color: item.color }"></i>
            </div>

            <div>
              <h4 class="font-medium">
                {{ item.title }}
              </h4>

              <p class="text-gray-500 text-sm mt-1">
                {{ item.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
