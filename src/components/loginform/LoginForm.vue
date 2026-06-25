<script setup>
import { reactive } from 'vue'

defineEmits(['register', 'forgot'])

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const handleSubmit = () => {
  console.log(form)
}
</script>

<template>
  <div class="bg-[#1b222c] p-8 rounded-xl border border-slate-700">
    <h2 class="text-white text-xl font-bold mb-2">Log in to your account</h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full p-3 rounded bg-slate-800 text-white"
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-full p-3 rounded bg-slate-800 text-white"
      />

      <div class="flex justify-between">
        <label>
          <input v-model="form.remember" type="checkbox" />
          Remember me
        </label>

        <button type="button" @click="$emit('forgot')" class="text-emerald-500">
          Forgot password?
        </button>
      </div>
      <router-link to="/user/dashboard">
        <button type="submit" class="w-full bg-emerald-500 text-white py-3 rounded">Login</button>
      </router-link>

      <div class="text-center">
        <button type="button" @click="$emit('register')" class="text-emerald-500">Sign up</button>
      </div>
    </form>
  </div>
</template>
