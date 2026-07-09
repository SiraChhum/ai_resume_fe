<script setup>
import { useLoading } from '@/composables/useMainLoading'

const { loading } = useLoading()
</script>

<template>
  <div class="relative w-full h-full min-h-full">
    <slot />

    <Transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur"
      >
        <div class="text-center">
          <div
            class="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
          ></div>

          <p class="mt-4 text-lg font-semibold text-slate-700">Loading...</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
