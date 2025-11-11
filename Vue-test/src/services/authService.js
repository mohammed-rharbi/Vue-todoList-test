import mockApi from './mockApi'

const USE_MOCK_API = true

export const authService = {
  register: async (userData) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.auth.register(userData)
      }
      // Real API call would go here
      // const response = await api.post('/auth/register', userData)
      // return response.data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  },

  login: async (credentials) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.auth.login(credentials)
      }
      // Real API call would go here
      // const response = await api.post('/auth/login', credentials)
      // return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.auth.logout()
      }
      // Real API call would go here
      // const response = await api.post('/auth/logout')
      // return response.data
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  refresh: async () => {
    try {
      // Mock API doesn't need token refresh
      if (USE_MOCK_API) {
        return { data: { token: localStorage.getItem('token') } }
      }
      // Real API call would go here
      // const response = await api.post('/auth/refresh')
      // return response.data
    } catch (error) {
      console.error('Token refresh error:', error)
      throw error
    }
  },

  me: async () => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.auth.me()
      }
      // Real API call would go here
      // const response = await api.get('/auth/me')
      // return response.data
    } catch (error) {
      console.error('Get user error:', error)
      throw error
    }
  }
}
