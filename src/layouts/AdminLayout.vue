<template>
  <div class="admin-layout">
    <aside>Admin Sidebar: Manage Users | Settings | Analytics</aside>
    <main>
      <slot />
      <!-- 👈 Page content renders here -->
    </main>
  </div>
</template>

<script setup>
// Admin sidebar toggles or permission logic goes here
</script>
