<script setup>
import { ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const sidebarOpen = ref(true)
const open = ref(false)
</script>

<template>
  <div class="flex bg-slate-100 min-h-screen sticky top-0 h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-slate-900 text-white transition-all duration-300 overflow-hidden sticky top-0 h-screen',
        sidebarOpen ? 'w-64' : 'w-20',
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
            >
              <i class="pi pi-home" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/user/profile"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              <i class="pi pi-file" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Resume Management</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/orders"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              <i class="pi pi-file" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Job Recommendations</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/settings"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              <i class="pi pi-envelope" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Application Management</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              <i class="pi pi-map-marker" style="font-size: 1rem"></i>
              <span v-show="sidebarOpen">Application Tracking</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings"
              class="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
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
      <header class="flex h-16 items-center justify-between bg-white border-b px-6 shadow-sm">
        <div class="flex items-center gap-4">
          <button @click="sidebarOpen = !sidebarOpen" class="rounded-lg p-2 hover:bg-slate-100">
            ☰
          </button>

          <h1 class="text-xl font-semibold">Welcome</h1>
        </div>
        <div class="flex justify-between items-center gap-4">
          <input class="w-80 h-10 border rounded-sm text-brown-300" />
          <div class="">
            <p>Search Job</p>
          </div>
        </div>

        <div class="flex gap-2"></div>
        <DropdownMenu v-model:open="open">
          <DropdownMenuTrigger as-child>
            <div class="flex items-center gap-3 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                class="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
              />

              <div class="hidden md:block">
                <p class="text-sm font-semibold text-slate-800">Chhum Sira</p>
                <p class="text-xs text-slate-500">User</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <router-link to="/user/profile">
              <DropdownMenuItem>
                <i class="pi pi-user mr-2"></i>
                Profile
              </DropdownMenuItem>
            </router-link>

            <DropdownMenuItem>
              <i class="pi pi-credit-card mr-2"></i>
              Billing
            </DropdownMenuItem>

            <DropdownMenuItem>
              <i class="pi pi-users mr-2"></i>
              Team
            </DropdownMenuItem>

            <DropdownMenuItem>
              <i class="pi pi-calendar mr-2"></i>
              Subscription
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem class="text-red-500">
              <i class="pi pi-sign-out mr-2"></i>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <!-- Main -->
      <main class="flex-1 p-2 overflow-y-auto min-h-0">
        <slot />
      </main>
    </div>
  </div>
</template>
