<script setup>
import { useLoading } from '@/composables/useLoading'

const { loading } = useLoading()
</script>

<template>
  <Transition name="fade">
    <div v-if="loading" class="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div class="text-center">
        <div
          class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"
        ></div>

        <p class="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
