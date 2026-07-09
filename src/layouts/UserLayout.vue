<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderView from '@/layouts/HeaderView.vue'
import { useLoading } from '@/composables/useMainLoading'
import LoadingMain from '@/components/LoadingMain.vue'

const sidebarOpen = ref(true)
const route = useRoute()

const { showLoading, hideLoading } = useLoading()

watch(
  () => route.fullPath,
  async () => {
    showLoading()

    // simulate loading
    await new Promise((resolve) => setTimeout(resolve, 700))

    hideLoading()
  },
  { immediate: false },
)
</script>

<template>
  <div class="flex bg-slate-100 min-h-screen sticky top-0 h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-slate-900 text-white transition-all duration-300 overflow-hidden sticky top-0 h-screen',
        sidebarOpen ? 'w-96' : 'w-20',
      ]"
    >
      <div class="p-4 border-b border-slate-800">
        <h2 :class="['font-bold transition-all', sidebarOpen ? 'text-2xl' : 'text-lg text-center']">
          {{ sidebarOpen ? 'Title' : 'M' }}
        </h2>
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/user/dashboard"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/user/resume"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-file" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Resume Management</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/user/job-recommendation"
              :class="[
                'flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800',
                route.path.startsWith('/user/job-recommendation') ? 'bg-blue-600 text-white' : '',
              ]"
            >
              <i class="pi pi-file" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Job Recommendations</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/user/application-management"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-envelope" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Application Management</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/user/application-tracking"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-map-marker" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Application Tracking</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/user/favorite-jobs"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-heart" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Favorite Jobs</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Content -->
    <div class="flex flex-1 flex-col min-h-0">
      <!-- Navbar -->
      <HeaderView @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <!-- Main -->
      <main class="flex-1 min-h-0 overflow-y-auto">
        <LoadingMain>
          <slot />
        </LoadingMain>
      </main>
    </div>
  </div>
</template>
