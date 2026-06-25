<script setup>
defineEmits(['login'])
</script>

<template>
  <div class="bg-[#1b222c] p-8 rounded-xl border border-slate-700">
    <h2 class="text-white text-xl font-bold">Forgot Password</h2>

    <input
      type="email"
      placeholder="Email"
      class="w-full mt-4 p-3 rounded bg-slate-800 text-white"
    />

    <button class="w-full mt-4 bg-emerald-500 text-white py-3 rounded">Send Reset Link</button>

    <div class="text-center mt-4">
      <button @click="$emit('login')" class="text-emerald-500">Back to Login</button>
    </div>
  </div>
</template>
