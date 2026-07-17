import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('accessToken') || null)
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      user.value = response.user
      token.value = response.token

      if (response.token) {
        localStorage.setItem('accessToken', response.token)
      }

      return response
    } catch (err) {
      error.value = authService.normalizeError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const response = await authService.getUsers()
      users.value = response
      return response
    } catch (err) {
      error.value = authService.normalizeError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createUser(payload) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.createUser(payload)
      users.value = [response, ...users.value]
      return response
    } catch (err) {
      error.value = authService.normalizeError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id, payload) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.updateUser(id, payload)
      users.value = users.value.map((item) => (item.id === Number(id) ? response : item))
      return response
    } catch (err) {
      error.value = authService.normalizeError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(id) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.deleteUser(id)
      users.value = users.value.filter((item) => item.id !== Number(id))
      return response
    } catch (err) {
      error.value = authService.normalizeError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('accessToken')
  }

  return {
    user,
    token,
    users,
    loading,
    error,
    isAuthenticated,
    login,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    logout,
  }
})
