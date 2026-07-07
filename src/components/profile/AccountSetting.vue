<script setup>
import { ref } from 'vue'

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordRules = [
  'At least 8 characters',
  'Includes Uppercase and lowercase',
  'Include numbers and special characters',
]
const notifications = ref({
  recommendations: true,
  applications: true,
  jobs: true,
  interviews: true,
  tips: false,
})
const account = ref({
  email: 'john.doe@example.com',
  twoFactor: false,
})
const sessions = ref([
  {
    id: 1,
    device: 'Windows • Chrome',
    location: 'Phnom Penh, Cambodia',
    ip: '192.168.10.10',
    time: 'June 29, 2026 at 10:30 AM',
    current: true,
  },
  {
    id: 2,
    device: 'iPhoneOS • Chrome',
    location: 'Phnom Penh, Cambodia',
    ip: '192.168.10.10',
    time: 'June 28, 2026 at 9:30 AM',
    current: false,
  },
  {
    id: 3,
    device: 'MacOS • Chrome',
    location: 'Phnom Penh, Cambodia',
    ip: '192.168.10.10',
    time: 'June 26, 2026 at 11:30 AM',
    current: false,
  },
])

const deleteWarnings = [
  'All your data will be permanently deleted',
  'Your profile cannot be recovered',
  'Your applications and saved jobs will be removed',
]
</script>
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto max-w-7xl">
      <!-- Top Grid -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- ========================= -->
        <!-- Change Password -->
        <!-- ========================= -->
        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <!-- Header -->
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              🔒
            </div>

            <h2 class="text-lg font-bold text-gray-900">Change Password</h2>
          </div>

          <!-- Current Password -->
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-700"> Current Password </label>

            <input
              v-model="form.currentPassword"
              type="password"
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <!-- New Password -->
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-700"> New Password </label>

            <input
              v-model="form.newPassword"
              type="password"
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>

            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <!-- Password Rules -->
          <div class="mt-6 space-y-3">
            <div
              v-for="rule in passwordRules"
              :key="rule"
              class="flex items-center gap-2 text-sm text-gray-700"
            >
              <div
                class="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-600"
              >
                ✓
              </div>

              {{ rule }}
            </div>
          </div>

          <!-- Button -->
          <button
            class="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Update Password
          </button>
        </div>

        <!-- ========================= -->
        <!-- Email Notifications -->
        <!-- ========================= -->
        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <!-- Header -->
          <div class="mb-6 flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
            >
              🔔
            </div>

            <div>
              <h2 class="text-lg font-bold text-gray-900">Email Notifications</h2>

              <p class="text-xs text-gray-500">Choose what updates you want to receive</p>
            </div>
          </div>

          <!-- Notification List -->
          <div class="space-y-6">
            <!-- Job Recommendations -->
            <div class="flex items-center justify-between">
              <div class="flex gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
                >
                  🔔
                </div>

                <div>
                  <h3 class="font-medium text-gray-800">Job Recommendations</h3>

                  <p class="text-xs text-gray-500">Receive notifications about job matches</p>
                </div>
              </div>

              <button
                @click="notifications.recommendations = !notifications.recommendations"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  notifications.recommendations ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    notifications.recommendations ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>

            <!-- Application Updates -->
            <div class="flex items-center justify-between">
              <div class="flex gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
                >
                  🔔
                </div>

                <div>
                  <h3 class="font-medium text-gray-800">Application Updates</h3>

                  <p class="text-xs text-gray-500">Get notified about application status</p>
                </div>
              </div>

              <button
                @click="notifications.applications = !notifications.applications"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  notifications.applications ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    notifications.applications ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>

            <!-- New Job Alerts -->
            <div class="flex items-center justify-between">
              <div class="flex gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
                >
                  🔔
                </div>

                <div>
                  <h3 class="font-medium text-gray-800">New Job Alerts</h3>

                  <p class="text-xs text-gray-500">Receive alerts about new job openings</p>
                </div>
              </div>

              <button
                @click="notifications.jobs = !notifications.jobs"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  notifications.jobs ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    notifications.jobs ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>

            <!-- Interview Invitations -->
            <div class="flex items-center justify-between">
              <div class="flex gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
                >
                  🔔
                </div>

                <div>
                  <h3 class="font-medium text-gray-800">Interview Invitations</h3>

                  <p class="text-xs text-gray-500">Get notified about interview invitations</p>
                </div>
              </div>

              <button
                @click="notifications.interviews = !notifications.interviews"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  notifications.interviews ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    notifications.interviews ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>

            <!-- Tips -->
            <div class="flex items-center justify-between">
              <div class="flex gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
                >
                  🔔
                </div>

                <div>
                  <h3 class="font-medium text-gray-800">Tips & Resources</h3>

                  <p class="text-xs text-gray-500">Receive helpful career tips and resources</p>
                </div>
              </div>

              <button
                @click="notifications.tips = !notifications.tips"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  notifications.tips ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    notifications.tips ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>
          </div>
        </div>
        <!-- ========================= -->
        <!-- Right Column -->
        <!-- ========================= -->
        <div class="space-y-6">
          <!-- ========================= -->
          <!-- Email Address -->
          <!-- ========================= -->
          <div class="rounded-xl border border-gray-200 bg-white p-6">
            <!-- Header -->
            <div class="mb-6 flex items-start gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
              >
                ✉️
              </div>

              <div>
                <h2 class="text-lg font-bold text-gray-900">Email Address</h2>

                <p class="text-xs text-gray-500 leading-5">
                  Your email address is used to login and receive important notifications.
                </p>
              </div>
            </div>

            <!-- Email -->
            <input
              v-model="account.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              class="mt-5 rounded-lg border border-indigo-300 px-5 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
            >
              Change Email
            </button>
          </div>

          <!-- ========================= -->
          <!-- Two Factor Authentication -->
          <!-- ========================= -->
          <div class="rounded-xl border border-gray-200 bg-white p-6">
            <!-- Header -->
            <div class="mb-6 flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"
              >
                🛡️
              </div>

              <h2 class="text-lg font-bold text-gray-900">Two-Factor Authentication</h2>
            </div>

            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-semibold text-gray-900">Two-Factor Authentication</h3>

                <p class="mt-2 text-xs leading-5 text-gray-500">
                  When enabled, you'll be required to enter a verification code in addition to your
                  password whenever logging in.
                </p>
              </div>

              <!-- Toggle -->
              <button
                @click="account.twoFactor = !account.twoFactor"
                :class="[
                  'relative h-6 w-11 rounded-full transition',
                  account.twoFactor ? 'bg-indigo-600' : 'bg-gray-300',
                ]"
              >
                <span
                  :class="[
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition',
                    account.twoFactor ? 'left-5' : 'left-0.5',
                  ]"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ====================================== -->
      <!-- Bottom Section -->
      <!-- ====================================== -->

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <!-- ====================================== -->
        <!-- Active Sessions -->
        <!-- ====================================== -->

        <div class="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900">Active Sessions</h2>

            <p class="text-sm text-gray-500">Manage your active sessions on different devices.</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="session in sessions"
              :key="session.id"
              class="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div class="flex items-center gap-4">
                <!-- Device Icon -->
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xl"
                >
                  💻
                </div>

                <div>
                  <div class="flex items-center gap-3">
                    <h3 class="font-semibold text-gray-800">
                      {{ session.device }}
                    </h3>

                    <span
                      v-if="session.current"
                      class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                    >
                      Current Device
                    </span>
                  </div>

                  <p class="text-sm text-gray-500">
                    {{ session.location }}
                  </p>

                  <p class="text-xs text-gray-400">IP: {{ session.ip }}</p>
                </div>
              </div>

              <div class="text-right">
                <p class="mb-3 text-xs text-gray-400">
                  {{ session.time }}
                </p>

                <button
                  v-if="!session.current"
                  class="rounded-lg border border-red-300 px-5 py-2 text-sm text-red-500 transition hover:bg-red-50"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              class="rounded-lg border border-red-300 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              Log Out All Devices
            </button>
          </div>
        </div>

        <!-- ====================================== -->
        <!-- Delete Account -->
        <!-- ====================================== -->

        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600"
            >
              🗑️
            </div>

            <div>
              <h2 class="text-xl font-bold text-gray-900">Delete Account</h2>

              <p class="text-xs text-gray-500">Once deleted, your account cannot be recovered.</p>
            </div>
          </div>

          <!-- Warning Box -->

          <div class="rounded-xl border border-red-300 bg-red-50 p-5">
            <div
              v-for="warning in deleteWarnings"
              :key="warning"
              class="mb-4 flex items-center gap-3 last:mb-0"
            >
              <div
                class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs text-red-600"
              >
                !
              </div>

              <span class="text-sm text-red-600">
                {{ warning }}
              </span>
            </div>
          </div>

          <button
            class="mt-8 w-full rounded-lg border border-red-500 py-3 font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
