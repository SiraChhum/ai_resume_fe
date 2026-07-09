<script setup>
import { ref } from 'vue'

const files = ref([])
const inputFile = ref(null)

const browseFile = () => {
  inputFile.value.click()
}

const formatSize = (size) => {
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
  return (size / 1024 / 1024).toFixed(2) + ' MB'
}

const addFiles = (selectedFiles) => {
  Array.from(selectedFiles).forEach((file) => {
    const item = {
      id: Date.now() + Math.random(),
      file,
      progress: 0,
      paused: false,
      interval: null,
    }

    files.value.push(item)
    startUpload(item)
  })
}

const onFileChange = (e) => {
  addFiles(e.target.files)
  e.target.value = ''
}

const startUpload = (item) => {
  item.interval = setInterval(() => {
    if (!item.paused) {
      item.progress += 2

      if (item.progress >= 100) {
        item.progress = 100
        clearInterval(item.interval)
      }
    }
  }, 80)
}

const togglePause = (item) => {
  item.paused = !item.paused
}

const removeFile = (id) => {
  const file = files.value.find((f) => f.id === id)

  if (file?.interval) clearInterval(file.interval)

  files.value = files.value.filter((f) => f.id !== id)
}

const dragOver = (e) => {
  e.preventDefault()
}

const drop = (e) => {
  e.preventDefault()
  addFiles(e.dataTransfer.files)
}

const saveFiles = () => {
  alert('Files Saved!')
}
</script>

<template>
  <div class="flex justify-center items-center p-6">
    <div class="w-fulloverflow-hidden">
      <!-- Header -->
      <div class="bg-blue-600 text-white px-6 py-5 flex justify-between items-center">
        <h2 class="text-xl font-bold">UPLOAD FILES</h2>

        <button class="text-3xl opacity-70 hover:opacity-100">×</button>
      </div>

      <!-- Content -->
      <div class="p-8 space-y-8">
        <!-- Uploaded Files -->
        <div v-for="item in files" :key="item.id" class="space-y-2">
          <div class="flex justify-between items-center">
            <div class="font-medium text-gray-700 truncate">
              {{ item.file.name }}
            </div>

            <div class="text-sm text-gray-400">
              {{ formatSize(item.file.size) }}
            </div>
          </div>

          <!-- Progress -->
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-500 h-2 rounded-full transition-all duration-200"
              :style="{ width: item.progress + '%' }"
            ></div>
          </div>

          <div class="flex justify-between items-center">
            <button class="text-blue-500 text-sm hover:underline" @click="togglePause(item)">
              {{ item.paused ? 'Resume' : 'Pause' }}
            </button>

            <button class="text-red-500 text-sm" @click="removeFile(item.id)">Remove</button>
          </div>
        </div>

        <!-- Upload Box -->
        <div
          @dragover="dragOver"
          @drop="drop"
          class="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-20 h-20 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 18a4 4 0 01-.88-7.903A5.5 5.5 0 0116.5 9H17a4 4 0 010 8H7z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15V9m0 0l-3 3m3-3l3 3" />
            </svg>
          </div>

          <p class="text-xl font-semibold text-gray-600">
            Drag files here or

            <button class="text-blue-500 hover:underline" @click="browseFile">browse</button>
          </p>

          <input ref="inputFile" class="hidden" multiple type="file" @change="onFileChange" />
        </div>

        <!-- Save -->
        <button
          @click="saveFiles"
          class="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-lg font-bold text-lg"
        >
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>
