import apiClient from '@/api/axios'

function normalizeError(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Request failed'
  )
}

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const authService = {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  },

  async getUsers() {
    const response = await apiClient.get('/users', {
      headers: getAuthHeaders(),
    })
    console.log('getUsers response:', response.data) // Log the response data
    return response.data
  },

  async getUserById(id) {
    const response = await apiClient.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  async createUser(payload) {
    const response = await apiClient.post('/users', payload, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  async updateUser(id, payload) {
    const response = await apiClient.put(`/users/${id}`, payload, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  async deleteUser(id) {
    const response = await apiClient.delete(`/users/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  normalizeError,
}
