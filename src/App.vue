<template>
  <!-- If layout is 'none', it renders a plain div instead of a layout component -->
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UserLayout from './layouts/UserLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()

const layouts = {
  user: UserLayout,
  admin: AdminLayout,
  none: 'div', // 👈 Maps 'none' to a plain standard HTML tag
}

const currentLayout = computed(() => {
  // Fallback to 'user' if meta.layout is missing entirely
  const layoutKey = route.meta.layout || 'user'
  return layouts[layoutKey]
})
</script>
