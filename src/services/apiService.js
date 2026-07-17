import apiClient from '@/api/axios'

export const apiService = {
  get(url, config = {}) {
    return apiClient.get(url, config)
  },

  post(url, data = {}, config = {}) {
    return apiClient.post(url, data, config)
  },

  put(url, data = {}, config = {}) {
    return apiClient.put(url, data, config)
  },

  patch(url, data = {}, config = {}) {
    return apiClient.patch(url, data, config)
  },

  delete(url, config = {}) {
    return apiClient.delete(url, config)
  },
}
