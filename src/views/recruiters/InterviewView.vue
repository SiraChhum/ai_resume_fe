<script setup>
import { ref, computed, onUnmounted } from 'vue'
import {
  Search,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  Video,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  X,
  TrendingUp,
  MessageSquare,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Send,
  Sparkles
} from 'lucide-vue-next'

// Setup reference date to match mockup (September 5, 2024 is Today)
const currentYear = ref(2024)
const currentMonth = ref(8) // 0-indexed (8 = September)
const selectedDate = ref('2024-09-05')
const searchQuery = ref('')
const selectedStageFilter = ref('all')
const selectedPlatformFilter = ref('all')

// Modals state
const isScheduleModalOpen = ref(false)
const isFilterModalOpen = ref(false)
const isCallModalOpen = ref(false)

// Active Call State
const activeCallParticipant = ref(null)
const isMuted = ref(false)
const isCameraOff = ref(false)
const isSharingScreen = ref(false)
const callTimer = ref(0)
let timerInterval = null
const callMessages = ref([
  { sender: 'David Chen', text: 'Hi! Ready to go through the portfolio review.' },
  { sender: 'You', text: 'Great! Let\'s start with the design system slides.' }
])
const newCallMessage = ref('')

// Pre-populated interviews data
const interviews = ref({
  '2024-08-25': [],
  '2024-08-26': [],
  '2024-08-27': [],
  '2024-08-28': [],
  '2024-08-29': [],
  '2024-08-30': [],
  '2024-08-31': [],
  '2024-09-01': [],
  '2024-09-02': [],
  '2024-09-03': [],
  '2024-09-04': [
    {
      id: 1,
      time: '09:00',
      title: 'Technical Assessment',
      candidateName: 'Michael Vance',
      candidateRole: 'Senior Cloud Architect',
      candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      stage: 'Technical Assessment',
      stageColor: 'bg-slate-100 text-slate-700 border-slate-200',
      platform: 'Zoom',
      link: 'Join Zoom',
      duration: '45 mins'
    }
  ],
  '2024-09-05': [
    {
      id: 2,
      time: '14:30',
      title: 'Board Panel Review',
      candidateName: 'David Chen',
      candidateRole: 'UX Principal Lead',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      stage: 'Board Panel Review',
      stageColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      platform: 'Zoom',
      link: 'Resume Call',
      duration: '60 mins',
      isOngoing: true
    },
    {
      id: 3,
      time: '16:00',
      title: 'Initial Screen',
      candidateName: 'Elena Rossi',
      candidateRole: 'Senior Product Manager',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      stage: 'Initial Screen',
      stageColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      platform: 'Google Meet',
      link: 'Join Meet',
      duration: '30 mins'
    }
  ],
  '2024-09-06': [
    {
      id: 4,
      time: '09:30',
      title: 'Technical Assessment',
      candidateName: 'Michael Vance',
      candidateRole: 'Senior Cloud Architect',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      stage: 'Technical Assessment',
      stageColor: 'bg-slate-100 text-slate-700 border-slate-200',
      platform: 'Zoom',
      link: 'Join Zoom',
      duration: '45 mins'
    },
    {
      id: 5,
      time: '13:00',
      title: 'Initial Culture Fit',
      candidateName: 'Sarah Jenkins',
      candidateRole: 'Head of Growth',
      candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      stage: 'Initial Culture Fit',
      stageColor: 'bg-blue-100 text-blue-700 border-blue-200',
      platform: 'Google Meet',
      link: 'Join Meet',
      duration: '45 mins'
    },
    {
      id: 6,
      time: '09:30',
      title: 'Technical Assessment',
      candidateName: 'Michael Vance',
      candidateRole: 'Senior Cloud Architect',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      stage: 'Technical Assessment',
      stageColor: 'bg-slate-100 text-slate-700 border-slate-200',
      platform: 'Zoom',
      link: 'Join Zoom',
      duration: '45 mins'
    },
    {
      id: 7,
      time: '13:00',
      title: 'Initial Culture Fit',
      candidateName: 'Sarah Jenkins',
      candidateRole: 'Head of Growth',
      candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      stage: 'Initial Culture Fit',
      stageColor: 'bg-blue-100 text-blue-700 border-blue-200',
      platform: 'Google Meet',
      link: 'Join Meet',
      duration: '45 mins'
    }
  ]
})

// Metrics Data
const metrics = ref({
  totalInterviews: 12,
  avgScore: 4.2,
  recentFeedback: [
    { initials: 'JD', name: 'John Doe', comment: 'Candidate showed strong architectural knowledge, but needs deeper...' },
    { initials: 'AM', name: 'Alice Miller', comment: 'Strong culture fit. Highly recommend proceeding to panel.' }
  ]
})

// Schedule Form state
const scheduleForm = ref({
  candidateName: '',
  candidateRole: '',
  date: '2024-09-05',
  time: '10:00',
  duration: '45 mins',
  stage: 'Initial Screen',
  platform: 'Zoom'
})

// Calendar Calculations
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const currentMonthName = computed(() => monthNames[currentMonth.value])

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDay = new Date(year, month, 1)
  const startDayOfWeek = firstDay.getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevMonthTotalDays = new Date(year, month, 0).getDate()

  const days = []

  // Previous month padding
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i
    const prevMonthIdx = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
    days.push({
      dayNum,
      isCurrentMonth: false,
      dateStr,
      interviews: interviews.value[dateStr] || []
    })
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({
      dayNum: i,
      isCurrentMonth: true,
      dateStr,
      interviews: interviews.value[dateStr] || []
    })
  }

  // Next month padding to fill a clean grid (usually 35 or 42 cells)
  const totalGridCells = days.length <= 35 ? 35 : 42
  const remainingCells = totalGridCells - days.length
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonthIdx = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({
      dayNum: i,
      isCurrentMonth: false,
      dateStr,
      interviews: interviews.value[dateStr] || []
    })
  }

  return days
})

// Calendar Navigation
const navigateMonth = (direction) => {
  if (direction === 'prev') {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  } else {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }
}

// Format Selected Date Heading
const formatSelectedDateHeading = computed(() => {
  const [y, m, d] = selectedDate.value.split('-').map(Number)
  const dateObj = new Date(y, m - 1, d)
  
  if (y === 2024 && m === 9 && d === 6) {
    return 'Tomorrow, September 6'
  }
  
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' })
  return `${weekday}, ${month} ${d}`
})

// Filtered interviews list for the selected date
const filteredInterviews = computed(() => {
  const dayList = interviews.value[selectedDate.value] || []
  return dayList.filter(item => {
    const matchesSearch = item.candidateName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.candidateRole.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStage = selectedStageFilter.value === 'all' || item.stage === selectedStageFilter.value
    const matchesPlatform = selectedPlatformFilter.value === 'all' || item.platform === selectedPlatformFilter.value
    return matchesSearch && matchesStage && matchesPlatform
  })
})

const getSelectedDayCount = computed(() => {
  return filteredInterviews.value.length
})

// Select date on calendar
const selectDate = (dateStr) => {
  selectedDate.value = dateStr
}

// Call features
const resumeCall = (candidate) => {
  activeCallParticipant.value = candidate || {
    candidateName: 'David Chen',
    candidateRole: 'UX Principal Lead',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  }
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

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

const toggleCamera = () => {
  isCameraOff.value = !isCameraOff.value
}

const toggleShareScreen = () => {
  isSharingScreen.value = !isSharingScreen.value
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

  // Mock reply after 2 seconds
  setTimeout(() => {
    if (isCallModalOpen.value) {
      callMessages.value.push({
        sender: activeCallParticipant.value.candidateName,
        text: `Thanks for the details about "${text}". That makes perfect sense.`
      })
    }
  }, 2000)
}

// Form Handlers
const submitSchedule = () => {
  const dateStr = scheduleForm.value.date
  if (!interviews.value[dateStr]) {
    interviews.value[dateStr] = []
  }

  // Create stage border colors dynamically based on selected stage
  let stageColor = 'bg-slate-100 text-slate-700 border-slate-200'
  if (scheduleForm.value.stage.includes('Technical')) {
    stageColor = 'bg-slate-100 text-slate-700 border-slate-200'
  } else if (scheduleForm.value.stage.includes('Culture')) {
    stageColor = 'bg-blue-100 text-blue-700 border-blue-200'
  } else if (scheduleForm.value.stage.includes('Board')) {
    stageColor = 'bg-indigo-100 text-indigo-700 border-indigo-200'
  } else if (scheduleForm.value.stage.includes('Screen')) {
    stageColor = 'bg-emerald-100 text-emerald-700 border-emerald-200'
  }

  interviews.value[dateStr].push({
    id: Date.now(),
    time: scheduleForm.value.time,
    title: scheduleForm.value.stage,
    candidateName: scheduleForm.value.candidateName,
    candidateRole: scheduleForm.value.candidateRole,
    candidateAvatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=100`,
    stage: scheduleForm.value.stage,
    stageColor,
    platform: scheduleForm.value.platform,
    link: scheduleForm.value.platform === 'Zoom' ? 'Join Zoom' : 'Join Meet',
    duration: scheduleForm.value.duration
  })

  // Sort by time
  interviews.value[dateStr].sort((a, b) => a.time.localeCompare(b.time))

  // Update selected day view
  selectedDate.value = dateStr

  // Reset form & Close modal
  scheduleForm.value.candidateName = ''
  scheduleForm.value.candidateRole = ''
  isScheduleModalOpen.value = false
}

const toggleFilter = () => {
  isFilterModalOpen.value = !isFilterModalOpen.value
}

const resetFilters = () => {
  selectedStageFilter.value = 'all'
  selectedPlatformFilter.value = 'all'
  searchQuery.value = ''
  isFilterModalOpen.value = false
}

onUnmounted(() => {
  stopCallTimer()
})
</script>

<template>
  <div class="min-h-0 bg-slate-50 text-slate-900 font-sans pb-12">
    <!-- Top Custom Area: Matches mockup's Search bar & Organization info -->
    <div class="mx-auto max-w-[1400px] px-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- Search job, titles, departments -->
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

      <!-- Organization details -->
      <div class="text-right text-xs text-slate-500 font-medium">
        Organization: <span class="text-slate-800 font-bold">Global Executive Partners</span>
      </div>
    </div>

    <!-- Main Container -->
    <div class="mx-auto max-w-[1400px] p-6 space-y-6">
      
      <!-- Heading Section -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-100">
        <div class="flex items-start gap-4">
          <!-- Red/Rose vertical bar accent -->
          <div class="w-1.5 h-10 bg-rose-600 rounded-full"></div>
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Interview Management</h1>
            <p class="text-slate-500 text-sm mt-1 font-semibold">Monitor candidate progress and coordinate schedules.</p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- Filter trigger -->
          <button
            @click="toggleFilter"
            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg text-sm font-semibold transition-all hover:bg-slate-50 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal class="h-4 w-4" />
            FILTER
          </button>
          
          <!-- Schedule Interview -->
          <button
            @click="isScheduleModalOpen = true"
            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2B40E6] hover:bg-[#1E30C9] text-white rounded-lg text-sm font-semibold transition-all shadow-md cursor-pointer"
          >
            <CalendarIcon class="h-4 w-4" />
            SCHEDULE INTERVIEW
          </button>
        </div>
      </header>

      <!-- Grid layout: Two Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Calendar and Scheduled List (8 cols) -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Calendar Card -->
          <div class="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <h2 class="text-xl font-bold text-slate-900">{{ currentMonthName }} {{ currentYear }}</h2>
                <div class="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 shadow-sm">
                  <button @click="navigateMonth('prev')" class="p-1 hover:bg-white hover:shadow-sm rounded text-slate-600 transition cursor-pointer">
                    <ChevronLeft class="h-4 w-4" />
                  </button>
                  <button @click="navigateMonth('next')" class="p-1 hover:bg-white hover:shadow-sm rounded text-slate-600 transition cursor-pointer">
                    <ChevronRight class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- Month/Week/Day Toggles -->
              <div class="flex bg-slate-100 rounded-full p-1 text-xs font-semibold text-slate-600 shadow-inner">
                <button class="px-4 py-1.5 rounded-full bg-white text-slate-900 shadow-sm transition">Month</button>
                <button class="px-4 py-1.5 rounded-full hover:text-slate-900 transition">Week</button>
                <button class="px-4 py-1.5 rounded-full hover:text-slate-900 transition">Day</button>
              </div>
            </div>

            <!-- Calendar Days Grid -->
            <div class="grid grid-cols-7 text-center font-bold text-slate-500 text-[11px] tracking-wider mb-2">
              <div v-for="day in weekdayNames" :key="day" class="pb-2">{{ day }}</div>
            </div>

            <!-- Calendar Cells -->
            <div class="grid grid-cols-7 border-l border-t border-slate-100 rounded-lg overflow-hidden bg-slate-50/50">
              <div
                v-for="(cell, index) in calendarDays"
                :key="index"
                @click="selectDate(cell.dateStr)"
                :class="[
                  'h-24 p-2 border-r border-b border-slate-100 flex flex-col justify-between transition-all cursor-pointer relative',
                  cell.isCurrentMonth ? 'bg-white text-slate-900' : 'bg-slate-50/60 text-slate-400',
                  selectedDate === cell.dateStr ? 'ring-2 ring-indigo-500 ring-inset bg-indigo-50/20' : 'hover:bg-slate-50'
                ]"
              >
                <!-- Day number badge -->
                <div class="flex justify-between items-start">
                  <span
                    :class="[
                      'text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full',
                      selectedDate === cell.dateStr ? 'bg-[#2B40E6] text-white' : ''
                    ]"
                  >
                    {{ cell.dayNum }}
                  </span>
                </div>

                <!-- Event badges stacked inside cell -->
                <div class="space-y-1 overflow-hidden mt-1 flex-1 flex flex-col justify-end">
                  <div
                    v-for="meet in cell.interviews"
                    :key="meet.id"
                    class="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white truncate max-h-5 flex items-center gap-1 shadow-sm"
                  >
                    <span class="font-normal">{{ meet.time }}</span>
                    <span>{{ meet.title.split(' ')[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tomorrow/Selected Day Interviews List Card -->
          <div class="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-6">
            <div class="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 class="text-xl font-bold text-slate-900">{{ formatSelectedDateHeading }}</h3>
              </div>
              <div class="text-slate-500 text-xs font-semibold bg-slate-100 px-3 py-1 rounded-full">
                {{ getSelectedDayCount }} Interviews Scheduled
              </div>
            </div>

            <!-- List items -->
            <div class="space-y-4" v-if="filteredInterviews.length > 0">
              <div
                v-for="meet in filteredInterviews"
                :key="meet.id"
                class="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 hover:border-slate-200 rounded-2xl bg-white hover:shadow-md transition-all duration-300 gap-4"
              >
                <!-- Time component -->
                <div class="flex flex-col min-w-[70px]">
                  <span class="text-rose-700 font-extrabold text-lg tracking-tight">{{ meet.time }}</span>
                  <span class="text-slate-400 text-[10px] font-bold tracking-wider">EST</span>
                </div>

                <!-- Profile avatar & Details -->
                <div class="flex items-center gap-4 flex-1">
                  <img
                    :src="meet.candidateAvatar"
                    alt="Candidate avatar"
                    class="h-12 w-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div>
                    <h4 class="font-bold text-slate-900 text-base leading-tight">{{ meet.candidateName }}</h4>
                    <p class="text-slate-500 text-xs mt-1 font-medium">{{ meet.candidateRole }}</p>
                  </div>
                </div>

                <!-- Stage information -->
                <div class="min-w-[160px]">
                  <span class="text-slate-400 text-[9px] font-extrabold tracking-widest uppercase block mb-1">STAGE</span>
                  <span :class="['px-3 py-1 text-[11px] font-bold rounded-full border', meet.stageColor]">
                    {{ meet.stage }}
                  </span>
                </div>

                <!-- Action Button -->
                <div class="flex items-center gap-3">
                  <!-- Meet Link click trigger -->
                  <button
                    @click="resumeCall(meet)"
                    class="flex items-center gap-2 text-rose-800 font-bold hover:text-rose-950 transition-all text-xs bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full border border-rose-100 shadow-sm cursor-pointer"
                  >
                    <Video class="h-4 w-4" />
                    {{ meet.link }}
                  </button>
                  
                  <button class="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer">
                    <MoreVertical class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12 text-slate-400">
              <CalendarIcon class="h-12 w-12 mx-auto mb-3 opacity-30 text-slate-500" />
              <p class="font-semibold text-sm">No interviews scheduled for this date</p>
              <p class="text-xs text-slate-400 mt-1">Try selecting another day or schedule a new session.</p>
            </div>
          </div>

        </div>

        <!-- Right Column: Focus, Metrics & Support (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Today's Focus Card -->
          <div class="bg-gradient-to-br from-[#1E2DCE] to-[#3B4EEB] text-white rounded-[28px] p-6 shadow-lg relative overflow-hidden">
            <!-- Background lights decoration -->
            <div class="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-white/10 blur-xl"></div>
            <div class="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-indigo-900/40 blur-xl"></div>

            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-xl font-bold tracking-tight text-white">Today's Focus</h3>
                <p class="text-indigo-100 text-xs mt-1 font-semibold">Thursday, Sep 5</p>
              </div>
              <span class="text-[10px] font-extrabold tracking-widest bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md animate-pulse">
                ACTIVE NOW
              </span>
            </div>

            <!-- Ongoing interview box -->
            <div class="space-y-4">
              <span class="text-indigo-100 text-[10px] font-extrabold tracking-widest uppercase block">ONGOING INTERVIEW</span>
              
              <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                    alt="Ongoing candidate"
                    class="h-10 w-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 class="font-bold text-sm text-white">David Chen</h4>
                    <p class="text-xs text-indigo-100 font-medium">UX Principal Lead</p>
                  </div>
                </div>

                <!-- Resume Call button grid -->
                <div class="flex gap-2">
                  <button
                    @click="resumeCall({ candidateName: 'David Chen', candidateRole: 'UX Principal Lead', candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' })"
                    class="flex-1 bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold text-xs py-3 rounded-xl tracking-wider text-center transition-all cursor-pointer shadow"
                  >
                    RESUME CALL
                  </button>
                  <button class="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition cursor-pointer flex items-center justify-center">
                    <MoreVertical class="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <!-- Upcoming Today -->
              <div class="space-y-3 pt-2">
                <span class="text-indigo-100 text-[10px] font-extrabold tracking-widest uppercase block">UPCOMING TODAY</span>
                
                <div class="space-y-3">
                  <div class="flex gap-3 items-start text-xs border-l-2 border-white/30 pl-3">
                    <div class="font-bold">16:00</div>
                    <div>
                      <p class="font-bold">Initial Screen</p>
                      <p class="text-indigo-100 text-[10px] mt-0.5">Candidate: Elena Rossi</p>
                    </div>
                  </div>
                  <div class="flex gap-3 items-start text-xs border-l-2 border-white/10 pl-3">
                    <div class="font-bold text-white/60">17:30</div>
                    <div>
                      <p class="font-bold text-white/90">Prep Sync</p>
                      <p class="text-indigo-100/60 text-[10px] mt-0.5">Internal Hiring Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metrics Card -->
          <div class="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm space-y-6">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
              <TrendingUp class="h-5 w-5 text-indigo-600" />
              <h3 class="text-lg font-bold text-slate-900">Metrics</h3>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner">
                <span class="text-slate-400 text-[9px] font-extrabold tracking-wider uppercase block">INTERVIEWS</span>
                <p class="text-3xl font-extrabold text-slate-900 mt-1">{{ metrics.totalInterviews }}</p>
                <span class="text-emerald-600 text-[10px] font-bold block mt-1">↑ 20% vs last week</span>
              </div>
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner">
                <span class="text-slate-400 text-[9px] font-extrabold tracking-wider uppercase block">AVG SCORE</span>
                <p class="text-3xl font-extrabold text-slate-900 mt-1">{{ metrics.avgScore }}</p>
                <span class="text-slate-400 text-[10px] font-medium block mt-1">out of 5.0</span>
              </div>
            </div>

            <!-- Feedback section -->
            <div class="space-y-4">
              <span class="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase block">RECENT FEEDBACK</span>
              
              <div class="space-y-3">
                <div v-for="(fb, i) in metrics.recentFeedback" :key="i" class="flex gap-3 text-xs leading-relaxed">
                  <!-- Avatar circle with initials -->
                  <div
                    :class="[
                      'h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-[11px] shrink-0 border shadow-sm',
                      i === 0 ? 'bg-sky-500 border-sky-400' : 'bg-rose-500 border-rose-400'
                    ]"
                  >
                    {{ fb.initials }}
                  </div>
                  <p class="text-slate-600 italic">
                    "{{ fb.comment }}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Support Card -->
          <div class="bg-[#E9F0FE] hover:bg-[#DCE7FD] text-slate-900 rounded-[20px] p-4 flex justify-between items-center transition-all duration-300 shadow-sm border border-blue-100">
            <div>
              <h4 class="font-bold text-sm text-slate-900">Need Help?</h4>
              <p class="text-xs text-slate-500 font-semibold mt-0.5">Training & Best Practices</p>
            </div>
            <div class="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
              <HelpCircle class="h-5 w-5" />
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Modals Section -->
    
    <!-- 1. Schedule Interview Modal -->
    <div
      v-if="isScheduleModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      @click.self="isScheduleModalOpen = false"
    >
      <div class="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
          <div class="flex items-center gap-2">
            <span class="bg-indigo-100 text-indigo-700 p-2 rounded-xl">
              <CalendarIcon class="h-5 w-5" />
            </span>
            <h3 class="text-xl font-bold text-slate-900">Schedule Interview</h3>
          </div>
          <button @click="isScheduleModalOpen = false" class="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition cursor-pointer">
            <X class="h-5 w-5" />
          </button>
        </div>

        <form @submit.prevent="submitSchedule" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Candidate Name</label>
              <input
                v-model="scheduleForm.candidateName"
                type="text"
                required
                placeholder="e.g. David Chen"
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Candidate Role</label>
              <input
                v-model="scheduleForm.candidateRole"
                type="text"
                required
                placeholder="e.g. UX Principal Lead"
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
              <input
                v-model="scheduleForm.date"
                type="date"
                required
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Start Time</label>
              <input
                v-model="scheduleForm.time"
                type="time"
                required
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Duration</label>
              <select
                v-model="scheduleForm.duration"
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option>30 mins</option>
                <option>45 mins</option>
                <option>60 mins</option>
                <option>90 mins</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Interview Stage</label>
              <select
                v-model="scheduleForm.stage"
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option>Initial Screen</option>
                <option>Technical Assessment</option>
                <option>Initial Culture Fit</option>
                <option>Board Panel Review</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Platform</label>
              <select
                v-model="scheduleForm.platform"
                class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option>Zoom</option>
                <option>Google Meet</option>
                <option>Microsoft Teams</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-3 border-t border-slate-100 mt-6">
            <button
              type="button"
              @click="isScheduleModalOpen = false"
              class="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. Filter Modal -->
    <div
      v-if="isFilterModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      @click.self="isFilterModalOpen = false"
    >
      <div class="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <div class="flex items-center gap-2">
            <SlidersHorizontal class="h-4 w-4 text-indigo-600" />
            <h3 class="text-lg font-bold text-slate-900">Filter Interviews</h3>
          </div>
          <button @click="isFilterModalOpen = false" class="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition cursor-pointer">
            <X class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">By Stage</label>
            <select
              v-model="selectedStageFilter"
              class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="all">All Stages</option>
              <option value="Initial Screen">Initial Screen</option>
              <option value="Technical Assessment">Technical Assessment</option>
              <option value="Initial Culture Fit">Initial Culture Fit</option>
              <option value="Board Panel Review">Board Panel Review</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">By Platform</label>
            <select
              v-model="selectedPlatformFilter"
              class="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="all">All Platforms</option>
              <option value="Zoom">Zoom</option>
              <option value="Google Meet">Google Meet</option>
            </select>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              @click="resetFilters"
              class="text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              Clear all
            </button>
            <button
              @click="isFilterModalOpen = false"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Mock Call Full View Modal (WOW the user) -->
    <div
      v-if="isCallModalOpen"
      class="fixed inset-0 z-50 bg-[#0F0F13] flex flex-col animate-in fade-in duration-300"
    >
      <!-- Top header of call -->
      <header class="bg-[#1C1C24] px-6 py-4 flex justify-between items-center text-white border-b border-[#2C2C35]">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
          <h3 class="font-semibold text-sm">Ongoing Interview: {{ activeCallParticipant?.candidateName }}</h3>
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

      <!-- Center grid: Remote video and Local video + Chat sidebar -->
      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        <!-- Video Canvas -->
        <div class="flex-1 p-6 flex flex-col justify-center items-center relative gap-4 bg-radial-gradient">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl h-full max-h-[500px]">
            <!-- Candidate Stream (David Chen) -->
            <div class="bg-[#1C1C24] rounded-2xl overflow-hidden border border-[#2C2C35] relative shadow-2xl flex flex-col justify-center items-center">
              <img
                v-if="!isCameraOff"
                :src="activeCallParticipant?.candidateAvatar"
                alt="David Chen Video"
                class="w-full h-full object-cover transition-opacity duration-300"
              />
              <div v-else class="text-center p-6 text-slate-500">
                <div class="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-white font-bold text-xl mb-2">
                  {{ activeCallParticipant?.candidateName.split(' ').map(n => n[0]).join('') }}
                </div>
                Candidate Camera Off
              </div>

              <!-- floating name tag -->
              <span class="absolute bottom-4 left-4 bg-slate-900/60 text-white text-xs px-3 py-1 rounded-md font-semibold backdrop-blur-md">
                {{ activeCallParticipant?.candidateName }} (Candidate)
              </span>
            </div>

            <!-- Recruiter Stream (You) -->
            <div class="bg-[#1C1C24] rounded-2xl overflow-hidden border border-[#2C2C35] relative shadow-2xl flex flex-col justify-center items-center">
              <!-- Live animation/icon simulating recruiter -->
              <div v-if="!isSharingScreen" class="text-center p-6 text-slate-400">
                <div class="h-20 w-20 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-inner border border-indigo-500/20">
                  <User class="h-10 w-10 animate-pulse" />
                </div>
                <p class="font-bold text-sm text-white">You (Recruiter)</p>
                <p class="text-xs text-slate-500 mt-1">Camera Feed Live</p>
              </div>
              <div v-else class="w-full h-full bg-[#0A0A10] flex flex-col justify-center items-center border border-indigo-500/20">
                <Monitor class="h-16 w-16 text-indigo-400 animate-bounce mb-3" />
                <p class="font-bold text-white text-sm">You are sharing your screen</p>
                <p class="text-xs text-slate-400 mt-1">Click Stop Share to return to camera</p>
              </div>

              <!-- floating name tag -->
              <span class="absolute bottom-4 left-4 bg-slate-900/60 text-white text-xs px-3 py-1 rounded-md font-semibold backdrop-blur-md">
                You (Global Executive Partners)
              </span>
            </div>
          </div>
        </div>

        <!-- Chat Sidebar -->
        <div class="w-full md:w-80 bg-[#15151C] border-l border-[#25252F] flex flex-col text-white">
          <div class="p-4 border-b border-[#25252F] flex items-center gap-2">
            <MessageSquare class="h-4 w-4 text-indigo-400" />
            <h4 class="font-bold text-sm">Meeting Chat</h4>
          </div>

          <!-- Messages body -->
          <div class="flex-1 p-4 overflow-y-auto space-y-4 text-[11px]">
            <div v-for="(msg, i) in callMessages" :key="i" class="space-y-1">
              <span :class="['font-bold block', msg.sender === 'You' ? 'text-indigo-400' : 'text-emerald-400']">
                {{ msg.sender }}
              </span>
              <p class="bg-[#1C1C24] p-2.5 rounded-xl border border-[#25252F] text-slate-300 leading-relaxed shadow-sm">
                {{ msg.text }}
              </p>
            </div>
          </div>

          <!-- Message entry -->
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

      <!-- Bottom controls of call -->
      <footer class="bg-[#1C1C24] py-5 flex justify-center items-center text-white border-t border-[#2C2C35]">
        <div class="flex items-center gap-4">
          <!-- Mic mute -->
          <button
            @click="toggleMute"
            :class="[
              'p-3.5 rounded-full transition-all shadow-md cursor-pointer',
              isMuted ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300'
            ]"
          >
            <MicOff v-if="isMuted" class="h-5 w-5" />
            <Mic v-else class="h-5 w-5" />
          </button>

          <!-- Camera Toggle -->
          <button
            @click="toggleCamera"
            :class="[
              'p-3.5 rounded-full transition-all shadow-md cursor-pointer',
              isCameraOff ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300'
            ]"
          >
            <VideoOff v-if="isCameraOff" class="h-5 w-5" />
            <Video v-else class="h-5 w-5" />
          </button>

          <!-- Share Screen -->
          <button
            @click="toggleShareScreen"
            :class="[
              'p-3.5 rounded-full transition-all shadow-md cursor-pointer',
              isSharingScreen ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-[#2C2C35] hover:bg-[#3C3C47] text-slate-300'
            ]"
          >
            <Monitor class="h-5 w-5" />
          </button>

          <!-- Hang up -->
          <button
            @click="endCall"
            class="bg-rose-600 hover:bg-rose-700 p-3.5 px-6 rounded-full font-bold text-xs tracking-wider transition-all shadow-lg text-white cursor-pointer"
          >
            END CALL
          </button>
        </div>
      </footer>
    </div>

  </div>
</template>

<style scoped>
/* Gradient for mock call video background simulation */
.bg-radial-gradient {
  background: radial-gradient(circle, #1a1a24 0%, #0d0d12 100%);
}
</style>
