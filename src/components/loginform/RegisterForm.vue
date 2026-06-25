<script setup>
defineEmits(['login'])
</script>

<template>
  <div class="bg-[#1b222c] p-8 rounded-xl border border-slate-700">
    <h2 class="text-white text-xl font-bold">Create your account</h2>

    <button class="w-full mt-6 bg-white text-black py-3 rounded">Register with Google</button>

    <div class="text-center mt-4">
      <button @click="$emit('login')" class="text-emerald-500">Back to Login</button>
    </div>
  </div>
</template>
