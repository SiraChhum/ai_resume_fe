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
        'bg-[#0B1528] text-white transition-all duration-300 overflow-hidden sticky top-0 h-screen flex flex-col justify-between shadow-2xl',
        sidebarOpen ? 'w-72' : 'w-20',
      ]"
    >
      <div class="flex-1">
        <!-- Brand / Header -->
        <div class="p-6 border-b border-slate-800/40">
          <div v-show="sidebarOpen" class="transition-all duration-300">
            <h2 class="text-2xl font-bold tracking-tight text-white leading-tight">Recruiter</h2>
            <p class="text-xs text-slate-400 font-medium mt-0.5">Executive Talent</p>
          </div>
          <div v-show="!sidebarOpen" class="text-center font-bold text-xl text-indigo-400">
            R
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 mt-4">
          <ul class="space-y-2.5">
            <li>
              <router-link
                to="/recruiter/jobs"
                class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-300"
                active-class="bg-[#2B40E6] text-white shadow-md font-bold"
              >
                <i class="pi pi-briefcase" style="font-size: 0.95rem"></i>
                <span v-show="sidebarOpen" class="transition-all">Job</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/recruiter/applications"
                class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-300"
                active-class="bg-[#2B40E6] text-white shadow-md font-bold"
              >
                <i class="pi pi-file" style="font-size: 0.95rem"></i>
                <span v-show="sidebarOpen" class="transition-all">Applications</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/recruiter/interviews"
                class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-300"
                active-class="bg-[#2B40E6] text-white shadow-md font-bold"
              >
                <i class="pi pi-calendar" style="font-size: 0.95rem"></i>
                <span v-show="sidebarOpen" class="transition-all">Interviews</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/recruiter/alerts"
                class="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-300"
                active-class="bg-[#2B40E6] text-white shadow-md font-bold"
              >
                <i class="pi pi-bell" style="font-size: 0.95rem"></i>
                <span v-show="sidebarOpen" class="transition-all">Alerts</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Bottom Buttons: Profile, Post New Job -->
      <div class="p-4 border-t border-slate-800/40 space-y-2 mb-2" v-show="sidebarOpen">
        <router-link
          to="/user/profile"
          class="flex items-center justify-center gap-2 rounded-xl bg-[#4D62FD]/90 hover:bg-[#4D62FD] text-white px-4 py-3 text-sm font-semibold transition-all shadow-sm text-center"
        >
          Profile
        </router-link>
        <button
          class="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#2B40E6] hover:bg-[#1E30C9] text-white px-4 py-3 text-sm font-semibold transition-all shadow-md cursor-pointer"
        >
          + Post New Job
        </button>
      </div>
      <!-- Minimized view of bottom buttons -->
      <div class="p-4 border-t border-slate-800/40 flex flex-col items-center gap-3 mb-2" v-show="!sidebarOpen">
        <router-link to="/user/profile" class="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
          <i class="pi pi-user" style="font-size: 1.1rem"></i>
        </router-link>
        <button class="p-2 bg-[#2B40E6] hover:bg-[#1E30C9] rounded-lg text-white transition shadow cursor-pointer">
          <i class="pi pi-plus" style="font-size: 1.1rem"></i>
        </button>
      </div>
    </aside>

    <!-- Content -->
    <div class="flex flex-1 flex-col min-h-0 bg-slate-50">
      <!-- Navbar -->
      <HeaderView @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <!-- Main -->
      <main class="flex-1 p-2 overflow-y-auto min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>
