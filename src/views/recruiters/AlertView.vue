<script setup>
import { ref, computed, onUnmounted } from 'vue'
import {
  Search,
  Video,
  FileCheck,
  Zap,
  ShieldAlert,
  Mail,
  VolumeX,
  X,
  Sparkles,
  Mic,
  Monitor,
  Send,
  CheckCheck,
  Trash2
} from 'lucide-vue-next'

// State & Data
const searchQuery = ref('')
const activeTab = ref('all')

// Preference toggles
const emailNotifications = ref(true)
const desktopPush = ref(true)
const smsAlerts = ref(false)

// Modals
const isCallModalOpen = ref(false)
const callTimer = ref(0)
let timerInterval = null
const callMessages = ref([
  { sender: 'David Chen', text: 'Hi! Ready to go through the portfolio review.' },
  { sender: 'You', text: 'Great! Let\'s start with the design system slides.' }
])
const newCallMessage = ref('')

// Reactive Notifications Data
const notifications = ref([
  {
    id: 1,
    type: 'interviews',
    title: 'Upcoming Panel Interview: David Chen',
    body: 'VP of Operations - Stage 3 Final Interview. Other participants: Marcus Thorne, Sarah Vance.',
    timeText: 'Starts in 15 mins',
    timeTextClass: 'text-[#A51111] font-bold text-xs',
    iconType: 'video',
    iconBg: 'bg-[#A51111]/10 text-[#A51111]',
    isUnread: true,
    hasJoinMeeting: true,
    hasViewBrief: true,
    customClass: 'border-l-4 border-l-[#A51111]'
  },
  {
    id: 2,
    type: 'applications',
    title: 'Assessment Completed: Sarah Jenkins',
    body: 'Technical assessment for Senior Frontend Engineer completed with an 94% score.',
    timeText: '2 hours ago',
    timeTextClass: 'text-slate-400 text-xs font-semibold',
    iconType: 'file-check',
    iconBg: 'bg-blue-100 text-blue-700',
    isUnread: true,
    hasProgress: true,
    hasReviewReport: true,
    hasMarkRead: true,
    customClass: 'border-l-4 border-l-[#A51111]'
  },
  {
    id: 3,
    type: 'applications',
    title: 'High-Match Alert: VP of Infrastructure',
    body: 'AI Sourcing engine has identified 5 new high-match candidates that meet 95%+ of core requirements.',
    timeText: '5 hours ago',
    timeTextClass: 'text-slate-400 text-xs font-semibold',
    iconType: 'zap',
    iconBg: 'bg-slate-800 text-amber-400',
    isUnread: true,
    hasAvatars: true,
    hasViewCandidates: true,
    customClass: 'border-l-4 border-l-[#A51111]'
  },
  {
    id: 4,
    type: 'system',
    title: 'Security Alert: New Device Sign-In',
    body: 'A new sign-in was detected from a Chrome browser on Windows in San Francisco, CA. If this wasn\'t you, please secure your account immediately.',
    timeText: 'Yesterday',
    timeTextClass: 'text-[#9B1C1C] text-xs font-semibold',
    iconType: 'shield',
    iconBg: 'bg-rose-100 text-rose-700',
    isUnread: true,
    hasSecurityActions: true,
    customClass: 'bg-[#FDF2F2]/90 border border-[#FDE8E8] text-[#9B1C1C] border-l-4 border-l-[#C2410C]'
  }
])

// Derived counters based on mock data in screen
const unreadCount = computed(() => {
  return notifications.value.filter(n => n.isUnread).length ? 12 : 0 // Matches the "12 unread" text from image
})

// Tab configurations
const tabs = [
  { id: 'all', label: 'All Notifications', count: null },
  { id: 'applications', label: 'Applications', count: 8 },
  { id: 'interviews', label: 'Interviews', count: 3 },
  { id: 'system', label: 'System', count: 1 }
]

// Filtered notifications list
const filteredNotifications = computed(() => {
  return notifications.value.filter(n => {
    // Tab Filter
    const matchesTab = activeTab.value === 'all' || n.type === activeTab.value

    // Search Query Filter
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          n.body.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesTab && matchesSearch
  })
})

// Notification Actions
const markAsRead = (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) {
    notif.isUnread = false
    // Remove the custom left border accent
    if (notif.id === 4) {
      notif.customClass = 'bg-slate-50 border border-slate-200 text-slate-600 border-l-4 border-l-slate-300'
    } else {
      notif.customClass = 'border-l-4 border-l-slate-200'
    }
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(notif => {
    notif.isUnread = false
    if (notif.id === 4) {
      notif.customClass = 'bg-slate-50 border border-slate-200 text-slate-600 border-l-4 border-l-slate-300'
    } else {
      notif.customClass = 'border-l-4 border-l-slate-200'
    }
  })
}

const clearAll = () => {
  notifications.value = []
}

const restoreMockNotifications = () => {
  notifications.value = [
    {
      id: 1,
      type: 'interviews',
      title: 'Upcoming Panel Interview: David Chen',
      body: 'VP of Operations - Stage 3 Final Interview. Other participants: Marcus Thorne, Sarah Vance.',
      timeText: 'Starts in 15 mins',
      timeTextClass: 'text-[#A51111] font-bold text-xs',
      iconType: 'video',
      iconBg: 'bg-[#A51111]/10 text-[#A51111]',
      isUnread: true,
      hasJoinMeeting: true,
      hasViewBrief: true,
      customClass: 'border-l-4 border-l-[#A51111]'
    },
    {
      id: 2,
      type: 'applications',
      title: 'Assessment Completed: Sarah Jenkins',
      body: 'Technical assessment for Senior Frontend Engineer completed with an 94% score.',
      timeText: '2 hours ago',
      timeTextClass: 'text-slate-400 text-xs font-semibold',
      iconType: 'file-check',
      iconBg: 'bg-blue-100 text-blue-700',
      isUnread: true,
      hasProgress: true,
      hasReviewReport: true,
      hasMarkRead: true,
      customClass: 'border-l-4 border-l-[#A51111]'
    },
    {
      id: 3,
      type: 'applications',
      title: 'High-Match Alert: VP of Infrastructure',
      body: 'AI Sourcing engine has identified 5 new high-match candidates that meet 95%+ of core requirements.',
      timeText: '5 hours ago',
      timeTextClass: 'text-slate-400 text-xs font-semibold',
      iconType: 'zap',
      iconBg: 'bg-slate-800 text-amber-400',
      isUnread: true,
      hasAvatars: true,
      hasViewCandidates: true,
      customClass: 'border-l-4 border-l-[#A51111]'
    },
    {
      id: 4,
      type: 'system',
      title: 'Security Alert: New Device Sign-In',
      body: 'A new sign-in was detected from a Chrome browser on Windows in San Francisco, CA. If this wasn\'t you, please secure your account immediately.',
      timeText: 'Yesterday',
      timeTextClass: 'text-[#9B1C1C] text-xs font-semibold',
      iconType: 'shield',
      iconBg: 'bg-rose-100 text-rose-700',
      isUnread: true,
      hasSecurityActions: true,
      customClass: 'bg-[#FDF2F2]/90 border border-[#FDE8E8] text-[#9B1C1C] border-l-4 border-l-[#C2410C]'
    }
  ]
}

// Call features
const joinMeeting = () => {
  isCallModalOpen.value = true
  startCallTimer()
}

const startCallTimer = () => {
  callTimer.value = 0
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    callTimer.value++
  }, 1000)
}

const stopCallTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const formatCallTime = (secs) => {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const endCall = () => {
  isCallModalOpen.value = false
  stopCallTimer()
}

const sendCallMessage = () => {
  if (!newCallMessage.value.trim()) return
  callMessages.value.push({
    sender: 'You',
    text: newCallMessage.value
  })
  const text = newCallMessage.value
  newCallMessage.value = ''

  setTimeout(() => {
    if (isCallModalOpen.value) {
      callMessages.value.push({
        sender: 'David Chen',
        text: `Thanks for the details about "${text}". Let's discuss further.`
      })
    }
  }, 2000)
}

onUnmounted(() => {
  stopCallTimer()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-950 font-sans pb-12">
    <!-- Top Area: Search & Org -->
    <div class="mx-auto max-w-[1400px] px-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full max-w-lg">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <Search class="h-5 w-5" />
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search job IDs, titles, or departments..."
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition-all"
        />
      </div>

      <div class="text-right text-xs text-slate-500 font-medium">
        Organization: <span class="text-slate-800 font-bold">Global Executive Partners</span>
      </div>
    </div>

    <!-- Main Container -->
    <div class="mx-auto max-w-[1400px] p-6 space-y-6">
      
      <!-- Heading Section -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2">
        <div class="flex items-start gap-4">
          <!-- Red Accent indicator -->
          <div class="w-1.5 h-10 bg-rose-600 rounded-full"></div>
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">Notifications & Alerts</h1>
            <p class="text-slate-500 text-sm mt-2 font-medium">
              You have <span class="text-[#A51111] font-bold">{{ unreadCount }} unread</span> items requiring your attention.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <button
            @click="markAllAsRead"
            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#A51111] hover:bg-[#820E0E] text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <CheckCheck class="h-4 w-4" />
            Mark all as read
          </button>
          
          <button
            @click="clearAll"
            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-all hover:bg-slate-50 shadow-sm cursor-pointer"
          >
            <Trash2 class="h-4 w-4" />
            Clear all
          </button>
        </div>
      </header>

      <!-- Tabs Navigation -->
      <div class="border-b border-slate-200">
        <nav class="flex gap-6 -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'pb-4 px-1 text-sm font-semibold transition-all border-b-2 cursor-pointer',
              activeTab === tab.id
                ? 'border-rose-600 text-rose-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            ]"
          >
            {{ tab.label }}
            <span v-if="tab.count !== null" class="ml-1 text-xs opacity-75 font-normal">({{ tab.count }})</span>
          </button>
        </nav>
      </div>

      <!-- Grid layout: Two Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Notifications List (8 cols) -->
        <div class="lg:col-span-8 space-y-4">
          
          <div v-if="filteredNotifications.length > 0" class="space-y-4">
            <div
              v-for="item in filteredNotifications"
              :key="item.id"
              :class="[
                'bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-all duration-300 hover:shadow-md relative',
                item.isUnread ? 'shadow-sm' : 'opacity-70 bg-slate-50/50',
                item.customClass
              ]"
            >
              <!-- Icon Container -->
              <div class="flex-shrink-0">
                <div :class="['h-11 w-11 rounded-xl flex items-center justify-center shadow-sm', item.iconBg]">
                  <Video v-if="item.iconType === 'video'" class="h-5 w-5" />
                  <FileCheck v-else-if="item.iconType === 'file-check'" class="h-5 w-5" />
                  <Zap v-else-if="item.iconType === 'zap'" class="h-5 w-5" />
                  <ShieldAlert v-else-if="item.iconType === 'shield'" class="h-5 w-5" />
                </div>
              </div>

              <!-- Main Content -->
              <div class="flex-1 space-y-3">
                <div class="flex justify-between items-start gap-4">
                  <h3 :class="['font-bold text-base tracking-tight', item.id === 4 ? 'text-[#9B1C1C]' : 'text-slate-900']">
                    {{ item.title }}
                  </h3>
                  <span :class="item.timeTextClass" class="shrink-0 text-right">
                    {{ item.timeText }}
                  </span>
                </div>

                <p :class="['text-xs leading-relaxed font-medium', item.id === 4 ? 'text-[#C2410C]' : 'text-slate-500']">
                  {{ item.body }}
                </p>

                <!-- Nested Custom Visuals -->
                <!-- A: Stage Progress line visual (Sarah Jenkins) -->
                <div v-if="item.hasProgress" class="flex items-center justify-between gap-4 pt-1">
                  <div class="flex gap-1.5 flex-1 max-w-[280px]">
                    <div class="h-1.5 rounded-full bg-[#A51111] flex-1"></div>
                    <div class="h-1.5 rounded-full bg-[#A51111] flex-1"></div>
                    <div class="h-1.5 rounded-full bg-[#A51111] flex-1"></div>
                    <div class="h-1.5 rounded-full bg-slate-200 flex-1"></div>
                  </div>
                  <span class="text-[10px] font-extrabold text-[#A51111] tracking-wider">Screening Complete</span>
                </div>

                <!-- B: Avatars bubbles overlap (VP Infrastructure) -->
                <div v-if="item.hasAvatars" class="flex items-center gap-3 pt-1">
                  <div class="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" class="h-6 w-6 rounded-full object-cover border border-white" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60" class="h-6 w-6 rounded-full object-cover border border-white" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60" class="h-6 w-6 rounded-full object-cover border border-white" />
                  </div>
                  <span class="text-[10px] font-bold text-slate-400">+2 others matched</span>
                </div>

                <!-- Action Button rows -->
                <div class="flex items-center gap-3 pt-2">
                  <button
                    v-if="item.hasJoinMeeting"
                    @click="joinMeeting"
                    class="px-4 py-2 bg-[#A51111] hover:bg-[#820E0E] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Join Meeting
                  </button>
                  <button
                    v-if="item.hasViewBrief"
                    class="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    View Brief
                  </button>
                  <button
                    v-if="item.hasReviewReport"
                    class="px-4 py-2 bg-[#A51111] hover:bg-[#820E0E] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Review Report
                  </button>
                  <button
                    v-if="item.hasMarkRead && item.isUnread"
                    @click="markAsRead(item.id)"
                    class="text-xs text-slate-500 hover:text-slate-800 font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    Mark Read ✓
                  </button>
                  <button
                    v-if="item.hasViewCandidates"
                    class="px-4 py-2 bg-[#A51111] hover:bg-[#820E0E] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    View Candidates
                  </button>
                  <button
                    v-if="item.hasSecurityActions"
                    class="px-4 py-2 bg-[#A51111] hover:bg-[#820E0E] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    That Wasn't Me
                  </button>
                  <button
                    v-if="item.hasSecurityActions"
                    @click="markAsRead(item.id)"
                    class="px-4 py-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 shadow-sm">
            <VolumeX class="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p class="font-bold text-slate-700 text-sm">All clear! No notifications found</p>
            <p class="text-xs text-slate-400 mt-1">There are no items that match your filter criteria.</p>
            <button
              @click="restoreMockNotifications"
              class="mt-4 px-4 py-2 bg-[#A51111] text-white text-xs font-bold rounded-lg hover:bg-[#820E0E] transition shadow cursor-pointer"
            >
              Restore Mock Notifications
            </button>
          </div>

        </div>

        <!-- Right Column: Sidebar (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Alert Preferences Card -->
          <div class="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm space-y-5">
            <div class="flex items-start gap-3 pb-2 border-b border-slate-100">
              <div class="w-1 h-5 bg-rose-600 rounded"></div>
              <h3 class="font-extrabold text-base text-slate-900 leading-none">Alert Preferences</h3>
            </div>

            <!-- Toggles list -->
            <div class="space-y-4">
              <!-- Item 1 -->
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-bold text-xs text-slate-950">Email Notifications</h4>
                  <p class="text-[10px] text-slate-400 font-medium">Weekly digest and urgent alerts</p>
                </div>
                <!-- Interactive Toggle switch -->
                <button
                  @click="emailNotifications = !emailNotifications"
                  :class="[
                    'w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer',
                    emailNotifications ? 'bg-rose-700' : 'bg-slate-200'
                  ]"
                >
                  <div
                    :class="[
                      'bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300',
                      emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>

              <!-- Item 2 -->
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-bold text-xs text-slate-950">Desktop Push</h4>
                  <p class="text-[10px] text-slate-400 font-medium">Real-time interview reminders</p>
                </div>
                <button
                  @click="desktopPush = !desktopPush"
                  :class="[
                    'w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer',
                    desktopPush ? 'bg-rose-700' : 'bg-slate-200'
                  ]"
                >
                  <div
                    :class="[
                      'bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300',
                      desktopPush ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>

              <!-- Item 3 -->
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-bold text-xs text-slate-950">SMS / Text Alerts</h4>
                  <p class="text-[10px] text-slate-400 font-medium">Final candidate updates only</p>
                </div>
                <button
                  @click="smsAlerts = !smsAlerts"
                  :class="[
                    'w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer',
                    smsAlerts ? 'bg-rose-700' : 'bg-slate-200'
                  ]"
                >
                  <div
                    :class="[
                      'bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300',
                      smsAlerts ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></div>
                </button>
              </div>
            </div>

            <button
              class="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition shadow-sm text-center cursor-pointer"
            >
              Configure Notification Groups
            </button>
          </div>

          <!-- Efficiency Insight Card (WOW the user) -->
          <div class="bg-gradient-to-br from-[#1E2DCE] to-[#3B4EEB] text-white rounded-[24px] p-6 shadow-md relative overflow-hidden">
            <div class="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
            
            <div class="space-y-4 relative z-10">
              <h3 class="font-bold text-sm tracking-tight">Efficiency Insight</h3>
              <p class="text-xs text-indigo-100/90 leading-relaxed font-semibold">
                You are responding to notifications 12% faster than last month. Great work!
              </p>

              <!-- Columns Graph -->
              <div class="flex items-end justify-between h-20 pt-4 px-2 gap-2">
                <div class="bg-indigo-300/40 rounded-t w-full h-[40%]"></div>
                <div class="bg-indigo-300/40 rounded-t w-full h-[60%]"></div>
                <div class="bg-indigo-300/40 rounded-t w-full h-[50%]"></div>
                <div class="bg-white/90 rounded-t w-full h-[90%] shadow-lg"></div>
                <div class="bg-indigo-300/40 rounded-t w-full h-[70%]"></div>
              </div>

              <div class="text-[10px] text-indigo-100 font-extrabold tracking-wide text-center">
                Average response time: 14 mins
              </div>
            </div>
          </div>

          <!-- Muted Sources Card -->
          <div class="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm space-y-4">
            <div class="flex items-start gap-3 pb-2 border-b border-slate-100">
              <div class="w-1 h-5 bg-rose-600 rounded"></div>
              <h3 class="font-extrabold text-base text-slate-900 leading-none">Muted Sources</h3>
            </div>

            <div class="space-y-3.5">
              <div class="flex items-center gap-3 text-slate-600 text-xs font-semibold">
                <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Mail class="h-4 w-4" />
                </div>
                <span>General Inquiries</span>
              </div>

              <div class="flex items-center gap-3 text-slate-600 text-xs font-semibold">
                <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <VolumeX class="h-4 w-4" />
                </div>
                <span>Marketing Updates</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Active Call Preview Modal -->
    <div
      v-if="isCallModalOpen"
      class="fixed inset-0 z-50 bg-[#0F0F13] flex flex-col animate-in fade-in duration-300 text-white"
    >
      <header class="bg-[#1C1C24] px-6 py-4 flex justify-between items-center border-b border-[#2C2C35]">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
          <h3 class="font-semibold text-sm">Meeting Room</h3>
          <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded ml-2">{{ formatCallTime(callTimer) }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles class="h-3 w-3" />
            AI Transcribing
          </span>
          <button @click="endCall" class="p-1 hover:bg-slate-800 rounded transition text-slate-400 hover:text-white cursor-pointer">
            <X class="h-5 w-5" />
          </button>
        </div>
      </header>

      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        <!-- Video space -->
        <div class="flex-1 p-6 flex flex-col justify-center items-center relative gap-4 bg-radial-gradient">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl h-full max-h-[500px]">
            <div class="bg-[#1C1C24] rounded-2xl overflow-hidden border border-[#2C2C35] relative shadow-2xl flex flex-col justify-center items-center">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
              <span class="absolute bottom-4 left-4 bg-slate-900/60 text-white text-xs px-3 py-1 rounded-md font-semibold">David Chen (Candidate)</span>
            </div>
            <div class="bg-[#1C1C24] rounded-2xl overflow-hidden border border-[#2C2C35] relative shadow-2xl flex flex-col justify-center items-center text-slate-400">
              <div class="h-20 w-20 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-inner border border-indigo-500/20">
                <Video class="h-10 w-10 animate-pulse" />
              </div>
              <p class="font-bold text-sm text-white">You (Recruiter)</p>
              <span class="absolute bottom-4 left-4 bg-slate-900/60 text-white text-xs px-3 py-1 rounded-md font-semibold">You (Global Executive Partners)</span>
            </div>
          </div>
        </div>

        <!-- Chat sidebar -->
        <div class="w-full md:w-80 bg-[#15151C] border-l border-[#25252F] flex flex-col">
          <div class="p-4 border-b border-[#25252F]">
            <h4 class="font-bold text-sm">Meeting Chat</h4>
          </div>
          <div class="flex-1 p-4 overflow-y-auto space-y-4 text-[11px]">
            <div v-for="(msg, i) in callMessages" :key="i" class="space-y-1">
              <span :class="['font-bold block', msg.sender === 'You' ? 'text-indigo-400' : 'text-emerald-400']">{{ msg.sender }}</span>
              <p class="bg-[#1C1C24] p-2.5 rounded-xl border border-[#25252F] text-slate-300 leading-relaxed shadow-sm">{{ msg.text }}</p>
            </div>
          </div>
          <form @submit.prevent="sendCallMessage" class="p-3 border-t border-[#25252F] bg-[#121217] flex gap-2">
            <input
              v-model="newCallMessage"
              type="text"
              placeholder="Send message..."
              class="flex-1 bg-[#1C1C24] border border-[#25252F] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white"
            />
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg transition text-white cursor-pointer">
              <Send class="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      <footer class="bg-[#1C1C24] py-5 flex justify-center items-center border-t border-[#2C2C35]">
        <div class="flex items-center gap-4">
          <button class="p-3.5 rounded-full bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300 cursor-pointer">
            <Mic class="h-5 w-5" />
          </button>
          <button class="p-3.5 rounded-full bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300 cursor-pointer">
            <Video class="h-5 w-5" />
          </button>
          <button class="p-3.5 rounded-full bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300 cursor-pointer">
            <Monitor class="h-5 w-5" />
          </button>
          <button @click="endCall" class="bg-rose-600 hover:bg-rose-700 p-3.5 px-6 rounded-full font-bold text-xs tracking-wider transition-all shadow-lg text-white cursor-pointer">
            END CALL
          </button>
        </div>
      </footer>
    </div>

  </div>
</template>

<style scoped>
.bg-radial-gradient {
  background: radial-gradient(circle, #1a1a24 0%, #0d0d12 100%);
}
</style>
