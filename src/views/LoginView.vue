<script setup>
import { ref } from 'vue'

import LoginForm from '@/components/loginform/LoginForm.vue'
import RegisterForm from '@/components/loginform/RegisterForm.vue'
import ForgotPasswordForm from '@/components/loginform/ForgotPasswordForm.vue'

const currentForm = ref('login')

const showLogin = () => (currentForm.value = 'login')
const showRegister = () => (currentForm.value = 'register')
const showForgot = () => (currentForm.value = 'forgot')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-slate-900">
    <div class="w-full max-w-[440px]">
      <LoginForm v-if="currentForm === 'login'" @register="showRegister" @forgot="showForgot" />

      <RegisterForm v-if="currentForm === 'register'" @login="showLogin" />

      <ForgotPasswordForm v-if="currentForm === 'forgot'" @login="showLogin" />
    </div>
  </div>
</template>
