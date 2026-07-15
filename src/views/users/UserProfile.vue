<script setup>
import { ref } from 'vue'
import PersonalView from '@/components/profile/PersonalView.vue'
// import EducationView from '@/components/profile/EducationView.vue'
// import ExperienceView from '@/components/profile/ExperienceView.vue'
// import SkillView from '@/components/profile/SkillView.vue'
// import PreferenceView from '@/components/profile/PreferenceView.vue'
import AccountSettingView from '@/components/profile/AccountSetting.vue'
const selectedTab = ref('Personal Information')
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
          :class="{ 'text-indigo-600 font-semibold': selectedTab === 'Account Setting' }"
          @click="selectedTab = 'Account Setting'"
          class="cursor-pointer"
        >
          Account Setting
        </li>
      </ul>
    </div>
    <div class="border-b" />

    <section v-if="selectedTab === 'Personal Information'">
      <PersonalView />
    </section>

    <section v-else-if="selectedTab === 'Account Setting'">
      <div class="p-6"><AccountSettingView /></div>
    </section>
  </div>
</template>
