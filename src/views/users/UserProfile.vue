<script setup>
import { ref } from 'vue'
import PersonalView from '@/components/profile/PersonalView.vue'
import EducationView from '@/components/profile/EducationView.vue'
const selectedTab = ref('Education')
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="flex">
      <ul class="flex gap-5 p-4 justify-start items-start w-full">
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Personal Information' }"
          @click="selectedTab = 'Personal Information'"
          class="cursor-pointer"
        >
          Personal Information
        </li>
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Education' }"
          @click="selectedTab = 'Education'"
          class="cursor-pointer"
        >
          Education
        </li>
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Experience' }"
          @click="selectedTab = 'Experience'"
          class="cursor-pointer"
        >
          Experience
        </li>
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Skills' }"
          @click="selectedTab = 'Skills'"
          class="cursor-pointer"
        >
          Skills
        </li>
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Preferences' }"
          @click="selectedTab = 'Preferences'"
          class="cursor-pointer"
        >
          Preferences
        </li>
        <li
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Account Setting' }"
          @click="selectedTab = 'Account Setting'"
          class="cursor-pointer"
        >
          Account Setting
        </li>
      </ul>
    </div>
    <div class="border-b" />
    <section v-if="selectedTab === 'Education'">
      <EducationView />
    </section>
    <section v-else-if="selectedTab === 'Personal Information'">
      <PersonalView />
    </section>
    <section v-else-if="selectedTab === 'Experience'">
      <div class="p-6"><p>Experience content goes here.</p></div>
    </section>
    <section v-else-if="selectedTab === 'Skills'">
      <div class="p-6"><p>Skills content goes here.</p></div>
    </section>
    <section v-else-if="selectedTab === 'Preferences'">
      <div class="p-6"><p>Preferences content goes here.</p></div>
    </section>
    <section v-else-if="selectedTab === 'Account Setting'">
      <div class="p-6"><p>Account Setting content goes here.</p></div>
    </section>
  </div>
</template>
