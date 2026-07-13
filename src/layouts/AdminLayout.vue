<script setup>
import { ref } from 'vue'
import HeaderView from '@/layouts/HeaderView.vue'

const sidebarOpen = ref(true)
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
              to="/admin/system-monitoring"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">System Monitoring</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/user-management"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">User Mananagent </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/job-management"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Job Mananagent</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/applicant-management"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Applicant Mananagent</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/report"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen"> Reporting</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/authentication"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
              active-class="bg-blue-600 text-white"
              exact-active-class="bg-blue-600 text-white"
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen"> Authentication</span>
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
      <main class="flex-1 p-2 overflow-y-auto min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>
