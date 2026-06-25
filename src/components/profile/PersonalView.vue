<script setup>
import { ref, computed } from 'vue'

const profile = ref({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  dob: '',
  gender: '',
  headline: '',
  bio: '',
})

const profileImage = ref('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500')

const bioCount = computed(() => profile.value.bio.length)

const handleUpload = (event) => {
  const file = event.target.files[0]

  if (file) {
    profileImage.value = URL.createObjectURL(file)
  }
}

const removePhoto = () => {
  profileImage.value = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500'
}

const saveProfile = () => {
  console.log(profile.value)
}

const resetForm = () => {
  profile.value = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    dob: '',
    gender: '',
    headline: '',
    bio: '',
  }
}
</script>

<template>
  <div class="bg-gray-50 p-4 md:p-8 min-h-screen">
    <main
      class="mx-auto max-w-5xl rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-10"
    >
      <!-- Header -->
      <header class="mb-10">
        <h1
          class="relative inline-block text-3xl font-bold text-gray-900 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-blue-500"
        >
          Personal Information
        </h1>
      </header>

      <div class="grid gap-10 lg:grid-cols-12">
        <!-- Form -->
        <section class="lg:col-span-7">
          <form class="space-y-6">
            <!-- Name + Email -->
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-semibold"> Full Name </label>

                <input
                  v-model="profile.fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label class="mb-1 block text-sm font-semibold"> Email Address </label>

                <input
                  v-model="profile.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full rounded-md border-gray-300"
                />
              </div>
            </div>

            <!-- Phone + Location -->
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-semibold"> Phone Number </label>

                <input
                  v-model="profile.phone"
                  type="tel"
                  placeholder="Enter phone number"
                  class="w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label class="mb-1 block text-sm font-semibold"> Location </label>

                <select v-model="profile.location" class="w-full rounded-md border-gray-300">
                  <option value="">Select Location</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ph">Philippines</option>
                  <option value="kh">Cambodia</option>
                </select>
              </div>
            </div>

            <!-- DOB + Gender -->
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-semibold"> Date of Birth </label>

                <input
                  v-model="profile.dob"
                  type="date"
                  class="w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label class="mb-1 block text-sm font-semibold"> Gender </label>

                <select v-model="profile.gender" class="w-full rounded-md border-gray-300">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <!-- Headline -->
            <div>
              <label class="mb-1 block text-sm font-semibold"> Headline </label>

              <input
                v-model="profile.headline"
                type="text"
                placeholder="e.g. Senior Web Developer"
                class="w-full rounded-md border-gray-300"
              />
            </div>

            <!-- Bio -->
            <div>
              <label class="mb-1 block text-sm font-semibold"> Bio </label>

              <textarea
                v-model="profile.bio"
                rows="6"
                maxlength="500"
                placeholder="Tell us about yourself..."
                class="w-full rounded-md border-gray-300"
              />

              <div
                class="mt-1 text-right text-xs"
                :class="bioCount >= 500 ? 'text-red-500' : 'text-gray-400'"
              >
                {{ bioCount }}/500
              </div>
            </div>
          </form>
        </section>

        <!-- Profile Picture -->
        <aside class="lg:col-span-5">
          <div class="flex flex-col items-center rounded-xl border border-gray-200 p-8">
            <h2 class="mb-8 w-full text-left text-lg font-bold text-gray-800">Profile Picture</h2>

            <div class="relative mb-10">
              <div
                class="h-64 w-64 overflow-hidden rounded-full border-4 border-gray-50 shadow-inner"
              >
                <img :src="profileImage" alt="Profile" class="h-full w-full object-cover" />
              </div>

              <label
                class="absolute bottom-4 right-4 cursor-pointer rounded-full border-2 border-white bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700"
              >
                📷
                <input type="file" accept="image/*" class="hidden" @change="handleUpload" />
              </label>
            </div>

            <div class="w-full space-y-3 px-4">
              <label
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-blue-500 py-2.5 font-medium text-blue-600 hover:bg-blue-50"
              >
                Upload New Photo

                <input type="file" accept="image/*" class="hidden" @change="handleUpload" />
              </label>

              <button
                @click="removePhoto"
                class="w-full rounded-md border border-red-400 py-2.5 font-medium text-red-500 hover:bg-red-50"
              >
                Remove Photo
              </button>
            </div>
          </div>
        </aside>
      </div>

      <!-- Footer -->
      <div class="mt-12 flex flex-wrap gap-4">
        <button
          @click="saveProfile"
          class="rounded-md bg-blue-500 px-8 py-2.5 font-semibold text-white shadow-md hover:bg-blue-600"
        >
          Save Changes
        </button>

        <button
          @click="resetForm"
          class="rounded-md bg-red-400 px-8 py-2.5 font-semibold text-white shadow-md hover:bg-red-500"
        >
          Cancel
        </button>
      </div>

      <!-- Banner -->
      <section class="mt-8">
        <div class="flex items-center gap-4 rounded-lg bg-blue-500 p-6 text-white shadow-sm">
          <div class="rounded-xl bg-white/20 p-2 text-3xl">🛡️</div>

          <div>
            <h3 class="text-xl font-bold">Keep Your Information Up To Date</h3>

            <p class="mt-1 text-sm text-blue-100">
              Employers are more likely to contact you if your profile is complete and accurate.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
