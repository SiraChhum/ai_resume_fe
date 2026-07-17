import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService'

export const useApiStore = defineStore('api', () => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  async function request({ method = 'get', url, payload = null, config = {} }) {
    loading.value = true
    error.value = null

    try {
      const response = await apiService[method](url, payload, config)
      data.value = response.data
      return response.data
    } catch (err) {
      error.value = err?.response?.data?.message || err?.message || 'Request failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    loading,
    error,
    data,
    request,
    reset,
  }
})
