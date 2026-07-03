<template>
  <header class="flex h-16 items-center justify-between bg-white border-b px-6 shadow-sm">
    <div class="flex items-center gap-4">
      <button @click="$emit('toggleSidebar')" class="rounded-lg p-2 hover:bg-slate-100">☰</button>
      <h1 class="text-xl font-semibold">Welcome</h1>
    </div>
    <div class="flex justify-between items-center gap-4">
      <input class="w-80 h-10 border rounded-sm text-brown-300" />
      <div>
        <p>Search Job</p>
      </div>
      <router-link to="/employer/dashboard">employer</router-link>
      <router-link to="/admin/dashboard">Admin</router-link>
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
</template>

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

const open = ref(false)
</script>
